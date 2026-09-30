# AGENTS.md — Anigram

> **⚠️ MANDATORY: Update this file every time Anigram is updated.**
> Any change to `src/App.tsx`, the JSON schema, node/edge types, export logic, or UI must be reflected here immediately. This file is the single source of truth for AI-generated diagrams. If you modify the app and do not update this file, AI agents will generate invalid JSON.

---

## 1. What is Anigram?

**Anigram** is a 2D animated flowchart / diagram editor built with React + Vite + TypeScript. It runs in the browser, has a light-theme canvas with infinite pan/zoom, and lets users:

- Create flowcharts from 5 node types (`process`, `decision`/`diamond`, `terminal`/`pill`, `io`/`parallelogram`, `image`)
- Wire nodes with 4 animated edge styles (`solid`, `dashed`, `animated` (moving dashes), `flow` (traveling dots)) with arrows and speed control
- Add numbered step badges (`1`, `2a`, etc.) — rendered as purple circles
- Add custom images as nodes (data-URL or remote URL, `cover`/`contain`/`stretch`)
- Multi-select (Shift+click, drag-box) and drag groups
- Export **JSON** (source of truth), **GIF** (`gifenc` 256-color quantization), and **WebM** (`MediaRecorder VP9` via `canvas.captureStream`) through per-export modals
- Import JSON via `Menu → Import JSON` or drag-drop `.json` onto canvas; drag-drop images onto canvas creates image nodes

**Tech stack:** React 19, Vite 8, `gifenc`, `react`/`react-dom`, canvas 2D. All rendering is SVG for editing + offscreen canvas for export. No backend.

**Run:**

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build → dist/
```

---

## 2. JSON File Format — Complete Spec

Anigram JSON files are what AI agents should generate. The app reads/writes a single JSON object. It is imported via Menu or drop, and exported via Menu/Export pill modals.

### 2.1 Top-level object

```ts
{
  version: 1,                 // number, currently 1
  createdAt: "2025-08-31T...",// ISO string (optional, auto-set on export)
  app: "anigram",             // string, optional identifier
  viewport?: {                // optional, if missing defaults to {zoom:1, pan:{x:0,y:0}}
    zoom: number,             // 0.3 - 2.0
    pan: { x:number, y:number }
  },
  nodes: Node[],
  edges: Edge[],
  groups?: Group[]         // optional, group rectangles that can contain nodes and be connected to
}
// Also accepts legacy/alternate wrappers: { data: {nodes,edges,groups} } or { diagram: {nodes,edges,groups} }
// The importer does: raw.nodes ? raw : raw.data ? raw.data : raw
```

### 2.2 Node

```ts
type NodeType = 'process' | 'decision' | 'terminal' | 'io' | 'image'

interface Node {
  id: string              // unique, must start with letter. Use "n1","n2" or uid. Required.
  x: number               // top-left X in world coords (canvas is ~1200x800 virtual). Required.
  y: number               // top-left Y. Required.
  w: number               // width px, 80-240 (defaults: process 160x72, decision 160x110, terminal 160x64, io 160x72, image 180x120)
  h: number               // height px, 40-160
  type: NodeType          // Required. Controls shape & default color.
  label: string           // Text inside node. "" allowed. Supports "\n" for multiline (except decision which splits on space into 2 lines)
  color?: string          // CSS hex, e.g. "#ffffff", "#fffbeb", "#ecfdf5", "#f5f3ff". If missing, NODE_DEFAULTS color is used.
  image?: string          // Only for type==='image' (but allowed on any). Data URL (data:image/png;base64,...) or https:// URL. Stored as-is in JSON (data URLs make JSON large but portable). Optional.
  imageFit?: 'cover'|'contain'|'stretch' // default 'cover'. Only relevant if image is set.
  step?: string           // numbered badge like "1", "2a", "A". If present and non-empty, purple circle badge is shown (top-left for rect, above tip for diamond). Optional.
  subtext?: string        // small text below node (pill at y+h+10, r7, fill rgba(124,92,255,0.10)). Replaces old type badge (DECISION/IO etc. no longer shown). If blank/undefined, nothing is rendered below node. Optional.
  groupId?: string        // if set, node is bound to group rectangle with this id. Moving the group moves all its member nodes by same delta. Optional.
}
interface Group {
  id: string              // unique, e.g. "g1"
  x: number               // top-left X of group rectangle
  y: number               // top-left Y
  w: number               // width 120-600, default 340
  h: number               // height 80-500, default 220
  label: string           // header text, e.g. "Frontend Feature"
  color?: string          // background fill, default "#f8fafc" (light) with dashed stroke #cbd5e1, selected #7c5cff
}
}
```

**Geometry:** `x,y` is top-left of the *bounding box* (`w×h`). For `decision` (diamond) the diamond is inscribed in that box: points at `(x+w/2,y)`, `(x+w,y+h/2)`, `(x+w/2,y+h)`, `(x,y+h/2)`. For `terminal` (pill) `rx=999`, for `io` skewed 16px parallelogram. For `process`/`image` rounded `rx=12`.

**Colors (light theme):** defaults are:
- `process: #ffffff`, `decision: #fffbeb` (amber-50), `terminal: #ecfdf5` (emerald-50), `io: #f5f3ff` (violet-50), `image: #ffffff`
- Palette suggestions: `#ffffff`, `#fffbeb`, `#ecfdf5`, `#f5f3ff`, `#e0e7ff`, `#fef3c7`, `#dcfce7`, `#ede9fe`. Any hex is valid. Stroke is `#e2e8f0` (light) unless selected (`#7c5cff`).

**Images:** Prefer data URLs for portability. Remote URLs require CORS (`crossOrigin='anonymous'`) for GIF/WebM export; otherwise canvas becomes tainted and export will be blank/white. The app caches images in `imageCacheRef`.

**Steps:** If `step` is set, a `r=12` purple `#7c5cff` circle with white `11px 800` text is drawn. For `decision` at `(x+w/2, y-10)`, otherwise at `(x+14, y+14)`. Exported to canvas as well.

**Subtext:** If `subtext` is non-empty, a pill is drawn below the node at `y+h+10` centered (`w = max(48, sub.length*6.5+16), h=14, r7, fill rgba(124,92,255,0.10) stroke rgba(124,92,255,0.20), text 9px 600 #7c5cff`). Replaces the old type badge (`DECISION`/`IO` etc. is no longer rendered). If `subtext` is `undefined`, `null`, `""` or whitespace, no pill is shown. Canvas and SVG both respect this. AI should set `subtext` to a short detail like `"5 min"`, `"Owner: Alice"`, or leave blank to hide.

**Groups:** `Group` is a dashed rounded rect (`r12`, `stroke #cbd5e1` dashed `8 6`, `fill #f8fafc`, selected `#7c5cff`, header `28px` `rgba(241,245,249,0.95)` with label `700 11px` + member count `10px`). Created via left toolbar `Group` (empty `340×220` at viewport center) or `Group Selected` (bounds of `selectedIds` + `pad20` + `header28`, auto-assigns `groupId` to members). Nodes with `groupId` move with group by `dx,dy` delta (`dragGroupMemberInitials`). Groups are selectable (`selectedGroupIds`, `Shift+click` multi, box-select), draggable (moves members), connectable (`Edge.from/to` may be a group `id`, endpoint via `getNodeEdgePoint` ray-polygon as rect), editable in Properties (label, color `[...8]`, `w/h` sliders `120-600`/`80-500`, `x/y` inputs, `Ungroup`/`Delete Group` which keeps nodes but clears `groupId`), and exported/imported as `groups` array (if missing, `[]`).

### 2.3 Edge

```ts
type EdgeStyle = 'solid' | 'dashed' | 'animated' | 'flow'

type EdgeLabelAlign = 'center'|'top'|'bottom'|'left'|'right'
interface Edge {
  id: string              // unique, e.g. "e1"
  from: string            // source node id, must exist in nodes
  to: string              // target node id, must exist
  label?: string          // small pill label on edge, e.g. "yes", "no", "data". Optional, "" hides it. Click line to select, double-click to quick-add.
  labelAlign?: EdgeLabelAlign // where label sits relative to straight midpoint. 'top' (default) = offset -uy*14/+ux*14 above line, 'bottom' opposite, 'left' = -ux*22/-uy*22 toward start, 'right' = +ux*22/+uy*22 toward end, 'center' = on line.
  labelSize?: number      // 8-20 px, default 10 (SVG) / 12 (canvas). Controls pill text size and pill height (size+8).
  style: EdgeStyle        // Required.
  animated: boolean       // Should be true if style==='animated'||'flow', false otherwise. Kept for legacy, but style drives rendering.
  speed: number           // 0.2 - 3.0, default 1. Speed of dash/particles. 1 = normal, 1.2 = slightly faster.
}
```

**Rendering:** Straight line `lineTo` between **shape-aware endpoints** `getEdgeEndpoints(a,b)` where `start = getNodeEdgePoint(a, ux,uy)` and `end = getNodeEdgePoint(b, -ux,-uy)` via **ray-polygon intersection** (not `a.h/2`). Polygons: `process`/`image` rect `[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]`, `decision` diamond `[[x+w/2,y],[x+w,y+h/2],[x+w/2,y+h],[x,y+h/2]]` analytic `t=1/(|ux|/hw+|uy|/hh)`, `io` parallelogram `[[x+skew,y],[x+w,y],[x+w-skew,y+h],[x,y+h]]` `skew=16`, `terminal` pill as stadium polygon (`r=h/2`, `pts [x+r,y]→[x+w-r,y]→8-pt right semicircle→[x+w-r,y+h]→[x+r,y+h]→8-pt left semicircle`). Ray `center + t*(ux,uy)` intersected against polygon edges via `t=(dx*ey - dy*ex)/(ux*ey - uy*ex)` picking smallest `t>=0, u∈[0,1]`; fallback `min(hw/|ux|, hh/|uy|)`. Endpoints nudged `+ux*2`/`-ux*2` gap so arrow sits exactly on outside bounds of each shape. Arrowhead `14px` triangle `fill #9ca3af` for solid, `#7c5cff` for others, angle `atan2(dy,dx)` where `dx=endX-startX`. `dashed`=`10 8`, `animated`=`16 10` dash `offset=(animOffset*0.6*speed)%26`, `flow`=`14 14` +3 dots linear `x=startX+t*(endX-startX)` `t=(off*0.008*speed+i/3)%1`. **Label** white pill `r6` at straight midpoint `mx,my` offset by `labelAlign` as above, `fontSize=labelSize`. Top bar "Select & Drag nodes" removed — only "Connecting from X → pick target" with Cancel when `connectFrom` set.

### 2.4 Viewport

```ts
viewport: { zoom: number, pan: {x:number, y:number} }
```

Exported if `jsonSettings.includeViewport` is true (default). Import restores `zoom`/`pan` if present.

### 2.5 Validation (what the importer checks)

```js
nextNodes = data.nodes.filter(n=> n && typeof n.id==='string' && typeof n.x==='number' && typeof n.y==='number')
nextEdges = data.edges.filter(ed=> ed && typeof ed.from==='string' && typeof ed.to==='string')
if (!Array.isArray(nextNodes) || !Array.isArray(nextEdges)) throw
if (nextNodes.length===0) throw "No valid nodes"
```

Edges with missing `from`/`to` nodes are still stored but not rendered (guard `if(!a||!b) return`). Duplicates are allowed but IDs should be unique (`uid('n')` style). `w/h` defaults are not auto-filled on import — supply them.

---

## 3. How AI Agents Should Generate Diagrams

### 3.1 Minimal valid file

```json
{
  "version": 1,
  "app": "anigram",
  "viewport": { "zoom": 1, "pan": { "x": 0, "y": 0 } },
  "nodes": [
    { "id": "n1", "x": 100, "y": 80, "w": 180, "h": 64, "type": "terminal", "label": "Start", "color": "#ecfdf5", "step": "1" },
    { "id": "n2", "x": 110, "y": 200, "w": 160, "h": 72, "type": "process", "label": "Fetch Data", "color": "#ffffff", "step": "2" }
  ],
  "edges": [
    { "id": "e1", "from": "n1", "to": "n2", "style": "animated", "animated": true, "speed": 1, "label": "" }
  ]
}
```

### 3.2 Full featured example (with images, steps, all edge styles)

```json
{
  "version": 1,
  "createdAt": "2025-08-31T12:00:00.000Z",
  "app": "anigram",
  "viewport": { "zoom": 1, "pan": { "x": 0, "y": 0 } },
  "nodes": [
    { "id": "n1", "x": 100, "y": 80, "w": 180, "h": 64, "type": "terminal", "label": "Start", "color": "#ecfdf5", "step": "1" },
    { "id": "n2", "x": 110, "y": 200, "w": 160, "h": 72, "type": "process", "label": "Fetch Data", "color": "#ffffff", "step": "2", "subtext": "API call" },
    { "id": "n3", "x": 90, "y": 340, "w": 200, "h": 110, "type": "decision", "label": "Valid ?", "color": "#fffbeb", "step": "3" },
    { "id": "n4", "x": 40, "y": 520, "w": 150, "h": 72, "type": "process", "label": "Handle Error", "color": "#ffffff", "step": "4" },
    { "id": "n5", "x": 250, "y": 520, "w": 150, "h": 72, "type": "io", "label": "Render Result", "color": "#f5f3ff", "step": "5", "subtext": "5 min" },
    { "id": "n6", "x": 260, "y": 680, "w": 180, "h": 64, "type": "terminal", "label": "End", "color": "#ecfdf5", "step": "6" },
    { "id": "n7", "x": 420, "y": 200, "w": 180, "h": 120, "type": "image", "label": "Logo", "color": "#ffffff", "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...", "imageFit": "cover", "step": "7", "subtext": "Brand" },
  ],
  "edges": [
    { "id": "e1", "from": "n1", "to": "n2", "style": "animated", "animated": true, "speed": 1, "label": "" },
    { "id": "e2", "from": "n2", "to": "n3", "style": "flow", "animated": true, "speed": 1.2, "label": "data" },
    { "id": "e3", "from": "n3", "to": "n4", "style": "animated", "animated": true, "speed": 1, "label": "no", "labelAlign": "top", "labelSize": 10 },
    { "id": "e4", "from": "n3", "to": "n5", "style": "animated", "animated": true, "speed": 1, "label": "yes", "labelAlign": "right", "labelSize": 12 },
    { "id": "e5", "from": "n5", "to": "n6", "style": "dashed", "animated": false, "speed": 1, "label": "" },
    { "id": "e6", "from": "n4", "to": "n6", "style": "solid", "animated": false, "speed": 1, "label": "" },
    { "id": "e7", "from": "n2", "to": "n7", "style": "solid", "animated": false, "speed": 1, "label": "ref" }
  ]
}
```

### 3.3 Layout guidance for AI

- **Coordinate space:** Default canvas export is `1200×800`. Keep nodes inside roughly `x 0-1000, y 0-750`. Avoid overlap: leave at least `40px` gutter. The app auto-pans, but dense layouts become unreadable.
- **Sizes:** Don't go below `80×40` or above `240×160`. Use defaults unless you need a wide label.
- **Flow direction:** Usually top→bottom or left→right. Sort nodes by `y` (then `x`) for `autoNumber` compatibility. The `Menu → Auto-number 1…N` sorts by `y` then `x`.
- **Edges:** `from`/`to` must reference existing node ids. Use `animated` for primary flow, `flow` for heavy data movement (shows dots), `dashed` for optional/secondary, `solid` for static. `speed 0.8-1.4` is visually pleasant; `>2` is very fast.
- **Labels:** Node `label` is centered, `13px 600`. Keep it short (`<20` chars) or use `\n` for multiline (except decision). Edge `label` is a white pill (`fill #ffffff` `stroke #e2e8f0` `r6`) at straight midpoint offset by `labelAlign` (`center` on line, `top` `-uy*14/+ux*14` default, `bottom` opposite, `left` `-ux*22/-uy*22`, `right` `+ux*22/+uy*22`) and sized by `labelSize` 8-20 (default 10 SVG / 12 canvas, pill `h=size+8`, `w=max(36, len*size*0.62+16)`). Click line to select, double-click to prompt for text, alignment & size editable in Properties → Label — click arrow to attach text.
- **Steps:** If you want numbered steps, set `step` on every node (`"1"…"N"`). The app's `Bulk Edit → Auto-number 1…N` will fill them, but AI should pre-fill for clarity.
- **Subtext:** Optional short text below node (`y+h+10` pill, `r7`, `w=max(48,len*6.5+16) h14`). Replaces old type badge `DECISION`/`IO` etc. Set `subtext` like `"5 min"`, `"Owner: Alice"`, or omit/blank to hide. If `subtext` is whitespace/empty, no pill is rendered (canvas+SVG). Use for details, timing, assignee.
- **Images:** For `type:'image'`, always supply `w:180,h:120` (or similar 3:2) and `image` as data URL for portability. If using remote URL, ensure CORS `Access-Control-Allow-Origin:*` or export will white-out. Use `imageFit:'cover'` (default) for cropping, `contain` for letterbox.
- **Colors:** Use light-theme pastels from the defaults or any hex. Don't use dark fills (`#0f...`) — they will render with dark text `#0f172a` and look broken. Stick to the palette in §2.2.
- **Unique IDs:** Use `n1..nN` and `e1..eN` sequentially. Never reuse an id. `uid('n')` in code is `n` + 7-char base36.
- **Viewport:** If you omit `viewport`, the app uses current view. If you include it, set `zoom:1, pan:{x:0,y:0}` for centered default.

### 3.4 Prompt template for AI

```
You are generating JSON for Anigram, a flowchart editor. Output ONLY valid JSON matching the AGENTS.md spec.
Requirements:
- version 1, app "anigram", nodes[], edges[], viewport {zoom:1, pan:{x:0,y:0}}
- 5-8 nodes, types from [process, decision, terminal, io, image], with x,y,w,h,step, optional `subtext` (e.g. "subtext":"Owner: Bob" or omit to hide) and optional `groupId` to bind to a group
- 0-2 groups `id, x, y, w, h, label, color` (e.g., `g1` `340×290` at `40,30` `f8fafc`); edges may use group `id` as `from`/`to` for connections to the rectangle (`g1 → n4`)
- 4-7 edges, styles from [solid,dashed,animated,flow], animated true if style animated/flow, speed 0.6-1.4, labels where helpful with `labelAlign` center|top|bottom|left|right (default top) and `labelSize` 8-20
- Layout top-to-bottom, x~80-400, y spacing ~120px, no overlap
- Use light colors from the spec, labels short
- If the user request mentions steps, set step "1"..."N" on every node
- If images requested, use data URLs or note remote CORS risk
Return JSON only, no markdown.
```

---

## 4. Import / Export Workflow

- **Import:** `Menu → Import JSON` (file picker) or drag-drop `.json` onto canvas. Also `Menu → Import JSON` handles `.json` with or without `viewport`. Images dropped as files create `image` nodes at drop position.
- **Export:** Header `EXPORT` pill (`JSON`/`GIF`/`WebM`) and `Menu → Export …` all open an **Export Modal** (not the old right-panel card) — always maximum quality (no quality selectors, fixed ultra):
  - **JSON modal:** file name input (sanitized), `Include viewport` checkbox (default true), `Pretty print` checkbox (default true)
  - **GIF modal:** fixed `2400×1600` ultra (2×) crisp `scale 2` + `imageSmoothingQuality:'high'`, `60 frames` at `33ms` (~30fps) 2s loop, `256 colors rgb565` `quantize(data,256,{format:'rgb565'})` + `applyPalette(..., 'rgb565')`, file `anigram-2400x1600-30fps-…gif` (previously selectable `600×400` half-res was low quality).
  - **WebM modal:** fixed `2400×1600` ultra (2×) crisp, `4s` loop, **true `60fps`** via `canvas.captureStream(60)` + time-based `off = elapsed*0.36` + `requestAnimationFrame` 60fps (fixed `off+=6` drift), `12 Mbps VP9` `video/webm;codecs=vp9` fallback `video/webm`, `alpha:false`, `imageSmoothingQuality:'high'`, file `anigram-2400x1600-60fps-…webm` — always max (previously selectable `5|8|12 Mbps` `15|30|60 fps` `600×400` was low quality).
- All exports include nodes, edges, colors, images (data URLs), steps. GIF/WebM also capture animated dash/particle offset (`animOffset`) and step badges.

---

## 5. Canvas Behavior (for AI context)

- Light theme: `bg #f6f7fb`, `panel #ffffff`, `canvas #fcfdff`, grid `#e4e6ed`, text `#0f172a`, accent `#7c5cff`.
- Tools: `Select (V)` (Shift+click multi, drag-box select, Shift+box additive, drag group), `Connect (C)` (click source then target), `Pan (H)` / `Alt+drag` / wheel zoom `0.3-2.0` **mouse-relative** (wheel `onWheel` now computes `newPan = mouse - world*newZoom` with `world=(mouse-pan)/zoom` so zoom anchors to cursor, not top-left; button `+`/`−` zoom to viewport center `rect.width/2, rect.height/2` similarly), middle-click pan.
- **Create & Connect:** While `connectFrom` is set (connection mode after right-click → Connect, or `Connect (C)`), left-clicking blank canvas space opens a **Create & Connect** context menu (`connectCreateMenu`) listing node types (`process`/`decision`/`terminal`/`io`/`text`/`icon`); choosing one creates that node at the click position and adds an `animated` edge from the source (`connectFrom`) to the new node (source may be a node or group id). Esc/outside-click closes the menu; the top-bar Cancel button still aborts connection mode.
- `user-select: none` on canvas (SVG text not selectable) to prevent accidental selection while dragging.
- Step badges, image clipPaths (`rx=12`), and edge arrows are part of both SVG and canvas export.
- **Delete:** `Delete` / `Backspace` (when `document.activeElement` is not `input`/`textarea`/`select`/`contenteditable` and `exportModal` is closed) deletes `selectedIds` nodes (and incident `edges`), `selectedGroupIds` groups (ungroups members, deletes group edges), or `selectedEdge` connection; header `Delete` button and `window keydown` handler share `deleteSelected` logic with toast (`Deleted node`/`Deleted 3 nodes`/`Deleted group` etc.).
- **Properties pane:** Right-side pane `320px` is **collapsible** (`isRightPanelCollapsed` `useState(false)`, width `44px` collapsed vs `320px` expanded, `transition:width 0.22s`). Header shows `Collapse` (`>` chevron) when expanded and `Expand` (`<` chevron) when collapsed; collapsed state shows vertical `PROPERTIES` label + `◧` stats (`N•E` counts) and hides scrollable content (`display:none`), canvas flex-expands to fill. Toggle is via header button; no persistence.

---

## 6. Maintenance — Keep This File Updated

**This section is mandatory.** Every time Anigram is changed, update `AGENTS.md` before committing.

Checklist when modifying the app:

- [ ] If you add/remove/modify any field in `Node` or `Edge` (including `step`, `image`, `color`, new types/styles), update §2.2 / §2.3 and examples in §3.2.
- [ ] If you change coordinate logic, defaults (`NODE_DEFAULTS`), or theme colors, update §2.2 and §3.3.
- [ ] If you change import validation (`filter` logic, wrapper handling), update §2.5.
- [ ] If you change export modalities (new resolution, duration, fps, bitrate, JSON options), update §4 and §3.1/3.2 examples.
- [ ] If you change UI that AI might reference (Menu items, drag-drop, auto-number behavior), update §4 and §5.
- [ ] If you add a new sample to `samples/` / `public/samples/`, update §7 table, the `Menu → Samples` list in `src/App.tsx` (`loadSample`), and `samples/README.md`.
- [ ] Bump `version` in example JSON if you introduce a breaking schema change (and note migration).
- [ ] Test an AI-generated JSON (minimal example from §3.1) imports without errors before merging.

Add a changelog entry at the bottom of this file (e.g., `## Changelog — 2025-08-31: added image nodes`).

---

## 7. Example Files & Samples Folder

**Samples folder:** `samples/` (repo) is duplicated to `public/samples/` so Vite serves them at `/samples/<name>.json` (`dist/samples/` after build). The app's `Menu → Samples ▸` **submenu** (hover or click `Samples` to open fly-out `Choose Sample` to the right, `left:calc(100%+8px)`) loads them via `fetch("/samples/<name>")` → `setNodes`/`setEdges`/`viewport` (see `loadSample` and `samplesMenuOpen` in `src/App.tsx`, `overflow:visible` on dropdown). Keep `AGENTS.md`, `samples/README.md`, and the submenu in sync when you add samples.

| File | Description | Nodes | Showcases |
|------|-------------|-------|-----------|
| `01-onboarding-flow.json` | Simple onboarding: Start → Create Account → Email Verified? → Send Activation / Dashboard → Done | 6 | `terminal`/`process`/`decision`/`io`, `animated`/`flow`/`dashed`, `labelAlign`/`labelSize`, `step` `1…6`, `subtext` |
| `02-ecommerce-checkout.json` | E-commerce checkout with product image: Browse → Sneakers (image `https://picsum.photos`) → Add to Cart → In Stock? → Checkout → Payment OK? → Order Complete / Error | 9 | `image` remote CORS, `subtext`, all edge styles, `right`/`top` alignment |
| `03-ci-pipeline.json` | CI/CD pipeline: Push → Tests → Tests Pass? → Notify/Build → Deploy Staging → Manual Approval? → Deploy Prod → Done (+ Rollback loop) | 10 | diamond branching, `flow` dots, dashed loop, `subtext` `docker`/`k8s` |
| `04-http-static-site.json` | **HTTP request flow for static website**: Browser `GET /index.html` → DNS Lookup (→ CDN IP) → CDN Edge POP (CloudFront) → `Cache Hit?` → `Serve Cached` (HIT ~10ms) / `Fetch Origin` (S3 Bucket MISS) → `Cache & Store` → `Browser Renders` (200 OK) | 8 | `decision` Cache Hit, `flow` TLS/origin fetch, `subtext` `GET / • CloudFront • S3`, `labelAlign`/`labelSize` on `HIT`/`MISS` |

| `05-group-demo.json` | **Group demo**: `Group` “Frontend Feature” `340×290` `f8fafc` at `(40,30)` containing `User Action` → `Validate` → `Valid?` (`groupId g1`), with edge `g1 → API Request` demonstrating **connections to group rectangle** as well as to nodes; group draggable moves 3 members | 7 nodes +1 group | `Group` dashed `8 6`, `groupId` binding, `getEdgeEndpoints` ray-polygon to group, `subtext` |

**Use samples:** `Menu → Samples ▸` → `Choose Sample` → `01 Onboarding Flow` etc. (submenu), or drag-drop a JSON from `samples/` onto the canvas, or `Menu → Import JSON`. See `samples/README.md` for adding a new sample (create `samples/04-*.json`, copy to `public/samples/`, add button inside `Samples` submenu `loadSample('04-*.json')`, update this table).

Save AI outputs as `diagram.json` and import via Menu or drop.

**Minimal (copy-paste test):** See §3.1.

**Full (copy `§3.2` into `example.json`):** Validates all features.

---

## Changelog

- 2025-09-03: Added **Create & Connect** flow — while `connectFrom` is set (after right-click → Connect or `Connect (C)`), left-clicking blank canvas space opens a `connectCreateMenu` context menu of node types (`process`/`decision`/`terminal`/`io`/`text`/`icon`); selecting one creates the node at the click position (`createNodeAndConnect`) and adds an `animated` edge from the source to the new node (works for node or group source ids), with smart repositioning, Esc/outside-click close, and toast feedback; previously blank click just cancelled connection mode. Updated §5 — per mandatory rule.
- 2025-08-31: Made properties side pane **collapsible** — `isRightPanelCollapsed` (`44px` collapsed `◧` rail with vertical `PROPERTIES` + `N•E` stats, `<` expand / `320px` expanded with `>` collapse in header, `display:none` for content when collapsed, `transition:width 0.22s`), canvas flex-expands; updated §5 — per mandatory rule.
- 2025-08-31: Fixed zoom to be **mouse-relative** — `onWheel` now computes `newPan = mouse - world*newZoom` (`world=(mouse-pan)/zoom`) so scroll scales around cursor, not top-left (`translate(pan) scale(zoom)` anchored to mouse); `+`/`−` buttons zoom to viewport center (`rect.width/2`), `1:1` resets `pan 0,0` — per mandatory rule.
- 2025-08-31: Always maximum quality exports — GIF/WebM fixed to `2400×1600` ultra (2×) `imageSmoothingQuality:'high'` `scale 2`; GIF `256 colors rgb565` `60 frames @33ms` `anigram-2400x1600-30fps.gif`; WebM **true 60fps** via `canvas.captureStream(60)` + time-based `off=elapsed*0.36` `requestAnimationFrame` (fixed `off+=6` drift) `12 Mbps VP9` `alpha:false`, no quality selectors (previously selectable low-res was low quality); fixed FPS not actually 60 — per mandatory rule.
- 2025-08-31: Added **group of nodes** — rectangle `Group` (`id,x,y,w,h,label,color` default `340×220` `f8fafc`) drawn behind nodes (`r12` dashed `8 6`, header `28px`), nodes with `groupId` bound and move with group (`dragGroupMemberInitials` `dx,dy`), selectable (`selectedGroupIds` Shift+click / box-select including groups), connectable (`Edge.from/to` may be group `id` via `getNodeEdgePoint`/`getEdgeEndpoints` ray-polygon as rect), toolbar `Group` / `Group Selected` buttons + bulk `Group Selected` and Properties (label/color/w/h/x/y, Ungroup/Delete), JSON `groups` array import/export, sample `05-group-demo.json` (`Frontend Feature` `340×290` `f8fafc` at `40,30` with 3 bound nodes + edge `g1 → API Request` demonstrating connections to group) — per mandatory rule.
- 2025-08-31: Added sample `04-http-static-site.json` — HTTP request flow for static website (Browser GET → DNS → CDN Edge POP → Cache Hit? → Serve Cached (HIT) / Fetch Origin S3 (MISS) → Cache & Store → Browser Renders), 8 nodes `terminal`/`process`/`decision`/`io`, `flow` TLS, `subtext` CloudFront/S3, `labelAlign`/`labelSize`; `Menu → Samples ▸` submenu now shows **4** samples, `samples/` & `public/samples/` updated, §7 table extended — per mandatory rule.
- 2025-08-31: Made Samples a **submenu** — `Menu → Samples ▸` now opens a fly-out `Choose Sample` submenu to the right (`position:absolute left:calc(100%+8px)`, `onMouseEnter`/`onMouseLeave` + click toggle, `samplesMenuOpen` state, `overflow:visible` on dropdown, `zIndex:40`), containing `01 Onboarding Flow`/`02 E-commerce Checkout`/`03 CI Pipeline`; clicking loads via `loadSample` and closes both menus — per mandatory rule.
- 2025-08-31: Added samples folder — `samples/` duplicated to `public/samples/` (served at `/samples/*.json`), 3 samples `01-onboarding-flow.json` (6 nodes), `02-ecommerce-checkout.json` (9 nodes, image), `03-ci-pipeline.json` (10 nodes), `Menu → Samples` section with `loadSample(name)` via `fetch`, `samples/README.md` with add-sample guide; updated §7 table and maintenance checklist — per mandatory rule.
- 2025-08-31: Replaced type badge (`DECISION`/`IO` etc. at `y+h+10`) with editable `subtext` — `Node.subtext?: string` pill (`w=max(48,len*6.5+16) h14 r7` `rgba(124,92,255,0.10)`) only if non-empty/trimmed, otherwise hidden; canvas+SVG share logic, Properties → Subtext input + bulk Set/Clear, updated §2.2, §3.2 examples (`subtext:"API call"` etc.), §3.3 guidance — per mandatory rule.
- 2025-08-31: Fixed arrows to sit on outside bounds of each shape — replaced `a.h/2+6` circular inset with shape-aware `getEdgeEndpoints(a,b)` via `getNodeEdgePoint` ray-polygon intersection (rect for process/image, diamond analytic `t=1/(|ux|/hw+|uy|/hh)`, io parallelogram `skew=16`, terminal stadium polygon with 8-pt semicircles), gap `2px` outside, `atan2(dy,dx)` from `end-start`, SVG `L` hit-area `width18`, updated §2.3 and helpers `getNodePolygon`/`getEdgeEndpoints`.
- 2025-08-31: High-quality exports — GIF default `1200×800` (was `600×400` half-res) with `1800×1200`/`2400×1600` ultra, `quantize(...,{format:'rgb565'})` + `imageSmoothingQuality:'high'` + `scale=W/1200`; WebM default `1200×800` `60fps` `8 Mbps` (was `2.5 Mbps` `30fps`), resolutions `1800×1200`/`2400×1600`, `Mime VP9` fallback, scaled crisp draw — fixed low-quality rendering; updated §4 and modal UI.
- 2025-08-31: Removed top-left "Select & Drag nodes" pill (only "Connecting from X → pick target" with Cancel remains); improved edge text — added `labelAlign` center|top|bottom|left|right and `labelSize` 8-20, straight-arrow label at `labelAlign` offset (`top -uy*14` default), pill `h=size+8`, editable via Properties → Alignment grid + Text size slider and double-click arrow prompt; updated §2.3 and §3 examples — bump AGENTS.md per mandatory rule.
- 2025-08-31: Made animated arrows straight — `lineTo` straight segments, linear flow dots `x=startX+t*(endX-startX)`, `angle=atan2(dy,dx)`, label at straight midpoint `((startX+endX)/2, (startY+endY)/2)`, hit-area `L` not `Q` — updated §2.3 rendering and §3.3 label description.
- 2025-08-31: Initial `AGENTS.md` — light theme, 5 node types incl. `image`, 4 edge styles, step badges, GIF/WebM/JSON modals, multi-select, image drop, `user-select:none`.
