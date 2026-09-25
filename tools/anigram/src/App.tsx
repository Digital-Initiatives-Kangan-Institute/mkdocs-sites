import { useEffect, useRef, useState, useCallback } from 'react'
// @ts-ignore
import { GIFEncoder, quantize, applyPalette } from 'gifenc'
import { ICON_DEFS } from './iconDefs'
import { ToolShell } from '../../shared/ToolShell'

type NodeType = 'process' | 'decision' | 'terminal' | 'io' | 'image' | 'text' | 'icon'
type TextBorder = 'none' | 'solid' | 'dashed' | 'dotted'
type EdgeStyle = 'solid' | 'dashed' | 'animated' | 'flow'
type EdgeLabelAlign = 'center' | 'top' | 'bottom' | 'left' | 'right'

interface Node {
  id: string
  x: number
  y: number
  w: number
  h: number
  type: NodeType
  label: string
  color?: string
  image?: string // data URL or remote URL
  imageFit?: 'cover' | 'contain' | 'stretch'
  step?: string // numbered step like "1", "2a"
  subtext?: string // small text below node (replaces type badge), hidden if blank/undefined
  groupId?: string // bound to group rectangle
  icon?: string // icon id for type==='icon' (key of ICON_DEFS)
  iconFill?: string // fill for icon node's container, default 'transparent'
  iconBorder?: string // border stroke for icon node's container, default 'transparent'
  iconColor?: string // stroke color for the icon glyph itself, default '#0f172a'
  textBorder?: TextBorder // only for type==='text' — border style of the rectangle
}
interface Group {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
  color?: string
}
interface Edge {
  id: string
  from: string
  to: string
  label?: string
  labelAlign?: EdgeLabelAlign
  labelSize?: number
  labelBg?: string // background fill, default #ffffff
  labelBorder?: string // border stroke, default #e2e8f0
  labelColor?: string // text foreground, default #475569
  fromAngle?: number // radians, custom start point on source node perimeter
  toAngle?: number // radians, custom end point on target node perimeter
  style: EdgeStyle
  animated: boolean
  speed: number // 0.5 - 3
}

const STORAGE_KEY = "anigram:diagram:v1"

const NODE_DEFAULTS: Record<NodeType, {w:number,h:number,label:string,color:string}> = {
  process: { w: 160, h: 72, label: 'Process', color:'#ffffff' },
  decision: { w: 160, h: 110, label: 'Decision?', color:'#fffbeb'},
  terminal: { w: 160, h: 64, label: 'Start / End', color:'#ecfdf5'},
  io: { w: 160, h: 72, label: 'Input / Output', color:'#f5f3ff'},
  image: { w: 180, h: 120, label: 'Image', color:'#ffffff'},
  text: { w: 140, h: 44, label: 'Text', color:'transparent'},
  icon: { w: 96, h: 96, label: 'Icon', color:'#ffffff'},
}

function measureTextWidth(text: string, font: string): number {
  if(typeof document==='undefined') return text.length*7
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  if(!ctx) return text.length*7
  ctx.font = font
  return ctx.measureText(text).width
}
function getAutoSizeForNode(node: Node, newLabel?: string): {w:number,h:number} {
  const label = newLabel!==undefined ? newLabel : node.label
  const type = node.type
  if(type==='image' || type==='icon') return {w: node.w, h: node.h}
  const font='600 13px Inter'
  const mins: Record<NodeType,{w:number,h:number}> = {
    process:{w:160,h:72}, decision:{w:160,h:110}, terminal:{w:160,h:64}, io:{w:160,h:72}, image:{w:180,h:120}, text:{w:80,h:32}, icon:{w:96,h:96}
  }
  const min=mins[type]
  if(!label || !label.trim()) return {w:min.w, h:min.h}
  if(type==='decision'){
    const words=label.trim().split(/\s+/)
    const lines=words.length>1 ? [words[0], words.slice(1).join(' ')] : [label]
    const widths=lines.map(l=> measureTextWidth(l, font))
    const maxW=Math.max(...widths,0)
    const w=Math.max(min.w, Math.min(280, maxW+70))
    const h=lines.length===2 ? Math.max(min.h, 110) : Math.max(min.h, 80)
    return {w:Math.round(w), h:Math.round(h)}
  }
  if(type==='text'){
    const fontT='600 14px Inter'
    const tLines=label.split('\n')
    const tWidths=tLines.map(l=> measureTextWidth(l, fontT))
    const maxW=Math.max(...tWidths,0)
    const w=Math.max(min.w, Math.min(360, maxW+32))
    const h=Math.max(min.h, tLines.length*18 + 20)
    return {w:Math.round(w), h:Math.round(h)}
  }
  const lines=label.split('\n')
  const widths=lines.map(l=> measureTextWidth(l, font))
  const maxW=Math.max(...widths,0)
  const w=Math.max(min.w, Math.min(320, maxW+48))
  const h=Math.max(min.h, lines.length*16 + 40)
  return {w:Math.round(w), h:Math.round(h)}
}
void getAutoSizeForNode

const INITIAL_NODES: Node[] = [
  { id:'n1', x:100, y:80, w:180, h:64, type:'terminal', label:'Start', color:'#ecfdf5', step:'1'},
  { id:'n2', x:110, y:200, w:160, h:72, type:'process', label:'Fetch Data', color:'#ffffff', step:'2'},
  { id:'n3', x:90, y:340, w:200, h:110, type:'decision', label:'Valid ?', color:'#fffbeb', step:'3'},
  { id:'n4', x:40, y:520, w:150, h:72, type:'process', label:'Handle Error', color:'#ffffff', step:'4'},
  { id:'n5', x:250, y:520, w:150, h:72, type:'io', label:'Render Result', color:'#f5f3ff', step:'5'},
  { id:'n6', x:260, y:680, w:180, h:64, type:'terminal', label:'End', color:'#ecfdf5', step:'6'},
]
const INITIAL_EDGES: Edge[] = [
  { id:'e1', from:'n1', to:'n2', style:'animated', animated:true, speed:1, label:''},
  { id:'e2', from:'n2', to:'n3', style:'flow', animated:true, speed:1.2, label:'data'},
  { id:'e3', from:'n3', to:'n4', style:'animated', animated:true, speed:1, label:'no'},
  { id:'e4', from:'n3', to:'n5', style:'animated', animated:true, speed:1, label:'yes'},
  { id:'e5', from:'n5', to:'n6', style:'dashed', animated:false, speed:1, label:''},
  { id:'e6', from:'n4', to:'n6', style:'solid', animated:false, speed:1, label:''},
]

function uid(prefix='id'){ return prefix+Math.random().toString(36).slice(2,9) }

function getNodePolygon(node: Node|Group): {x:number,y:number}[] {
  const {x,y,w,h} = node as any
  const type = (node as Node).type
  if(type==='decision'){
    return [{x:x+w/2,y:y},{x:x+w,y:y+h/2},{x:x+w/2,y:y+h},{x:x,y:y+h/2}]
  }
  if(type==='io'){
    const skew=16
    return [{x:x+skew,y:y},{x:x+w,y:y},{x:x+w-skew,y:y+h},{x:x,y:y+h}]
  }
  if(type==='terminal'){
    const r=h/2
    const cx1=x+r, cy=y+h/2
    const cx2=x+w-r
    const pts:{x:number,y:number}[]=[]
    pts.push({x:x+r,y:y})
    pts.push({x:x+w-r,y:y})
    // right semicircle
    for(let i=0;i<=8;i++){
      const ang=-Math.PI/2 + (Math.PI*i/8)
      pts.push({x:cx2 + Math.cos(ang)*r, y:cy + Math.sin(ang)*r})
    }
    pts.push({x:x+w-r,y:y+h})
    pts.push({x:x+r,y:y+h})
    // left semicircle
    for(let i=0;i<=8;i++){
      const ang=Math.PI/2 + (Math.PI*i/8)
      pts.push({x:cx1 + Math.cos(ang)*r, y:cy + Math.sin(ang)*r})
    }
    return pts
  }
  // process, image, default rect (rounded corners approximated as sharp for intersection)
  return [{x:x,y:y},{x:x+w,y:y},{x:x+w,y:y+h},{x:x,y:y+h}]
}

function getNodeEdgePoint(node: Node|Group, dirX:number, dirY:number): {x:number,y:number} {
  const cx=node.x+node.w/2, cy=node.y+node.h/2
  const len=Math.hypot(dirX,dirY)||1
  const ux=dirX/len, uy=dirY/len
  // fast path for axis-aligned rect and diamond via analytic, fallback to polygon ray
  if((node as Node).type==='decision'){
    const hw=node.w/2, hh=node.h/2
    const t = 1 / (Math.abs(ux)/hw + Math.abs(uy)/hh + 1e-9)
    return {x: cx + ux*t, y: cy + uy*t}
  }
  // for rect-like (process, image) and io/terminal we use polygon ray
  const poly=getNodePolygon(node)
  // ray polygon intersection: find smallest t>=0 where ray hits edge
  let bestT=Infinity
  let best: {x:number,y:number}|null=null
  const n=poly.length
  const det = (ux:number,uy:number,ex:number,ey:number)=> ux*ey - uy*ex
  for(let i=0;i<n;i++){
    const p0=poly[i], p1=poly[(i+1)%n]
    const ex=p1.x-p0.x, ey=p1.y-p0.y
    const d = det(ux,uy,ex,ey)
    if(Math.abs(d) < 1e-9) continue
    const dx = p0.x - cx, dy = p0.y - cy
    const t = (dx*ey - dy*ex) / d
    let u2: number
    if(Math.abs(ex) > Math.abs(ey)) u2 = (t*ux - dx)/ex
    else u2 = (t*uy - dy)/ey
    if(t >= -1e-6 && u2 >= -1e-6 && u2 <= 1+1e-6){
      if(t < bestT){
        bestT = t
        best = {x: cx + ux*t, y: cy + uy*t}
      }
    }
  }
  if(best) return best
  // fallback: rect analytic
  const hw=node.w/2, hh=node.h/2
  const tx = ux!==0 ? hw/Math.abs(ux) : Infinity
  const ty = uy!==0 ? hh/Math.abs(uy) : Infinity
  const t2 = Math.min(tx,ty)
  return {x: cx + ux*t2, y: cy + uy*t2}
}

function getEdgeEndpoints(a:Node|Group,b:Node|Group,edge?:Edge){
  const ax=a.x+a.w/2, ay=a.y+a.h/2, bx=b.x+b.w/2, by=b.y+b.h/2
  const dx=bx-ax, dy=by-ay, len=Math.hypot(dx,dy)||1, ux=dx/len, uy=dy/len
  let start: {x:number,y:number}, end: {x:number,y:number}
  if(edge && typeof edge.fromAngle==='number'){
    const fx=Math.cos(edge.fromAngle), fy=Math.sin(edge.fromAngle)
    start = getNodeEdgePoint(a, fx, fy)
  } else {
    start = getNodeEdgePoint(a, ux, uy)
  }
  if(edge && typeof edge.toAngle==='number'){
    const tx=Math.cos(edge.toAngle), ty=Math.sin(edge.toAngle)
    end = getNodeEdgePoint(b, tx, ty)
  } else {
    end = getNodeEdgePoint(b, -ux, -uy)
  }
  // gap along actual line direction for clean arrow
  const ldx=end.x-start.x, ldy=end.y-start.y, llen=Math.hypot(ldx,ldy)||1, lux=ldx/llen, luy=ldy/llen
  const gapStart=2, gapEnd=2
  const sx=start.x + lux*gapStart, sy=start.y + luy*gapStart
  const ex=end.x - lux*gapEnd, ey=end.y - luy*gapEnd
  const mx=(sx+ex)/2, my=(sy+ey)/2
  return {sx,sy,ex,ey,mx,my,ux:lux,uy:luy}
}

const ICON_IDS = Object.keys(ICON_DEFS) as string[]
const ICON_CATEGORIES: Record<string,string[]> = {
  "Arrows & Navigation": ["arrow-right","arrow-left","arrow-up","arrow-down","chevron-right","chevron-left","chevron-up","chevron-down","chevrons-up-down","external-link","link","share-2","navigation","compass","map","map-pin","send","download","upload","target","crosshair"],
  "Actions & Editing": ["plus","check","x","pencil","edit","trash","trash-2","copy","copy-check","clipboard","save","search","filter","sliders-horizontal","settings","tool","wrench","hammer","ruler","pen-tool","paintbrush","palette","refresh-cw","rotate-cw","play","pause","eye","eye-off"],
  "Communication": ["mail","message-circle","message-square","phone","phone-call","bell","user","users","star","heart","flag","gift","bookmark","tag","thumbs-up","thumbs-down","globe"],
  "Files & Data": ["file","file-text","file-code","folder","archive","archive-x","box","package","inbox","layers","grid-3x3","layout-grid","image","video","music","camera"],
  "Devices & Hardware": ["monitor","laptop","smartphone","tablet","watch","printer","keyboard","mouse","headphones","cpu","hard-drive","server","database","cloud","wifi","signal"],
  "Business & Finance": ["briefcase","briefcase-business","building-2","shopping-cart","shopping-bag","credit-card","dollar-sign","truck","bar-chart-3","pie-chart","activity","calendar","clock","timer","hourglass"],
  "Status & Shapes": ["square","circle","hexagon","diamond","alert-triangle","alert-circle","help-circle","info","check-circle","x-circle","shield","lock","unlock","key","house"],
  "Nature & Ideas": ["sun","moon","droplet","flame","lightbulb","cloud","zap"],
}
const ICON_CATEGORY_ORDER = Object.keys(ICON_CATEGORIES)
// icons not in any category go to "Other"
const _CAT_COVERED = new Set(Object.values(ICON_CATEGORIES).flat())
const ICON_OTHER = ICON_IDS.filter(id=> !_CAT_COVERED.has(id))
if(ICON_OTHER.length) (ICON_CATEGORIES as any)["Other"] = ICON_OTHER

function getSmartMenuPos(x:number, y:number, w:number, h:number){
  const vw = typeof window!=='undefined' ? window.innerWidth : 1920
  const vh = typeof window!=='undefined' ? window.innerHeight : 1080
  const m = 8
  let left = x
  let top = y
  if(x + w > vw - m) left = Math.max(m, vw - w - m)
  if(y + h > vh - m) top = Math.max(m, y - h - m)
  if(left < m) left = m
  if(top < m) top = m
  return {left, top}
}

function LucideIcon({icon, size=24, color="#0f172a", fill="none", stroke, strokeWidth=1.7}:{icon:string,size?:number,color?:string,fill?:string,stroke?:string,strokeWidth?:number}){
  const def = (ICON_DEFS as any)[icon] as any[] | undefined
  if(!def) return null
  const strokeColor = stroke ?? color ?? "#0f172a"
  const fillColor = fill ?? "none"
  // render as nested svg of size, centered at 0,0 with scale size/24
  return (
    <g transform={`scale(${size/24})`}>
      {def.map((entry:any,i:number)=>{
        const [tag, attrs] = entry as any
        const {key: _k, ...rest} = attrs as any
        const hasFill = !!rest.fill
        const common:any = { strokeLinecap:"round", strokeLinejoin:"round", vectorEffect:"non-scaling-stroke", ...rest, fill: fillColor, stroke: hasFill ? undefined : strokeColor, strokeWidth: hasFill ? undefined : strokeWidth }
        if(tag==="path") return <path key={i} {...common} />
        if(tag==="circle") return <circle key={i} {...common} />
        if(tag==="rect") return <rect key={i} {...common} />
        if(tag==="ellipse") return <ellipse key={i} {...common} />
        if(tag==="line") return <line key={i} {...common} />
        if(tag==="polygon") return <polygon key={i} {...common} />
        if(tag==="polyline") return <polyline key={i} {...common} />
        return null
      })}
    </g>
  )
}

function drawLucideIconCanvas(ctx: CanvasRenderingContext2D, iconId:string, cx:number, cy:number, size:number, stroke:string, fill:string, lineWidth:number){
  const def = (ICON_DEFS as any)[iconId] as any[] | undefined
  if(!def || !def.length) return
  ctx.save()
  ctx.translate(cx - size/2, cy - size/2)
  ctx.scale(size/24, size/24)
  ctx.strokeStyle = stroke
  ctx.fillStyle = fill
  ctx.lineWidth = lineWidth
  ctx.lineCap = "round" as any
  ctx.lineJoin = "round" as any
  for(const entry of def){
    const [tag, attrs] = entry as any
    const a = attrs as any
    const hasFill = !!a.fill
    if(tag==="path"){
      try{ const p = new (window as any).Path2D(a.d); if(hasFill){ ctx.fillStyle=fill; ctx.fill(p as any)} else { ctx.strokeStyle=stroke; ctx.stroke(p as any)} }catch{ /* fallback */ }
    } else if(tag==="circle"){
      const x=+a.cx, y=+a.cy, r=+a.r
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); if(hasFill){ ctx.fillStyle=fill; ctx.fill() } else { ctx.strokeStyle=stroke; ctx.stroke() }
    } else if(tag==="rect"){
      const x=+a.x, y=+a.y, w=+a.width, h=+a.height, rx=+a.rx||0, ry=+a.ry||0
      ctx.beginPath()
      // @ts-ignore
      if((ctx as any).roundRect && (rx||ry)) (ctx as any).roundRect(x,y,w,h,Math.min(rx,ry))
      else ctx.rect(x,y,w,h)
      if(hasFill){ ctx.fillStyle=fill; ctx.fill() } else { ctx.strokeStyle=stroke; ctx.stroke() }
    } else if(tag==="ellipse"){
      const x=+a.cx, y=+a.cy, rx=+a.rx, ry=+a.ry
      ctx.beginPath(); (ctx as any).ellipse ? (ctx as any).ellipse(x,y,rx,ry,0,0,Math.PI*2) : ctx.arc(x,y,Math.max(rx,ry),0,Math.PI*2); if(hasFill){ ctx.fillStyle=fill; ctx.fill() } else { ctx.strokeStyle=stroke; ctx.stroke() }
    } else if(tag==="line"){
      const x1=+a.x1, y1=+a.y1, x2=+a.x2, y2=+a.y2
      ctx.beginPath(); ctx.strokeStyle=stroke; ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
    } else if(tag==="polygon" || tag==="polyline"){
      const pts = String(a.points||"").trim().split(/[\s,]+/).map(Number)
      if(pts.length>=4){ ctx.beginPath(); ctx.moveTo(pts[0],pts[1]); for(let i=2;i<pts.length;i+=2) ctx.lineTo(pts[i],pts[i+1]); if(tag==="polygon") ctx.closePath(); if(hasFill){ ctx.fillStyle=fill; ctx.fill() } else { ctx.strokeStyle=stroke; ctx.stroke() } }
    }
  }
  ctx.restore()
}

function normalizeHashedDiagram(raw:any): {nodes:Node[], edges:Edge[], groups:Group[], viewport?:{zoom:number, pan:{x:number,y:number}}} | null {
  if(!raw || typeof raw !== 'object') return null
  const data = raw.nodes ? raw : raw.data ? raw.data : (raw as any).diagram ? (raw as any).diagram : raw
  let nodes: any = (data as any).nodes ?? (data as any).diagram?.nodes
  let edges: any = (data as any).edges ?? (data as any).diagram?.edges
  let groups: any = (data as any).groups ?? (data as any).diagram?.groups
  if(!Array.isArray(nodes)) nodes = []
  if(!Array.isArray(edges)) edges = []
  if(!Array.isArray(groups)) groups = []
  nodes = nodes.filter((n:any)=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
  edges = edges.filter((e:any)=> e && typeof e.from==='string' && typeof e.to==='string')
  groups = (groups as any).filter((g:any)=> g && typeof g.id==='string' && typeof g.x==='number' && typeof g.y==='number')
  if(nodes.length===0 && groups.length===0) return null
  const viewport = (data as any).viewport && typeof (data as any).viewport.zoom==='number' ? (data as any).viewport : (raw as any).viewport
  return { nodes: nodes as Node[], edges: edges as Edge[], groups: groups as Group[], viewport }
}

function tryParsePayload(payload: string): {nodes:Node[], edges:Edge[], groups:Group[], viewport?:{zoom:number, pan:{x:number,y:number}}} | null {
  let p = payload.trim()
  if(!p) return null
  const candidates: string[] = []
  candidates.push(p)
  try{ const dec = decodeURIComponent(p); if(dec!==p) candidates.push(dec) }catch{}
  try{ const dec2 = decodeURI(p); if(dec2!==p && !candidates.includes(dec2)) candidates.push(dec2) }catch{}
  const toTry: string[] = [...candidates]
  for(const c of candidates){
    const t = c.trim()
    if(t.length>20 && /^[A-Za-z0-9+/_=-]+$/.test(t) && !t.includes('{') && !t.includes('"')){
      try{
        let b64 = t.replace(/-/g,'+').replace(/_/g,'/')
        while(b64.length%4) b64+='='
        const decoded = atob(b64)
        if(decoded) toTry.push(decoded)
        try{ const d2 = decodeURIComponent(decoded); if(d2!==decoded) toTry.push(d2) }catch{}
      }catch{}
      try{
        let b64 = t.replace(/-/g,'+').replace(/_/g,'/')
        while(b64.length%4) b64+='='
        const bin = atob(b64)
        const utf8 = decodeURIComponent(escape(bin))
        if(utf8 && utf8!==bin && !toTry.includes(utf8)) toTry.push(utf8)
      }catch{}
    }
  }
  for(const cand of toTry){
    let str = cand.trim()
    if(!str) continue
    try{
      const obj = JSON.parse(str)
      const norm = normalizeHashedDiagram(obj)
      if(norm) return norm
    }catch{}
    const s = str.indexOf('{')
    const e = str.lastIndexOf('}')
    if(s!==-1 && e!==-1 && e>s){
      const sub = str.slice(s,e+1)
      try{
        const obj = JSON.parse(sub)
        const norm = normalizeHashedDiagram(obj)
        if(norm) return norm
      }catch{}
      try{
        const dec = decodeURIComponent(sub)
        const obj = JSON.parse(dec)
        const norm = normalizeHashedDiagram(obj)
        if(norm) return norm
      }catch{}
    }
  }
  return null
}

function getHashMode(): {mode:'viewer'|'editor', diagram:{nodes:Node[], edges:Edge[], groups:Group[], viewport?:{zoom:number, pan:{x:number,y:number}}}} | null {
  try{
    if(typeof window==='undefined') return null
    let h = window.location.hash
    if(!h || h.length<=1) return null
    h = h.slice(1).trim()
    if(!h) return null
    let mode: 'viewer'|'editor'|null = null
    let payload: string|null = null
    if(h.startsWith('viewer=')){
      mode = 'viewer'
      payload = h.slice(7)
    } else if(h.startsWith('editor=')){
      mode = 'editor'
      payload = h.slice(7)
    } else {
      try{
        const dec = decodeURIComponent(h)
        if(dec.startsWith('viewer=')){
          mode = 'viewer'
          payload = dec.slice(7)
        } else if(dec.startsWith('editor=')){
          mode = 'editor'
          payload = dec.slice(7)
        }
      }catch{}
      if(!mode){
        const diag = tryParsePayload(h)
        if(diag) return {mode:'viewer', diagram: diag}
        return null
      }
    }
    if(payload===null) return null
    if(!payload.trim()) return null
    const diag = tryParsePayload(payload)
    if(!diag) return null
    return {mode, diagram: diag}
  }catch{ return null }
}

function getHashedDiagram(): {nodes:Node[], edges:Edge[], groups:Group[], viewport?:{zoom:number, pan:{x:number,y:number}}} | null {
  const m = getHashMode()
  if(m && m.mode==='viewer') return m.diagram
  if(!m){
    try{
      let h = window.location.hash.slice(1).trim()
      if(h && !h.startsWith('viewer=') && !h.startsWith('editor=')){
        const diag = tryParsePayload(h)
        if(diag) return diag
      }
    }catch{}
  }
  return null
}
void getHashedDiagram

export default function App(){
  const [nodes, setNodes] = useState<Node[]>(()=>{
    try{
      if(typeof window==='undefined') return INITIAL_NODES
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return INITIAL_NODES
      const data = JSON.parse(raw)
      const savedNodes = data?.nodes ?? data?.diagram?.nodes ?? []
      if(Array.isArray(savedNodes)){
        const valid = savedNodes.filter((n:any)=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
        return valid as Node[]
      }
    }catch{}
    return INITIAL_NODES
  })
  const [edges, setEdges] = useState<Edge[]>(()=>{
    try{
      if(typeof window==='undefined') return INITIAL_EDGES
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return INITIAL_EDGES
      const data = JSON.parse(raw)
      const savedEdges = data?.edges ?? data?.diagram?.edges ?? []
      if(Array.isArray(savedEdges)){
        const valid = savedEdges.filter((e:any)=> e && typeof e.from==='string' && typeof e.to==='string')
        return valid as Edge[]
      }
    }catch{}
    return INITIAL_EDGES
  })
  const [groups, setGroups] = useState<Group[]>(()=>{
    try{
      if(typeof window==='undefined') return []
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return []
      const data = JSON.parse(raw)
      const savedGroups = data?.groups ?? data?.diagram?.groups ?? []
      if(Array.isArray(savedGroups)){
        const valid = (savedGroups as any).filter((g:any)=> g && typeof g.id==='string' && typeof g.x==='number' && typeof g.y==='number') as Group[]
        return valid
      }
    }catch{}
    return []
  })
  const [selectedIds, setSelectedIds] = useState<string[]>(()=>{
    try{
      if(typeof window==='undefined') return ['n2']
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return ['n2']
      const data = JSON.parse(raw)
      const savedNodes = data?.nodes ?? data?.diagram?.nodes ?? []
      const savedGroups = data?.groups ?? data?.diagram?.groups ?? []
      if(Array.isArray(savedNodes)){
        const validNodes = savedNodes.filter((n:any)=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
        const validGroups = Array.isArray(savedGroups) ? (savedGroups as any).filter((g:any)=> g && typeof g.id==='string') as Group[] : []
        if(validGroups.length && !validNodes.length) return []
        if(validNodes.length) return [validNodes[0].id]
        return []
      }
    }catch{}
    return ['n2']
  })
  const [selectedEdge, setSelectedEdge] = useState<string|null>(null)
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>(()=>{
    try{
      if(typeof window==='undefined') return []
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return []
      const data = JSON.parse(raw)
      const savedNodes = data?.nodes ?? data?.diagram?.nodes ?? []
      const savedGroups = data?.groups ?? data?.diagram?.groups ?? []
      if(Array.isArray(savedGroups) && Array.isArray(savedNodes)){
        const validNodes = savedNodes.filter((n:any)=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
        const validGroups = (savedGroups as any).filter((g:any)=> g && typeof g.id==='string' && typeof g.x==='number' && typeof g.y==='number') as Group[]
        if(validGroups.length && !validNodes.length) return [(validGroups as any)[0].id]
        return []
      }
    }catch{}
    return []
  })
  const [connectFrom, setConnectFrom] = useState<string|null>(null)
  const [zoom, setZoom] = useState<number>(()=>{
    try{
      if(typeof window==='undefined') return 1
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return 1
      const data = JSON.parse(raw)
      const z = data?.viewport?.zoom
      if(typeof z==='number') return Math.min(2, Math.max(0.3, z))
    }catch{}
    return 1
  })
  const [pan, setPan] = useState<{x:number,y:number}>(()=>{
    try{
      if(typeof window==='undefined') return {x:0,y:0}
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return {x:0,y:0}
      const data = JSON.parse(raw)
      const p = data?.viewport?.pan
      if(p && typeof p.x==='number' && typeof p.y==='number') return {x:p.x, y:p.y}
    }catch{}
    return {x:0,y:0}
  })
  const [snapGrid, setSnapGrid] = useState<number>(20) // 0 = off, else grid snapping units (e.g. 10,20,40)
  const snap = useCallback((v:number)=> snapGrid ? Math.round(v / snapGrid) * snapGrid : v, [snapGrid])
  const [animOffset, setAnimOffset] = useState(0)
  const [isDragging, setIsDragging] = useState<string|null>(null)
  const [dragOffset, setDragOffset] = useState({x:0,y:0})
  const [selectionBox, setSelectionBox] = useState<null|{x0:number,y0:number,x1:number,y1:number}>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [dragStartPos, setDragStartPos] = useState<null|{x:number,y:number}>(null)
  const [dragInitialPositions, setDragInitialPositions] = useState<Map<string,{x:number,y:number}>>(new Map())
  const [isDraggingGroup, setIsDraggingGroup] = useState<string|null>(null)
  const [dragGroupOffset, setDragGroupOffset] = useState({x:0,y:0})
  const [dragGroupStartPos, setDragGroupStartPos] = useState<null|{x:number,y:number}>(null)
  const [dragGroupInitialPositions, setDragGroupInitialPositions] = useState<Map<string,{x:number,y:number}>>(new Map())
  const [dragGroupMemberInitials, setDragGroupMemberInitials] = useState<Map<string,{x:number,y:number}>>(new Map())
  const [isResizingGroup, setIsResizingGroup] = useState<string|null>(null)
  const [isResizingNode, setIsResizingNode] = useState<string|null>(null)
  const [resizeHandle, setResizeHandle] = useState<null|'tl'|'tr'|'bl'|'br'|'t'|'b'|'l'|'r'>(null)
  const [draggingEndpoint, setDraggingEndpoint] = useState<null|{edgeId:string, end:'from'|'to'}>(null)
  const [resizeStart, setResizeStart] = useState<null|{x:number,y:number}>(null)
  const [resizeInitialRect, setResizeInitialRect] = useState<null|{x:number,y:number,w:number,h:number}>(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({x:0,y:0})
  const [exporting, setExporting] = useState<null|'gif'|'webm'>(null)
  const [exportProgress, setExportProgress] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [toast, setToast] = useState<string|null>(null)
  const [pendingImagePos, setPendingImagePos] = useState<{x:number,y:number}|null>(null)
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map())
  const [activeMenu, setActiveMenu] = useState<null | 'file' | 'edit' | 'samples'>(null)
  const menuBarRef = useRef<HTMLDivElement>(null)
  const [exportModal, setExportModal] = useState<null|'json'|'gif'|'webm'>(null)
  const [jsonSettings, setJsonSettings] = useState({ includeViewport:true, pretty:true, fileName:'anigram' })
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false)
  const [contextMenu, setContextMenu] = useState<null | {x:number, y:number, nodeId:string}>(null)
  const contextMenuRef = useRef<HTMLDivElement>(null)
  const [canvasContextMenu, setCanvasContextMenu] = useState<null | {x:number, y:number, wx:number, wy:number}>(null)
  const canvasContextMenuRef = useRef<HTMLDivElement>(null)
  const [connectCreateMenu, setConnectCreateMenu] = useState<null | {x:number, y:number, wx:number, wy:number}>(null)
  const connectCreateMenuRef = useRef<HTMLDivElement>(null)
  const [editingNodeId, setEditingNodeId] = useState<string|null>(null)
  const [editingValue, setEditingValue] = useState("")
  const editInputRef = useRef<HTMLTextAreaElement>(null)
  const clipboardNodesRef = useRef<Node[]|null>(null)
  const clipboardGroupsRef = useRef<Group[]|null>(null)
  const pasteOffsetRef = useRef(0)
  const [iconPickerFor, setIconPickerFor] = useState<string|null>(null)
  const [iconSearch, setIconSearch] = useState("")
  // hash mode — #viewer=<JSON> (read-only embed) or #editor=<JSON> (editable) — also supports plain #JSON for backward compat
  const [hashMode, setHashMode] = useState<{mode:'viewer'|'editor', diagram:{nodes:Node[], edges:Edge[], groups:Group[], viewport?:{zoom:number,pan:{x:number,y:number}}}}|null>(() => getHashMode())
  const hashDiagram = hashMode && hashMode.mode==='viewer' ? hashMode.diagram : null
  const editorHashDiagram = hashMode && hashMode.mode==='editor' ? hashMode.diagram : null
  const isViewerMode = !!hashDiagram
  const viewerSvgRef = useRef<SVGSVGElement>(null)
  const [viewerZoom, setViewerZoom] = useState(1)
  const [viewerPan, setViewerPan] = useState<{x:number,y:number}>({x:0,y:0})
  const [isViewerPanning, setIsViewerPanning] = useState(false)
  const [viewerPanStart, setViewerPanStart] = useState({x:0,y:0})
  // always maximum quality: gif 2400x1600 60f 33ms, webm 2400x1600 60fps 12Mbps (no UI selectors)


  // animation loop
  useEffect(()=>{
    let last = performance.now()
    const loop = (now:number)=>{
      const delta = now - last
      last = now
      setAnimOffset(o => (o + delta*0.08) % 1000)
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return ()=> cancelAnimationFrame(animRef.current)
  },[])

  // wheel zoom — native listener with {passive:false} so preventDefault() doesn't trigger
  // "Unable to preventDefault inside passive event listener" warning (React's onWheel is passive)
  useEffect(()=>{
    const svg = svgRef.current
    if(!svg) return
    const onWheel = (e: WheelEvent)=>{
      e.preventDefault()
      const delta = -e.deltaY*0.0012
      const newZoom = Math.min(2, Math.max(0.3, zoom + delta))
      if(newZoom===zoom) return
      const rect = svg.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const wx = (mx - pan.x)/zoom
      const wy = (my - pan.y)/zoom
      setZoom(newZoom)
      setPan({ x: mx - wx*newZoom, y: my - wy*newZoom })
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return ()=> svg.removeEventListener('wheel', onWheel)
  },[zoom, pan])

  // hash mode: listen for #viewer= / #editor= changes (supports embed via iframe)
  useEffect(()=>{
    const onHash = ()=> setHashMode(getHashMode())
    window.addEventListener('hashchange', onHash)
    return ()=> window.removeEventListener('hashchange', onHash)
  },[])
  // when #editor= changes, load diagram and auto-fit to content bounds (ignore shared viewport)
  useEffect(()=>{
    if(!editorHashDiagram) return
    const d = editorHashDiagram
    setNodes(d.nodes as Node[])
    setEdges(d.edges as Edge[])
    setGroups((d.groups as Group[]) || [])
    // auto-fit using actual canvas size
    const doFit = ()=>{
      const svg = svgRef.current
      const rect = svg?.getBoundingClientRect()
      const availW = rect && rect.width>0 ? rect.width : (typeof window!=='undefined' ? window.innerWidth - 72 - 320 : 800)
      const availH = rect && rect.height>0 ? rect.height : (typeof window!=='undefined' ? window.innerHeight - 56 : 600)
      const all: {x:number,y:number,w:number,h:number}[] = [...d.nodes, ...((d.groups as any[]) || [])] as any
      if(!all.length){ setZoom(1); setPan({x:0,y:0}); return }
      const minX = Math.min(...all.map(n=>n.x))
      const minY = Math.min(...all.map(n=>n.y))
      const maxX = Math.max(...all.map(n=>n.x+n.w))
      const maxY = Math.max(...all.map(n=>n.y+n.h))
      const pad=60
      const contentW = maxX - minX + pad*2
      const contentH = maxY - minY + pad*2
      const fitZoom = Math.min(2, Math.max(0.3, Math.min(availW / contentW, availH / contentH)))
      setZoom(fitZoom)
      setPan({ x: availW/2 - (minX+maxX)/2 * fitZoom, y: availH/2 - (minY+maxY)/2 * fitZoom })
    }
    const fid = requestAnimationFrame(()=> doFit())
    const firstNode = (d.nodes as any)[0]
    const firstGroup = (d.groups as any)?.[0]
    if(firstNode) { setSelectedIds([firstNode.id]); setSelectedGroupIds([]) }
    else if(firstGroup) { setSelectedGroupIds([firstGroup.id]); setSelectedIds([]) }
    else { setSelectedIds([]); setSelectedGroupIds([]) }
    setSelectedEdge(null)
    setConnectFrom(null)
    // preload editor images
    d.nodes.forEach(n=>{
      if(n.image && !imageCacheRef.current.has(n.image)){
        const img = new Image()
        if(!n.image.startsWith('data:')) (img as any).crossOrigin='anonymous'
        img.src = n.image
        imageCacheRef.current.set(n.image, img)
      }
    })
    return ()=> cancelAnimationFrame(fid)
  },[editorHashDiagram])
  // viewer: auto-fit to content bounds (ignore shared viewport)
  useEffect(()=>{
    if(!hashDiagram) return
    const doFit = ()=>{
      const svg = viewerSvgRef.current
      const rect = svg?.getBoundingClientRect()
      const availW = rect && rect.width>0 ? rect.width : (typeof window!=='undefined' ? window.innerWidth : 1000)
      const availH = rect && rect.height>0 ? rect.height : (typeof window!=='undefined' ? window.innerHeight : 600)
      const all: {x:number,y:number,w:number,h:number}[] = [...hashDiagram.nodes, ...hashDiagram.groups] as any
      if(!all.length){ setViewerZoom(1); setViewerPan({x:0,y:0}); return }
      const minX = Math.min(...all.map(n=>n.x))
      const minY = Math.min(...all.map(n=>n.y))
      const maxX = Math.max(...all.map(n=>n.x+n.w))
      const maxY = Math.max(...all.map(n=>n.y+n.h))
      const pad=60
      const contentW = maxX - minX + pad*2
      const contentH = maxY - minY + pad*2
      const fitZoom = Math.min(2, Math.max(0.3, Math.min(availW / contentW, availH / contentH)))
      setViewerZoom(fitZoom)
      setViewerPan({ x: availW/2 - (minX+maxX)/2 * fitZoom, y: availH/2 - (minY+maxY)/2 * fitZoom })
    }
    const id = requestAnimationFrame(()=> doFit())
    return ()=> cancelAnimationFrame(id)
  },[hashDiagram])
  // viewer wheel zoom (passive:false)
  useEffect(()=>{
    if(!isViewerMode) return
    const svg = viewerSvgRef.current
    if(!svg) return
    const onWheel = (e: WheelEvent)=>{
      e.preventDefault()
      const delta = -e.deltaY*0.0012
      const newZoom = Math.min(2, Math.max(0.3, viewerZoom + delta))
      if(newZoom===viewerZoom) return
      const rect = svg.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const wx = (mx - viewerPan.x)/viewerZoom
      const wy = (my - viewerPan.y)/viewerZoom
      setViewerZoom(newZoom)
      setViewerPan({ x: mx - wx*newZoom, y: my - wy*newZoom })
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return ()=> svg.removeEventListener('wheel', onWheel)
  },[isViewerMode, viewerZoom, viewerPan])
  // viewer: preload images
  useEffect(()=>{
    if(!hashDiagram) return
    hashDiagram.nodes.forEach(n=>{
      if(n.image && !imageCacheRef.current.has(n.image)){
        const img = new Image()
        if(!n.image.startsWith('data:')) (img as any).crossOrigin='anonymous'
        img.src = n.image
        imageCacheRef.current.set(n.image, img)
      }
    })
  },[hashDiagram])

  const getNode = useCallback((id:string)=> nodes.find(n=>n.id===id),[nodes])
  const getGroup = useCallback((id:string)=> groups.find(g=>g.id===id),[groups])



  // preload images into cache
  useEffect(()=>{
    nodes.forEach(n=>{
      if(n.image && !imageCacheRef.current.has(n.image)){
        const img = new Image()
        img.src = n.image
        imageCacheRef.current.set(n.image, img)
      }
    })
  },[nodes])

  // close menu bar dropdowns on outside click / esc
  useEffect(()=>{
    if(!activeMenu) return
    const onDown = (e: MouseEvent)=>{ if(menuBarRef.current && !menuBarRef.current.contains(e.target as unknown as globalThis.Node)) setActiveMenu(null) }
    const onEsc = (e: KeyboardEvent)=>{ if(e.key==='Escape') setActiveMenu(null) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onEsc)
    return ()=>{ document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc)}
  },[activeMenu])

  // close context menu on outside click / esc
  useEffect(()=>{
    if(!contextMenu) return
    const onDown = (e: MouseEvent)=>{ if(contextMenuRef.current && !contextMenuRef.current.contains(e.target as unknown as globalThis.Node)) setContextMenu(null) }
    const onEsc = (e: KeyboardEvent)=>{ if(e.key==='Escape') setContextMenu(null) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onEsc)
    return ()=>{ document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc)}
  },[contextMenu])

  // close canvas context menu on outside click / esc
  useEffect(()=>{
    if(!canvasContextMenu) return
    const onDown = (e: MouseEvent)=>{ if(canvasContextMenuRef.current && !canvasContextMenuRef.current.contains(e.target as unknown as globalThis.Node)) setCanvasContextMenu(null) }
    const onEsc = (e: KeyboardEvent)=>{ if(e.key==='Escape') setCanvasContextMenu(null) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onEsc)
    return ()=>{ document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc)}
  },[canvasContextMenu])

  // close connect-create menu on outside click / esc
  useEffect(()=>{
    if(!connectCreateMenu) return
    const onDown = (e: MouseEvent)=>{ if(connectCreateMenuRef.current && !connectCreateMenuRef.current.contains(e.target as unknown as globalThis.Node)) setConnectCreateMenu(null) }
    const onEsc = (e: KeyboardEvent)=>{ if(e.key==='Escape') setConnectCreateMenu(null) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onEsc)
    return ()=>{ document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc)}
  },[connectCreateMenu])

  // close export modal on esc
  useEffect(()=>{
    if(!exportModal) return
    const onEsc = (e: KeyboardEvent)=>{ if(e.key==='Escape') setExportModal(null) }
    document.addEventListener('keydown', onEsc)
    return ()=> document.removeEventListener('keydown', onEsc)
  },[exportModal])

  // close icon picker on esc
  useEffect(()=>{
    if(!iconPickerFor) return
    const onEsc = (e: KeyboardEvent)=>{ if(e.key==='Escape') setIconPickerFor(null) }
    document.addEventListener('keydown', onEsc)
    return ()=> document.removeEventListener('keydown', onEsc)
  },[iconPickerFor])

  // smart reposition context menus if they overflow viewport (ensure bottom visible, open upwards near bottom)
  useEffect(()=>{
    if(!contextMenu || !contextMenuRef.current) return
    const el = contextMenuRef.current
    const id = requestAnimationFrame(()=>{
      const rect = el.getBoundingClientRect()
      const m = 8
      let top = rect.top
      let left = rect.left
      if(rect.bottom > window.innerHeight - m){
        const above = contextMenu.y - rect.height - m
        const clamped = Math.max(m, window.innerHeight - rect.height - m)
        top = above >= m ? above : clamped
      }
      if(rect.right > window.innerWidth - m) left = Math.max(m, window.innerWidth - rect.width - m)
      if(top < m) top = m
      if(left < m) left = m
      if(top !== rect.top) el.style.top = top + 'px'
      if(left !== rect.left) el.style.left = left + 'px'
    })
    return ()=> cancelAnimationFrame(id)
  },[contextMenu])
  useEffect(()=>{
    if(!canvasContextMenu || !canvasContextMenuRef.current) return
    const el = canvasContextMenuRef.current
    const id = requestAnimationFrame(()=>{
      const rect = el.getBoundingClientRect()
      const m = 8
      if(rect.bottom > window.innerHeight - m){
        const above = canvasContextMenu.y - rect.height - m
        const clamped = Math.max(m, window.innerHeight - rect.height - m)
        el.style.top = (above >= m ? above : clamped) + 'px'
      }
      if(rect.right > window.innerWidth - m) el.style.left = Math.max(m, window.innerWidth - rect.width - m) + 'px'
      const nr = el.getBoundingClientRect()
      if(nr.top < m) el.style.top = m + 'px'
      if(nr.left < m) el.style.left = m + 'px'
    })
    return ()=> cancelAnimationFrame(id)
  },[canvasContextMenu])
  useEffect(()=>{
    if(!connectCreateMenu || !connectCreateMenuRef.current) return
    const el = connectCreateMenuRef.current
    const id = requestAnimationFrame(()=>{
      const rect = el.getBoundingClientRect()
      const m = 8
      if(rect.bottom > window.innerHeight - m){
        const above = connectCreateMenu.y - rect.height - m
        const clamped = Math.max(m, window.innerHeight - rect.height - m)
        el.style.top = (above >= m ? above : clamped) + 'px'
      }
      if(rect.right > window.innerWidth - m) el.style.left = Math.max(m, window.innerWidth - rect.width - m) + 'px'
      const nr = el.getBoundingClientRect()
      if(nr.top < m) el.style.top = m + 'px'
      if(nr.left < m) el.style.left = m + 'px'
    })
    return ()=> cancelAnimationFrame(id)
  },[connectCreateMenu])

  // Escape deselects nodes/groups/edges/connect mode (when no modal/menu/editing is active)
  useEffect(()=>{
    const onKeyDown = (e: KeyboardEvent)=>{
      if(e.key !== 'Escape') return
      // don't interfere when typing in input/textarea/select/contenteditable
      const ae = document.activeElement as HTMLElement | null
      const tag = ae?.tagName?.toLowerCase()
      const isInput = tag==='input' || tag==='textarea' || tag==='select' || !!ae?.isContentEditable
      if(isInput) return
      const target = e.target as HTMLElement | null
      if(target && (target.tagName==='INPUT' || target.tagName==='TEXTAREA' || target.tagName==='SELECT' || !!(target as any).isContentEditable)) return
      // priority: let modals/menus/editing close first
      if(exportModal) return
      if(contextMenu) return
      if(canvasContextMenu) return
      if(connectCreateMenu) return
      if(activeMenu) return
      if(editingNodeId) return
      const hasSelection = selectedIds.length>0 || selectedGroupIds.length>0 || selectedEdge!==null || connectFrom!==null
      if(!hasSelection) return
      e.preventDefault()
      setSelectedIds([])
      setSelectedGroupIds([])
      setSelectedEdge(null)
      if(connectFrom) setConnectFrom(null)
      setContextMenu(null)
      setCanvasContextMenu(null)
      setConnectCreateMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return ()=> document.removeEventListener('keydown', onKeyDown)
  },[selectedIds, selectedGroupIds, selectedEdge, connectFrom, exportModal, contextMenu, canvasContextMenu, connectCreateMenu, activeMenu, editingNodeId])

  // focus inline label editor when opened
  useEffect(()=>{
    if(editingNodeId && editInputRef.current){
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  },[editingNodeId])

  // ── localStorage persistence (autosave) — disabled in hash viewer mode ──
  const hydratedRef = useRef(false)
  // load on mount — skip localStorage if #viewer= or #editor= present (use hash diagram instead)
  useEffect(()=>{
    if(getHashMode()){ hydratedRef.current = true; return }
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) { hydratedRef.current = true; return }
      const data = JSON.parse(raw)
      const savedNodes: Node[] = data?.nodes ?? data?.diagram?.nodes ?? []
      const savedEdges: Edge[] = data?.edges ?? data?.diagram?.edges ?? []
      const savedGroups: Group[] = data?.groups ?? data?.diagram?.groups ?? []
      if(Array.isArray(savedNodes)){
        const validNodes = savedNodes.filter(n=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
        const validEdges = Array.isArray(savedEdges) ? savedEdges.filter(e=> e && typeof e.from==='string' && typeof e.to==='string') : []
        const validGroups = Array.isArray(savedGroups) ? (savedGroups as any).filter((g:any)=> g && typeof g.id==='string' && typeof g.x==='number' && typeof g.y==='number') as Group[] : []
        // Restore even if empty — empty canvas should stay empty on refresh
        setNodes(validNodes as Node[])
        setEdges(validEdges as Edge[])
        setGroups(validGroups)
        if(validGroups.length && !validNodes.length) setSelectedGroupIds([(validGroups as any)[0].id])
        else if(validNodes.length) { setSelectedIds(validNodes[0] ? [validNodes[0].id] : []); setSelectedGroupIds([]) }
        else { setSelectedIds([]); setSelectedGroupIds([]) }
        setSelectedEdge(null)
        if(validNodes.length){
          setTimeout(()=>{ setToast(`Restored saved design • ${validNodes.length} nodes`); setTimeout(()=> setToast(null),2500)}, 300)
        }
        if(data?.viewport?.pan && typeof data.viewport.pan.x==='number') setPan(data.viewport.pan)
        if(typeof data?.viewport?.zoom==='number') setZoom(Math.min(2, Math.max(0.3, data.viewport.zoom)))
      }
    }catch{}
    hydratedRef.current = true
  },[])
  // save on change (debounced 400ms) — skip only for read-only viewer, allow saves for #editor=
  useEffect(()=>{
    if(getHashMode()?.mode==='viewer') return
    if(!hydratedRef.current) return
    const id = setTimeout(()=>{
      try{
        const payload = JSON.stringify({ version:1, createdAt: new Date().toISOString(), app:"anigram", nodes, edges, groups, viewport:{zoom, pan}})
        localStorage.setItem(STORAGE_KEY, payload)
      }catch{}
    },400)
    return ()=> clearTimeout(id)
  },[nodes, edges, groups, zoom, pan])

  // delete selected with Delete / Backspace (when not typing in an input)
  useEffect(()=>{
    const onKeyDown = (e: KeyboardEvent)=>{
      if(e.key !== 'Delete' && e.key !== 'Backspace') return
      // don't delete while typing in an input/textarea/select/contenteditable
      const ae = document.activeElement as HTMLElement | null
      const tag = ae?.tagName?.toLowerCase()
      const isInput = tag==='input' || tag==='textarea' || tag==='select' || !!ae?.isContentEditable
      if(isInput) return
      const target = e.target as HTMLElement | null
      if(target && (target.tagName==='INPUT' || target.tagName==='TEXTAREA' || target.tagName==='SELECT' || !!target.isContentEditable)) return
      // also ignore if export modal is open (let Esc handle it)
      if(exportModal) return
      if(selectedIds.length || selectedGroupIds.length || selectedEdge){
        e.preventDefault()
        // inline delete logic to avoid stale closure
        if(selectedGroupIds.length){
          const gToDelete = new Set(selectedGroupIds)
          setGroups(gs=> gs.filter(g=> !gToDelete.has(g.id)))
          setNodes(ns=> ns.map(n=> n.groupId && gToDelete.has(n.groupId) ? {...n, groupId: undefined} : n))
          setEdges(es=> es.filter(edge=> !gToDelete.has(edge.from) && !gToDelete.has(edge.to)))
          setSelectedGroupIds([])
          if(selectedIds.length){
            const toDelete = new Set(selectedIds)
            setNodes(ns=> ns.filter(n=> !toDelete.has(n.id)))
            setEdges(es=> es.filter(edge=> !toDelete.has(edge.from) && !toDelete.has(edge.to)))
            setSelectedIds([])
          }
          setToast(selectedGroupIds.length>1 ? `Deleted ${selectedGroupIds.length} groups` : 'Deleted group')
          setTimeout(()=>setToast(null),1500)
          return
        }
        if(selectedIds.length){
          const toDelete = new Set(selectedIds)
          setNodes(ns=> ns.filter(n=> !toDelete.has(n.id)))
          setEdges(es=> es.filter(edge=> !toDelete.has(edge.from) && !toDelete.has(edge.to)))
          setSelectedIds([])
          setToast(selectedIds.length>1 ? `Deleted ${selectedIds.length} nodes` : 'Deleted node')
          setTimeout(()=>setToast(null),1500)
          return
        }
        if(selectedEdge){
          setEdges(es=> es.filter(edge=> edge.id!==selectedEdge))
          setSelectedEdge(null)
          setToast('Deleted connection')
          setTimeout(()=>setToast(null),1500)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return ()=> window.removeEventListener('keydown', onKeyDown)
  },[selectedIds, selectedGroupIds, selectedEdge, exportModal])

  // keybindings: ctrl+c copy, ctrl+x cut, ctrl+v paste, ctrl+d duplicate, ctrl+a select all, ctrl+g group (hidden, no UI hint)
  useEffect(()=>{
    const onKeyDown = (e: KeyboardEvent)=>{
      const isMod = e.ctrlKey || (e as any).metaKey
      if(!isMod) return
      const key = e.key.toLowerCase()
      if(!['c','x','v','d','a','g'].includes(key)) return
      const ae = document.activeElement as HTMLElement | null
      const tag = ae?.tagName?.toLowerCase()
      const isInput = tag==='input' || tag==='textarea' || tag==='select' || !!ae?.isContentEditable
      if(isInput) return
      const target = e.target as HTMLElement | null
      if(target && (target.tagName==='INPUT' || target.tagName==='TEXTAREA' || target.tagName==='SELECT' || !!(target as any).isContentEditable)) return
      if(exportModal) return
      if(key==='c'){
        if(!selectedIds.length && !selectedGroupIds.length) return
        e.preventDefault()
        if(selectedIds.length){
          clipboardNodesRef.current = nodes.filter(n=> selectedIds.includes(n.id)).map(n=> ({...n}))
        } else {
          clipboardNodesRef.current = null
        }
        if(selectedGroupIds.length){
          clipboardGroupsRef.current = groups.filter(g=> selectedGroupIds.includes(g.id)).map(g=> ({...g}))
        } else {
          clipboardGroupsRef.current = null
        }
        pasteOffsetRef.current = 0
        const count = selectedIds.length + selectedGroupIds.length
        setToast(`Copied ${count} ${count===1?'item':'items'}`)
        setTimeout(()=>setToast(null),1200)
      } else if(key==='v'){
        const hasNodes = !!(clipboardNodesRef.current && clipboardNodesRef.current.length)
        const hasGroups = !!(clipboardGroupsRef.current && clipboardGroupsRef.current.length)
        if(!hasNodes && !hasGroups) return
        e.preventDefault()
        const offset = 24 + pasteOffsetRef.current * 16
        pasteOffsetRef.current += 1
        const oldGroupIdToNew = new Map<string,string>()
        const newGroups: Group[] = []
        if(hasGroups){
          clipboardGroupsRef.current!.forEach(g=>{
            const newId = uid('g')
            oldGroupIdToNew.set(g.id, newId)
            newGroups.push({...g, id:newId, x:g.x+offset, y:g.y+offset})
          })
        }
        const newNodes: Node[] = []
        if(hasNodes){
          clipboardNodesRef.current!.forEach(n=>{
            const newId = uid('n')
            let newGroupId = n.groupId
            if(n.groupId){
              if(oldGroupIdToNew.has(n.groupId)) newGroupId = oldGroupIdToNew.get(n.groupId)!
              else newGroupId = undefined
            }
            newNodes.push({...n, id:newId, x:n.x+offset, y:n.y+offset, groupId: newGroupId})
          })
        }
        if(newGroups.length) setGroups(gs=> [...gs, ...newGroups])
        if(newNodes.length) setNodes(ns=> [...ns, ...newNodes])
        if(newGroups.length) setSelectedGroupIds(newGroups.map(g=>g.id))
        else if(selectedGroupIds.length && !hasGroups) setSelectedGroupIds([])
        if(newNodes.length) setSelectedIds(newNodes.map(n=>n.id))
        else if(hasGroups && !hasNodes) setSelectedIds([])
        setSelectedEdge(null)
        newNodes.forEach(n=>{
          if(n.image && !imageCacheRef.current.has(n.image)){
            const img=new Image(); img.src=n.image; imageCacheRef.current.set(n.image, img)
          }
        })
        const total = newGroups.length + newNodes.length
        setToast(`Pasted ${total} ${total===1?'item':'items'}`)
        setTimeout(()=>setToast(null),1200)
      } else if(key==='d'){
        if(!selectedIds.length && !selectedGroupIds.length) return
        e.preventDefault()
        const offset = 24
        const groupIdMap = new Map<string,string>()
        const newGroups: Group[] = []
        if(selectedGroupIds.length){
          selectedGroupIds.forEach(gid=>{
            const g = groups.find(gr=> gr.id===gid)
            if(!g) return
            const newId = uid('g')
            groupIdMap.set(gid, newId)
            newGroups.push({...g, id:newId, x:g.x+offset, y:g.y+offset})
          })
        }
        const newNodes: Node[] = []
        if(selectedIds.length){
          selectedIds.forEach(nid=>{
            const n = nodes.find(nn=> nn.id===nid)
            if(!n) return
            const newId = uid('n')
            let newGroupId: string|undefined = n.groupId
            if(n.groupId && groupIdMap.has(n.groupId)) newGroupId = groupIdMap.get(n.groupId)!
            newNodes.push({...n, id:newId, x:n.x+offset, y:n.y+offset, groupId: newGroupId})
          })
        }
        if(newGroups.length) setGroups(gs=> [...gs, ...newGroups])
        if(newNodes.length) setNodes(ns=> [...ns, ...newNodes])
        if(newGroups.length) setSelectedGroupIds(newGroups.map(g=>g.id))
        else if(selectedGroupIds.length) setSelectedGroupIds([])
        if(newNodes.length) setSelectedIds(newNodes.map(n=>n.id))
        else if(selectedIds.length && !newNodes.length) setSelectedIds([])
        setSelectedEdge(null)
        newNodes.forEach(n=>{
          if(n.image && !imageCacheRef.current.has(n.image)){
            const img=new Image(); img.src=n.image; imageCacheRef.current.set(n.image, img)
          }
        })
        const total = newGroups.length + newNodes.length
        setToast(total>1?`Duplicated ${total} items`:'Duplicated')
        setTimeout(()=>setToast(null),1200)
      } else if(key==='x'){
        // cut: copy selected nodes/groups to clipboard then delete them (like ctrl+c + delete)
        const hasNodes = selectedIds.length>0
        const hasGroups = selectedGroupIds.length>0
        const hasEdge = !!selectedEdge && !hasNodes && !hasGroups
        if(!hasNodes && !hasGroups && !hasEdge) return
        e.preventDefault()
        if(hasEdge){
          setEdges(es=> es.filter(edge=> edge.id!==selectedEdge))
          setSelectedEdge(null)
          setToast('Cut connection')
          setTimeout(()=>setToast(null),1200)
          return
        }
        // copy to internal clipboard (so paste can restore)
        if(hasNodes){
          clipboardNodesRef.current = nodes.filter(n=> selectedIds.includes(n.id)).map(n=> ({...n}))
        } else {
          clipboardNodesRef.current = null
        }
        if(hasGroups){
          clipboardGroupsRef.current = groups.filter(g=> selectedGroupIds.includes(g.id)).map(g=> ({...g}))
        } else {
          clipboardGroupsRef.current = null
        }
        pasteOffsetRef.current = 0
        const count = selectedIds.length + selectedGroupIds.length
        // delete: mirror deleteSelected logic but inline to avoid stale closure
        if(hasGroups){
          const gToDelete = new Set(selectedGroupIds)
          setGroups(gs=> gs.filter(g=> !gToDelete.has(g.id)))
          setNodes(ns=> ns.map(n=> n.groupId && gToDelete.has(n.groupId) ? {...n, groupId: undefined} : n))
          setEdges(es=> es.filter(edge=> !gToDelete.has(edge.from) && !gToDelete.has(edge.to)))
          setSelectedGroupIds([])
        }
        if(hasNodes){
          const toDelete = new Set(selectedIds)
          setNodes(ns=> ns.filter(n=> !toDelete.has(n.id)))
          setEdges(es=> es.filter(edge=> !toDelete.has(edge.from) && !toDelete.has(edge.to)))
          setSelectedIds([])
        }
        // if both groups and nodes were selected, groups already cleared; nodes already cleared
        setSelectedEdge(null)
        setToast(`Cut ${count} ${count===1?'item':'items'}`)
        setTimeout(()=>setToast(null),1200)
      } else if(key==='a'){
        e.preventDefault()
        if(!nodes.length) return
        setSelectedIds(nodes.map(n=>n.id))
        setSelectedGroupIds([])
        setSelectedEdge(null)
        setToast(`Selected ${nodes.length} nodes`)
        setTimeout(()=>setToast(null),1000)
      } else if(key==='g'){
        if(!selectedIds.length) return
        e.preventDefault()
        const selNodes = nodes.filter(n=> selectedIds.includes(n.id))
        if(!selNodes.length) return
        const minX=Math.min(...selNodes.map(n=>n.x)), minY=Math.min(...selNodes.map(n=>n.y))
        const maxX=Math.max(...selNodes.map(n=>n.x+n.w)), maxY=Math.max(...selNodes.map(n=>n.y+n.h))
        const pad=20, header=32
        const g: Group = { id: uid('g'), x: minX-pad, y: minY-pad-header, w: (maxX-minX)+pad*2, h: (maxY-minY)+pad*2+header, label:'Group', color:'#ffffff' }
        setGroups(v=>[...v,g])
        setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, groupId:g.id} : n))
        setSelectedGroupIds([g.id]); setSelectedIds([]); setSelectedEdge(null)
        setToast(`Grouped ${selectedIds.length} nodes`); setTimeout(()=>setToast(null),2000)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return ()=> window.removeEventListener('keydown', onKeyDown)
  },[nodes, groups, selectedIds, selectedGroupIds, selectedEdge, exportModal])

  // mouse handlers
  const svgPoint = (e: React.MouseEvent)=>{
    const svg = svgRef.current!
    const rect = svg.getBoundingClientRect()
    const x = (e.clientX - rect.left - pan.x) / zoom
    const y = (e.clientY - rect.top - pan.y) / zoom
    return {x,y}
  }

  const onMouseDownNode = (e:React.MouseEvent, node:Node)=>{
    // right-click should open context menu, not start dragging
    if(e.button !== 0) return
    if(connectFrom){
      if(connectFrom !== node.id){
        const nid = uid('e')
        setEdges(ed=> [...ed, { id: nid, from: connectFrom, to: node.id, style:'animated', animated:true, speed:1 }])
        setSelectedEdge(nid)
        setSelectedIds([])
        setSelectedGroupIds([])
      }
      setConnectFrom(null)
      e.stopPropagation()
      return
    }
    if(true){
      const isShift = (e as any).shiftKey || (e as any).metaKey
      let newSelected: string[]
      if(isShift){
        if(selectedIds.includes(node.id)){
          newSelected = selectedIds.filter(id=>id!==node.id)
        } else {
          newSelected = [...selectedIds, node.id]
        }
        setSelectedIds(newSelected)
        setSelectedEdge(null)
        if(!newSelected.includes(node.id)){
          e.stopPropagation()
          return
        }
      } else {
        if(selectedIds.includes(node.id)){
          newSelected = selectedIds
        } else {
          newSelected = [node.id]
          setSelectedIds(newSelected)
          setSelectedEdge(null)
        }
      }
      setIsDragging(node.id)
      const p = svgPoint(e)
      setDragOffset({x: p.x - node.x, y: p.y - node.y})
      setDragStartPos(p)
      const init = new Map<string,{x:number,y:number}>()
      newSelected.forEach(id=>{
        const nn = nodes.find(nn=>nn.id===id)
        if(nn) init.set(id, {x:nn.x, y:nn.y})
      })
      setDragInitialPositions(init)
      e.stopPropagation()
    }
  }

  const onMouseMove = (e:React.MouseEvent)=>{
    const p = svgPoint(e)
    if(draggingEndpoint){
      const edge = edges.find(ed=> ed.id===draggingEndpoint.edgeId)
      if(!edge){ setDraggingEndpoint(null); return }
      const nodeId = draggingEndpoint.end==='from' ? edge.from : edge.to
      const node = (nodes.find(n=>n.id===nodeId) || groups.find(g=>g.id===nodeId)) as any
      if(!node) return
      const cx=node.x+node.w/2, cy=node.y+node.h/2
      const angle=Math.atan2(p.y-cy, p.x-cx)
      setEdges(es=> es.map(ed=> ed.id===draggingEndpoint.edgeId ? {...ed, [draggingEndpoint.end==='from'?'fromAngle':'toAngle']: angle} as any : ed))
      return
    }
    if(isResizingNode && resizeHandle && resizeStart && resizeInitialRect){
      const dx = p.x - resizeStart.x
      const dy = p.y - resizeStart.y
      let newX = resizeInitialRect.x
      let newY = resizeInitialRect.y
      let newW = resizeInitialRect.w
      let newH = resizeInitialRect.h
      if(resizeHandle.includes('l')){ newX = resizeInitialRect.x + dx; newW = resizeInitialRect.w - dx }
      if(resizeHandle.includes('r')){ newW = resizeInitialRect.w + dx }
      if(resizeHandle.includes('t')){ newY = resizeInitialRect.y + dy; newH = resizeInitialRect.h - dy }
      if(resizeHandle.includes('b')){ newH = resizeInitialRect.h + dy }
      const resizingNodeObj = nodes.find(n=> n.id===isResizingNode)
      const isIcon = resizingNodeObj?.type==='icon'
      if(isIcon){
        const minSize = 24
        let size = Math.max(newW, newH)
        size = Math.max(minSize, size)
        if(resizeHandle.includes('l')) newX = resizeInitialRect.x + resizeInitialRect.w - size
        if(resizeHandle.includes('t')) newY = resizeInitialRect.y + resizeInitialRect.h - size
        newW = size; newH = size
        if(size===minSize){
          if(resizeHandle.includes('l')) newX = resizeInitialRect.x + resizeInitialRect.w - minSize
          if(resizeHandle.includes('t')) newY = resizeInitialRect.y + resizeInitialRect.h - minSize
        }
      } else {
        const minW = 40, minH = 30
        newW = Math.max(minW, newW); newH = Math.max(minH, newH)
        if(newW===minW && resizeHandle.includes('l')) newX = resizeInitialRect.x + resizeInitialRect.w - minW
        if(newH===minH && resizeHandle.includes('t')) newY = resizeInitialRect.y + resizeInitialRect.h - minH
      }
      newX = snap(newX); newY = snap(newY); newW = snap(newW); newH = snap(newH)
      setNodes(ns=> ns.map(n=> n.id===isResizingNode ? {...n, x:newX, y:newY, w:newW, h:newH} : n))
      return
    }
    if(isResizingGroup && resizeHandle && resizeStart && resizeInitialRect){
      const dx = p.x - resizeStart.x
      const dy = p.y - resizeStart.y
      let newX = resizeInitialRect.x
      let newY = resizeInitialRect.y
      let newW = resizeInitialRect.w
      let newH = resizeInitialRect.h
      if(resizeHandle.includes('l')){ newX = resizeInitialRect.x + dx; newW = resizeInitialRect.w - dx }
      if(resizeHandle.includes('r')){ newW = resizeInitialRect.w + dx }
      if(resizeHandle.includes('t')){ newY = resizeInitialRect.y + dy; newH = resizeInitialRect.h - dy }
      if(resizeHandle.includes('b')){ newH = resizeInitialRect.h + dy }
      newW = Math.max(80, newW); newH = Math.max(60, newH)
      if(newW===80 && resizeHandle.includes('l')) newX = resizeInitialRect.x + resizeInitialRect.w - 80
      if(newH===60 && resizeHandle.includes('t')) newY = resizeInitialRect.y + resizeInitialRect.h - 60
      newX = snap(newX); newY = snap(newY); newW = snap(newW); newH = snap(newH)
      setGroups(gs=> gs.map(g=> g.id===isResizingGroup ? {...g, x:newX, y:newY, w:newW, h:newH} : g))
      return
    }
    if(isSelecting && selectionBox){
      setSelectionBox(sb=> sb ? {...sb, x1:p.x, y1:p.y} : null)
      return
    }
    if(isDraggingGroup){
      if(dragGroupStartPos && dragGroupInitialPositions.size){
        const dx = p.x - dragGroupStartPos.x
        const dy = p.y - dragGroupStartPos.y
        setGroups(gs=> gs.map(g=> {
          const init = dragGroupInitialPositions.get(g.id)
          if(init) return {...g, x: snap(init.x + dx), y: snap(init.y + dy)}
          return g
        }))
        if(dragGroupMemberInitials.size){
          setNodes(ns=> ns.map(n=> {
            const init = dragGroupMemberInitials.get(n.id)
            if(init) return {...n, x: snap(init.x + dx), y: snap(init.y + dy)}
            return n
          }))
        }
      } else {
        setGroups(gs=> gs.map(g=> g.id===isDraggingGroup ? {...g, x: snap(p.x - dragGroupOffset.x), y: snap(p.y - dragGroupOffset.y)} : g))
      }
      return
    }
    if(isDragging){
      if(selectedIds.includes(isDragging) && selectedIds.length>1 && dragStartPos && dragInitialPositions.size){
        const dx = p.x - dragStartPos.x
        const dy = p.y - dragStartPos.y
        setNodes(ns=> ns.map(n=> {
          const init = dragInitialPositions.get(n.id)
          if(init) return {...n, x: snap(init.x + dx), y: snap(init.y + dy)}
          return n
        }))
      } else {
        setNodes(ns=> ns.map(n=> n.id===isDragging ? {...n, x: snap(p.x - dragOffset.x), y: snap(p.y - dragOffset.y) } : n))
      }
    } else if(isPanning){
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y })
    }
  }
  // helper: check if node center is inside group bounds (with 6px inset and header 28px inclusive)
  const isNodeInsideGroup = (node: Node, group: Group)=>{
    const cx = node.x + node.w/2
    const cy = node.y + node.h/2
    return cx >= group.x + 6 && cx <= group.x + group.w - 6 && cy >= group.y + 6 && cy <= group.y + group.h - 6
  }

  const onMouseUp = (e?:React.MouseEvent)=>{
    // auto-ungroup: if grouped nodes were dragged/resized outside their group box, clear groupId
    // also auto-group: if ungrouped dragged/resized nodes landed inside another group, assign to it
    const wasDraggingNode = !!isDragging || !!isResizingNode
    const activeNodeId = isDragging || isResizingNode
    if(wasDraggingNode){
      // use functional update to guarantee latest positions
      let ungroupedCount = 0
      let groupedCount = 0
      setNodes(prevNodes => {
        // capture latest groups (closure) - groups haven't changed during drag
        const curGroups = groups
        let nextNodes = prevNodes.map(n=>{
          if(!n.groupId){
            // try auto-group: is this dragged/resized node now inside any group?
            // only for nodes that were being dragged/resized
            const isDragged = (selectedIds.includes(n.id) && selectedIds.length>0) || n.id===activeNodeId
            if(!isDragged) return n
            const target = curGroups.find(g=> isNodeInsideGroup(n,g))
            if(target){
              groupedCount++
              return {...n, groupId: target.id}
            }
            return n
          }
          const g = curGroups.find(gr=> gr.id===n.groupId)
          if(!g) return {...n, groupId: undefined}
          // if node is still inside its group, keep it
          if(isNodeInsideGroup(n,g)) return n
          // outside -> ungroup. But if it landed inside a *different* group, reassign
          const other = curGroups.find(og=> og.id!==g.id && isNodeInsideGroup(n,og))
          if(other){
            groupedCount++
            return {...n, groupId: other.id}
          }
          ungroupedCount++
          return {...n, groupId: undefined}
        })
        // toast after render
        if(ungroupedCount>0 || groupedCount>0){
          setTimeout(()=>{
            if(ungroupedCount && groupedCount) setToast(`${ungroupedCount} left group • ${groupedCount} joined group`)
            else if(ungroupedCount) setToast(ungroupedCount===1? 'Removed from group' : `Removed ${ungroupedCount} nodes from group`)
            else if(groupedCount) setToast(groupedCount===1? 'Added to group' : `Added ${groupedCount} nodes to group`)
            setTimeout(()=> setToast(null),1800)
          },0)
        }
        return nextNodes
      })
    }
    if(isSelecting && selectionBox){
      const xMin = Math.min(selectionBox.x0, selectionBox.x1)
      const xMax = Math.max(selectionBox.x0, selectionBox.x1)
      const yMin = Math.min(selectionBox.y0, selectionBox.y1)
      const yMax = Math.max(selectionBox.y0, selectionBox.y1)
      const isClick = Math.abs(selectionBox.x1 - selectionBox.x0) < 4 && Math.abs(selectionBox.y1 - selectionBox.y0) < 4
      if(isClick){
        if(!(e as any)?.shiftKey && !(e as any)?.metaKey){
          setSelectedIds([])
          setSelectedGroupIds([])
          setSelectedEdge(null)
        }
      } else {
        const boxed = nodes.filter(n=>{
          const nx0 = n.x, nx1 = n.x + n.w, ny0 = n.y, ny1 = n.y + n.h
          const cx = n.x + n.w/2, cy = n.y + n.h/2
          return (nx1 >= xMin && nx0 <= xMax && ny1 >= yMin && ny0 <= yMax) || (cx>=xMin && cx<=xMax && cy>=yMin && cy<=yMax)
        }).map(n=>n.id)
        const boxedGroups = groups.filter(g=>{
          const gx0=g.x, gx1=g.x+g.w, gy0=g.y, gy1=g.y+g.h
          const cx=g.x+g.w/2, cy=g.y+g.h/2
          return (gx1 >= xMin && gx0 <= xMax && gy1 >= yMin && gy0 <= yMax) || (cx>=xMin && cx<=xMax && cy>=yMin && cy<=yMax)
        }).map(g=>g.id)
        if((e as any)?.shiftKey || (e as any)?.metaKey){
          setSelectedIds(prev=> Array.from(new Set([...prev, ...boxed])))
          setSelectedGroupIds(prev=> Array.from(new Set([...prev, ...boxedGroups])))
        } else {
          setSelectedIds(boxed)
          setSelectedGroupIds(boxedGroups)
        }
        if(boxed.length || boxedGroups.length) setSelectedEdge(null)
      }
      setIsSelecting(false)
      setSelectionBox(null)
    }
    setIsDragging(null)
    setIsDraggingGroup(null)
    setIsResizingGroup(null)
    setIsResizingNode(null)
    setDraggingEndpoint(null)
    setResizeHandle(null)
    setResizeStart(null)
    setResizeInitialRect(null)
    setIsPanning(false)
    setDragStartPos(null)
    setDragGroupStartPos(null)
  }

  const onSvgMouseDown = (e:React.MouseEvent)=>{
    // ignore right-click (context menu)
    if(e.button === 2) return
    const target = e.target as Element
    if(target === svgRef.current || target.classList.contains('grid-bg')){
      if(e.button===1 || (e.altKey)){
        setIsPanning(true)
        setPanStart({x: e.clientX - pan.x, y: e.clientY - pan.y})
      } else {
        const p = svgPoint(e)
        // if connecting, clicking blank space opens a "create & connect" node menu
        if(connectFrom){
          setConnectCreateMenu({x:e.clientX, y:e.clientY, wx:p.x, wy:p.y})
          e.stopPropagation()
          return
        }
        setIsSelecting(true)
        setSelectionBox({x0:p.x, y0:p.y, x1:p.x, y1:p.y})
        setSelectedEdge(null)
      }
    }
  }

  const addNode = (type:NodeType)=>{
    const def = NODE_DEFAULTS[type]
    const viewportCenter = { x: (400 - pan.x)/zoom, y: (250 - pan.y)/zoom }
    const rx = snap(viewportCenter.x + (Math.random()*80-40))
    const ry = snap(viewportCenter.y + (Math.random()*60-30))
    const n: Node = { id: uid('n'), x: rx, y: ry, w: def.w, h: def.h, type, label: def.label, color: def.color, imageFit: 'cover', ...(type==='icon' ? {icon:'star'} as any : {}), ...(type==='text' ? {textBorder:'none'} as any : {}) }
    setNodes(v=>[...v,n])
    setSelectedIds([n.id]); setSelectedEdge(null)
  }

  const addNodeAt = (type:NodeType, worldX:number, worldY:number)=>{
    const def = NODE_DEFAULTS[type]
    const sx = snap(worldX - def.w/2)
    const sy = snap(worldY - def.h/2)
    const n: Node = { id: uid('n'), x: sx, y: sy, w: def.w, h: def.h, type, label: def.label, color: def.color, imageFit: 'cover', ...(type==='icon' ? {icon:'star'} as any : {}), ...(type==='text' ? {textBorder:'none'} as any : {}) }
    setNodes(v=>[...v,n])
    setSelectedIds([n.id]); setSelectedGroupIds([]); setSelectedEdge(null)
    setToast(`${def.label} added`); setTimeout(()=> setToast(null),1500)
  }
  void addNode

  const addImageNode = (dataUrl: string, pos?: {x:number,y:number}, fileName?: string)=>{
    const vp = pos ?? { x: (400 - pan.x)/zoom + (Math.random()*80-40), y: (250 - pan.y)/zoom + (Math.random()*60-30)}
    const sx = snap(vp.x)
    const sy = snap(vp.y)
    const n: Node = { id: uid('n'), x: sx, y: sy, w: 180, h: 120, type:'image', label: fileName ? fileName.replace(/\.[^.]+$/, '') : 'Image', color:'#ffffff', image: dataUrl, imageFit:'cover' }
    setNodes(v=>[...v,n])
    setSelectedIds([n.id]); setSelectedEdge(null)
    setToast('Image node added')
    setTimeout(()=> setToast(null), 2000)
    // preload into cache
    const img = new Image()
    img.src = dataUrl
    imageCacheRef.current.set(dataUrl, img)
  }

  const addGroup = (fromSelection?: boolean)=>{
    if(fromSelection && selectedIds.length){
      const selNodes = nodes.filter(n=> selectedIds.includes(n.id))
      if(!selNodes.length) return
      const minX=Math.min(...selNodes.map(n=>n.x)), minY=Math.min(...selNodes.map(n=>n.y))
      const maxX=Math.max(...selNodes.map(n=>n.x+n.w)), maxY=Math.max(...selNodes.map(n=>n.y+n.h))
      const pad=20, header=32
      const g: Group = { id: uid('g'), x: minX-pad, y: minY-pad-header, w: (maxX-minX)+pad*2, h: (maxY-minY)+pad*2+header, label:'Group', color:'#ffffff' }
      setGroups(v=>[...v,g])
      setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, groupId:g.id} : n))
      setSelectedGroupIds([g.id]); setSelectedIds([]); setSelectedEdge(null)
      setToast(`Grouped ${selectedIds.length} nodes`); setTimeout(()=>setToast(null),2000)
      return
    }
    const viewportCenter = { x: (400 - pan.x)/zoom, y: (250 - pan.y)/zoom }
    const g: Group = { id: uid('g'), x: viewportCenter.x - 170 + (Math.random()*40-20), y: viewportCenter.y - 110 + (Math.random()*40-20), w: 340, h: 220, label:'Group', color:'#ffffff' }
    setGroups(v=>[...v,g])
    setSelectedGroupIds([g.id]); setSelectedIds([]); setSelectedEdge(null)
  }

  const updateSelectedGroup = (patch: Partial<Group>)=>{
    if(!selectedGroupIds.length) return
    setGroups(gs=> gs.map(g=> selectedGroupIds.includes(g.id) ? {...g, ...patch} : g))
  }

  const ungroupSelected = ()=>{
    if(!selectedGroupIds.length && !selectedIds.length) return
    // if group selected, unbind its members
    if(selectedGroupIds.length){
      const toUngroup = new Set(selectedGroupIds)
      setNodes(ns=> ns.map(n=> n.groupId && toUngroup.has(n.groupId) ? {...n, groupId: undefined} : n))
      setGroups(gs=> gs.filter(g=> !toUngroup.has(g.id)))
      setSelectedGroupIds([])
      setToast('Ungrouped'); setTimeout(()=>setToast(null),1500)
      return
    }
    // if nodes selected that are grouped, remove them from group
    if(selectedIds.length){
      setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, groupId: undefined} : n))
      setToast('Removed from group'); setTimeout(()=>setToast(null),1500)
    }
  }

  const duplicateNode = (id:string)=>{
    const g = groups.find(gg=> gg.id===id)
    if(g){
      const newId = uid('g')
      const dup: Group = { ...g, id: newId, x: g.x + 24, y: g.y + 24 }
      setGroups(v=> [...v, dup])
      setSelectedGroupIds([newId]); setSelectedIds([]); setSelectedEdge(null)
      setToast('Duplicated group'); setTimeout(()=>setToast(null),1500)
      return
    }
    const n = nodes.find(nn=> nn.id===id)
    if(!n) return
    const newId = uid('n')
    const dup: Node = { ...n, id: newId, x: n.x + 24, y: n.y + 24 }
    setNodes(v=> [...v, dup])
    setSelectedIds([newId]); setSelectedGroupIds([]); setSelectedEdge(null)
    setToast('Duplicated node'); setTimeout(()=>setToast(null),1500)
  }

  const deleteNode = (id:string)=>{
    // handle both node and group
    const isGroup = groups.some(g=> g.id===id)
    if(isGroup){
      setGroups(gs=> gs.filter(g=> g.id!==id))
      setNodes(ns=> ns.map(n=> n.groupId===id ? {...n, groupId: undefined} : n))
      setEdges(es=> es.filter(ed=> ed.from!==id && ed.to!==id))
      setSelectedGroupIds(s=> s.filter(x=> x!==id))
      setToast('Deleted group'); setTimeout(()=>setToast(null),1500)
      return
    }
    setNodes(ns=> ns.filter(n=> n.id!==id))
    setEdges(es=> es.filter(ed=> ed.from!==id && ed.to!==id))
    setSelectedIds(s=> s.filter(x=> x!==id))
    setToast('Deleted node'); setTimeout(()=>setToast(null),1500)
  }

  const startEditing = (node: Node)=>{
    setEditingNodeId(node.id)
    setEditingValue(node.label)
    setSelectedIds([node.id])
    setSelectedGroupIds([])
    setSelectedEdge(null)
  }
  const commitEditing = ()=>{
    if(editingNodeId){
      const v = editingValue
      setNodes(ns=> ns.map(n=> n.id===editingNodeId ? {...n, label: v} : n))
    }
    setEditingNodeId(null)
  }
  const cancelEditing = ()=> setEditingNodeId(null)

  const handleContextConnect = (id:string)=>{
    setConnectFrom(id)
    setSelectedIds([]); setSelectedEdge(null); setSelectedGroupIds([])
    setContextMenu(null)
    setToast('Connecting from ' + (nodes.find(n=>n.id===id)?.label || id) + ' → pick target')
    setTimeout(()=>setToast(null),2500)
  }

  const createNodeAndConnect = (type:NodeType, worldX:number, worldY:number)=>{
    const def = NODE_DEFAULTS[type]
    const sx = snap(worldX - def.w/2)
    const sy = snap(worldY - def.h/2)
    const id = uid('n')
    const n: Node = { id, x: sx, y: sy, w: def.w, h: def.h, type, label: def.label, color: def.color, imageFit: 'cover', ...(type==='icon' ? {icon:'star'} as any : {}), ...(type==='text' ? {textBorder:'none'} as any : {}) }
    setNodes(v=>[...v,n])
    if(connectFrom && connectFrom !== id){
      const nid = uid('e')
      setEdges(ed=> [...ed, { id: nid, from: connectFrom, to: id, style:'animated', animated:true, speed:1 }])
      setSelectedEdge(nid)
    }
    setSelectedIds([id])
    setSelectedGroupIds([])
    setConnectFrom(null)
    setConnectCreateMenu(null)
    setToast(`${def.label} added & connected`); setTimeout(()=> setToast(null),1500)
  }

  const onMouseDownGroup = (e:React.MouseEvent, group:Group)=>{
    if(e.button !== 0) return
    if(connectFrom){
      if(connectFrom !== group.id){
        const nid = uid('e')
        setEdges(ed=> [...ed, { id: nid, from: connectFrom, to: group.id, style:'animated', animated:true, speed:1 }])
        setSelectedEdge(nid)
        setSelectedIds([])
        setSelectedGroupIds([])
      }
      setConnectFrom(null)
      e.stopPropagation(); return
    }
    if(true){
      const isShift = (e as any).shiftKey || (e as any).metaKey
      let newSelected: string[]
      if(isShift){
        if(selectedGroupIds.includes(group.id)) newSelected = selectedGroupIds.filter(id=>id!==group.id)
        else newSelected = [...selectedGroupIds, group.id]
        setSelectedGroupIds(newSelected); setSelectedIds([]); setSelectedEdge(null)
        if(!newSelected.includes(group.id)){ e.stopPropagation(); return }
      } else {
        if(selectedGroupIds.includes(group.id)) newSelected = selectedGroupIds
        else { newSelected = [group.id]; setSelectedGroupIds(newSelected); setSelectedIds([]); setSelectedEdge(null) }
      }
      setIsDraggingGroup(group.id)
      const p = svgPoint(e)
      setDragGroupOffset({x: p.x - group.x, y: p.y - group.y})
      setDragGroupStartPos(p)
      const init = new Map<string,{x:number,y:number}>()
      newSelected.forEach(id=>{ const g=groups.find(g=>g.id===id); if(g) init.set(id,{x:g.x,y:g.y}) })
      setDragGroupInitialPositions(init)
      const memberInit = new Map<string,{x:number,y:number}>()
      groups.filter(g=> newSelected.includes(g.id)).forEach(g=>{
        nodes.filter(n=> n.groupId===g.id).forEach(n=> memberInit.set(n.id,{x:n.x,y:n.y}))
      })
      setDragGroupMemberInitials(memberInit)
      e.stopPropagation()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const files = Array.from(e.target.files ?? [])
    if(!files.length) { setPendingImagePos(null); return }
    files.forEach(file=>{
      if(!file.type.startsWith('image/')) { setToast('Only images allowed'); setTimeout(()=>setToast(null),2000); return }
      const reader = new FileReader()
      reader.onload = ()=>{
        const dataUrl = String(reader.result)
        addImageNode(dataUrl, pendingImagePos ?? undefined, file.name)
        setPendingImagePos(null)
      }
      reader.readAsDataURL(file)
    })
    if(imageInputRef.current) imageInputRef.current.value=''
  }

  const handleImageDrop = (file: File, pos?: {x:number,y:number})=>{
    const reader = new FileReader()
    reader.onload = ()=>{
      addImageNode(String(reader.result), pos, file.name)
    }
    reader.readAsDataURL(file)
  }

  const updateSelectedNode = (patch: Partial<Node>)=>{
    if(!selectedIds.length) return
    setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, ...patch}: n))
  }
  const updateSelectedEdge = (patch: Partial<Edge>)=>{
    if(!selectedEdge) return
    setEdges(es=> es.map(edge=> edge.id===selectedEdge? {...edge, ...patch}: edge))
  }

  const deleteSelected = ()=>{
    if(selectedIds.length){
      const toDelete = new Set(selectedIds)
      setNodes(ns=> ns.filter(n=> !toDelete.has(n.id)))
      setEdges(es=> es.filter(edge=> !toDelete.has(edge.from) && !toDelete.has(edge.to)))
      setSelectedIds([])
    } else if(selectedEdge){
      setEdges(es=> es.filter(edge=> edge.id!==selectedEdge))
      setSelectedEdge(null)
    }
  }

  const handleCopy = ()=>{
    if(!selectedIds.length && !selectedGroupIds.length) return
    if(selectedIds.length){
      clipboardNodesRef.current = nodes.filter(n=> selectedIds.includes(n.id)).map(n=> ({...n}))
    } else clipboardNodesRef.current = null
    if(selectedGroupIds.length){
      clipboardGroupsRef.current = groups.filter(g=> selectedGroupIds.includes(g.id)).map(g=> ({...g}))
    } else clipboardGroupsRef.current = null
    pasteOffsetRef.current = 0
    const count = selectedIds.length + selectedGroupIds.length
    setToast(`Copied ${count} ${count===1?'item':'items'}`); setTimeout(()=>setToast(null),1200)
  }
  const handleCut = ()=>{
    const hasNodes = selectedIds.length>0
    const hasGroups = selectedGroupIds.length>0
    const hasEdge = !!selectedEdge && !hasNodes && !hasGroups
    if(!hasNodes && !hasGroups && !hasEdge) return
    if(hasEdge){
      setEdges(es=> es.filter(e=> e.id!==selectedEdge))
      setSelectedEdge(null)
      setToast('Cut connection'); setTimeout(()=>setToast(null),1200)
      return
    }
    if(hasNodes) clipboardNodesRef.current = nodes.filter(n=> selectedIds.includes(n.id)).map(n=> ({...n}))
    else clipboardNodesRef.current = null
    if(hasGroups) clipboardGroupsRef.current = groups.filter(g=> selectedGroupIds.includes(g.id)).map(g=> ({...g}))
    else clipboardGroupsRef.current = null
    pasteOffsetRef.current = 0
    const count = selectedIds.length + selectedGroupIds.length
    if(hasGroups){
      const gToDelete = new Set(selectedGroupIds)
      setGroups(gs=> gs.filter(g=> !gToDelete.has(g.id)))
      setNodes(ns=> ns.map(n=> n.groupId && gToDelete.has(n.groupId) ? {...n, groupId: undefined} : n))
      setEdges(es=> es.filter(e=> !gToDelete.has(e.from) && !gToDelete.has(e.to)))
      setSelectedGroupIds([])
    }
    if(hasNodes){
      const toDelete = new Set(selectedIds)
      setNodes(ns=> ns.filter(n=> !toDelete.has(n.id)))
      setEdges(es=> es.filter(e=> !toDelete.has(e.from) && !toDelete.has(e.to)))
      setSelectedIds([])
    }
    setSelectedEdge(null)
    setToast(`Cut ${count} ${count===1?'item':'items'}`); setTimeout(()=>setToast(null),1200)
  }
  const handlePaste = (wx?: number, wy?: number)=>{
    const hasNodes = !!(clipboardNodesRef.current && clipboardNodesRef.current.length)
    const hasGroups = !!(clipboardGroupsRef.current && clipboardGroupsRef.current.length)
    if(!hasNodes && !hasGroups) { setToast('Clipboard empty'); setTimeout(()=>setToast(null),1200); return }
    const atPos = typeof wx==='number' && typeof wy==='number'
    let newGroups: Group[] = []
    let newNodes: Node[] = []
    const oldGroupIdToNew = new Map<string,string>()
    if(atPos){
      // paste at click location — place bounding box min at wx,wy (with snap)
      const allX: number[] = []
      const allY: number[] = []
      if(hasGroups) clipboardGroupsRef.current!.forEach(g=>{ allX.push(g.x); allY.push(g.y) })
      if(hasNodes) clipboardNodesRef.current!.forEach(n=>{ allX.push(n.x); allY.push(n.y) })
      const minX = allX.length ? Math.min(...allX) : 0
      const minY = allY.length ? Math.min(...allY) : 0
      const baseX = snap((wx as number) - 10)
      const baseY = snap((wy as number) - 10)
      const dx = baseX - minX
      const dy = baseY - minY
      if(hasGroups){
        clipboardGroupsRef.current!.forEach(g=>{
          const newId = uid('g')
          oldGroupIdToNew.set(g.id, newId)
          newGroups.push({...g, id:newId, x: snap(g.x + dx), y: snap(g.y + dy)})
        })
      }
      if(hasNodes){
        clipboardNodesRef.current!.forEach(n=>{
          const newId = uid('n')
          let newGroupId = n.groupId
          if(newGroupId){
            if(oldGroupIdToNew.has(newGroupId)) newGroupId = oldGroupIdToNew.get(newGroupId)!
            else newGroupId = undefined
          }
          newNodes.push({...n, id:newId, x: snap(n.x + dx), y: snap(n.y + dy), groupId: newGroupId})
        })
      }
    } else {
      const offset = 24 + pasteOffsetRef.current * 16
      pasteOffsetRef.current += 1
      if(hasGroups){
        clipboardGroupsRef.current!.forEach(g=>{
          const newId = uid('g')
          oldGroupIdToNew.set(g.id, newId)
          newGroups.push({...g, id:newId, x: snap(g.x+offset), y: snap(g.y+offset)})
        })
      }
      if(hasNodes){
        clipboardNodesRef.current!.forEach(n=>{
          const newId = uid('n')
          let newGroupId = n.groupId
          if(n.groupId){
            if(oldGroupIdToNew.has(n.groupId)) newGroupId = oldGroupIdToNew.get(n.groupId)!
            else newGroupId = undefined
          }
          newNodes.push({...n, id:newId, x: snap(n.x+offset), y: snap(n.y+offset), groupId: newGroupId})
        })
      }
    }
    if(newGroups.length) setGroups(gs=> [...gs, ...newGroups])
    if(newNodes.length) setNodes(ns=> [...ns, ...newNodes])
    if(newGroups.length) setSelectedGroupIds(newGroups.map(g=>g.id))
    else if(selectedGroupIds.length && !hasGroups) setSelectedGroupIds([])
    if(newNodes.length) setSelectedIds(newNodes.map(n=>n.id))
    else if(hasGroups && !hasNodes) setSelectedIds([])
    setSelectedEdge(null)
    newNodes.forEach(n=>{ if(n.image && !imageCacheRef.current.has(n.image)){ const img=new Image(); img.src=n.image; imageCacheRef.current.set(n.image, img) } })
    const total = newGroups.length + newNodes.length
    setToast(`Pasted ${total} ${total===1?'item':'items'}`); setTimeout(()=>setToast(null),1200)
  }

  // export helpers
  const drawToCanvas = (ctx: CanvasRenderingContext2D, off=0, W=1200, H=800, bg='#fcfdff')=>{
    ctx.fillStyle = bg
    ctx.fillRect(0,0,W,H)
    // grid
    ctx.strokeStyle = '#e4e6ed'
    ctx.lineWidth = 1
    const grid=40
    ctx.beginPath()
    for(let x=0;x<W;x+=grid){ ctx.moveTo(x,0); ctx.lineTo(x,H)}
    for(let y=0;y<H;y+=grid){ ctx.moveTo(0,y); ctx.lineTo(W,y)}
    ctx.stroke()
    // groups — redesigned container (rx14, header 32, icon + count pill) — matches SVG
    groups.forEach(g=>{
      ctx.save()
      const isSel = selectedGroupIds.includes(g.id)
      ctx.shadowColor = 'rgba(15,23,42,0.08)'
      ctx.shadowBlur = isSel? 16:8
      ctx.shadowOffsetY = 2
      ctx.fillStyle = g.color || '#ffffff'
      ctx.strokeStyle = isSel ? '#7c5cff' : '#cbd5e1'
      ctx.lineWidth = isSel? 2:1.4
      // @ts-ignore
      ctx.setLineDash(isSel ? [] : [8,6])
      // @ts-ignore
      if((ctx as any).roundRect) (ctx as any).roundRect(g.x, g.y, g.w, g.h, 14)
      else ctx.rect(g.x,g.y,g.w,g.h)
      ctx.fill()
      ctx.stroke()
      ctx.setLineDash([])
      // header 32px
      ctx.fillStyle = isSel ? 'rgba(124,92,255,0.08)' : 'rgba(248,250,252,0.96)'
      ctx.beginPath()
      // @ts-ignore
      if((ctx as any).roundRect) (ctx as any).roundRect(g.x, g.y, g.w, 32, [14,14,0,0])
      else ctx.rect(g.x,g.y,g.w,32)
      ctx.fill()
      ctx.strokeStyle = isSel ? '#7c5cff' : 'rgba(226,232,240,0.9)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.shadowBlur=0
      // icon bg
      ctx.fillStyle = isSel ? '#7c5cff' : '#e2e8f0'
      // @ts-ignore
      if((ctx as any).roundRect) (ctx as any).roundRect(g.x+5, g.y+9, 14, 14, 3)
      else ctx.fillRect(g.x+5, g.y+9, 14, 14)
      ctx.fill()
      ctx.fillStyle = isSel ? 'white' : '#64748b'
      ctx.font = '700 8px Inter'
      ctx.textAlign='center'
      ctx.textBaseline='middle'
      ctx.fillText('◧', g.x+12, g.y+16)
      ctx.fillStyle = isSel ? '#7c5cff' : '#334155'
      ctx.font = '700 11px Inter'
      ctx.textAlign='left'
      ctx.fillText(g.label || 'Group', g.x+26, g.y+16)
      const cnt = nodes.filter(n=> n.groupId===g.id).length
      // count pill
      if(cnt>=0){
        ctx.fillStyle = cnt ? (isSel ? '#7c5cff' : '#f1f5f9') : '#f8fafc'
        ctx.strokeStyle = isSel ? '#7c5cff' : '#e2e8f0'
        ctx.lineWidth = 1
        // @ts-ignore
        if((ctx as any).roundRect) (ctx as any).roundRect(g.x+g.w-34, g.y+7, 22, 16, 8)
        else ctx.fillRect(g.x+g.w-34, g.y+7, 22, 16)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = isSel ? 'white' : '#475569'
        ctx.font = '700 10px Inter'
        ctx.textAlign='center'
        ctx.fillText(String(cnt), g.x+g.w-23, g.y+15)
      }
      // empty hint
      if(cnt===0){
        ctx.fillStyle = '#94a3b8'
        ctx.font = '600 10px Inter'
        ctx.textAlign='center'
        ctx.fillText('Drag nodes here', g.x+g.w/2, g.y+g.h/2+12)
      }
      ctx.restore()
    })

    // edges — shape-aware: start/end sit exactly on outside bounds of each shape (rect/diamond/pill/parallelogram via ray-polygon) — also supports groups, drawn on top of groups but below nodes
    edges.forEach(edge=>{
      const a = (nodes.find(n=>n.id===edge.from) || groups.find(g=>g.id===edge.from)) as any
      const b = (nodes.find(n=>n.id===edge.to) || groups.find(g=>g.id===edge.to)) as any
      if(!a||!b) return
      const {sx:startX, sy:startY, ex:endX, ey:endY, mx, my} = getEdgeEndpoints(a as any,b as any, edge)
      const dx = endX - startX, dy = endY - startY

      ctx.strokeStyle = edge.style==='solid' ? '#9ca3af' : edge.style==='dashed' ? '#a1a1aa' : '#7c5cff'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      const animSpeed = edge.speed * 0.6
      if(edge.style==='dashed'){
        ctx.setLineDash([10,8])
      } else if(edge.style==='animated' || edge.style==='flow'){
        const dash = edge.style==='flow' ? [14,14] : [16,10]
        const offset = (off * animSpeed) % 26
        ctx.setLineDash(dash)
        ctx.lineDashOffset = -offset
      } else {
        ctx.setLineDash([])
      }
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.lineDashOffset = 0

      // flow dots
      if(edge.style==='flow'){
        const dots = 3
        for(let i=0;i<dots;i++){
          const t = ((off*0.008*animSpeed + i/dots) % 1)
          const x = startX + t*(endX - startX)
          const y = startY + t*(endY - startY)
          ctx.fillStyle = '#a78bfa'
          ctx.shadowColor = '#7c5cff'
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(x,y,4,0,Math.PI*2)
          ctx.fill()
          ctx.shadowBlur = 0
          // direction arrow small
          ctx.fillStyle = '#7c5cff'
          ctx.beginPath()
          ctx.arc(x,y,1.5,0,Math.PI*2)
          ctx.fill()
        }
      }

      // arrow head
      const angle = Math.atan2(dy, dx)
      ctx.fillStyle = edge.style==='solid' ? '#9ca3af' : '#7c5cff'
      ctx.beginPath()
      ctx.moveTo(endX, endY)
      ctx.lineTo(endX - Math.cos(angle - Math.PI/6)*14, endY - Math.sin(angle - Math.PI/6)*14)
      ctx.lineTo(endX - Math.cos(angle + Math.PI/6)*14, endY - Math.sin(angle + Math.PI/6)*14)
      ctx.closePath()
      ctx.fill()

      if(edge.label){
        const align = edge.labelAlign || 'top'
        const size = edge.labelSize || 12
        let lx = mx, ly = my
        const off = 14
        const along = 22
        // absolute cardinal offsets — not relative to line rotation
        if(align==='top'){ lx = mx; ly = my - off; }
        else if(align==='bottom'){ lx = mx; ly = my + off; }
        else if(align==='left'){ lx = mx - along; ly = my; }
        else if(align==='right'){ lx = mx + along; ly = my; }
        else { lx = mx; ly = my; }
        ctx.fillStyle = (edge as any).labelBg || '#ffffff'
        ctx.strokeStyle = (edge as any).labelBorder || '#e5e7eb'
        ctx.lineWidth = 1
        const pad=6
        ctx.font = `${size}px Inter`
        const tw = ctx.measureText(edge.label).width
        const rh = size + 8
        // @ts-ignore
        ctx.roundRect(lx - tw/2 - pad, ly - rh/2, tw+pad*2, rh, 6)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = (edge as any).labelColor || '#475569'
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        ctx.fillText(edge.label, lx, ly)
        ctx.textAlign='left'
      }
    })

    // nodes
    nodes.forEach(n=>{
      ctx.save()
      const isSel = selectedIds.includes(n.id)
      // shadow
      ctx.shadowColor = 'rgba(15,23,42,0.1)'
      ctx.shadowBlur = isSel? 20:10
      ctx.shadowOffsetY = 4
      let fill = n.color || '#ffffff'
      // highlight selected
      if(isSel) ctx.strokeStyle = '#7c5cff'
      else ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = isSel? 2.5:1.5
      ctx.fillStyle = fill

      const x=n.x, y=n.y, w=n.w, h=n.h
      if(n.type==='image'){
        // rounded rect clip for image
        // @ts-ignore
        const rr = new Path2D();
        // @ts-ignore
        if(typeof Path2D !== 'undefined'){
          // @ts-ignore
          rr.roundRect(x,y,w,h,12)
        }
        ctx.save()
        // @ts-ignore
        if(ctx.roundRect){
          ctx.beginPath()
          // @ts-ignore
          ctx.roundRect(x,y,w,h,12)
          ctx.clip()
        } else {
          ctx.beginPath()
          ctx.rect(x,y,w,h)
          ctx.clip()
        }
        // fill base
        ctx.fillStyle = fill
        ctx.fillRect(x,y,w,h)
        // draw image if available
        if(n.image){
          const cached = imageCacheRef.current.get(n.image)
          const img = cached && cached.complete && cached.naturalWidth ? cached : null
          if(img){
            const fit = n.imageFit || 'cover'
            if(fit === 'stretch'){
              ctx.drawImage(img, x, y, w, h)
            } else if(fit === 'contain'){
              const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight)
              const iw = img.naturalWidth * scale
              const ih = img.naturalHeight * scale
              const ix = x + (w - iw)/2
              const iy = y + (h - ih)/2
              ctx.drawImage(img, ix, iy, iw, ih)
            } else {
              const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
              const iw = img.naturalWidth * scale
              const ih = img.naturalHeight * scale
              const ix = x + (w - iw)/2
              const iy = y + (h - ih)/2
              ctx.drawImage(img, ix, iy, iw, ih)
            }
          }
        } else {
          // placeholder icon
          ctx.fillStyle = '#f1f5f9'
          ctx.fillRect(x,y,w,h)
          ctx.fillStyle = '#94a3b8'
          ctx.font = '11px Inter'
          ctx.textAlign='center'
          ctx.fillText('No image', x+w/2, y+h/2)
        }
        ctx.restore()
        // border
        ctx.beginPath()
        // @ts-ignore
        if(ctx.roundRect) ctx.roundRect(x,y,w,h,12); else ctx.rect(x,y,w,h)
        ctx.stroke()
      } else if(n.type==='text'){
        // text node — configurable border (none/dotted/dashed/solid), bounding box for connections
        const hasBg = !!(n.color && n.color !== 'transparent')
        const border = ((n as any).textBorder as TextBorder) || 'none'
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
        if(hasBg){
          ctx.fillStyle = n.color as string
          ctx.beginPath()
          // @ts-ignore
          if((ctx as any).roundRect) (ctx as any).roundRect(x,y,w,h,8); else ctx.rect(x,y,w,h)
          ctx.fill()
        }
        const showBorder = border !== 'none' || isSel
        if(showBorder){
          let dash: number[] = []
          if(!isSel){
            if(border === 'dashed') dash = [6,4]
            else if(border === 'dotted') dash = [2,5]
            else if(border === 'solid') dash = []
            else dash = []
          } else {
            // when selected, solid purple highlight (or keep dotted/dashed purple? use solid for clarity)
            dash = []
          }
          ctx.strokeStyle = isSel ? '#7c5cff' : 'rgba(148,163,184,0.9)'
          ctx.lineWidth = isSel ? 1.6 : 1.2
          ctx.setLineDash(dash)
          ctx.beginPath()
          // @ts-ignore
          if((ctx as any).roundRect) (ctx as any).roundRect(x,y,w,h,8); else ctx.rect(x,y,w,h)
          ctx.stroke()
          ctx.setLineDash([])
        } else {
          ctx.setLineDash([])
        }
        ctx.fillStyle = '#0f172a'
        ctx.font = '600 14px Inter'
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        const tLines = n.label.split('\n')
        tLines.forEach((line:any,i:number)=>{
          ctx.fillText(line, x+w/2, y+h/2 + (i - (tLines.length-1)/2)*18)
        })
      } else if(n.type==='icon'){
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
        ctx.setLineDash([])
        const iconId = (n as any).icon || 'star'
        const iconSize = Math.min(w,h) * 0.75
        const iconCx = x + w/2
        const iconCy = y + h/2
        const glyphFill = (n as any).iconFill && (n as any).iconFill !== 'transparent' ? (n as any).iconFill : 'none'
        const glyphStroke = (n as any).iconBorder && (n as any).iconBorder !== 'transparent' ? (n as any).iconBorder : ((n as any).iconColor || '#0f172a')
        const isSelIcon = selectedIds.includes(n.id)
        if(isSelIcon){
          ctx.save()
          ctx.shadowBlur = 12
          ctx.shadowColor = 'rgba(124,92,255,0.15)'
          ctx.shadowOffsetY = 2
          ctx.strokeStyle = '#7c5cff'
          ctx.lineWidth = 1.8
          // selection highlight rect (not fill/border of icon)
          // @ts-ignore
          if((ctx as any).roundRect) (ctx as any).roundRect(x,y,w,h,8)
          else ctx.rect(x,y,w,h)
          ctx.stroke()
          ctx.restore()
          ctx.shadowBlur = 0
          ctx.shadowOffsetY = 0
        }
        drawLucideIconCanvas(ctx, iconId, iconCx, iconCy, iconSize, glyphStroke, glyphFill, 1.7)
        ctx.shadowBlur = 0
      } else {
        ctx.beginPath()
        if(n.type==='process'){
          // @ts-ignore
          ctx.roundRect(x,y,w,h,12)
        } else if(n.type==='terminal'){
          // @ts-ignore
          ctx.roundRect(x,y,w,h,999)
        } else if(n.type==='decision'){
          ctx.moveTo(x+w/2, y)
          ctx.lineTo(x+w, y+h/2)
          ctx.lineTo(x+w/2, y+h)
          ctx.lineTo(x, y+h/2)
          ctx.closePath()
        } else if(n.type==='io'){
          const skew=16
          ctx.moveTo(x+skew, y)
          ctx.lineTo(x+w, y)
          ctx.lineTo(x+w-skew, y+h)
          ctx.lineTo(x, y+h)
          ctx.closePath()
        }
        ctx.fill()
        ctx.stroke()
      }

      // inner highlight
      if(n.type==='image' && n.label){
        ctx.shadowBlur=0
        const barH = 26
        ctx.fillStyle = 'rgba(255,255,255,0.92)'
        ctx.beginPath()
        // @ts-ignore
        if(ctx.roundRect) ctx.roundRect(x, y+h-barH, w, barH, [0,0,12,12]); else ctx.rect(x, y+h-barH, w, barH)
        ctx.fill()
        ctx.strokeStyle = '#e2e8f0'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = '#0f172a'
        ctx.font = '600 12px Inter'
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        let lbl = n.label.length>24 ? n.label.slice(0,24)+'…' : n.label
        ctx.fillText(lbl, x+w/2, y+h-barH/2+0.5)
      } else if(n.type!=='image' && n.type!=='text' && n.type!=='icon'){
        ctx.shadowBlur=0
        ctx.fillStyle = '#0f172a'
        ctx.font = '600 13px Inter'
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        // wrap text simple
        const words = n.label.split(' ')
        if(n.type==='decision' && words.length>1){
          ctx.fillText(words[0], x+w/2, y+h/2 - 8)
          ctx.fillText(words.slice(1).join(' '), x+w/2, y+h/2 + 10)
        } else {
          // center text, if multiline
          const lines = n.label.split('\n')
          lines.forEach((line,i)=>{
            ctx.fillText(line, x+w/2, y+h/2 + (i - (lines.length-1)/2)*16)
          })
        }
      } else {
        ctx.shadowBlur=0
      }
      // subtext (replaces type badge) — only if non-empty
      if(n.subtext && n.subtext.trim()){
        ctx.fillStyle = 'rgba(124,92,255,0.10)'
        ctx.strokeStyle = 'rgba(124,92,255,0.20)'
        ctx.lineWidth=1
        const sub = n.subtext.trim()
        ctx.font = '600 9px Inter'
        const bw = ctx.measureText(sub).width + 14
        const bx = x + w/2 - bw/2
        const by = y + h + 7
        // @ts-ignore
        ctx.roundRect(bx, by, bw, 14, 7)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = '#7c5cff'
        ctx.textAlign='center'
        ctx.fillText(sub, x+w/2, by+7.5)
      }

      // step number badge
      if(n.step){
        const isDecision = n.type==='decision'
        const cx = isDecision ? x + w/2 : x + 14
        const cy = isDecision ? y - 10 : y + 14
        const r = 12
        ctx.save()
        ctx.shadowColor = 'rgba(124,92,255,0.35)'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI*2)
        ctx.fillStyle = '#7c5cff'
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = 'white'
        ctx.font = '700 11px Inter'
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        ctx.fillText(String(n.step), cx, cy+0.5)
        ctx.restore()
      }

      ctx.restore()
    })
  }

  const preloadImages = async ()=>{
    const list = nodes.filter(n=> n.image)
    await Promise.all(list.map(n=> new Promise<void>(resolve=>{
      const src = n.image!
      const cached = imageCacheRef.current.get(src)
      if(cached && cached.complete && cached.naturalWidth) return resolve()
      const img = new Image()
      if(!src.startsWith('data:')) img.crossOrigin='anonymous'
      img.onload = ()=>{ imageCacheRef.current.set(src, img); resolve() }
      img.onerror = ()=> resolve()
      img.src = src
      if(cached) imageCacheRef.current.set(src, img)
    })))
  }

  const exportWebM = async ()=>{
    await preloadImages()
    const W=2400, H=1600 // always maximum quality
    const duration=4000
    const fps=60 // fixed 60fps capture
    const bitrate=12000000 // 12 Mbps maximum
    const c = canvasRef.current!
    c.width=W; c.height=H
    const ctx = c.getContext('2d', { alpha: false } as any) as CanvasRenderingContext2D
    if(ctx){ (ctx as any).imageSmoothingEnabled = true; (ctx as any).imageSmoothingQuality = 'high' }
    const stream = (c as any).captureStream(fps)
    let mimeType = 'video/webm;codecs=vp9'
    // @ts-ignore
    if(typeof MediaRecorder !== 'undefined' && (MediaRecorder as any).isTypeSupported && !(MediaRecorder as any).isTypeSupported(mimeType)) mimeType = 'video/webm'
    // @ts-ignore
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: bitrate })
    const chunks: BlobPart[] = []
    recorder.ondataavailable = e=> { if(e.data.size>0) chunks.push(e.data)}
    const done = new Promise<Blob>(resolve=>{
      recorder.onstop = ()=> resolve(new Blob(chunks, {type:'video/webm'}))
    })
    recorder.start(100)
    setExporting('webm'); setExportProgress(0)
    let off=0
    const start = performance.now()
    return new Promise<void>(resolve=>{
      const tick = ()=>{
        const now = performance.now()
        const elapsed = now - start
        const p = Math.min(elapsed/duration,1)
        off = elapsed * 0.36 // time-based, ensures true 60fps motion (6 per 16.67ms)
        // high-quality scaled draw (1200x800 design → W x H) at 60fps
        ctx.save()
        const scale = W/1200
        ;(ctx as any).imageSmoothingQuality = 'high'
        ctx.scale(scale, scale)
        drawToCanvas(ctx, off, 1200,800)
        ctx.restore()
        setExportProgress(Math.round(p*100))
        if(p<1) requestAnimationFrame(tick)
        else {
          recorder.stop()
          done.then(blob=>{
            const url=URL.createObjectURL(blob)
            const a=document.createElement('a')
            a.href=url; a.download=`anigram-2400x1600-60fps-${Date.now()}.webm`; a.click()
            URL.revokeObjectURL(url)
            setExporting(null); resolve()
          })
        }
      }
      tick()
    })
  }

  const exportJson = ()=>{
    const base: any = {
      version: 1,
      createdAt: new Date().toISOString(),
      app: 'anigram',
      nodes,
      edges,
      groups,
    }
    if(jsonSettings.includeViewport) base.viewport = { zoom, pan }
    const blob = new Blob([JSON.stringify(base, null, jsonSettings.pretty ? 2 : 0)], {type:'application/json'})
    const safeName = (jsonSettings.fileName.trim() || 'anigram').replace(/[^a-z0-9-_]/gi,'_')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${safeName}-${new Date().toISOString().slice(0,10)}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setToast('Diagram exported as JSON')
    setTimeout(()=> setToast(null), 2500)
  }

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = ()=>{
      try{
        const raw = JSON.parse(String(reader.result))
        // support both wrapped {nodes,edges} and raw {nodes,edges} or exported payload
        const data = raw.nodes ? raw : raw.data ? raw.data : raw
        let nextNodes: Node[] = data.nodes ?? data.diagram?.nodes ?? []
        let nextEdges: Edge[] = data.edges ?? data.diagram?.edges ?? []
        let nextGroups: Group[] = (data as any).groups ?? (data as any).diagram?.groups ?? []
        if(!Array.isArray(nextNodes) || !Array.isArray(nextEdges)) throw new Error('Invalid file: missing nodes/edges arrays')
        // basic validation & sanitization
        nextNodes = nextNodes.filter(n=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
        nextEdges = nextEdges.filter(ed=> ed && typeof ed.from==='string' && typeof ed.to==='string')
        nextGroups = (nextGroups as any).filter((g:any)=> g && typeof g.id==='string' && typeof g.x==='number' && typeof g.y==='number') as any
        if(nextNodes.length===0 && nextGroups.length===0) throw new Error('No valid nodes found')
        setNodes(nextNodes)
        setEdges(nextEdges)
        setGroups(nextGroups as any)
        if(data.viewport?.pan) setPan(data.viewport.pan)
        if(typeof data.viewport?.zoom==='number') setZoom(data.viewport.zoom)
        if(nextGroups.length && !nextNodes.length) setSelectedGroupIds([(nextGroups as any)[0].id])
        else setSelectedIds(nextNodes[0] ? [nextNodes[0].id] : [])
        if(nextNodes.length) setSelectedGroupIds([])
        setSelectedEdge(null)
        setConnectFrom(null)
        setToast(`Imported ${nextNodes.length} nodes • ${nextEdges.length} connections`)
        setTimeout(()=> setToast(null), 3000)
      } catch(err:any){
        setToast(err?.message || 'Failed to import JSON')
        setTimeout(()=> setToast(null), 3000)
      } finally {
        if(fileInputRef.current) fileInputRef.current.value=''
      }
    }
    reader.readAsText(file)
  }

  const loadSample = async (name: string)=>{
    try{
      const res = await fetch(`${import.meta.env.BASE_URL}samples/${name}`)
      if(!res.ok) throw new Error(`Failed to load ${name}: ${res.status}`)
      const raw = await res.json()
      const data = raw.nodes ? raw : (raw as any).data ? (raw as any).data : raw
      let nextNodes: Node[] = (data as any).nodes ?? (data as any).diagram?.nodes ?? []
      let nextEdges: Edge[] = (data as any).edges ?? (data as any).diagram?.edges ?? []
      let nextGroups: Group[] = (data as any).groups ?? (data as any).diagram?.groups ?? []
      nextNodes = nextNodes.filter((n:any)=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
      nextEdges = nextEdges.filter((ed:any)=> ed && typeof ed.from==='string' && typeof ed.to==='string')
      nextGroups = (nextGroups as any).filter((g:any)=> g && typeof g.id==='string' && typeof g.x==='number' && typeof g.y==='number') as any
      if(!nextNodes.length && !nextGroups.length) throw new Error('No valid nodes in sample')
      setNodes(nextNodes as Node[])
      setEdges(nextEdges as Edge[])
      setGroups(nextGroups as any)
      if((data as any).viewport?.pan) setPan((data as any).viewport.pan)
      if(typeof (data as any).viewport?.zoom==='number') setZoom((data as any).viewport.zoom)
      else { setZoom(1); setPan({x:0,y:0}) }
      if((nextGroups as any).length && !(nextNodes as any).length) setSelectedGroupIds([(nextGroups as any)[0].id])
      else setSelectedIds((nextNodes as any)[0] ? [(nextNodes as any)[0].id] : [])
      if((nextNodes as any).length) setSelectedGroupIds([])
      setSelectedEdge(null)
      setConnectFrom(null)
      setToast(`Loaded sample: ${name.replace('.json','')}`)
      setTimeout(()=>setToast(null),2500)
    } catch(e:any){
      setToast(e?.message || 'Failed to load sample')
      setTimeout(()=>setToast(null),2500)
    }
  }

  const exportGif = async ()=>{
    await preloadImages()
    const W=2400, H=1600 // always maximum quality
    const frames=60
    const delay=33 // ~30fps, smoothest for GIF
    const c = canvasRef.current!
    c.width=W; c.height=H
    const ctx = c.getContext('2d', { willReadFrequently: true } as any) as CanvasRenderingContext2D
    if(ctx){ (ctx as any).imageSmoothingEnabled = true; (ctx as any).imageSmoothingQuality = 'high' }
    setExporting('gif'); setExportProgress(0)
    const gif = GIFEncoder()
    for(let i=0;i<frames;i++){
      const off = i * 8
      ctx.clearRect(0,0,W,H)
      ctx.save()
      const scale = W/1200
      ;(ctx as any).imageSmoothingQuality = 'high'
      ctx.scale(scale, scale)
      drawToCanvas(ctx, off, 1200,800)
      ctx.restore()
      const data = ctx.getImageData(0,0,W,H).data
      // high-quality quantization: 256 colors, rgb565 (5-6-5 bits) for best flat-vector fidelity
      const palette = quantize(data as any, 256, { format: 'rgb565' } as any)
      const index = applyPalette(data as any, palette, 'rgb565' as any)
      gif.writeFrame(index, W, H, { palette, delay })
      setExportProgress(Math.round(((i+1)/frames)*100))
      // allow UI to update
      await new Promise(r=> setTimeout(r,0))
    }
    gif.finish()
    const bytes = gif.bytes()
    const blob = new Blob([bytes], {type:'image/gif'})
    const url = URL.createObjectURL(blob)
    const a=document.createElement('a')
    a.href=url; a.download=`anigram-2400x1600-30fps-${Date.now()}.gif`; a.click()
    URL.revokeObjectURL(url)
    setExporting(null)
  }

  // viewer: panning handlers (read-only)
  const onViewerMouseDown = (e: React.MouseEvent)=>{
    if(e.button!==0 && e.button!==1) return
    const target = e.target as Element
    if(target === viewerSvgRef.current || target.classList.contains('grid-bg')){
      setIsViewerPanning(true)
      setViewerPanStart({x: e.clientX - viewerPan.x, y: e.clientY - viewerPan.y})
    }
  }
  const onViewerMouseMove = (e: React.MouseEvent)=>{
    if(!isViewerPanning) return
    setViewerPan({ x: e.clientX - viewerPanStart.x, y: e.clientY - viewerPanStart.y })
  }
  const onViewerMouseUp = ()=> setIsViewerPanning(false)

  // ── Hash viewer mode: read-only embed (no editing UI, pan/zoom only) ──
  if(isViewerMode && hashDiagram){
    const vNodes = hashDiagram.nodes
    const vEdges = hashDiagram.edges
    const vGroups: Group[] = hashDiagram.groups || []
    const vGetNode = (id:string)=> vNodes.find(n=>n.id===id)
    const vGetGroup = (id:string)=> vGroups.find(g=>g.id===id)
    return (
      <div style={{display:'flex', flexDirection:'column', height:'100vh', background:'var(--bg)', overflow:'hidden'}}>
        <div style={{flex:1, position:'relative', overflow:'hidden', background:'var(--canvas)', userSelect:'none'}} onMouseMove={onViewerMouseMove} onMouseUp={onViewerMouseUp} onMouseLeave={onViewerMouseUp}>
          <svg
            ref={viewerSvgRef}
            onMouseDown={onViewerMouseDown}
            style={{width:'100%', height:'100%', cursor: isViewerPanning ? 'grabbing' : 'grab', userSelect:'none', WebkitUserSelect:'none' as any}}
          >
            <defs>
              <pattern id="grid-viewer" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={`translate(${viewerPan.x} ${viewerPan.y}) scale(${viewerZoom})`}>
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e4e6ed" strokeWidth="1"/>
              </pattern>
              <marker id="arrow-solid-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker>
              <marker id="arrow-anim-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7c5cff"/></marker>
            </defs>
            <rect className="grid-bg" width="100%" height="100%" fill="var(--canvas)"/>
            <rect className="grid-bg" width="100%" height="100%" fill="url(#grid-viewer)" opacity={1}/>
            <g transform={`translate(${viewerPan.x} ${viewerPan.y}) scale(${viewerZoom})`}>
              {vGroups.map(group=>{
                const members = vNodes.filter(n=> n.groupId===group.id)
                return (
                  <g key={group.id} style={{pointerEvents:'none'}}>
                    <rect x={group.x} y={group.y} width={group.w} height={group.h} rx={14} fill={group.color || '#ffffff'} stroke="#cbd5e1" strokeWidth={1.4} strokeDasharray="8 6" style={{filter:'drop-shadow(0 2px 10px rgba(15,23,42,0.06))'}} />
                    <path d={`M ${group.x+14} ${group.y} H ${group.x+group.w-14} A 14 14 0 0 1 ${group.x+group.w} ${group.y+14} V ${group.y+32} H ${group.x} V ${group.y+14} A 14 14 0 0 1 ${group.x+14} ${group.y} Z`} fill="rgba(248,250,252,0.96)" stroke="rgba(226,232,240,0.9)" strokeWidth={1} />
                    <g transform={`translate(${group.x+12} ${group.y+16})`}>
                      <rect x={-7} y={-7} width={14} height={14} rx={3} fill="#e2e8f0" />
                      <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontSize={8} fontWeight={800} fill="#64748b">◧</text>
                    </g>
                    <text x={group.x+26} y={group.y+16} dominantBaseline="middle" fontSize={11} fontWeight={700} fill="#334155">{group.label || 'Group'}</text>
                    <g transform={`translate(${group.x+group.w-12} ${group.y+16})`}>
                      <rect x={-22} y={-10} width={28} height={18} rx={9} fill={members.length ? '#f1f5f9' : '#f8fafc'} stroke="#e2e8f0" />
                      <text x={-8} y={0} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight={700} fill="#475569">{members.length}</text>
                    </g>
                  </g>
                )
              })}
              {vEdges.map(edge=>{
                const a=(vGetNode(edge.from) || vGetGroup(edge.from)) as any, b=(vGetNode(edge.to) || vGetGroup(edge.to)) as any
                if(!a||!b) return null
                const {sx,sy,ex,ey,mx,my} = getEdgeEndpoints(a as any,b as any, edge)
                const isAnimated = edge.style==='animated' || edge.style==='flow'
                const dash = edge.style==='dashed' ? '10 8' : edge.style==='animated' ? '16 10' : edge.style==='flow' ? '14 14' : undefined
                const offset = isAnimated ? (animOffset * 0.6 * edge.speed) % 26 : 0
                return (
                  <g key={edge.id}>
                    <path d={`M ${sx} ${sy} L ${ex} ${ey}`} fill="none" stroke={edge.style==='solid' ? '#9ca3af' : edge.style==='dashed' ? '#a1a1aa' : '#7c5cff'} strokeWidth={2.5} strokeDasharray={dash} strokeDashoffset={-offset} strokeLinecap="round" markerEnd={edge.style==='solid' ? 'url(#arrow-solid-v)' : 'url(#arrow-anim-v)'} opacity={0.95}/>
                    {edge.style==='flow' && Array.from({length:3}).map((_,i)=>{ const t=((animOffset*0.003*edge.speed + i/3)%1); const x=sx + t*(ex-sx); const y=sy + t*(ey-sy); return <circle key={i} cx={x} cy={y} r={4} fill="#a78bfa" stroke="#7c5cff" strokeWidth={1} style={{filter:'drop-shadow(0 0 6px #7c5cff)'}}/>
                    })}
                    {edge.label && (()=>{ const align=(edge as any).labelAlign||'top'; const size=(edge as any).labelSize||10; let lx=mx, ly=my; const off=12, along=20; if(align==='top'){lx=mx; ly=my-off} else if(align==='bottom'){lx=mx; ly=my+off} else if(align==='left'){lx=mx-along; ly=my} else if(align==='right'){lx=mx+along; ly=my} const w=Math.max(36, edge.label!.length*size*0.62+16); const h=size+8; return <g transform={`translate(${lx} ${ly})`}><rect x={-w/2} y={-h/2} rx={6} ry={6} width={w} height={h} fill={(edge as any).labelBg || '#ffffff'} stroke={(edge as any).labelBorder || '#e2e8f0'} strokeWidth={1}/><text textAnchor="middle" dominantBaseline="middle" fontSize={size} fontWeight={600} fill={(edge as any).labelColor || '#475569'}>{edge.label}</text></g> })()}
                  </g>
                )
              })}
              {vNodes.map(node=>{
                return (
                  <g key={node.id}>
                    {node.type==='process' && <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} fill={node.color || '#ffffff'} stroke="#e2e8f0" strokeWidth={1.2} style={{filter:'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>}
                    {node.type==='terminal' && <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={999} fill={node.color || '#ffffff'} stroke="#e2e8f0" strokeWidth={1.2} style={{filter:'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>}
                    {node.type==='decision' && <path d={`M ${node.x+node.w/2} ${node.y} L ${node.x+node.w} ${node.y+node.h/2} L ${node.x+node.w/2} ${node.y+node.h} L ${node.x} ${node.y+node.h/2} Z`} fill={node.color || '#ffffff'} stroke="#e2e8f0" strokeWidth={1.2} style={{filter:'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>}
                    {node.type==='io' && <path d={`M ${node.x+16} ${node.y} L ${node.x+node.w} ${node.y} L ${node.x+node.w-16} ${node.y+node.h} L ${node.x} ${node.y+node.h} Z`} fill={node.color || '#ffffff'} stroke="#e2e8f0" strokeWidth={1.2} style={{filter:'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>}
                    {node.type==='text' && (()=>{ const border=(node as any).textBorder||'none'; const showBorder=border!=='none'; const stroke= !showBorder? 'none' : '#94a3b8'; const dash= !showBorder? undefined : border==='dashed'? '6 4' : border==='dotted'? '2 5' : undefined; return <g><rect x={node.x} y={node.y} width={node.w} height={node.h} rx={8} fill={node.color && node.color!=='transparent' ? node.color : 'transparent'} stroke={stroke} strokeWidth={showBorder?1.2:0} strokeDasharray={dash} opacity={showBorder?0.9:0}/>{node.label && <g>{node.label.split('\n').map((line:any,i:number,arr:any[])=> <text key={i} x={node.x+node.w/2} y={node.y+node.h/2 + (i-(arr.length-1)/2)*18} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={600} fill="#0f172a">{line}</text>)}</g>}{!node.label && <text x={node.x+node.w/2} y={node.y+node.h/2} textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight={500} fill="#94a3b8">Text</text>}</g> })()}
                    {node.type==='icon' && (()=>{ const iconId=(node as any).icon||'star'; const iconSize=Math.min(node.w,node.h)*0.75; const glyphFill=(node as any).iconFill && (node as any).iconFill!=='transparent' ? (node as any).iconFill : 'none'; const glyphStroke=(node as any).iconBorder && (node as any).iconBorder!=='transparent' ? (node as any).iconBorder : ((node as any).iconColor || '#0f172a'); return <g><rect x={node.x} y={node.y} width={node.w} height={node.h} rx={8} fill="transparent" stroke="none"/><g transform={`translate(${node.x+node.w/2} ${node.y+node.h/2})`}><g transform={`translate(${-iconSize/2} ${-iconSize/2})`}><LucideIcon icon={iconId} size={iconSize} stroke={glyphStroke} fill={glyphFill} /></g></g></g> })()}
                    {node.type==='image' && <g><defs><clipPath id={`v-img-clip-${node.id}`}><rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} /></clipPath></defs><rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} fill="#ffffff" stroke="none" />{node.image ? <image href={node.image} x={node.x} y={node.y} width={node.w} height={node.h} preserveAspectRatio={node.imageFit==='contain' ? 'xMidYMid meet' : node.imageFit==='stretch' ? 'none' : 'xMidYMid slice'} clipPath={`url(#v-img-clip-${node.id})`} /> : <g clipPath={`url(#v-img-clip-${node.id})`}><rect x={node.x} y={node.y} width={node.w} height={node.h} fill="#f1f5f9" /><text x={node.x+node.w/2} y={node.y+node.h/2} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={600} fill="#94a3b8">No image</text></g>}<rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} fill="none" stroke="#e2e8f0" strokeWidth={1.2} style={{filter:'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>{node.label && <g clipPath={`url(#v-img-clip-${node.id})`}><rect x={node.x} y={node.y+node.h-26} width={node.w} height={26} fill="rgba(255,255,255,0.94)" /><line x1={node.x} y1={node.y+node.h-26} x2={node.x+node.w} y2={node.y+node.h-26} stroke="#e2e8f0" strokeWidth={1} /><text x={node.x+node.w/2} y={node.y+node.h-13} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={700} fill="#0f172a">{node.label.length>22 ? node.label.slice(0,22)+'…' : node.label}</text></g>}</g>}
                    {node.type!=='image' && node.type!=='text' && node.type!=='icon' && <text x={node.x+node.w/2} y={node.y+node.h/2 + (node.type==='decision' && node.label.includes(' ') ? -6:0)} textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={600} fill="#0f172a" style={{pointerEvents:'none'}}>{node.type==='decision' ? node.label.split(' ')[0] : node.label}</text>}
                    {node.type==='decision' && node.label.includes(' ') && <text x={node.x+node.w/2} y={node.y+node.h/2+10} textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={600} fill="#0f172a" style={{pointerEvents:'none'}}>{node.label.split(' ').slice(1).join(' ')}</text>}
                    {node.subtext && node.subtext.trim() && (()=>{ const sub=node.subtext!.trim(); const w=Math.max(48, sub.length*6.5+16); return <g transform={`translate(${node.x+node.w/2} ${node.y+node.h+10})`}><rect x={-w/2} y={-7} width={w} height={14} rx={7} fill="rgba(124,92,255,0.10)" stroke="rgba(124,92,255,0.20)"/><text textAnchor="middle" dominantBaseline="middle" fontSize={9} fontWeight={600} fill="#7c5cff">{sub}</text></g> })()}
                    {node.step && <g transform={`translate(${node.type==='decision' ? node.x+node.w/2 : node.x+14} ${node.type==='decision' ? node.y-10 : node.y+14})`} style={{filter:'drop-shadow(0 2px 6px rgba(124,92,255,0.35))'}}><circle r={12} fill="#7c5cff" stroke="white" strokeWidth={2} /><text textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={800} fill="white" dy={0.5}>{node.step}</text></g>}
                  </g>
                )
              })}
            </g>
          </svg>
          <div style={{position:'absolute', top:12, left:12, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:999, padding:'6px 10px', display:'flex', alignItems:'center', gap:8, fontSize:12, boxShadow:'0 2px 12px rgba(15,23,42,0.08)', pointerEvents:'none'}}>
            <span style={{width:8,height:8, borderRadius:999, background:'#7c5cff'}}/>
            <span style={{fontWeight:700}}>Viewer</span>
            <span style={{color:'var(--muted)'}}>• {vNodes.length} nodes • {vEdges.length} edges {vGroups.length ? `• ${vGroups.length} groups` : ''}</span>
          </div>
          <div style={{position:'absolute', top:12, right:12, display:'flex', gap:8, zIndex:5}}>
            <button onClick={()=>{ const url=window.location.href; if(navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(()=>{ setToast('Link copied'); setTimeout(()=>setToast(null),1500)}); else { prompt('Copy link:', url) } }} style={{background:'var(--panel)', color:'var(--text)', border:'1px solid var(--border)', borderRadius:999, padding:'7px 14px', fontSize:12, fontWeight:700, cursor:'pointer', boxShadow:'0 2px 10px rgba(15,23,42,0.08)'}}>⎘ Copy link</button>
            <button onClick={()=>{ history.replaceState(null,'', window.location.pathname + window.location.search); setHashMode(null); setViewerZoom(1); setViewerPan({x:0,y:0}) }} style={{background:'#7c5cff', color:'white', border:'none', borderRadius:999, padding:'7px 14px', fontSize:12, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 16px rgba(124,92,255,0.3)'}}>✎ Open in editor</button>
          </div>
          <div style={{position:'absolute', bottom:12, left:12, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:10, padding:'8px 12px', fontSize:11, color:'var(--muted)', display:'flex', gap:12, alignItems:'center', boxShadow:'0 2px 12px rgba(15,23,42,0.06)'}}>
            <span><b style={{color:'var(--text)'}}>Drag</b> to pan • <b style={{color:'var(--text)'}}>Scroll</b> to zoom • embed via <code style={{background:'var(--panel-2)', border:'1px solid var(--border)', padding:'1px 5px', borderRadius:4, fontSize:11}}>#viewer=JSON</code> or <code style={{background:'var(--panel-2)', border:'1px solid var(--border)', padding:'1px 5px', borderRadius:4, fontSize:11}}>#editor=JSON</code></span>
          </div>
          <div style={{position:'absolute', bottom:12, right:12, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:10, padding:'6px 8px', display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 12px rgba(15,23,42,0.06)', zIndex:5}}>
            <span style={{fontSize:10, fontWeight:700, color:'var(--muted)', letterSpacing:0.8}}>ZOOM</span>
            <span style={{fontSize:12, fontWeight:700, minWidth:36, textAlign:'center'}}>{Math.round(viewerZoom*100)}%</span>
            <button onClick={()=>{ const nz=Math.min(2, viewerZoom+0.1); if(nz===viewerZoom) return; const svg=viewerSvgRef.current; if(!svg){setViewerZoom(nz);return} const r=svg.getBoundingClientRect(); const mx=r.width/2, my=r.height/2; const wx=(mx-viewerPan.x)/viewerZoom, wy=(my-viewerPan.y)/viewerZoom; setViewerZoom(nz); setViewerPan({x:mx-wx*nz, y:my-wy*nz})}} style={{width:28,height:28, borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--text)', cursor:'pointer', display:'grid', placeItems:'center', fontWeight:700}}>+</button>
            <button onClick={()=>{ const nz=Math.max(0.3, viewerZoom-0.1); if(nz===viewerZoom) return; const svg=viewerSvgRef.current; if(!svg){setViewerZoom(nz);return} const r=svg.getBoundingClientRect(); const mx=r.width/2, my=r.height/2; const wx=(mx-viewerPan.x)/viewerZoom, wy=(my-viewerPan.y)/viewerZoom; setViewerZoom(nz); setViewerPan({x:mx-wx*nz, y:my-wy*nz})}} style={{width:28,height:28, borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--text)', cursor:'pointer', display:'grid', placeItems:'center', fontWeight:700}}>−</button>
            <button onClick={()=>{ if(hashDiagram?.viewport?.zoom){ setViewerZoom(Math.min(2,Math.max(0.3, hashDiagram.viewport.zoom))); setViewerPan(hashDiagram.viewport.pan || {x:0,y:0}) } else { setViewerZoom(1); setViewerPan({x:0,y:0}) } }} style={{width:28,height:28, borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--text)', cursor:'pointer', display:'grid', placeItems:'center', fontWeight:700, fontSize:8}}>1:1</button>
          </div>
        </div>
        {toast && <div style={{position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#ffffff', border:'1px solid var(--border)', color:'var(--text)', padding:'10px 16px', borderRadius:999, fontSize:13, fontWeight:600, boxShadow:'0 8px 32px rgba(15,23,42,0.12)', zIndex:60, display:'flex', alignItems:'center', gap:8}}><span style={{width:8,height:8, borderRadius:999, background:'#22c55e', boxShadow:'0 0 8px #22c55e'}}/>{toast}</div>}
      </div>
    )
  }

  const selectedNode = selectedIds.length===1 ? getNode(selectedIds[0]) : null
  const selectedEdgeObj = selectedEdge? edges.find(e=>e.id===selectedEdge) : null

  return (
    <ToolShell title="Anigram">
    <div style={{display:'flex', flexDirection:'column', height:'100%', background:'var(--bg)'}}>
      {/* HEADER */}
      <header style={{height:56, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px', borderBottom:'1px solid var(--border)', background:'var(--panel)', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{width:32,height:32, borderRadius:9, background:'linear-gradient(135deg,#7c5cff,#4f46e5)', display:'grid', placeItems:'center', boxShadow:'0 4px 16px var(--accent-glow)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2 L22 8.5 L12 15 L2 8.5 Z"/><path d="M2 12 L12 18.5 L22 12"/><path d="M2 15.5 L12 22 L22 15.5"/></svg>
          </div>
          <div>
            <div style={{fontWeight:700, letterSpacing:'-0.02em', fontSize:16, lineHeight:1}}>Anigram</div>
            <div style={{fontSize:11, color:'var(--muted)', marginTop:-2}}>Animated Flowchart Studio</div>
          </div>
          <div style={{height:24, width:1, background:'var(--border)', marginLeft:8}}/>
          <div ref={menuBarRef} style={{display:'flex', alignItems:'center', gap:6}}>
            {/* File */}
            <div style={{position:'relative'}}>
              <button onClick={()=> setActiveMenu(a=> a==='file' ? null : 'file')} style={{...btnGhost, background: activeMenu==='file' ? 'var(--panel-2)' : 'var(--panel)', border:'1px solid var(--border)', padding:'7px 12px 7px 10px', fontWeight:700, display:'flex', alignItems:'center', gap:6, color:'var(--text)', boxShadow: activeMenu==='file' ? '0 2px 10px rgba(15,23,42,0.08)' : 'none'}}>
                File
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{transform: activeMenu==='file' ? 'rotate(180deg)' : 'none', transition:'0.18s', opacity:0.7}}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {activeMenu==='file' && (
                <div style={{position:'absolute', top:'calc(100% + 8px)', left:0, width:220, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:14, boxShadow:'0 16px 40px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.06)', padding:6, zIndex:30}}>
                  <button onClick={()=>{ setActiveMenu(null); fileInputRef.current?.click() }} style={menuItemStyle}>
                    <span style={menuIconStyle}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Import JSON</span>
                    <span style={{fontSize:10, color:'var(--muted)', border:'1px solid var(--border)', borderRadius:4, padding:'1px 5px'}}>⌘O</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); setExportModal('json') }} style={menuItemStyle}>
                    <span style={menuIconStyle}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Export JSON</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>diagram.json</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); setExportModal('gif')}} disabled={!!exporting} style={{...menuItemStyle, opacity: exporting?0.5:1}}>
                    <span style={{...menuIconStyle, background:'#f5f3ff', borderColor:'#ddd6fe', color:'#7c5cff'}}>GIF</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Export GIF</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>256 colors</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); setExportModal('webm')}} disabled={!!exporting} style={{...menuItemStyle, opacity: exporting?0.5:1}}>
                    <span style={{...menuIconStyle, background:'#0f172a', borderColor:'#0f172a', color:'white'}}>WEBM</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Export WebM</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>VP9</span>
                  </button>
                  <div style={{height:1, background:'var(--border)', margin:'6px 4px'}}/>
                  <button onClick={()=>{
                    setActiveMenu(null)
                    const payload:any={version:1, app:'anigram', nodes, edges, groups}
                    // viewport intentionally omitted — recipient auto-fits to content bounds
                    const json=JSON.stringify(payload)
                    let hash:string
                    try{
                      const b64 = btoa(unescape(encodeURIComponent(json)))
                      const urlSafe = b64.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
                      const enc = encodeURIComponent(json)
                      hash = urlSafe.length < enc.length ? urlSafe : enc
                    }catch{ hash = encodeURIComponent(json) }
                    const url = window.location.origin + window.location.pathname + '#viewer=' + hash
                    if(navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(()=>{ setToast('Viewer link copied — embed via <iframe src="'+url.slice(0,60)+'...">'); setTimeout(()=>setToast(null),3000) }).catch(()=>{ prompt('Copy viewer link:', url); setToast('Viewer link ready'); setTimeout(()=>setToast(null),2500) })
                    else { prompt('Copy viewer link:', url) }
                  }} style={menuItemStyle}>
                    <span style={{...menuIconStyle, background:'#f5f3ff', borderColor:'#ddd6fe', color:'#7c5cff'}}>⊙</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Copy Viewer Link</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>#viewer</span>
                  </button>
                  <button onClick={()=>{
                    setActiveMenu(null)
                    const payload:any={version:1, app:'anigram', nodes, edges, groups}
                    // viewport omitted — recipient auto-fits
                    const json=JSON.stringify(payload)
                    let hash:string
                    try{
                      const b64 = btoa(unescape(encodeURIComponent(json)))
                      const urlSafe = b64.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
                      const enc = encodeURIComponent(json)
                      hash = urlSafe.length < enc.length ? urlSafe : enc
                    }catch{ hash = encodeURIComponent(json) }
                    const url = window.location.origin + window.location.pathname + '#editor=' + hash
                    if(navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(()=>{ setToast('Editor link copied — opens editable'); setTimeout(()=>setToast(null),3000) }).catch(()=>{ prompt('Copy editor link:', url); setToast('Editor link ready'); setTimeout(()=>setToast(null),2500) })
                    else { prompt('Copy editor link:', url) }
                  }} style={menuItemStyle}>
                    <span style={{...menuIconStyle, background:'#ecfdf5', borderColor:'#bbf7d0', color:'#15803d'}}>✎</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Copy Editor Link</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>#editor</span>
                  </button>
                  <div style={{fontSize:10, color:'var(--muted)', padding:'4px 8px 2px', lineHeight:1.4}}>Share via <code style={{background:'var(--panel-2)', border:'1px solid var(--border)', padding:'0 3px', borderRadius:3}}>#viewer=JSON</code> read-only or <code style={{background:'var(--panel-2)', border:'1px solid var(--border)', padding:'0 3px', borderRadius:3}}>#editor=JSON</code> editable — JSON or base64</div>
                </div>
              )}
            </div>
            {/* Edit */}
            <div style={{position:'relative'}}>
              <button onClick={()=> setActiveMenu(a=> a==='edit' ? null : 'edit')} style={{...btnGhost, background: activeMenu==='edit' ? 'var(--panel-2)' : 'var(--panel)', border:'1px solid var(--border)', padding:'7px 12px 7px 10px', fontWeight:700, display:'flex', alignItems:'center', gap:6, color:'var(--text)', boxShadow: activeMenu==='edit' ? '0 2px 10px rgba(15,23,42,0.08)' : 'none'}}>
                Edit
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{transform: activeMenu==='edit' ? 'rotate(180deg)' : 'none', transition:'0.18s', opacity:0.7}}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {activeMenu==='edit' && (
                <div style={{position:'absolute', top:'calc(100% + 8px)', left:0, width:220, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:14, boxShadow:'0 16px 40px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.06)', padding:6, zIndex:30}}>
                  <button onClick={()=>{ setActiveMenu(null); setNodes(INITIAL_NODES); setEdges(INITIAL_EDGES); setGroups([]); setSelectedIds(['n2']); setSelectedGroupIds([]); setSelectedEdge(null); setToast('Demo restored'); setTimeout(()=>setToast(null),2000)}} style={menuItemStyle}>
                    <span style={menuIconStyle}>↺</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Reset Demo</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>{nodes.length} nodes</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); if(confirm('Clear all nodes and connections?')){ setNodes([]); setEdges([]); setGroups([]); setSelectedIds([]); setSelectedGroupIds([]); setSelectedEdge(null); setToast('Canvas cleared'); setTimeout(()=>setToast(null),2000)}}} style={{...menuItemStyle, color:'#ef4444'}}>
                    <span style={{...menuIconStyle, background:'#fef2f2', borderColor:'#fecaca', color:'#ef4444'}}>⌫</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Clear</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>empty</span>
                  </button>
                </div>
              )}
            </div>
            {/* Samples */}
            <div style={{position:'relative'}}>
              <button onClick={()=> setActiveMenu(a=> a==='samples' ? null : 'samples')} style={{...btnGhost, background: activeMenu==='samples' ? 'var(--panel-2)' : 'var(--panel)', border:'1px solid var(--border)', padding:'7px 12px 7px 10px', fontWeight:700, display:'flex', alignItems:'center', gap:6, color:'var(--text)', boxShadow: activeMenu==='samples' ? '0 2px 10px rgba(15,23,42,0.08)' : 'none'}}>
                Samples
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{transform: activeMenu==='samples' ? 'rotate(180deg)' : 'none', transition:'0.18s', opacity:0.7}}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {activeMenu==='samples' && (
                <div style={{position:'absolute', top:'calc(100% + 8px)', left:0, width:250, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:14, boxShadow:'0 16px 40px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.06)', padding:6, zIndex:30}}>
                  <div style={{padding:'6px 10px 4px', fontSize:10, fontWeight:800, letterSpacing:1, color:'var(--muted)'}}>CHOOSE SAMPLE</div>
                  <button onClick={()=>{ setActiveMenu(null); loadSample('01-onboarding-flow.json') }} style={menuItemStyle}>
                    <span style={{...menuIconStyle, background:'#ecfdf5', borderColor:'#bbf7d0', color:'#15803d'}}>01</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Onboarding Flow</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>6 nodes</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); loadSample('02-ecommerce-checkout.json') }} style={menuItemStyle}>
                    <span style={{...menuIconStyle, background:'#f5f3ff', borderColor:'#ddd6fe', color:'#7c5cff'}}>02</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>E-commerce Checkout</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>9 nodes</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); loadSample('03-ci-pipeline.json') }} style={menuItemStyle}>
                    <span style={{...menuIconStyle, background:'#fffbeb', borderColor:'#fde68a', color:'#b45309'}}>03</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>CI Pipeline</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>10 nodes</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); loadSample('04-http-static-site.json') }} style={menuItemStyle}>
                    <span style={{...menuIconStyle, background:'#e0f2fe', borderColor:'#bae6fd', color:'#0369a1'}}>04</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>HTTP Static Site</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>8 nodes</span>
                  </button>
                  <button onClick={()=>{ setActiveMenu(null); loadSample('05-group-demo.json') }} style={menuItemStyle}>
                    <span style={{...menuIconStyle, background:'#f1f5f9', borderColor:'#cbd5e1', color:'#475569'}}>05</span>
                    <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Group Demo</span>
                    <span style={{fontSize:10, color:'var(--muted)'}}>6+1 group</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={handleImportJson} style={{display:'none'}}/>
          <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display:'none'}}/>
        </div>
      </header>

      <div style={{flex:1, display:'flex', minHeight:0}}>
        {/* LEFT TOOLBAR */}
        <aside style={{width:72, background:'var(--panel)', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', alignItems:'center', padding:'14px 0', gap:8}}>
          <div style={{fontSize:9, fontWeight:700, letterSpacing:1, color:'var(--muted)', marginBottom:4}}>NODES</div>
          <div style={{fontSize:8, color:'var(--muted)', textAlign:'center', lineHeight:1.2, padding:'0 6px', marginBottom:2}}>drag to canvas</div>
          <AddButton color="#ffffff" draggableType="process" onDragAdd={addNodeAt} label="Process"/>
          <AddButton color="#fffbeb" draggableType="decision" onDragAdd={addNodeAt} label="Decision" diamond/>
          <AddButton color="#ecfdf5" draggableType="terminal" onDragAdd={addNodeAt} label="Terminal" pill/>
          <AddButton color="#f5f3ff" draggableType="io" onDragAdd={addNodeAt} label="I/O" skew/>
          <AddButton color="transparent" draggableType="text" onDragAdd={addNodeAt} label="Text"/>
          <AddButton color="#ffffff" draggableType="icon" onDragAdd={addNodeAt} label="Icon"/>
          <AddButton color="#ffffff" draggableType="image" onDragAdd={addNodeAt} label="Image"/>
          <div style={{fontSize:8, color:'var(--muted)', textAlign:'center', lineHeight:1.2, padding:'0 6px', marginTop:6}}>or drop image<br/>on canvas</div>
        </aside>

        {/* CENTER CANVAS */}
        <div ref={containerRef} className="canvas-area" style={{flex:1, position:'relative', overflow:'hidden', background:'var(--canvas)', userSelect:'none', WebkitUserSelect:'none' as any, MozUserSelect:'none' as any}} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onContextMenu={(e)=>{ e.preventDefault(); if((e.target as Element)?.closest('[data-node-group]')) return; setContextMenu(null); const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect(); const wx = (e.clientX - rect.left - pan.x)/zoom; const wy = (e.clientY - rect.top - pan.y)/zoom; setCanvasContextMenu({x:e.clientX, y:e.clientY, wx, wy}) }}
          onDragOver={(e)=>{ e.preventDefault(); e.dataTransfer.dropEffect='copy'; (e.currentTarget as HTMLDivElement).style.outline='2px dashed #7c5cff'}}
          onDragLeave={(e)=>{ (e.currentTarget as HTMLDivElement).style.outline='none'}}
          onDrop={(e)=>{
            e.preventDefault(); (e.currentTarget as HTMLDivElement).style.outline='none'
            // sidebar node drag — create node at drop position
            const draggedType = e.dataTransfer.getData('application/anigram-node-type') as NodeType | ''
            if(draggedType && (['process','decision','terminal','io','image','text','icon'] as string[]).includes(draggedType)){
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
              const worldX = (e.clientX - rect.left - pan.x)/zoom
              const worldY = (e.clientY - rect.top - pan.y)/zoom
              addNodeAt(draggedType as NodeType, worldX, worldY)
              return
            }
            const files = Array.from(e.dataTransfer.files ?? [])
            if(!files.length) return
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
            const base = { x: (e.clientX - rect.left - pan.x)/zoom, y: (e.clientY - rect.top - pan.y)/zoom }
            const images = files.filter(f=> f.type.startsWith('image/'))
            const jsons = files.filter(f=> f.name.endsWith('.json'))
            if(images.length){
              images.forEach((file, idx)=>{
                const pos = { x: base.x + idx*24, y: base.y + idx*24 }
                handleImageDrop(file, pos)
              })
              if(!jsons.length) return
            }
            if(jsons.length){
              const file = jsons[0]
              const reader = new FileReader()
              reader.onload = ()=>{
                try{
                  const raw = JSON.parse(String(reader.result))
                  const data = raw.nodes ? raw : raw.data ? raw.data : raw
                  let nextNodes: Node[] = data.nodes ?? []
                  let nextEdges: Edge[] = data.edges ?? []
                  let nextGroups: Group[] = (data as any).groups ?? []
                  nextNodes = nextNodes.filter((n:any)=> n && typeof n.id==='string')
                  nextEdges = nextEdges.filter((ed:any)=> ed && typeof ed.from==='string')
                  nextGroups = (nextGroups as any).filter((g:any)=> g && typeof g.id==='string') as any
                  setNodes(nextNodes); setEdges(nextEdges); setGroups(nextGroups as any)
                  if(data.viewport?.pan) setPan(data.viewport.pan)
                  if(typeof data.viewport?.zoom==='number') setZoom(data.viewport.zoom)
                  if((nextGroups as any).length && !nextNodes.length) setSelectedGroupIds([(nextGroups as any)[0].id])
                  else setSelectedIds(nextNodes[0] ? [nextNodes[0].id] : [])
                  if(nextNodes.length) setSelectedGroupIds([])
                  setSelectedEdge(null)
                  setToast(`Imported ${nextNodes.length} nodes${(nextGroups as any).length ? ` + ${(nextGroups as any).length} groups` : ''} via drop`); setTimeout(()=>setToast(null),2500)
                } catch{ setToast('Invalid JSON'); setTimeout(()=>setToast(null),2500)}
              }
              reader.readAsText(file)
            } else if(!images.length){
              setToast('Drop .json or image files'); setTimeout(()=>setToast(null),2000)
            }
          }}
        >
          {/* top bar — polished to match embed viewer: Canvas badge + connecting status */}
          {connectFrom && (
            <div style={{position:'absolute', top:12, left:12, right:12, display:'flex', alignItems:'center', zIndex:5, pointerEvents:'none'}}>
              <div style={{display:'flex', gap:8, pointerEvents:'auto', background:'var(--panel)', border:'1px solid var(--border)', borderRadius:999, padding:'6px 8px', alignItems:'center', boxShadow:'0 2px 12px rgba(15,23,42,0.06)'}}>
                <span style={{width:8,height:8, borderRadius:999, background:'#f59e0b', boxShadow:'0 0 8px #f59e0b'}}/>
                <span style={{fontSize:12, fontWeight:600}}>Connecting from {nodes.find(n=>n.id===connectFrom)?.label} → pick target</span>
                <button onClick={()=>setConnectFrom(null)} style={{...btnGhost, padding:'4px 8px', fontSize:11}}>Cancel</button>
              </div>
            </div>
          )}
          {!connectFrom && (
            <div style={{position:'absolute', top:12, left:12, display:'flex', alignItems:'center', zIndex:4, pointerEvents:'none'}}>
              <div style={{display:'flex', gap:8, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:999, padding:'6px 10px', alignItems:'center', boxShadow:'0 2px 12px rgba(15,23,42,0.08)', fontSize:12}}>
                <span style={{width:8,height:8, borderRadius:999, background:'#7c5cff', boxShadow:'0 0 8px rgba(124,92,255,0.35)', flexShrink:0}} />
                <span style={{fontWeight:700}}>Canvas</span>
                <span style={{color:'var(--muted)'}}>• {nodes.length} nodes • {edges.length} edges {groups.length ? `• ${groups.length} groups` : ''} {selectedIds.length>1 ? `• ${selectedIds.length} sel` : selectedGroupIds.length ? `• ${selectedGroupIds.length} group sel` : ''}</span>
              </div>
            </div>
          )}

          <svg
            ref={svgRef}
            onMouseDown={onSvgMouseDown}
            style={{width:'100%', height:'100%', cursor: isPanning? 'grabbing' : connectFrom ? 'crosshair':'default', userSelect:'none', WebkitUserSelect:'none' as any}}
            // @ts-ignore
            onMouseMove={onMouseMove}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e4e6ed" strokeWidth="1"/>
              </pattern>
              <marker id="arrow-solid" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/>
              </marker>
              <marker id="arrow-anim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c5cff"/>
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <rect className="grid-bg" width="100%" height="100%" fill="var(--canvas)"/>
            <rect className="grid-bg" width="100%" height="100%" fill="url(#grid)" opacity={1}/>

            <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
              {/* groups — redesigned container: drag nodes out to ungroup, drag in to auto-group */}
              {groups.map(group=>{
                const isSel = selectedGroupIds.includes(group.id)
                const isConnectSource = connectFrom===group.id
                const members = nodes.filter(n=> n.groupId===group.id)
                const activeId = isDragging || isResizingNode
                const isLeaving = !!activeId && members.some(m=> !isNodeInsideGroup(m, group) && (activeId===m.id || selectedIds.includes(m.id)))
                const isHoverTarget = !!activeId && !isLeaving && (()=>{ const dragged = nodes.find(n=> n.id===activeId); if(!dragged || dragged.groupId===group.id) return false; return isNodeInsideGroup(dragged, group) })()
                const stroke = isLeaving ? '#f59e0b' : isHoverTarget ? '#22c55e' : isSel||isConnectSource ? '#7c5cff' : '#cbd5e1'
                const strokeW = isSel||isConnectSource||isLeaving||isHoverTarget ? 2 : 1.4
                const dash = isSel || isLeaving || isHoverTarget ? undefined : '8 6'
                return (
                  <g key={group.id} onMouseDown={(e)=>onMouseDownGroup(e, group)} onContextMenu={(e)=>{ e.preventDefault(); e.stopPropagation(); const gNode = group as any; setContextMenu({x:e.clientX, y:e.clientY, nodeId:gNode.id}); setSelectedGroupIds([group.id]); setSelectedIds([]); setSelectedEdge(null) }} style={{cursor: connectFrom ? 'crosshair':'grab'}} >
                    {/* subtle outer glow when leaving/hover */}
                    {(isLeaving || isHoverTarget) && <rect x={group.x-2} y={group.y-2} width={group.w+4} height={group.h+4} rx={14} fill="none" stroke={stroke} strokeWidth={6} opacity={0.12} />}
                    <rect x={group.x} y={group.y} width={group.w} height={group.h} rx={14} fill={group.color || '#ffffff'} stroke={stroke} strokeWidth={strokeW} strokeDasharray={dash} style={{filter: isSel? 'drop-shadow(0 10px 22px rgba(124,92,255,0.14))': isLeaving? 'drop-shadow(0 6px 14px rgba(245,158,11,0.18))' : 'drop-shadow(0 2px 10px rgba(15,23,42,0.06))', transition:'stroke 0.15s'}} />
                    {/* header bar 32px */}
                    <path d={`M ${group.x+14} ${group.y} H ${group.x+group.w-14} A 14 14 0 0 1 ${group.x+group.w} ${group.y+14} V ${group.y+32} H ${group.x} V ${group.y+14} A 14 14 0 0 1 ${group.x+14} ${group.y} Z`} fill={isSel ? 'rgba(124,92,255,0.08)' : isLeaving ? 'rgba(245,158,11,0.08)' : isHoverTarget ? 'rgba(34,197,94,0.08)' : 'rgba(248,250,252,0.96)'} stroke={isSel||isLeaving||isHoverTarget ? stroke : 'rgba(226,232,240,0.9)'} strokeWidth={1} />
                    {/* header icon */}
                    <g transform={`translate(${group.x+12} ${group.y+16})`} style={{pointerEvents:'none'}}>
                      <rect x={-7} y={-7} width={14} height={14} rx={3} fill={isSel ? '#7c5cff' : isLeaving ? '#f59e0b' : isHoverTarget ? '#22c55e' : '#e2e8f0'} />
                      <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontSize={8} fontWeight={800} fill={isSel||isLeaving||isHoverTarget ? 'white' : '#64748b'}>◧</text>
                    </g>
                    <text x={group.x+26} y={group.y+16} dominantBaseline="middle" fontSize={11} fontWeight={700} fill={isSel ? '#7c5cff' : isLeaving ? '#92400e' : isHoverTarget ? '#166534' : '#334155'} style={{pointerEvents:'none'}}>{group.label || 'Group'}</text>
                    {/* count pill */}
                    <g transform={`translate(${group.x+group.w-12} ${group.y+16})`} style={{pointerEvents:'none'}}>
                      <rect x={-22} y={-10} width={28} height={18} rx={9} fill={members.length ? (isSel ? '#7c5cff' : isLeaving ? '#fef3c7' : '#f1f5f9') : '#f8fafc'} stroke={isSel ? '#7c5cff' : '#e2e8f0'} />
                      <text x={-8} y={0} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight={700} fill={isSel ? 'white' : '#475569'}>{members.length}</text>
                    </g>
                    {/* status hint when dragging */}
                    {isLeaving && <text x={group.x+group.w/2} y={group.y+group.h-10} textAnchor="middle" fontSize={9} fontWeight={600} fill="#92400e" style={{pointerEvents:'none', opacity:0.9}}>release to ungroup</text>}
                    {isHoverTarget && <text x={group.x+group.w/2} y={group.y+group.h-10} textAnchor="middle" fontSize={9} fontWeight={600} fill="#166534" style={{pointerEvents:'none'}}>release to add to group</text>}
                    {!members.length && !isDragging && <text x={group.x+group.w/2} y={group.y+group.h/2+12} textAnchor="middle" fontSize={10} fontWeight={600} fill="#94a3b8" style={{pointerEvents:'none'}}>Drag nodes here</text>}
                    {isSel && <>
                      <circle cx={group.x} cy={group.y} r={5} fill="#7c5cff" stroke="white" strokeWidth={1.5} style={{cursor:'nwse-resize'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingGroup(group.id); setResizeHandle('tl'); setResizeStart(p); setResizeInitialRect({x:group.x,y:group.y,w:group.w,h:group.h}) }}/>
                      <circle cx={group.x+group.w} cy={group.y} r={5} fill="#7c5cff" stroke="white" strokeWidth={1.5} style={{cursor:'nesw-resize'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingGroup(group.id); setResizeHandle('tr'); setResizeStart(p); setResizeInitialRect({x:group.x,y:group.y,w:group.w,h:group.h}) }}/>
                      <circle cx={group.x} cy={group.y+group.h} r={5} fill="#7c5cff" stroke="white" strokeWidth={1.5} style={{cursor:'nesw-resize'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingGroup(group.id); setResizeHandle('bl'); setResizeStart(p); setResizeInitialRect({x:group.x,y:group.y,w:group.w,h:group.h}) }}/>
                      <circle cx={group.x+group.w} cy={group.y+group.h} r={5} fill="#7c5cff" stroke="white" strokeWidth={1.5} style={{cursor:'nwse-resize'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingGroup(group.id); setResizeHandle('br'); setResizeStart(p); setResizeInitialRect({x:group.x,y:group.y,w:group.w,h:group.h}) }}/>
                    </>}
                    {isConnectSource && (
                      <circle cx={group.x+group.w/2} cy={group.y+group.h/2} r={Math.max(group.w,group.h)/2.2} fill="none" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 4" opacity={0.8}/>
                    )}
                  </g>
                )
              })}

              {/* edges — drawn on top of groups but below nodes */}
              {edges.map(edge=>{
                const a=(getNode(edge.from) || getGroup(edge.from)) as any, b=(getNode(edge.to) || getGroup(edge.to)) as any
                if(!a||!b) return null
                const {sx,sy,ex,ey,mx,my} = getEdgeEndpoints(a as any,b as any, edge)
                const isSel = selectedEdge===edge.id
                const isAnimated = edge.style==='animated' || edge.style==='flow'
                const dash = edge.style==='dashed' ? '10 8' : edge.style==='animated' ? '16 10' : edge.style==='flow' ? '14 14' : undefined
                const speed = edge.speed
                const offset = isAnimated ? (animOffset * 0.6 * speed) % 26 : 0
                return (
                  <g key={edge.id} onClick={(e)=>{ e.stopPropagation(); setSelectedEdge(edge.id); setSelectedIds([])}} onDoubleClick={(e)=>{ e.stopPropagation(); const cur = edges.find(ed=>ed.id===edge.id)?.label || ''; const t = prompt('Arrow text:', cur); if(t!==null){ setEdges(es=> es.map(ed=> ed.id===edge.id ? {...ed, label: t.trim()||undefined, labelSize: ed.labelSize || 10, labelAlign: ed.labelAlign || 'top'} : ed)); setSelectedEdge(edge.id); setSelectedIds([]) } }} style={{cursor:'pointer'}}>
                    {/* hit area */}
                    <path d={`M ${sx} ${sy} L ${ex} ${ey}`} stroke="transparent" strokeWidth={18} fill="none"/>
                    <path
                      d={`M ${sx} ${sy} L ${ex} ${ey}`}
                      fill="none"
                      stroke={edge.style==='solid' ? '#9ca3af' : edge.style==='dashed' ? '#a1a1aa' : '#7c5cff'}
                      strokeWidth={isSel? 3.5:2.5}
                      strokeDasharray={dash}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                      markerEnd={edge.style==='solid' ? 'url(#arrow-solid)' : 'url(#arrow-anim)'}
                      opacity={isSel?1:0.95}
                      style={{filter: isSel? 'drop-shadow(0 0 8px rgba(124,92,255,0.5))':undefined}}
                    />
                    {edge.style==='flow' && (()=> {
                      const dots=3
                      return Array.from({length:dots}).map((_,i)=>{
                        const t = ((animOffset*0.003*speed + i/dots)%1)
                        const x=sx + t*(ex - sx)
                        const y=sy + t*(ey - sy)
                        return <circle key={i} cx={x} cy={y} r={4} fill="#a78bfa" stroke="#7c5cff" strokeWidth={1} style={{filter:'drop-shadow(0 0 6px #7c5cff)'}}/>
                      })
                    })()}
                    {edge.label && (()=>{
                      const align = (edge as any).labelAlign || 'top'
                      const size = (edge as any).labelSize || 10
                      let lx = mx, ly = my
                      const off = 12
                      const along = 20
                      // absolute cardinal offsets — not relative to line rotation
                      if(align==='top'){ lx = mx; ly = my - off }
                      else if(align==='bottom'){ lx = mx; ly = my + off }
                      else if(align==='left'){ lx = mx - along; ly = my }
                      else if(align==='right'){ lx = mx + along; ly = my }
                      const w = Math.max(36, edge.label!.length * size * 0.62 + 16)
                      const h = size + 8
                      return (
                        <g transform={`translate(${lx} ${ly})`}>
                          <rect x={-w/2} y={-h/2} rx={6} ry={6} width={w} height={h} fill={(edge as any).labelBg || '#ffffff'} stroke={isSel?'#7c5cff':((edge as any).labelBorder || '#e2e8f0')} strokeWidth={isSel?1.5:1}/>
                          <text textAnchor="middle" dominantBaseline="middle" fontSize={size} fontWeight={600} fill={(edge as any).labelColor || '#475569'}>{edge.label}</text>
                        </g>
                      )
                    })()}
                    {isSel && <circle cx={mx} cy={my} r={3} fill="#7c5cff"/>}
                  </g>
                )
              })}

              {/* nodes */}
              {nodes.map(node=>{
                const isSel = selectedIds.includes(node.id)
                const isConnectSource = connectFrom===node.id
                return (
                  <g key={node.id} onMouseDown={(e)=>onMouseDownNode(e, node)} onDoubleClick={(e)=>{ e.stopPropagation(); if(node.type==='icon'){ setIconPickerFor(node.id); setIconSearch("") } else { startEditing(node) } }} onContextMenu={(e)=>{ e.preventDefault(); e.stopPropagation(); const isPartOfMulti = selectedIds.includes(node.id) && selectedIds.length>1; setContextMenu({x:e.clientX, y:e.clientY, nodeId:node.id}); if(!isPartOfMulti){ setSelectedIds([node.id]); setSelectedGroupIds([]); setSelectedEdge(null) } }} style={{cursor: connectFrom ? 'crosshair':'grab'}} >
                    {/* shadow */}
                    <g opacity={0.18}>
                      {node.type==='process' && <rect x={node.x} y={node.y+4} width={node.w} height={node.h} rx={12} fill="#0f172a" opacity={0.06}/>}
                    </g>
                    {node.type==='process' && (
                      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} fill={node.color} stroke={isSel||isConnectSource ? '#7c5cff' : '#e2e8f0'} strokeWidth={isSel||isConnectSource?2.5:1.2} style={{filter: isSel? 'drop-shadow(0 8px 24px rgba(124,92,255,0.12))':'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>
                    )}
                    {node.type==='terminal' && (
                      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={999} fill={node.color} stroke={isSel||isConnectSource ? '#7c5cff' : '#e2e8f0'} strokeWidth={isSel||isConnectSource?2.5:1.2} style={{filter: isSel? 'drop-shadow(0 8px 24px rgba(124,92,255,0.12))':'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>
                    )}
                    {node.type==='decision' && (
                      <path d={`M ${node.x+node.w/2} ${node.y} L ${node.x+node.w} ${node.y+node.h/2} L ${node.x+node.w/2} ${node.y+node.h} L ${node.x} ${node.y+node.h/2} Z`} fill={node.color} stroke={isSel||isConnectSource ? '#7c5cff' : '#e2e8f0'} strokeWidth={isSel||isConnectSource?2.5:1.2} style={{filter: isSel? 'drop-shadow(0 8px 24px rgba(124,92,255,0.12))':'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>
                    )}
                    {node.type==='io' && (
                      <path d={`M ${node.x+16} ${node.y} L ${node.x+node.w} ${node.y} L ${node.x+node.w-16} ${node.y+node.h} L ${node.x} ${node.y+node.h} Z`} fill={node.color} stroke={isSel||isConnectSource ? '#7c5cff' : '#e2e8f0'} strokeWidth={isSel||isConnectSource?2.5:1.2} style={{filter: isSel? 'drop-shadow(0 8px 24px rgba(124,92,255,0.12))':'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>
                    )}
                    {node.type==='text' && (()=>{ const border = ((node as any).textBorder as TextBorder) || 'none'; const showBorder = border!=='none' || isSel || isConnectSource; const stroke = !showBorder ? 'none' : isSel||isConnectSource ? '#7c5cff' : '#94a3b8'; const dash = !showBorder || isSel||isConnectSource ? undefined : border==='dashed' ? '6 4' : border==='dotted' ? '2 5' : undefined; const sw = showBorder ? (isSel||isConnectSource?1.8:1.2) : 0; const opacity = showBorder ? (isSel||isConnectSource?1:0.9) : 0; return (
                      <g>
                        <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={8} fill={node.color && node.color!=='transparent' ? node.color : 'transparent'} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} opacity={showBorder ? opacity : 0} style={{filter: isSel? 'drop-shadow(0 4px 12px rgba(124,92,255,0.12))':'none', pointerEvents:'all'}}/>
                        {editingNodeId!==node.id && node.label && (
                          <g style={{pointerEvents:'none'}}>
                            {node.label.split('\n').map((line:any,i:number,arr:any[])=>(
                              <text key={i} x={node.x+node.w/2} y={node.y+node.h/2 + (i - (arr.length-1)/2)*18} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={600} fill="#0f172a">{line}</text>
                            ))}
                          </g>
                        )}
                        {editingNodeId!==node.id && !node.label && (
                          <text x={node.x+node.w/2} y={node.y+node.h/2} textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight={500} fill="#94a3b8" style={{pointerEvents:'none'}}>Text</text>
                        )}
                      </g>
                    )})()}
                    {node.type==='icon' && ( ()=>{ const iconId=(node as any).icon || 'star'; const iconSize=Math.min(node.w,node.h) * 0.75; const glyphFill=(node as any).iconFill && (node as any).iconFill!=='transparent' ? (node as any).iconFill : 'none'; const glyphStroke=(node as any).iconBorder && (node as any).iconBorder!=='transparent' ? (node as any).iconBorder : ((node as any).iconColor || '#0f172a'); return (
                      <g>
                        <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={8} fill="transparent" stroke={isSel||isConnectSource ? '#7c5cff' : 'transparent'} strokeWidth={isSel||isConnectSource ? 1.8 : 0} style={{pointerEvents:'all', filter: isSel? 'drop-shadow(0 4px 12px rgba(124,92,255,0.12))':'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}} />
                        <g transform={`translate(${node.x+node.w/2} ${node.y+node.h/2})`}>
                          <g transform={`translate(${-iconSize/2} ${-iconSize/2})`}>
                            <LucideIcon icon={iconId} size={iconSize} stroke={glyphStroke} fill={glyphFill} />
                          </g>
                        </g>
                      </g>
                    )})()}
                    {node.type==='image' && (
                      <g>
                        <defs>
                          <clipPath id={`img-clip-${node.id}`}>
                            <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} />
                          </clipPath>
                        </defs>
                        <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} fill="#ffffff" stroke="none" />
                        {node.image ? (
                          <image href={node.image} x={node.x} y={node.y} width={node.w} height={node.h} preserveAspectRatio={node.imageFit==='contain' ? 'xMidYMid meet' : node.imageFit==='stretch' ? 'none' : 'xMidYMid slice'} clipPath={`url(#img-clip-${node.id})`} />
                        ) : (
                          <g clipPath={`url(#img-clip-${node.id})`}>
                            <rect x={node.x} y={node.y} width={node.w} height={node.h} fill="#f1f5f9" />
                            <text x={node.x+node.w/2} y={node.y+node.h/2-6} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={600} fill="#94a3b8">No image</text>
                            <text x={node.x+node.w/2} y={node.y+node.h/2+10} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill="#94a3b8">Click to upload</text>
                          </g>
                        )}
                        {/* border on top */}
                        <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={12} fill="none" stroke={isSel||isConnectSource ? '#7c5cff' : '#e2e8f0'} strokeWidth={isSel||isConnectSource?2.5:1.2} style={{filter: isSel? 'drop-shadow(0 8px 24px rgba(124,92,255,0.12))':'drop-shadow(0 2px 8px rgba(15,23,42,0.06))'}}/>
                        {node.label && editingNodeId!==node.id && (
                          <g clipPath={`url(#img-clip-${node.id})`}>
                            <rect x={node.x} y={node.y+node.h-26} width={node.w} height={26} fill="rgba(255,255,255,0.94)" />
                            <line x1={node.x} y1={node.y+node.h-26} x2={node.x+node.w} y2={node.y+node.h-26} stroke="#e2e8f0" strokeWidth={1} />
                            <text x={node.x+node.w/2} y={node.y+node.h-13} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={700} fill="#0f172a" style={{pointerEvents:'none'}}>{node.label.length>22 ? node.label.slice(0,22)+'…' : node.label}</text>
                          </g>
                        )}
                      </g>
                    )}

                    {/* label - hide for image/text/icon (handled above) */}
                    {node.type!=='image' && node.type!=='text' && node.type!=='icon' && editingNodeId!==node.id && (
                      <text x={node.x+node.w/2} y={node.y+node.h/2 + (node.type==='decision' && node.label.includes(' ') ? -6:0)} textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={600} fill="#0f172a" style={{pointerEvents:'none', userSelect:'none'}}>{node.type==='decision' ? node.label.split(' ')[0] : node.label}</text>
                    )}
                    {node.type==='decision' && node.label.includes(' ') && editingNodeId!==node.id && (
                      <text x={node.x+node.w/2} y={node.y+node.h/2+10} textAnchor="middle" dominantBaseline="middle" fontSize={13} fontWeight={600} fill="#0f172a" style={{pointerEvents:'none'}}>{node.label.split(' ').slice(1).join(' ')}</text>
                    )}
                    {/* inline editor - double-click to edit (not for icon) */}
                    {editingNodeId===node.id && (node as any).type!=='icon' && (
                      <foreignObject x={node.x+4} y={node.y+4} width={Math.max(20, node.w-8)} height={Math.max(20, node.h-8)} style={{overflow:'visible'}}>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                          <textarea
                            ref={editInputRef}
                            value={editingValue}
                            onChange={e=> setEditingValue(e.target.value)}
                            onBlur={commitEditing}
                            onKeyDown={e=>{
                              if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); (e.target as HTMLTextAreaElement).blur() }
                              if(e.key==='Escape'){ e.preventDefault(); cancelEditing() }
                            }}
                            onMouseDown={e=> e.stopPropagation()}
                            placeholder="Label"
                            rows={1}
                            style={{width:'100%', height:'auto', minHeight:'36px', maxHeight:'100%', resize:'none', border:'1.8px solid #7c5cff', borderRadius:8, background:'white', color:'#0f172a', font:'600 13px Inter', textAlign:'center', padding:'10px 6px', outline:'none', boxShadow:'0 4px 16px rgba(124,92,255,0.18)', overflow:'hidden', lineHeight:'1.25', display:'block'}}
                          />
                        </div>
                      </foreignObject>
                    )}
                    {/* subtext — replaces type badge, hidden if blank */}
                    {node.subtext && node.subtext.trim() && (()=>{ const sub=node.subtext!.trim(); const w=Math.max(48, sub.length*6.5+16); return (
                      <g transform={`translate(${node.x+node.w/2} ${node.y+node.h+10})`}>
                        <rect x={-w/2} y={-7} width={w} height={14} rx={7} fill="rgba(124,92,255,0.10)" stroke="rgba(124,92,255,0.20)"/>
                        <text textAnchor="middle" dominantBaseline="middle" fontSize={9} fontWeight={600} fill="#7c5cff">{sub}</text>
                      </g>
                    )})()}

                    {/* step number badge */}
                    {node.step && (
                      <g transform={`translate(${node.type==='decision' ? node.x+node.w/2 : node.x+14} ${node.type==='decision' ? node.y-10 : node.y+14})`} style={{filter:'drop-shadow(0 2px 6px rgba(124,92,255,0.35))'}}>
                        <circle r={12} fill="#7c5cff" stroke="white" strokeWidth={2} />
                        <text textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={800} fill="white" dy={0.5}>{node.step}</text>
                      </g>
                    )}

                    {isConnectSource && (
                      <circle cx={node.x+node.w/2} cy={node.y+node.h/2} r={Math.max(node.w,node.h)/1.6} fill="none" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 4" opacity={0.8}/>
                    )}

                  </g>
                )
              })}
              {/* handles layer — above nodes so endpoint and resize handles are always clickable */}
              {selectedEdge && (()=>{ const edge=edges.find(e=>e.id===selectedEdge); if(!edge) return null; const a=(getNode(edge.from) || getGroup(edge.from)) as any, b=(getNode(edge.to) || getGroup(edge.to)) as any; if(!a||!b) return null; const {sx,sy,ex,ey}=getEdgeEndpoints(a as any, b as any, edge); return (<g key={`edge-handles-${edge.id}`}><circle cx={sx} cy={sy} r={7} fill="white" stroke="#7c5cff" strokeWidth={1.8} style={{cursor:'grab', filter:'drop-shadow(0 1px 3px rgba(15,23,42,0.15))'}} onMouseDown={(e)=>{ e.stopPropagation(); setDraggingEndpoint({edgeId:edge.id, end:'from'}) }} onDoubleClick={(e)=>{ e.stopPropagation(); setEdges(es=> es.map(ed=> ed.id===edge.id ? {...ed, fromAngle: undefined} as any : ed)) }} /><circle cx={ex} cy={ey} r={7} fill="white" stroke="#7c5cff" strokeWidth={1.8} style={{cursor:'grab', filter:'drop-shadow(0 1px 3px rgba(15,23,42,0.15))'}} onMouseDown={(e)=>{ e.stopPropagation(); setDraggingEndpoint({edgeId:edge.id, end:'to'}) }} onDoubleClick={(e)=>{ e.stopPropagation(); setEdges(es=> es.map(ed=> ed.id===edge.id ? {...ed, toAngle: undefined} as any : ed)) }} /></g>)})()}
              {selectedIds.map(id=>{ const node=nodes.find(n=>n.id===id); if(!node) return null; return (<g key={`node-handles-${node.id}`}><rect x={node.x-5} y={node.y-5} width={10} height={10} rx={2} fill="white" stroke="#7c5cff" strokeWidth={1.5} style={{cursor:'nwse-resize', filter:'drop-shadow(0 1px 3px rgba(15,23,42,0.15))'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingNode(node.id); setResizeHandle('tl'); setResizeStart(p); setResizeInitialRect({x:node.x,y:node.y,w:node.w,h:node.h}) }} /><rect x={node.x+node.w-5} y={node.y-5} width={10} height={10} rx={2} fill="white" stroke="#7c5cff" strokeWidth={1.5} style={{cursor:'nesw-resize', filter:'drop-shadow(0 1px 3px rgba(15,23,42,0.15))'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingNode(node.id); setResizeHandle('tr'); setResizeStart(p); setResizeInitialRect({x:node.x,y:node.y,w:node.w,h:node.h}) }} /><rect x={node.x-5} y={node.y+node.h-5} width={10} height={10} rx={2} fill="white" stroke="#7c5cff" strokeWidth={1.5} style={{cursor:'nesw-resize', filter:'drop-shadow(0 1px 3px rgba(15,23,42,0.15))'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingNode(node.id); setResizeHandle('bl'); setResizeStart(p); setResizeInitialRect({x:node.x,y:node.y,w:node.w,h:node.h}) }} /><rect x={node.x+node.w-5} y={node.y+node.h-5} width={10} height={10} rx={2} fill="white" stroke="#7c5cff" strokeWidth={1.5} style={{cursor:'nwse-resize', filter:'drop-shadow(0 1px 3px rgba(15,23,42,0.15))'}} onMouseDown={(e)=>{ e.stopPropagation(); const p=svgPoint(e as any); setIsResizingNode(node.id); setResizeHandle('br'); setResizeStart(p); setResizeInitialRect({x:node.x,y:node.y,w:node.w,h:node.h}) }} /></g>) })}
              {selectionBox && (
                <rect x={Math.min(selectionBox.x0, selectionBox.x1)} y={Math.min(selectionBox.y0, selectionBox.y1)} width={Math.abs(selectionBox.x1-selectionBox.x0)} height={Math.abs(selectionBox.y1-selectionBox.y0)} fill="rgba(124,92,255,0.08)" stroke="#7c5cff" strokeWidth={1.2 / zoom} strokeDasharray="6 4" rx={4} />
              )}
            </g>
          </svg>

          {/* bottom hint — polished to match embed viewer (hint only; counts now in top Canvas badge) */}
          <div style={{position:'absolute', bottom:12, left:12, display:'flex', gap:8, alignItems:'center', pointerEvents:'none', zIndex:4}}>
            <div style={{background:'var(--panel)', border:'1px solid var(--border)', borderRadius:10, padding:'8px 12px', fontSize:11, color:'var(--muted)', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', boxShadow:'0 2px 12px rgba(15,23,42,0.06)'}}>
              <span><b style={{color:'var(--text)'}}>Drag</b> node • <b style={{color:'var(--text)'}}>Shift+click</b> multi • <b style={{color:'var(--text)'}}>Drag box</b> select • <b style={{color:'var(--text)'}}>Scroll</b> zoom</span>
            </div>
          </div>
          {/* bottom right — ZOOM + SNAP, matching embed viewer's ZOOM pill */}
          <div style={{position:'absolute', bottom:12, right:12, display:'flex', alignItems:'center', gap:8, zIndex:4}}>
            <div style={{background:'var(--panel)', border:'1px solid var(--border)', borderRadius:10, padding:'6px 8px', display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 12px rgba(15,23,42,0.06)'}}>
              <span style={{fontSize:10, fontWeight:800, color:'var(--muted)', letterSpacing:0.8}}>ZOOM</span>
              <span style={{fontSize:12, fontWeight:700, minWidth:36, textAlign:'center', color:'var(--text)'}}>{Math.round(zoom*100)}%</span>
              <button onClick={()=>{
                const newZoom = Math.min(2, zoom + 0.1)
                if(newZoom===zoom) return
                const svg = svgRef.current
                if(!svg){ setZoom(newZoom); return }
                const rect = svg.getBoundingClientRect()
                const mx = rect.width/2, my = rect.height/2
                const wx = (mx - pan.x)/zoom, wy = (my - pan.y)/zoom
                setZoom(newZoom)
                setPan({ x: mx - wx*newZoom, y: my - wy*newZoom })
              }} style={smallIconBtn}>+</button>
              <button onClick={()=>{
                const newZoom = Math.max(0.3, zoom - 0.1)
                if(newZoom===zoom) return
                const svg = svgRef.current
                if(!svg){ setZoom(newZoom); return }
                const rect = svg.getBoundingClientRect()
                const mx = rect.width/2, my = rect.height/2
                const wx = (mx - pan.x)/zoom, wy = (my - pan.y)/zoom
                setZoom(newZoom)
                setPan({ x: mx - wx*newZoom, y: my - wy*newZoom })
              }} style={smallIconBtn}>−</button>
              <button onClick={()=>{setZoom(1); setPan({x:0,y:0})}} style={{...smallIconBtn, fontSize:8}}>1:1</button>
            </div>
            <div style={{background:'var(--panel)', border:'1px solid var(--border)', borderRadius:10, padding:'6px 8px', display:'flex', alignItems:'center', gap:8, fontSize:11, boxShadow:'0 2px 12px rgba(15,23,42,0.06)'}}>
              <span style={{fontWeight:800, color:'var(--muted)', letterSpacing:0.8, fontSize:10}}>SNAP</span>
              <select value={snapGrid} onChange={e=> setSnapGrid(parseInt(e.target.value,10)||0)} style={{background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:6, padding:'4px 8px', fontSize:12, fontWeight:600, color:'var(--text)', outline:'none', cursor:'pointer'}}>
                <option value={0}>Off</option>
                <option value={5}>5 px</option>
                <option value={10}>10 px</option>
                <option value={20}>20 px</option>
                <option value={40}>40 px</option>
              </select>
            </div>
          </div>

          <canvas ref={canvasRef} style={{position:'absolute', left:-9999, top:-9999, width:1200, height:800}} width={1200} height={800}/>
          {contextMenu && ( ()=>{ const isMulti = selectedIds.length>1 && selectedIds.includes(contextMenu.nodeId); if(isMulti){
            return (
            <div
              ref={contextMenuRef}
              style={{
                position:'fixed',
                left: getSmartMenuPos(contextMenu.x, contextMenu.y, 180, 220).left,
                top: getSmartMenuPos(contextMenu.x, contextMenu.y, 180, 220).top,
                width:180,
                background:'var(--panel)',
                border:'1px solid var(--border)',
                borderRadius:10,
                boxShadow:'0 12px 32px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08)',
                padding:6,
                zIndex:60,
                display:'flex',
                flexDirection:'column',
                gap:4
              }}
              onMouseDown={e=> e.stopPropagation()}
              onClick={e=> e.stopPropagation()}
            >
              <div style={{padding:'6px 10px 4px', fontSize:10, fontWeight:800, letterSpacing:0.8, color:'var(--muted)'}}>{selectedIds.length} NODES SELECTED</div>
              <button
                onClick={()=>{ addGroup(true); setContextMenu(null) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'#f5f3ff', borderColor:'#ddd6fe', color:'#7c5cff'}}>▭</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Group ({selectedIds.length})</span>
              </button>
              <button
                onClick={()=>{ handleCopy(); setContextMenu(null) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'#eff6ff', borderColor:'#bfdbfe', color:'#2563eb'}}>⎘</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Copy</span>
                <span style={{fontSize:10, color:'var(--muted)'}}>⌘C</span>
              </button>
              <button
                onClick={()=>{ handleCut(); setContextMenu(null) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'#fef3c7', borderColor:'#fde68a', color:'#b45309'}}>✂</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Cut</span>
                <span style={{fontSize:10, color:'var(--muted)'}}>⌘X</span>
              </button>
              <div style={{height:1, background:'var(--border)', margin:'2px 4px'}}/>
              <button
                onClick={()=>{ const toDelete=new Set(selectedIds); setNodes(ns=> ns.filter(n=> !toDelete.has(n.id))); setEdges(es=> es.filter(ed=> !toDelete.has(ed.from) && !toDelete.has(ed.to))); setSelectedIds([]); setContextMenu(null); setToast(`Deleted ${toDelete.size} nodes`); setTimeout(()=>setToast(null),1500) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8, color:'#ef4444'}}
              >
                <span style={{...menuIconStyle, background:'#fef2f2', borderColor:'#fecaca', color:'#ef4444'}}>⌫</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Delete ({selectedIds.length})</span>
              </button>
            </div>
            )
          }
          return (
            <div
              ref={contextMenuRef}
              style={{
                position:'fixed',
                left: getSmartMenuPos(contextMenu.x, contextMenu.y, 160, 260).left,
                top: getSmartMenuPos(contextMenu.x, contextMenu.y, 160, 260).top,
                width:160,
                background:'var(--panel)',
                border:'1px solid var(--border)',
                borderRadius:10,
                boxShadow:'0 12px 32px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08)',
                padding:6,
                zIndex:60,
                display:'flex',
                flexDirection:'column',
                gap:4
              }}
              onMouseDown={e=> e.stopPropagation()}
              onClick={e=> e.stopPropagation()}
            >
              <button
                onClick={()=> handleContextConnect(contextMenu.nodeId)}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'#f5f3ff', borderColor:'#ddd6fe', color:'#7c5cff'}}>↗</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Connect</span>
              </button>
              <button
                onClick={()=>{ duplicateNode(contextMenu.nodeId); setContextMenu(null) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'var(--panel-2)', borderColor:'var(--border)', color:'var(--text)'}}>⧉</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Duplicate</span>
              </button>
              <button
                onClick={()=>{ handleCopy(); setContextMenu(null) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'#eff6ff', borderColor:'#bfdbfe', color:'#2563eb'}}>⎘</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Copy</span>
                <span style={{fontSize:10, color:'var(--muted)'}}>⌘C</span>
              </button>
              <button
                onClick={()=>{ handleCut(); setContextMenu(null) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'#fef3c7', borderColor:'#fde68a', color:'#b45309'}}>✂</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Cut</span>
                <span style={{fontSize:10, color:'var(--muted)'}}>⌘X</span>
              </button>
              <div style={{height:1, background:'var(--border)', margin:'2px 4px'}}/>
              <button
                onClick={()=>{ deleteNode(contextMenu.nodeId); setContextMenu(null) }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8, color:'#ef4444'}}
              >
                <span style={{...menuIconStyle, background:'#fef2f2', borderColor:'#fecaca', color:'#ef4444'}}>⌫</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Delete</span>
              </button>
            </div>
          )})()}
          {canvasContextMenu && (
            <div
              ref={canvasContextMenuRef}
              style={{
                position:'fixed',
                left: getSmartMenuPos(canvasContextMenu.x, canvasContextMenu.y, 200, 380).left,
                top: getSmartMenuPos(canvasContextMenu.x, canvasContextMenu.y, 200, 380).top,
                width:200,
                background:'var(--panel)',
                border:'1px solid var(--border)',
                borderRadius:12,
                boxShadow:'0 12px 32px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08)',
                padding:6,
                zIndex:60,
                display:'flex',
                flexDirection:'column',
                gap:4,
                maxHeight:'80vh',
                overflowY:'auto'
              }}
              onMouseDown={e=> e.stopPropagation()}
              onClick={e=> e.stopPropagation()}
            >
              <button
                onClick={()=>{
                  if(!nodes.length) { setCanvasContextMenu(null); return }
                  setSelectedIds(nodes.map(n=>n.id))
                  setSelectedGroupIds([])
                  setSelectedEdge(null)
                  setCanvasContextMenu(null)
                  setToast(`Selected ${nodes.length} nodes`)
                  setTimeout(()=>setToast(null),1000)
                }}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8}}
              >
                <span style={{...menuIconStyle, background:'var(--panel-2)', borderColor:'var(--border)', color:'var(--text)'}}>⧉</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Select all nodes</span>
              </button>
              <button
                onClick={()=>{
                  const hasNodes = !!(clipboardNodesRef.current && clipboardNodesRef.current.length)
                  const hasGroups = !!(clipboardGroupsRef.current && clipboardGroupsRef.current.length)
                  if(!hasNodes && !hasGroups) return
                  const {wx, wy} = canvasContextMenu
                  handlePaste(wx, wy)
                  setCanvasContextMenu(null)
                }}
                disabled={!clipboardNodesRef.current?.length && !clipboardGroupsRef.current?.length}
                style={{...menuItemStyle, padding:'8px 10px', borderRadius:8, opacity: (!clipboardNodesRef.current?.length && !clipboardGroupsRef.current?.length) ? 0.5 : 1}}
              >
                <span style={{...menuIconStyle, background:'#f0fdf4', borderColor:'#bbf7d0', color:'#16a34a'}}>⎘</span>
                <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>Paste</span>
                <span style={{fontSize:10, color:'var(--muted)'}}>⌘V</span>
              </button>
              <div style={{height:1, background:'var(--border)', margin:'4px 6px'}}/>
              <div style={{padding:'2px 8px', fontSize:10, fontWeight:800, letterSpacing:0.8, color:'var(--muted)'}}>CREATE NODE</div>
              {([
                {type:'process' as NodeType, label:'Process', color:'#ffffff', icon:'▭'},
                {type:'decision' as NodeType, label:'Decision', color:'#fffbeb', icon:'◇'},
                {type:'terminal' as NodeType, label:'Terminal', color:'#ecfdf5', icon:'⬭'},
                {type:'io' as NodeType, label:'I/O', color:'#f5f3ff', icon:'▱'},
                {type:'text' as NodeType, label:'Text', color:'transparent', icon:'Aa'},
                {type:'icon' as NodeType, label:'Icon', color:'#ffffff', icon:'★'},
              ] as const).map(item=>(
                <button
                  key={item.type}
                  onClick={()=>{
                    const {wx, wy} = canvasContextMenu
                    addNodeAt(item.type, wx, wy)
                    setCanvasContextMenu(null)
                  }}
                  style={{...menuItemStyle, padding:'7px 8px', borderRadius:8}}
                >
                  <span style={{...menuIconStyle, background: item.color==='transparent' ? 'transparent' : item.color, borderColor: item.type==='text' ? '#94a3b8' : 'var(--border)', borderStyle: item.type==='text' ? 'dashed' : 'solid', color: item.type==='text' ? '#64748b' : 'var(--text)', fontSize: item.type==='text' ? 10 : 12}}>{item.icon}</span>
                  <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>{item.label}</span>
                  <span style={{fontSize:10, color:'var(--muted)'}}>+</span>
                </button>
              ))}
            </div>
          )}
          {connectCreateMenu && (
            <div
              ref={connectCreateMenuRef}
              style={{
                position:'fixed',
                left: getSmartMenuPos(connectCreateMenu.x, connectCreateMenu.y, 200, 320).left,
                top: getSmartMenuPos(connectCreateMenu.x, connectCreateMenu.y, 200, 320).top,
                width:200,
                background:'var(--panel)',
                border:'1px solid var(--border)',
                borderRadius:12,
                boxShadow:'0 12px 32px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.08)',
                padding:6,
                zIndex:60,
                display:'flex',
                flexDirection:'column',
                gap:4,
                maxHeight:'80vh',
                overflowY:'auto'
              }}
              onMouseDown={e=> e.stopPropagation()}
              onClick={e=> e.stopPropagation()}
            >
              <div style={{padding:'2px 8px', fontSize:10, fontWeight:800, letterSpacing:0.8, color:'var(--muted)'}}>CREATE &amp; CONNECT</div>
              <div style={{padding:'2px 8px 6px', fontSize:11, color:'var(--muted)', lineHeight:1.3}}>Create a node and connect it from <b>{(nodes.find(n=>n.id===connectFrom)?.label || groups.find(g=>g.id===connectFrom)?.label || connectFrom)}</b></div>
              {([
                {type:'process' as NodeType, label:'Process', color:'#ffffff', icon:'▭'},
                {type:'decision' as NodeType, label:'Decision', color:'#fffbeb', icon:'◇'},
                {type:'terminal' as NodeType, label:'Terminal', color:'#ecfdf5', icon:'⬭'},
                {type:'io' as NodeType, label:'I/O', color:'#f5f3ff', icon:'▱'},
                {type:'text' as NodeType, label:'Text', color:'transparent', icon:'Aa'},
                {type:'icon' as NodeType, label:'Icon', color:'#ffffff', icon:'★'},
              ] as const).map(item=>(
                <button
                  key={item.type}
                  onClick={()=>{
                    const {wx, wy} = connectCreateMenu
                    createNodeAndConnect(item.type, wx, wy)
                  }}
                  style={{...menuItemStyle, padding:'7px 8px', borderRadius:8}}
                >
                  <span style={{...menuIconStyle, background: item.color==='transparent' ? 'transparent' : item.color, borderColor: item.type==='text' ? '#94a3b8' : 'var(--border)', borderStyle: item.type==='text' ? 'dashed' : 'solid', color: item.type==='text' ? '#64748b' : 'var(--text)', fontSize: item.type==='text' ? 10 : 12}}>{item.icon}</span>
                  <span style={{flex:1, textAlign:'left', fontWeight:600, fontSize:13}}>{item.label}</span>
                  <span style={{fontSize:10, color:'var(--muted)'}}>+→</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {(selectedIds.length>0 || selectedGroupIds.length>0 || !!selectedEdge) && (
        /* RIGHT PANEL */
        <aside style={{width: isRightPanelCollapsed ? 44 : 320, background:'var(--panel)', borderLeft:'1px solid var(--border)', display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0, transition:'width 0.22s cubic-bezier(0.2,0.8,0.2,1)'}}>
          <div style={{padding: isRightPanelCollapsed ? '10px 0' : '14px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent: isRightPanelCollapsed ? 'center' : 'space-between', flexDirection: isRightPanelCollapsed ? 'column' : 'row', gap: isRightPanelCollapsed ? 10 : 0}}>
            {isRightPanelCollapsed ? (
              <>
                <button onClick={()=> setIsRightPanelCollapsed(false)} title="Expand properties" aria-label="Expand properties" style={{width:28,height:28, borderRadius:8, border:'1px solid var(--border)', background:'var(--panel-2)', color:'var(--text)', display:'grid', placeItems:'center', cursor:'pointer', flexShrink:0}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div style={{writingMode:'vertical-rl', fontWeight:700, fontSize:11, letterSpacing:1.2, color:'var(--muted)', transform:'rotate(180deg)', userSelect:'none'}}>PROPERTIES</div>
              </>
            ) : (
              <>
                <div style={{fontWeight:700, fontSize:13, letterSpacing:0.4}}>PROPERTIES</div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  {(selectedIds.length||selectedGroupIds.length||selectedEdge) && <button onClick={deleteSelected} style={{background:'#ef4444', color:'white', border:'none', borderRadius:6, padding:'4px 8px', fontSize:12, fontWeight:600, cursor:'pointer'}}>Delete {selectedIds.length>1 ? `(${selectedIds.length})` : selectedGroupIds.length ? `(${selectedGroupIds.length} group${selectedGroupIds.length>1?'s':''})` : ''}</button>}
                  <button onClick={()=> setIsRightPanelCollapsed(true)} title="Collapse properties" aria-label="Collapse properties" style={{width:28,height:28, borderRadius:8, border:'1px solid var(--border)', background:'var(--panel-2)', color:'var(--muted)', display:'grid', placeItems:'center', cursor:'pointer', flexShrink:0}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {isRightPanelCollapsed && (selectedIds.length>0 || selectedGroupIds.length>0 || !!selectedEdge) && (
            <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:10, padding:'12px 0'}}>
              <div style={{width:30,height:30, borderRadius:9, background:'var(--panel-2)', border:'1px solid var(--border)', display:'grid', placeItems:'center', color:'var(--muted)', fontSize:12}} title={`${nodes.length} nodes \u2022 ${groups.length} groups \u2022 ${edges.length} connections`}>◧</div>
              <div style={{fontSize:9, color:'var(--muted)', writingMode:'vertical-rl', transform:'rotate(180deg)', letterSpacing:0.6, opacity:0.7}}>{nodes.length}N \u2022 {edges.length}E</div>
            </div>
          )}
          <div style={{flex:1, overflowY:'auto', padding:16, display: isRightPanelCollapsed ? 'none' : 'flex', flexDirection:'column', gap:18}}>
            {selectedNode && (
              <>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:40,height:40, borderRadius:10, background: selectedNode.color==='transparent' ? 'transparent' : selectedNode.color, border:'1px solid var(--border)', display:'grid', placeItems:'center', fontSize:16, overflow:'hidden', borderStyle: selectedNode.type==='text' ? 'dashed' : 'solid'}}>
                    {selectedNode.type==='image' && selectedNode.image ? <img src={selectedNode.image} style={{width:'100%', height:'100%', objectFit:'cover'}}/> : selectedNode.type==='icon' ? <span style={{display:'grid', placeItems:'center'}}><svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth={1.7} style={{display:'block'}}><LucideIcon icon={(selectedNode as any).icon||'star'} size={24} color="#0f172a" /></svg></span> : selectedNode.type==='decision'?'◇': selectedNode.type==='terminal'?'⬭': selectedNode.type==='io'?'▱': selectedNode.type==='image'?'🖼️': selectedNode.type==='text'?'Aa':'▭'}
                  </div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14}}>{selectedNode.type==='icon' ? ((selectedNode as any).icon || 'star') : (selectedNode.label || 'Untitled')}</div>
                    <div style={{fontSize:11, color:'var(--muted)'}}>{selectedNode.id} • {selectedNode.type}</div>
                  </div>
                </div>

                {selectedNode.type!=='icon' && (
                  <>
                    <div>
                      <label style={labelStyle}>Label</label>
                      <input value={selectedNode.label} onChange={e=>updateSelectedNode({label:e.target.value})} style={inputStyle} placeholder="Node label"/>
                    </div>

                    <div>
                      <label style={labelStyle}>Subtext <span style={{fontWeight:400, textTransform:'none', letterSpacing:0, color:'var(--muted)', fontSize:10}}>(below node • blank hides)</span></label>
                      <input value={selectedNode.subtext||''} onChange={e=>updateSelectedNode({subtext: e.target.value || undefined})} style={inputStyle} placeholder="e.g. details, owner, 5 min"/>
                    </div>

                    <div>
                      <label style={labelStyle}>Step</label>
                      <input type="number" value={selectedNode.step||''} onChange={e=> updateSelectedNode({ step: e.target.value ? e.target.value : undefined })} style={inputStyle} placeholder="e.g. 1" min={1} />
                      <div style={{fontSize:11, color:'var(--muted)', marginTop:4}}>Badge appears when set. Leave empty to hide.</div>
                    </div>
                  </>
                )}

                <div>
                  <label style={labelStyle}>Type</label>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:6}}>
                    {(['process','decision','terminal','io','image','text','icon'] as NodeType[]).map(t=>{
                      const nextColor = t==='text' ? 'transparent' : t==='icon' ? '#ffffff' : (selectedNode.color==='transparent' ? (NODE_DEFAULTS[t].color) : selectedNode.color)
                      const isIconType = t==='icon'
                      return <button key={t} onClick={()=>updateSelectedNode({type:t, imageFit: t==='image' ? (selectedNode.imageFit||'cover') : undefined, color: nextColor, ...(isIconType && !(selectedNode as any).icon ? {icon:'star'} as any : {}), ...(t==='text' && !(selectedNode as any).textBorder ? {textBorder:'none'} as any : {})})} style={{padding:'8px 4px', borderRadius:8, border: selectedNode.type===t? '1px solid #7c5cff':'1px solid var(--border)', background: selectedNode.type===t? 'rgba(124,92,255,0.10)':'var(--panel-2)', color: selectedNode.type===t? '#7c5cff':'var(--muted)', fontSize:9, fontWeight:700, cursor:'pointer', textTransform:'uppercase'}}>{t}</button>
                    })}
                  </div>
                </div>

                {selectedNode.type==='icon' && (
                  <div style={{display:'flex', flexDirection:'column', gap:10, background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:10, padding:12}}>
                    <div style={{fontSize:11, fontWeight:700, letterSpacing:0.6, color:'var(--muted)'}}>ICON</div>
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <div style={{width:48,height:48, borderRadius:10, background:'white', border:'1px solid var(--border)', display:'grid', placeItems:'center'}}>
                        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={(selectedNode as any).iconBorder && (selectedNode as any).iconBorder!=='transparent' ? (selectedNode as any).iconBorder : ((selectedNode as any).iconColor || '#0f172a')} strokeWidth={1.7} style={{display:'block'}}><LucideIcon icon={(selectedNode as any).icon||'star'} size={24} stroke={(selectedNode as any).iconBorder && (selectedNode as any).iconBorder!=='transparent' ? (selectedNode as any).iconBorder : ((selectedNode as any).iconColor || '#0f172a')} fill={(selectedNode as any).iconFill && (selectedNode as any).iconFill!=='transparent' ? (selectedNode as any).iconFill : 'none'} /></svg>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12, fontWeight:700, textTransform:'capitalize'}}>{(selectedNode as any).icon||'star'}</div>
                        <div style={{fontSize:11, color:'var(--muted)'}}>{ICON_IDS.length} icons available</div>
                      </div>
                      <button onClick={()=>{ setIconPickerFor(selectedNode.id); setIconSearch("") }} style={{background:'#7c5cff', color:'white', border:'none', borderRadius:8, padding:'8px 14px', fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap'}}>Choose Icon</button>
                    </div>
                    <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                      {ICON_IDS.slice(0,8).map(id=>(
                        <button key={id} onClick={()=>updateSelectedNode({icon:id} as any)} title={id} style={{width:36,height:36, borderRadius:8, background: (selectedNode as any).icon===id ? 'rgba(124,92,255,0.12)' : 'white', border: (selectedNode as any).icon===id ? '1.5px solid #7c5cff' : '1px solid var(--border)', display:'grid', placeItems:'center', cursor:'pointer'}}>
                          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={(selectedNode as any).icon===id ? '#7c5cff' : '#0f172a'} strokeWidth={1.6} style={{display:'block'}}><LucideIcon icon={id} size={24} color={(selectedNode as any).icon===id ? '#7c5cff' : '#0f172a'} /></svg>
                        </button>
                      ))}
                      <button onClick={()=>{ setIconPickerFor(selectedNode.id); setIconSearch("") }} style={{width:36,height:36, borderRadius:8, background:'var(--panel)', border:'1px dashed var(--border)', display:'grid', placeItems:'center', cursor:'pointer', fontSize:11, fontWeight:700, color:'var(--muted)'}}>+{ICON_IDS.length-8}</button>
                    </div>
                    <div style={{fontSize:11, color:'var(--muted)'}}>Pick an icon — also searchable in the library modal.</div>
                  </div>
                )}

                {selectedNode.type==='image' && (
                  <div style={{display:'flex', flexDirection:'column', gap:10, background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:10, padding:12}}>
                    <div style={{fontSize:11, fontWeight:700, letterSpacing:0.6, color:'var(--muted)'}}>IMAGE</div>
                    {selectedNode.image ? (
                      <div style={{position:'relative', borderRadius:10, overflow:'hidden', border:'1px solid var(--border)', background:'#f8fafc'}}>
                        <img src={selectedNode.image} style={{width:'100%', height:140, objectFit: selectedNode.imageFit==='contain' ? 'contain' : selectedNode.imageFit==='stretch' ? 'fill' : 'cover', display:'block', background:'#f1f5f9'}} />
                        <div style={{position:'absolute', top:6, right:6, display:'flex', gap:6}}>
                          <button onClick={()=>updateSelectedNode({image: undefined})} style={{background:'rgba(255,255,255,0.95)', border:'1px solid var(--border)', borderRadius:6, padding:'4px 8px', fontSize:11, fontWeight:600, cursor:'pointer'}}>Remove</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{border:'1.5px dashed var(--border-2)', borderRadius:10, padding:20, textAlign:'center', background:'var(--panel)'}}>
                        <div style={{fontSize:22, marginBottom:6}}>🖼️</div>
                        <div style={{fontSize:12, color:'var(--muted)'}}>No image yet</div>
                      </div>
                    )}
                    <div style={{display:'flex', gap:8}}>
                      <button onClick={()=>{ setPendingImagePos(null); // reuse image input to replace this node's image
                        const inp = document.createElement('input'); inp.type='file'; inp.accept='image/*'; inp.onchange = (e:any)=>{
                          const f = e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ const url=String(r.result); updateSelectedNode({image:url}); const im=new Image(); im.src=url; imageCacheRef.current.set(url, im)}; r.readAsDataURL(f)
                        }; inp.click()
                      }} style={{flex:1, background:'#7c5cff', color:'white', border:'none', borderRadius:8, padding:'8px 10px', fontSize:12, fontWeight:700, cursor:'pointer'}}>Upload</button>
                      <button onClick={()=>{ const url=prompt('Paste image URL (https://...)'); if(url){ updateSelectedNode({image:url}); const im=new Image(); im.crossOrigin='anonymous'; im.src=url; imageCacheRef.current.set(url, im) }}} style={{flex:1, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 10px', fontSize:12, fontWeight:600, cursor:'pointer'}}>URL</button>
                    </div>
                    <div>
                      <label style={{...labelStyle, marginBottom:4}}>Fit</label>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6}}>
                        {(['cover','contain','stretch'] as const).map(f=>(
                          <button key={f} onClick={()=>updateSelectedNode({imageFit:f})} style={{padding:'6px', borderRadius:7, border: selectedNode.imageFit===f || (!selectedNode.imageFit && f==='cover') ? '1px solid #7c5cff' : '1px solid var(--border)', background: selectedNode.imageFit===f || (!selectedNode.imageFit && f==='cover') ? 'rgba(124,92,255,0.10)':'var(--panel)', color: selectedNode.imageFit===f || (!selectedNode.imageFit && f==='cover') ? '#7c5cff':'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer', textTransform:'capitalize'}}>{f}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Image URL</label>
                      <input value={selectedNode.image||''} onChange={e=>{ const v=e.target.value; updateSelectedNode({image: v||undefined}); if(v){ const im=new Image(); im.crossOrigin='anonymous'; im.src=v; imageCacheRef.current.set(v, im) }}} placeholder="https://... or data URL" style={{...inputStyle, fontSize:11}} />
                    </div>
                  </div>
                )}

                {selectedNode.type==='icon' ? (
                  <div>
                    <label style={labelStyle}>Size</label>
                    <input type="number" min={24} step={1} value={selectedNode.w} onChange={e=>{ const v=parseInt(e.target.value); if(!isNaN(v)) updateSelectedNode({w: v, h: v}) }} style={inputStyle} placeholder="Size px"/>
                    <div style={{fontSize:11, color:'var(--muted)', marginTop:4}}>Resizing changes icon size directly — keeps square bounding box.</div>
                  </div>
                ) : (
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                    <div>
                      <label style={labelStyle}>Width</label>
                      <input type="number" min={20} step={1} value={selectedNode.w} onChange={e=>{ const v=parseInt(e.target.value); if(!isNaN(v)) updateSelectedNode({w: v}) }} style={inputStyle} placeholder="Width px"/>
                    </div>
                    <div>
                      <label style={labelStyle}>Height</label>
                      <input type="number" min={20} step={1} value={selectedNode.h} onChange={e=>{ const v=parseInt(e.target.value); if(!isNaN(v)) updateSelectedNode({h: v}) }} style={inputStyle} placeholder="Height px"/>
                    </div>
                  </div>
                )}

                {selectedNode.type==='icon' && (
                  <>
                    <div>
                      <label style={labelStyle}>Fill <span style={{fontWeight:400, textTransform:'none', letterSpacing:0, color:'var(--muted)', fontSize:10}}> (icon interior)</span></label>
                      <div style={{display:'flex', gap:6, flexWrap:'wrap', alignItems:'center'}}>
                        <button onClick={()=>updateSelectedNode({iconFill:'transparent'} as any)} title="Transparent (no fill)" style={{width:28,height:28, borderRadius:999, background:'transparent', border: ((selectedNode as any).iconFill==='transparent' || !(selectedNode as any).iconFill || (selectedNode as any).iconFill==='none') ? '2px solid #7c5cff':'1px dashed #94a3b8', cursor:'pointer', display:'grid', placeItems:'center', fontSize:10, fontWeight:700, color:'#64748b', boxShadow: ((selectedNode as any).iconFill==='transparent' || !(selectedNode as any).iconFill || (selectedNode as any).iconFill==='none') ? '0 0 0 2px rgba(124,92,255,0.3)':undefined}}>∅</button>
                        {['#ffffff','#fffbeb','#ecfdf5','#f5f3ff','#e0e7ff','#fef3c7','#dcfce7','#ede9fe'].map(c=>(
                          <button key={c} onClick={()=>updateSelectedNode({iconFill:c} as any)} style={{width:28,height:28, borderRadius:999, background:c, border: (selectedNode as any).iconFill===c? '2px solid #7c5cff':'1px solid var(--border)', cursor:'pointer', boxShadow: (selectedNode as any).iconFill===c? '0 0 0 2px rgba(124,92,255,0.3)':undefined}} title={c}/>
                        ))}
                        <input type="color" value={(selectedNode as any).iconFill==='transparent' || !(selectedNode as any).iconFill || (selectedNode as any).iconFill==='none' ? '#ffffff' : (selectedNode as any).iconFill} onChange={e=>updateSelectedNode({iconFill:e.target.value} as any)} style={{width:28,height:28, padding:0, border:'none', borderRadius:999, overflow:'hidden', cursor:'pointer'}}/>
                      </div>
                      <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>Fill of the icon glyph itself. Transparent = stroke only (default).</div>
                    </div>
                    <div>
                      <label style={labelStyle}>Border</label>
                      <div style={{display:'flex', gap:6, flexWrap:'wrap', alignItems:'center'}}>
                        {['#0f172a','#334155','#475569','#64748b','#7c5cff','#0ea5e9','#22c55e','#ef4444','#f59e0b','#ffffff'].map(c=>(
                          <button key={c} onClick={()=>updateSelectedNode({iconBorder:c, iconColor:c} as any)} style={{width:28,height:28, borderRadius:999, background:c, border: ((selectedNode as any).iconBorder|| (selectedNode as any).iconColor || '#0f172a')===c? '2px solid #7c5cff':'1px solid var(--border)', cursor:'pointer', boxShadow: ((selectedNode as any).iconBorder|| (selectedNode as any).iconColor || '#0f172a')===c? '0 0 0 2px rgba(124,92,255,0.3)':undefined}} title={c}/>
                        ))}
                        <input type="color" value={(selectedNode as any).iconBorder && (selectedNode as any).iconBorder!=='transparent' ? (selectedNode as any).iconBorder : ((selectedNode as any).iconColor || '#0f172a')} onChange={e=>updateSelectedNode({iconBorder:e.target.value, iconColor:e.target.value} as any)} style={{width:28,height:28, padding:0, border:'none', borderRadius:999, overflow:'hidden', cursor:'pointer'}}/>
                      </div>
                      <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>Border / stroke color of the icon glyph.</div>
                    </div>
                  </>
                )}

                {selectedNode.type!=='icon' && (
                  <div>
                    <label style={labelStyle}>{selectedNode.type==='text' ? 'Background' : 'Fill Color'} {selectedNode.type==='text' && <span style={{fontWeight:400, textTransform:'none', letterSpacing:0, color:'var(--muted)', fontSize:10}}> (transparent = no fill)</span>}</label>
                    <div style={{display:'flex', gap:6, flexWrap:'wrap', alignItems:'center'}}>
                      {selectedNode.type==='text' && (
                        <button onClick={()=>updateSelectedNode({color:'transparent'})} title="Transparent (dashed bounding box)" style={{width:28,height:28, borderRadius:999, background:'transparent', border: selectedNode.color==='transparent'? '2px solid #7c5cff':'1px dashed #94a3b8', cursor:'pointer', display:'grid', placeItems:'center', fontSize:10, fontWeight:700, color:'#64748b', boxShadow: selectedNode.color==='transparent'? '0 0 0 2px rgba(124,92,255,0.3)':undefined}}>∅</button>
                      )}
                      {['#ffffff','#fffbeb','#ecfdf5','#f5f3ff','#e0e7ff','#fef3c7','#dcfce7','#ede9fe'].map(c=>(
                        <button key={c} onClick={()=>updateSelectedNode({color:c})} style={{width:28,height:28, borderRadius:999, background:c, border: selectedNode.color===c? '2px solid #7c5cff':'1px solid var(--border)', cursor:'pointer', boxShadow: selectedNode.color===c? '0 0 0 2px rgba(124,92,255,0.3)':undefined}}/>
                      ))}
                      <input type="color" value={selectedNode.color==='transparent' ? '#ffffff' : (selectedNode.color||'#ffffff')} onChange={e=>updateSelectedNode({color:e.target.value})} style={{width:28,height:28, padding:0, border:'none', borderRadius:999, overflow:'hidden'}}/>
                    </div>
                    {selectedNode.type==='text' && <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>Rectangle bounding box is used for connection points — border style set above (none hides rectangle).</div>}
                  </div>
                )}

                {selectedNode.type==='text' && (
                  <div>
                    <label style={labelStyle}>Border</label>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:6}}>
                      {(['none','dotted','dashed','solid'] as TextBorder[]).map(b=>{
                        const cur = ((selectedNode as any).textBorder as TextBorder) || 'none'
                        const active = cur===b
                        const previewStyle: any = b==='none' ? {background:'transparent', border:'1px dashed #cbd5e1'} : b==='dotted' ? {background:'white', border:'1.6px dotted #94a3b8'} : b==='dashed' ? {background:'white', border:'1.6px dashed #94a3b8'} : {background:'white', border:'1.6px solid #94a3b8'}
                        // for dotted use dotted, for dashed use dashed
                        if(b==='dotted') previewStyle.border = '1.6px dotted #94a3b8'
                        return (
                          <button key={b} onClick={()=>updateSelectedNode({textBorder:b} as any)} title={b} style={{padding:'8px 4px', borderRadius:8, border: active ? '1.5px solid #7c5cff' : '1px solid var(--border)', background: active ? 'rgba(124,92,255,0.10)' : 'var(--panel-2)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
                            <span style={{width:28, height:14, borderRadius:4, ...previewStyle, display:'block'}} />
                            <span style={{fontSize:10, fontWeight:700, color: active ? '#7c5cff' : 'var(--muted)', textTransform:'capitalize'}}>{b}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>No border hides rectangle; Dashed/Dotted/Solid set bounding-box style. Still used for connections (invisible when none).</div>
                  </div>
                )}

                <div style={{background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:10, padding:10}}>
                  <div style={{fontSize:11, fontWeight:700, letterSpacing:0.6, color:'var(--muted)', marginBottom:6}}>POSITION</div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                    <div><div style={labelStyle}>X</div><input type="number" value={Math.round(selectedNode.x)} onChange={e=>updateSelectedNode({x: parseInt(e.target.value)||0})} style={inputStyle}/></div>
                    <div><div style={labelStyle}>Y</div><input type="number" value={Math.round(selectedNode.y)} onChange={e=>updateSelectedNode({y: parseInt(e.target.value)||0})} style={inputStyle}/></div>
                  </div>
                </div>
              </>
            )}

            {selectedIds.length>1 && !selectedNode && (
              <>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:40,height:40, borderRadius:10, background:'#7c5cff', color:'white', display:'grid', placeItems:'center', fontSize:14, fontWeight:800, boxShadow:'0 4px 12px rgba(124,92,255,0.25)'}}>{selectedIds.length}</div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14}}>{selectedIds.length} nodes selected</div>
                    <div style={{fontSize:11, color:'var(--muted)'}}>{selectedIds.slice(0,3).join(', ')}{selectedIds.length>3?' …':''} • Shift+click to toggle</div>
                  </div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button onClick={()=> setSelectedIds([])} style={{flex:1, ...btnGhost, background:'var(--panel)', padding:'8px 10px', justifyContent:'center'}}>Clear selection</button>
                  <button onClick={deleteSelected} style={{flex:1, background:'#ef4444', color:'white', border:'none', borderRadius:8, padding:'8px 10px', fontWeight:700, fontSize:12, cursor:'pointer'}}>Delete {selectedIds.length}</button>
                </div>
                <div style={{background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:10, padding:12, display:'flex', flexDirection:'column', gap:10}}>
                  <div style={{fontSize:11, fontWeight:700, letterSpacing:0.6, color:'var(--muted)'}}>BULK EDIT • {selectedIds.length} nodes</div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                    <button onClick={()=>{ const c=prompt('Fill color hex (e.g. #ffffff)'); if(c) updateSelectedNode({color:c}) }} style={{padding:'8px', borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer'}}>Set color…</button>
                    <button onClick={()=>{ const l=prompt('Step value (empty to clear)'); if(l!==null) updateSelectedNode({step: l || undefined}) }} style={{padding:'8px', borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer'}}>Set step…</button>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                    <button onClick={()=>{ const s=prompt('Subtext (empty to clear — shows below node)'); if(s!==null) updateSelectedNode({subtext: s || undefined}) }} style={{padding:'8px', borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer'}}>Set subtext…</button>
                    <button onClick={()=> updateSelectedNode({subtext: undefined})} style={{padding:'8px', borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer'}}>Clear subtext</button>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr 1fr', gap:6}}>
                    {(['process','decision','terminal','io','image','text','icon'] as NodeType[]).map(t=>(
                      <button key={t} onClick={()=>updateSelectedNode({type:t, color: t==='text' ? 'transparent' : t==='icon' ? '#ffffff' : t==='image' ? '#ffffff' : undefined, ...(t==='icon' ? {icon:'star'} as any : {}), ...(t==='text' ? {textBorder:'none'} as any : {})})} style={{padding:'7px 2px', borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--muted)', fontSize:7, fontWeight:700, cursor:'pointer', textTransform:'uppercase'}}>{t.slice(0,4)}</button>
                    ))}
                  </div>
                  <div style={{display:'flex', gap:6}}>
                    <button onClick={()=>{ const dx=-20; setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, x:n.x+dx} : n))}} style={{flex:1, padding:'6px', borderRadius:7, border:'1px solid var(--border)', background:'var(--panel)', cursor:'pointer', fontSize:11}}>← 20</button>
                    <button onClick={()=>{ const dx=20; setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, x:n.x+dx} : n))}} style={{flex:1, padding:'6px', borderRadius:7, border:'1px solid var(--border)', background:'var(--panel)', cursor:'pointer', fontSize:11}}>20 →</button>
                    <button onClick={()=>{ const dy=-20; setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, y:n.y+dy} : n))}} style={{flex:1, padding:'6px', borderRadius:7, border:'1px solid var(--border)', background:'var(--panel)', cursor:'pointer', fontSize:11}}>↑ 20</button>
                    <button onClick={()=>{ const dy=20; setNodes(ns=> ns.map(n=> selectedIds.includes(n.id) ? {...n, y:n.y+dy} : n))}} style={{flex:1, padding:'6px', borderRadius:7, border:'1px solid var(--border)', background:'var(--panel)', cursor:'pointer', fontSize:11}}>↓ 20</button>
                  </div>
                  <div style={{fontSize:11, color:'var(--muted)', background:'var(--panel)', border:'1px solid var(--border)', borderRadius:6, padding:'6px 8px'}}>Tip: Drag any selected node to move all. Hold <b style={{color:'var(--text)'}}>Shift</b> to add/remove, drag empty canvas to box-select. Shift+drag box adds.</div>
                </div>
              </>
            )}

            {selectedGroupIds.length===1 && !selectedNode && (()=>{ const g=getGroup(selectedGroupIds[0]); if(!g) return null; return (
              <>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:40,height:40, borderRadius:10, background: g.color || '#f8fafc', border:'1px solid var(--border)', display:'grid', placeItems:'center', fontSize:16, color:'#7c5cff'}}>⬜</div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14}}>{g.label || 'Group'}</div>
                    <div style={{fontSize:11, color:'var(--muted)'}}>{g.id} • {nodes.filter(n=>n.groupId===g.id).length} nodes</div>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Group Label</label>
                  <input value={g.label} onChange={e=>updateSelectedGroup({label:e.target.value})} style={inputStyle} placeholder="Group name"/>
                </div>
                <div>
                  <label style={labelStyle}>Background</label>
                  <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                    {['#f8fafc','#f1f5f9','#fef3c7','#ecfdf5','#e0e7ff','#f5f3ff','#ffe4e6','#fef9c3'].map(c=>(
                      <button key={c} onClick={()=>updateSelectedGroup({color:c})} style={{width:28,height:28, borderRadius:9, background:c, border: g.color===c? '2px solid #7c5cff':'1px solid var(--border)', cursor:'pointer', boxShadow: g.color===c? '0 0 0 2px rgba(124,92,255,0.15)':undefined}} />
                    ))}
                    <input type="color" value={g.color||'#f8fafc'} onChange={e=>updateSelectedGroup({color:e.target.value})} style={{width:28,height:28, padding:0, border:'none', borderRadius:9, overflow:'hidden'}}/>
                  </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                  <div>
                    <label style={labelStyle}>Width</label>
                    <input type="number" min={40} step={1} value={g.w} onChange={e=>{ const v=parseInt(e.target.value); if(!isNaN(v)) updateSelectedGroup({w: v}) }} style={inputStyle} placeholder="Width px"/>
                  </div>
                  <div>
                    <label style={labelStyle}>Height</label>
                    <input type="number" min={40} step={1} value={g.h} onChange={e=>{ const v=parseInt(e.target.value); if(!isNaN(v)) updateSelectedGroup({h: v}) }} style={inputStyle} placeholder="Height px"/>
                  </div>
                </div>
                <div style={{background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:10, padding:10}}>
                  <div style={{fontSize:11, fontWeight:700, letterSpacing:0.6, color:'var(--muted)', marginBottom:6}}>POSITION</div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                    <div><div style={labelStyle}>X</div><input type="number" value={Math.round(g.x)} onChange={e=>updateSelectedGroup({x: parseInt(e.target.value)||0})} style={inputStyle}/></div>
                    <div><div style={labelStyle}>Y</div><input type="number" value={Math.round(g.y)} onChange={e=>updateSelectedGroup({y: parseInt(e.target.value)||0})} style={inputStyle}/></div>
                  </div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button onClick={ungroupSelected} style={{flex:1, padding:'8px', borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--muted)', fontSize:12, fontWeight:600, cursor:'pointer'}}>Ungroup</button>
                  <button onClick={()=>{ if(confirm('Delete group (nodes will be kept, ungrouped)?')){ const id=g.id; setGroups(gs=>gs.filter(x=>x.id!==id)); setNodes(ns=>ns.map(n=> n.groupId===id? {...n, groupId:undefined}:n)); setSelectedGroupIds([]); setToast('Group deleted'); setTimeout(()=>setToast(null),1500) }}} style={{flex:1, padding:'8px', borderRadius:8, border:'1px solid #fecaca', background:'#fef2f2', color:'#ef4444', fontSize:12, fontWeight:600, cursor:'pointer'}}>Delete Group</button>
                </div>
                <div style={{fontSize:11, color:'var(--muted)', background:'var(--panel)', border:'1px solid var(--border)', borderRadius:8, padding:8}}>Tip: Drag the group to move all {nodes.filter(n=>n.groupId===g.id).length} member nodes together. Right-click the group → Connect to wire arrows to the rectangle.</div>
              </>
            )})()}

            {selectedGroupIds.length>1 && (
              <>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:40,height:40, borderRadius:10, background:'#7c5cff', color:'white', display:'grid', placeItems:'center', fontSize:13, fontWeight:800}}>{selectedGroupIds.length}</div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14}}>{selectedGroupIds.length} groups selected</div>
                    <div style={{fontSize:11, color:'var(--muted)'}}>{selectedGroupIds.join(', ')}</div>
                  </div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button onClick={()=> setSelectedGroupIds([])} style={{flex:1, ...{background:'var(--panel-2)', color:'var(--muted)', border:'1px solid var(--border)', borderRadius:999, padding:'6px 10px', fontSize:12, fontWeight:600, cursor:'pointer'}, padding:'8px 10px', justifyContent:'center'}}>Clear</button>
                  <button onClick={ungroupSelected} style={{flex:1, background:'#ef4444', color:'white', border:'none', borderRadius:8, padding:'8px 10px', fontWeight:700, fontSize:12, cursor:'pointer'}}>Ungroup All</button>
                </div>
              </>
            )}

            {selectedEdgeObj && (
              <>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:40,height:40, borderRadius:10, background:'var(--panel-2)', border:'1px solid var(--border)', display:'grid', placeItems:'center', color:'#7c5cff'}}>→</div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14}}>Connection</div>
                    <div style={{fontSize:11, color:'var(--muted)'}}>{selectedEdgeObj.from} → {selectedEdgeObj.to}</div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Label</label>
                  <input value={selectedEdgeObj.label||''} onChange={e=>updateSelectedEdge({label:e.target.value})} style={inputStyle} placeholder="e.g. yes / no / 200ms (empty = no label)"/>
                  <div style={{fontSize:10, color:'var(--muted)', marginTop:4}}>Label appears on the straight arrow midpoint. Double-click arrow to quick-edit.</div>
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                  <div>
                    <label style={labelStyle}>Alignment</label>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:4}}>
                      {[null,'top',null,'left','center','right',null,'bottom',null].map((a,i)=> a ? (
                        <button key={a} onClick={()=>updateSelectedEdge({labelAlign:a as EdgeLabelAlign})} style={{padding:'6px 4px', borderRadius:7, border: (selectedEdgeObj.labelAlign||'top')===a ? '1px solid #7c5cff':'1px solid var(--border)', background: (selectedEdgeObj.labelAlign||'top')===a ? 'rgba(124,92,255,0.10)':'var(--panel-2)', color: (selectedEdgeObj.labelAlign||'top')===a ? '#7c5cff':'var(--muted)', fontSize:10, fontWeight:600, cursor:'pointer', textTransform:'capitalize'}}>{a}</button>
                      ) : <div key={`empty-${i}`} />)}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Text size</label>
                    <input type="number" min={8} value={selectedEdgeObj.labelSize||10} onChange={e=>{ const v=parseInt(e.target.value); if(!isNaN(v)) updateSelectedEdge({labelSize: v}) }} style={inputStyle} placeholder="10" />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Label Colors</label>
                  <div style={{display:'flex', flexDirection:'column', gap:8}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 10px'}}>
                      <span style={{fontSize:12, fontWeight:600, color:'var(--muted)'}}>Background</span>
                      <input type="color" value={selectedEdgeObj.labelBg || '#ffffff'} onChange={e=>updateSelectedEdge({labelBg: e.target.value})} style={{width:32, height:32, padding:2, border:'1px solid var(--border)', borderRadius:8, cursor:'pointer'}} />
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 10px'}}>
                      <span style={{fontSize:12, fontWeight:600, color:'var(--muted)'}}>Border</span>
                      <input type="color" value={selectedEdgeObj.labelBorder || '#e2e8f0'} onChange={e=>updateSelectedEdge({labelBorder: e.target.value})} style={{width:32, height:32, padding:2, border:'1px solid var(--border)', borderRadius:8, cursor:'pointer'}} />
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:8, padding:'8px 10px'}}>
                      <span style={{fontSize:12, fontWeight:600, color:'var(--muted)'}}>Text</span>
                      <input type="color" value={selectedEdgeObj.labelColor || '#475569'} onChange={e=>updateSelectedEdge({labelColor: e.target.value})} style={{width:32, height:32, padding:2, border:'1px solid var(--border)', borderRadius:8, cursor:'pointer'}} />
                    </div>
                  </div>
                  <div style={{display:'flex', gap:6, marginTop:8}}>
                    <button onClick={()=>updateSelectedEdge({labelBg: undefined, labelBorder: undefined, labelColor: undefined})} style={{flex:1, padding:'6px', borderRadius:7, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer'}}>Reset to default</button>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Connection Points</label>
                  <div style={{fontSize:11, color:'var(--muted)', marginBottom:6}}>Drag the white handles at each end to reposition. Double-click a handle to reset to auto.</div>
                  <div style={{display:'flex', gap:8}}>
                    <button onClick={()=>updateSelectedEdge({fromAngle: undefined} as any)} style={{flex:1, padding:'6px', borderRadius:7, border:'1px solid var(--border)', background: (selectedEdgeObj as any).fromAngle!==undefined ? 'rgba(124,92,255,0.10)':'var(--panel)', color: (selectedEdgeObj as any).fromAngle!==undefined ? '#7c5cff':'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer'}}>Reset Start {(selectedEdgeObj as any).fromAngle!==undefined ? '●' : ''}</button>
                    <button onClick={()=>updateSelectedEdge({toAngle: undefined} as any)} style={{flex:1, padding:'6px', borderRadius:7, border:'1px solid var(--border)', background: (selectedEdgeObj as any).toAngle!==undefined ? 'rgba(124,92,255,0.10)':'var(--panel)', color: (selectedEdgeObj as any).toAngle!==undefined ? '#7c5cff':'var(--muted)', fontSize:11, fontWeight:600, cursor:'pointer'}}>Reset End {(selectedEdgeObj as any).toAngle!==undefined ? '●' : ''}</button>
                  </div>
                  {((selectedEdgeObj as any).fromAngle!==undefined || (selectedEdgeObj as any).toAngle!==undefined) && (
                    <button onClick={()=>updateSelectedEdge({fromAngle: undefined, toAngle: undefined} as any)} style={{width:'100%', marginTop:6, padding:'6px', borderRadius:7, border:'1px solid #fecaca', background:'#fef2f2', color:'#ef4444', fontSize:11, fontWeight:600, cursor:'pointer'}}>Reset Both to Auto</button>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>Style</label>
                  <div style={{display:'grid', gap:6}}>
                    {(['solid','dashed','animated','flow'] as EdgeStyle[]).map(s=>(
                      <button key={s} onClick={()=>updateSelectedEdge({style:s, animated: s==='animated'||s==='flow'})} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:10, border: selectedEdgeObj.style===s? '1px solid #7c5cff':'1px solid var(--border)', background: selectedEdgeObj.style===s? 'rgba(124,92,255,0.10)':'var(--panel-2)', cursor:'pointer'}}>
                        <span style={{fontSize:12, fontWeight:700, textTransform:'capitalize', color: selectedEdgeObj.style===s? '#7c5cff':'var(--text)'}}>{s} {s==='animated'?'⚡': s==='flow'?'●':''}</span>
                        <span style={{fontSize:11, color:'var(--muted)'}}>{s==='flow'?'particles': s==='animated'?'moving dashes': s==='dashed'?'static dash':'solid'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Animation Speed: {selectedEdgeObj.speed.toFixed(1)}x</label>
                  <input type="range" min={0.2} max={3} step={0.1} value={selectedEdgeObj.speed} onChange={e=>updateSelectedEdge({speed: parseFloat(e.target.value)})} style={{width:'100%'}}/>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--muted)'}}><span>Slow</span><span>Fast</span></div>
                </div>
              </>
            )}
          </div>
        </aside>
        )}
      </div>

      {exportModal && (
        <div onClick={()=> setExportModal(null)} style={{position:'fixed', inset:0, background:'rgba(15,23,42,0.45)', display:'grid', placeItems:'center', zIndex:55, padding:16}}>
          <div onClick={e=> e.stopPropagation()} style={{width:'100%', maxWidth:480, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:18, boxShadow:'0 24px 64px rgba(15,23,42,0.18), 0 8px 20px rgba(15,23,42,0.08)', overflow:'hidden', maxHeight:'90vh', display:'flex', flexDirection:'column'}}>
            {/* header */}
            <div style={{padding:'18px 20px 14px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div style={{width:36, height:36, borderRadius:9, background: exportModal==='json' ? '#f1f5f9' : exportModal==='gif' ? '#f5f3ff' : '#0f172a', color: exportModal==='json' ? '#475569' : exportModal==='gif' ? '#7c5cff' : 'white', display:'grid', placeItems:'center', fontWeight:800, fontSize:12, border:'1px solid var(--border)', flexShrink:0}}>
                  {exportModal==='json' ? 'JS' : exportModal==='gif' ? 'GIF' : 'WEBM'}
                </div>
                <div>
                  <div style={{fontWeight:800, fontSize:15, letterSpacing:'-0.01em'}}>{exportModal==='json' ? 'Export JSON' : exportModal==='gif' ? 'Export GIF' : 'Export WebM'}</div>
                  <div style={{fontSize:11, color:'var(--muted)'}}>{exportModal==='json' ? `${nodes.length} nodes • ${edges.length} connections • ${nodes.filter(n=>n.image).length ? 'with images' : 'vector only'}` : exportModal==='gif' ? 'Animated GIF with 256-color quantization' : 'VP9 video • captureStream'} - {String(exportModal).toUpperCase()} settings</div>
                </div>
              </div>
              <button onClick={()=> setExportModal(null)} style={{width:32, height:32, borderRadius:999, border:'1px solid var(--border)', background:'var(--panel-2)', color:'var(--muted)', display:'grid', placeItems:'center', cursor:'pointer', flexShrink:0}}>✕</button>
            </div>
            {/* body */}
            <div style={{padding:18, overflowY:'auto', display:'flex', flexDirection:'column', gap:16, flex:1}}>
              {exportModal==='json' && (
                <>
                  <div>
                    <label style={labelStyle}>File name</label>
                    <div style={{display:'flex', gap:8, alignItems:'center'}}>
                      <input value={jsonSettings.fileName} onChange={e=> setJsonSettings(s=> ({...s, fileName: e.target.value}))} placeholder="anigram" style={{...inputStyle, flex:1}} />
                      <span style={{fontSize:12, color:'var(--muted)', whiteSpace:'nowrap'}}>.json</span>
                    </div>
                    <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>Saved as <code style={{background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:4, padding:'1px 5px', fontSize:11}}>{(jsonSettings.fileName.trim()||'anigram').replace(/[^a-z0-9-_]/gi,'_')}-{new Date().toISOString().slice(0,10)}-… .json</code></div>
                  </div>
                  <label style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'10px 12px', border:'1px solid var(--border)', borderRadius:10, background:'var(--panel-2)', cursor:'pointer'}}>
                    <div>
                      <div style={{fontSize:13, fontWeight:600}}>Include viewport</div>
                      <div style={{fontSize:11, color:'var(--muted)'}}>Save zoom & pan position</div>
                    </div>
                    <input type="checkbox" checked={jsonSettings.includeViewport} onChange={e=> setJsonSettings(s=> ({...s, includeViewport: e.target.checked}))} style={{width:18, height:18, accentColor:'#7c5cff'}} />
                  </label>
                  <label style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'10px 12px', border:'1px solid var(--border)', borderRadius:10, background:'var(--panel-2)', cursor:'pointer'}}>
                    <div>
                      <div style={{fontSize:13, fontWeight:600}}>Pretty print</div>
                      <div style={{fontSize:11, color:'var(--muted)'}}>Human-readable indented JSON</div>
                    </div>
                    <input type="checkbox" checked={jsonSettings.pretty} onChange={e=> setJsonSettings(s=> ({...s, pretty: e.target.checked}))} style={{width:18, height:18, accentColor:'#7c5cff'}} />
                  </label>
                  <div style={{fontSize:11, color:'var(--muted)', background:'#f8fafc', border:'1px solid var(--border)', borderRadius:10, padding:10}}>
                    Contains all nodes, edges, colors, images (as data URLs), step numbers and animation speeds. Drop the file back onto canvas to restore.
                  </div>
                </>
              )}
              {exportModal==='gif' && (
                <>
                  <div style={{fontSize:13, color:'var(--muted)', lineHeight:1.6, background:'#f5f3ff', border:'1px solid #ddd6fe', borderRadius:12, padding:14}}>
                    <div style={{fontWeight:800, color:'#7c5cff', marginBottom:6, fontSize:13}}>Maximum Quality GIF — always exports at ultra</div>
                    <div>• <b style={{color:'var(--text)'}}>2400×1600</b> ultra (2×) — crisp scaled from 1200×800 design via <code style={{background:'white', padding:'1px 4px', borderRadius:4, border:'1px solid #ddd6fe'}}>scale 2</code> + <code style={{background:'white', padding:'1px 4px', borderRadius:4}}>imageSmoothingQuality: high</code></div>
                    <div>• <b style={{color:'var(--text)'}}>60 frames</b> at <b>33ms</b> (~30fps) — smooth 2s loop, time-based `off`</div>
                    <div>• <b style={{color:'var(--text)'}}>256 colors rgb565</b> — quantize rgb565 + applyPalette (flat-vector optimized)</div>
                    <div>• File: <code style={{background:'white', padding:'1px 4px', borderRadius:4}}>anigram-2400x1600-30fps.gif</code> • {(2400*1600*4*60/1024/1024).toFixed(1)} MB raw</div>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)'}}>
                    <span>{nodes.length} nodes • {edges.length} edges • {groups.length} groups</span>
                    <span>60 frames • 2400×1600 • 30fps</span>
                  </div>
                </>
              )}
              {exportModal==='webm' && (
                <>
                  <div style={{fontSize:13, color:'white', background:'#0f172a', borderRadius:12, padding:14, border:'1px solid #1e293b', lineHeight:1.6}}>
                    <div style={{fontWeight:800, marginBottom:6, color:'#a78bfa'}}>Maximum Quality WebM — always exports at ultra, true 60fps</div>
                    <div>• <b style={{color:'white'}}>2400×1600</b> ultra (2×) — crisp scaled via <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>scale 2</code> + <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>imageSmoothingQuality: high</code></div>
                    <div>• <b style={{color:'white'}}>60fps</b> true 60fps capture via <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>canvas.captureStream(60)</code> + time-based <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>off = elapsed*0.36</code> + <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>requestAnimationFrame</code> at 60fps (fixed — previously off+=6 caused drift)</div>
                    <div>• <b style={{color:'white'}}>12 Mbps VP9</b> — <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>video/webm;codecs=vp9</code> fallback <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>video/webm</code>, 4s loop, <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4, color:'#e2e8f0'}}>alpha:false</code></div>
                    <div>• File: <code style={{background:'rgba(255,255,255,0.15)', padding:'1px 4px', borderRadius:4}}>anigram-2400x1600-60fps-…webm</code> • Fixed — no quality selector (always max)</div>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)'}}>
                    <span>{nodes.length} nodes • {groups.length} groups • {edges.length} edges</span>
                    <span>2400×1600 • 60fps • 12 Mbps • 4s</span>
                  </div>
                </>
              )}
            </div>
            {/* footer */}
            <div style={{padding:14, borderTop:'1px solid var(--border)', background:'var(--panel-2)', display:'flex', justifyContent:'flex-end', gap:10}}>
              <button onClick={()=> setExportModal(null)} style={{...btnGhost, background:'var(--panel)', padding:'9px 16px'}}>Cancel</button>
              <button onClick={()=>{ const m = exportModal; setExportModal(null); setTimeout(()=>{ if(m==='json') exportJson(); else if(m==='gif') exportGif(); else if(m==='webm') exportWebM() }, 80)}} style={{...btnPrimary, padding:'9px 18px', background: exportModal==='webm' ? '#0f172a' : '#7c5cff', boxShadow:'0 4px 16px rgba(124,92,255,0.25)'}}>
                {exportModal==='json' ? 'Export JSON' : exportModal==='gif' ? `Export GIF • 2400×1600` : `Export WebM • 2400×1600 60fps`}
              </button>
            </div>
          </div>
        </div>
      )}

      {iconPickerFor && ( ()=>{ const targetNode = nodes.find(n=> n.id===iconPickerFor); const currentIcon = (targetNode as any)?.icon || 'star'; const filtered = ICON_IDS.filter(id=> !iconSearch || id.toLowerCase().includes(iconSearch.toLowerCase()) ); return (
        <div onClick={()=> setIconPickerFor(null)} style={{position:'fixed', inset:0, background:'rgba(15,23,42,0.45)', display:'grid', placeItems:'center', zIndex:65, padding:16}}>
          <div onClick={e=> e.stopPropagation()} style={{width:'100%', maxWidth:560, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:18, boxShadow:'0 24px 64px rgba(15,23,42,0.18), 0 8px 20px rgba(15,23,42,0.08)', overflow:'hidden', maxHeight:'90vh', display:'flex', flexDirection:'column'}}>
            <div style={{padding:'16px 20px 12px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
              <div>
                <div style={{fontWeight:800, fontSize:15}}>Choose Icon</div>
                <div style={{fontSize:11, color:'var(--muted)'}}>{ICON_IDS.length} icons • {targetNode ? `for ${targetNode.label||targetNode.id} • current: ${currentIcon}` : ''} — click to select</div>
              </div>
              <button onClick={()=> setIconPickerFor(null)} style={{width:32, height:32, borderRadius:999, border:'1px solid var(--border)', background:'var(--panel-2)', color:'var(--muted)', display:'grid', placeItems:'center', cursor:'pointer'}}>✕</button>
            </div>
            <div style={{padding:12, borderBottom:'1px solid var(--border)', background:'var(--panel-2)'}}>
              <div style={{position:'relative'}}>
                <span style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', pointerEvents:'none'}}><svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={11} cy={11} r={8} /><path d="m21 21-4.3-4.3" /></svg></span>
                <input value={iconSearch} onChange={e=> setIconSearch(e.target.value)} placeholder="Search icons (e.g. star, cloud, database)" style={{...inputStyle, paddingLeft:34, background:'var(--panel)'}} />
              </div>
            </div>
            <div style={{padding:14, overflowY:'auto', flex:1, background:'var(--panel)'}}>
              {filtered.length===0 ? <div style={{padding:20, textAlign:'center', color:'var(--muted)', fontSize:13}}>No icons match “{iconSearch}”</div> : (
                iconSearch ? (
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(72px, 1fr))', gap:10}}>
                    {filtered.map(id=>{
                      const isActive = id===currentIcon
                      return (
                        <button key={id} onClick={()=>{
                          setNodes(ns=> ns.map(n=> n.id===iconPickerFor ? {...n, icon:id} as any : n))
                          setIconPickerFor(null)
                          setToast(`Icon: ${id}`); setTimeout(()=>setToast(null),1200)
                        }} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'10px 6px', borderRadius:12, border: isActive ? '1.5px solid #7c5cff' : '1px solid var(--border)', background: isActive ? 'rgba(124,92,255,0.10)' : 'var(--panel-2)', cursor:'pointer'}}>
                          <span style={{width:36,height:36, borderRadius:8, background: isActive ? 'rgba(124,92,255,0.12)' : 'white', border:'1px solid var(--border)', display:'grid', placeItems:'center'}}>
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={isActive ? '#7c5cff' : '#0f172a'} strokeWidth={1.7} style={{display:'block'}}><LucideIcon icon={id} size={24} color={isActive ? '#7c5cff' : '#0f172a'} /></svg>
                          </span>
                          <span style={{fontSize:10, fontWeight:600, color: isActive ? '#7c5cff' : 'var(--muted)', textAlign:'center', lineHeight:1.1, wordBreak:'break-word'}}>{id}</span>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div style={{display:'flex', flexDirection:'column', gap:18}}>
                    {ICON_CATEGORY_ORDER.map(cat=>{
                      const ids = (ICON_CATEGORIES[cat] as string[]).filter(id=> filtered.includes(id))
                      if(!ids.length) return null
                      return (
                        <div key={cat}>
                          <div style={{fontSize:11, fontWeight:800, letterSpacing:0.6, color:'var(--muted)', marginBottom:8, display:'flex', alignItems:'center', gap:8, position:'sticky', top:0, background:'var(--panel)', padding:'4px 0', zIndex:1}}>
                            <span>{cat}</span>
                            <span style={{fontSize:10, color:'var(--muted)', background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:999, padding:'1px 6px', fontWeight:700}}>{ids.length}</span>
                            <span style={{flex:1, height:1, background:'var(--border)', marginLeft:8}} />
                          </div>
                          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(72px, 1fr))', gap:10}}>
                            {ids.map(id=>{
                              const isActive = id===currentIcon
                              return (
                                <button key={id} onClick={()=>{
                                  setNodes(ns=> ns.map(n=> n.id===iconPickerFor ? {...n, icon:id} as any : n))
                                  setIconPickerFor(null)
                                  setToast(`Icon: ${id}`); setTimeout(()=>setToast(null),1200)
                                }} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'10px 6px', borderRadius:12, border: isActive ? '1.5px solid #7c5cff' : '1px solid var(--border)', background: isActive ? 'rgba(124,92,255,0.10)' : 'var(--panel-2)', cursor:'pointer'}}>
                                  <span style={{width:36,height:36, borderRadius:8, background: isActive ? 'rgba(124,92,255,0.12)' : 'white', border:'1px solid var(--border)', display:'grid', placeItems:'center'}}>
                                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={isActive ? '#7c5cff' : '#0f172a'} strokeWidth={1.7} style={{display:'block'}}><LucideIcon icon={id} size={24} color={isActive ? '#7c5cff' : '#0f172a'} /></svg>
                                  </span>
                                  <span style={{fontSize:10, fontWeight:600, color: isActive ? '#7c5cff' : 'var(--muted)', textAlign:'center', lineHeight:1.1, wordBreak:'break-word'}}>{id}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              )}
            </div>
            <div style={{padding:12, borderTop:'1px solid var(--border)', background:'var(--panel-2)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontSize:11, color:'var(--muted)'}}>{filtered.length} icons • Tip: you can also type to filter</span>
              <button onClick={()=> setIconPickerFor(null)} style={{...btnGhost, background:'var(--panel)', padding:'8px 14px'}}>Done</button>
            </div>
          </div>
        </div>
      )})()}

      {toast && (
        <div style={{position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#ffffff', border:'1px solid var(--border)', color:'var(--text)', padding:'10px 16px', borderRadius:999, fontSize:13, fontWeight:600, boxShadow:'0 8px 32px rgba(15,23,42,0.12)', zIndex:60, display:'flex', alignItems:'center', gap:8}}>
          <span style={{width:8,height:8, borderRadius:999, background:'#22c55e', boxShadow:'0 0 8px #22c55e'}}/>
          {toast}
        </div>
      )}

      {exporting && (
        <div style={{position:'fixed', inset:0, background:'rgba(15,23,42,0.32)', display:'grid', placeItems:'center', zIndex:50}}>
          <div style={{background:'var(--panel)', border:'1px solid var(--border)', borderRadius:16, padding:24, width:360, textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.5)'}}>
            <div style={{width:48,height:48, borderRadius:999, background:'rgba(124,92,255,0.15)', border:'1px solid rgba(124,92,255,0.3)', display:'grid', placeItems:'center', margin:'0 auto 12px', fontSize:20}}>◐</div>
            <div style={{fontWeight:700, fontSize:16}}>{exporting==='gif' ? 'Encoding GIF...' : 'Recording WebM...'}</div>
            <div style={{fontSize:12, color:'var(--muted)', marginTop:4}}>{exportProgress}% complete • {exporting==='gif' ? 'Quantizing 256 colors' : 'Capturing 30 FPS'}</div>
            <div style={{height:6, background:'var(--panel-2)', borderRadius:999, marginTop:14, overflow:'hidden', border:'1px solid var(--border)'}}>
              <div style={{height:'100%', width:`${exportProgress}%`, background:'linear-gradient(90deg,#7c5cff,#4f46e5)', transition:'width 0.2s'}}/>
            </div>
          </div>
        </div>
      )}
    </div>
    </ToolShell>
  )
}

function ToolButton({active, onClick, icon, label, desc}:{active:boolean, onClick:()=>void, icon:string, label:string, desc:string}){
  return (
    <button onClick={onClick} style={{width:52, display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'8px 4px', borderRadius:12, border: active? '1px solid #7c5cff':'1px solid transparent', background: active? 'rgba(124,92,255,0.10)':'transparent', color: active? '#7c5cff':'var(--muted)', cursor:'pointer'}}>
      <span style={{width:28,height:28, borderRadius:8, background: active? '#7c5cff':'var(--panel-2)', color: active? 'white':'var(--muted)', display:'grid', placeItems:'center', fontSize:14, border:'1px solid var(--border)'}}>{icon}</span>
      <span style={{fontSize:10, fontWeight:700}}>{label}</span>
      <span style={{fontSize:8, opacity:0.6}}>{desc}</span>
    </button>
  )
}
function AddButton({color, label, diamond, pill, skew, draggableType, onDragAdd}:{color:string, label:string, diamond?:boolean, pill?:boolean, skew?:boolean, draggableType?: NodeType, onDragAdd?: (type:NodeType, x:number, y:number)=>void}){
  const isText = draggableType==='text'
  const isIcon = draggableType==='icon'
  const isImage = draggableType==='image'
  const handleDragStart = (e: React.DragEvent)=>{
    if(!draggableType) return
    e.dataTransfer.setData('application/anigram-node-type', draggableType)
    e.dataTransfer.effectAllowed='copy'
    // custom ghost: small card
    const ghost = document.createElement('div')
    ghost.style.position='absolute'; ghost.style.top='-1000px'
    ghost.style.width='80px'; ghost.style.height='36px'; ghost.style.borderRadius='8px'
    ghost.style.background=isText ? 'transparent' : color; ghost.style.border=isText ? '1.2px dashed #94a3b8' : isIcon ? '1px solid #e2e8f0' : '1px solid #e2e8f0'
    ghost.style.display='grid'; ghost.style.placeItems='center'; ghost.style.fontSize='11px'; ghost.style.fontWeight='700'; ghost.style.color='#64748b'
    ghost.textContent=label
    document.body.appendChild(ghost)
    e.dataTransfer.setDragImage(ghost, 40, 18)
    setTimeout(()=> ghost.remove(), 0)
  }
  if(draggableType){
    return (
      <div draggable onDragStart={handleDragStart} title={`Drag ${label} to canvas`} style={{width:52, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'6px 4px', borderRadius:10, border:'1px solid var(--border)', background:'var(--panel-2)', cursor:'grab', userSelect:'none'}}>
        <span style={{width:28,height:20, background:isText ? 'transparent' : color, border: isText ? '1.2px dashed #94a3b8' : '1px solid var(--border-2)', borderRadius: isText ? 6 : isIcon ? 8 : isImage ? 6 : pill?999: diamond?2:6, transform: diamond? 'rotate(45deg) scale(0.7)': skew? 'skewX(-12deg)':undefined, display:'grid', placeItems:'center', pointerEvents:'none', fontSize:10, fontWeight:700, color:'#64748b', overflow:'hidden', lineHeight:1}}>{isText ? 'Aa' : isIcon ? <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#7c5cff" strokeWidth={1.7} style={{display:'block'}}><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg> : isImage ? <span style={{fontSize:12, lineHeight:1, display:'grid', placeItems:'center'}}>🖼️</span> : ''}</span>
        <span style={{fontSize:9, fontWeight:600, color:'var(--muted)', textAlign:'center', lineHeight:1, pointerEvents:'none'}}>{label}</span>
      </div>
    )
  }
  // fallback for non-draggable (not used)
  return (
    <button onClick={()=> onDragAdd && draggableType && onDragAdd(draggableType, 0, 0)} style={{width:52, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'6px 4px', borderRadius:10, border:'1px solid var(--border)', background:'var(--panel-2)', cursor:'pointer'}}>
      <span style={{width:28,height:20, background:color, border:'1px solid var(--border-2)', borderRadius: pill?999: diamond?2:6, transform: diamond? 'rotate(45deg) scale(0.7)': skew? 'skewX(-12deg)':undefined, display:'block'}}/>
      <span style={{fontSize:9, fontWeight:600, color:'var(--muted)', textAlign:'center', lineHeight:1}}>{label}</span>
    </button>
  )
}
function StylePreview({label, desc, dash, color='#3a3a52', animated, dots}:{label:string, desc:string, dash:string, color?:string, animated?:boolean, dots?:boolean}){
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 12px'}}>
      <svg width="64" height="16" viewBox="0 0 64 16">
        <path d="M0 8 H 48" stroke={color} strokeWidth={2.5} strokeDasharray={dash || undefined} strokeLinecap="round" opacity={0.9}/>
        {dots && <circle cx={32} cy={8} r={3} fill="#a78bfa" stroke="#7c5cff"/>}
        <path d="M 48 3 L 58 8 L 48 13" fill={color}/>
        {animated && <rect width={64} height={16} fill="transparent"><animate attributeName="stroke-dashoffset" values="0;26" dur="0.8s" repeatCount="indefinite"/></rect>}
      </svg>
      <div>
        <div style={{fontSize:12, fontWeight:700}}>{label}</div>
        <div style={{fontSize:11, color:'var(--muted)'}}>{desc}</div>
      </div>
    </div>
  )
}

const btnPrimary: React.CSSProperties = {background:'#7c5cff', color:'white', border:'none', borderRadius:999, padding:'8px 14px', fontWeight:700, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 8px rgba(124,92,255,0.20)'}
const btnGhost: React.CSSProperties = {background:'var(--panel-2)', color:'var(--muted)', border:'1px solid var(--border)', borderRadius:999, padding:'6px 10px', fontSize:12, fontWeight:600, cursor:'pointer'}
const menuItemStyle: React.CSSProperties = {width:'100%', display:'flex', alignItems:'center', gap:10, padding:'8px 8px', borderRadius:8, border:'none', background:'transparent', color:'var(--text)', cursor:'pointer', textAlign:'left' as const}
const menuIconStyle: React.CSSProperties = {width:28, height:28, borderRadius:7, background:'var(--panel-2)', border:'1px solid var(--border)', display:'grid', placeItems:'center', fontSize:11, fontWeight:700, color:'var(--text)', flexShrink:0}
void ToolButton
const menuDividerStyle: React.CSSProperties = {height:1, background:'var(--border)', margin:'6px 4px'}
void menuDividerStyle
const smallIconBtn: React.CSSProperties = {width:28,height:28, borderRadius:8, border:'1px solid var(--border)', background:'var(--panel)', color:'var(--text)', cursor:'pointer', display:'grid', placeItems:'center', fontWeight:700}
const labelStyle: React.CSSProperties = {fontSize:11, fontWeight:700, letterSpacing:0.6, color:'var(--muted)', display:'block', marginBottom:6}
const inputStyle: React.CSSProperties = {width:'100%', background:'var(--panel-2)', border:'1px solid var(--border)', borderRadius:8, padding:'9px 10px', color:'var(--text)', fontSize:13, outline:'none'}
const sectionLabel: React.CSSProperties = {fontSize:10, fontWeight:800, letterSpacing:1, color:'var(--muted)', marginBottom:8}
void StylePreview
void sectionLabel
