import { useState } from 'react'
import { CHALLENGES, starCount, type Challenge } from '../engine/challenges.ts'
import type { ChallengeState } from '../engine/storage.ts'
import TitleBar from './TitleBar.tsx'

function Stars({ ch }: { ch: Challenge }) {
  const n = starCount(ch)
  return <><span className="t-star">{'★'.repeat(n)}</span><span className="star-empty">{'☆'.repeat(5 - n)}</span></>
}

function plain(html: string) { return html.replace(/<[^>]+>/g, '') }

function ChallengeList({ state, onOpen }: { state: ChallengeState; onOpen: (id: string) => void }) {
  return (
    <>
      <div className="cw-hint">
        View challenges here. Use the terminal to interact: <span className="t-key">challenge list</span>, <span className="t-key">challenge start &lt;id&gt;</span>
      </div>
      <div className="cw-list">
        {CHALLENGES.map(ch => {
          const done = state.completed.includes(ch.id)
          const active = state.active === ch.id
          return (
            <div key={ch.id} className={'cw-item' + (done ? ' done' : '') + (active ? ' active' : '')} onClick={() => onOpen(ch.id)}>
              <div className={'cw-item-mark' + (done ? ' done' : '')}>{done ? '✓' : active ? '▸' : ' '}</div>
              <div className="cw-item-info">
                <div className="cw-item-title">{ch.title}</div>
                <div className="cw-item-desc">{ch.desc}</div>
              </div>
              <div className="cw-item-stars"><Stars ch={ch} /></div>
            </div>
          )
        })}
      </div>
    </>
  )
}

function ChallengeDetail({ ch, state, onBack }: { ch: Challenge; state: ChallengeState; onBack: () => void }) {
  const done = state.completed.includes(ch.id)
  const active = state.active === ch.id
  return (
    <>
      <button className="cw-back" onClick={onBack}>← Back to challenges</button>
      <div className="cw-detail-header">
        <div className="cw-detail-title">{ch.title}</div>
        <div className="cw-detail-stars"><Stars ch={ch} /></div>
        <div className="cw-detail-desc">{ch.desc}</div>
      </div>
      <div className="cw-detail-steps">
        {ch.steps.map((step, i) => {
          const stepDone = done || (active && state.activeSteps.includes(i))
          return (
            <div key={i} className={'cw-detail-step' + (stepDone ? ' done' : '')}>
              <div className="cw-detail-step-num">{i + 1}</div>
              <div className="cw-detail-step-desc">{plain(step.desc)}</div>
            </div>
          )
        })}
      </div>
      <div className="cw-detail-cmd">
        {done
          ? <><span className="t-teal">challenge start</span> {ch.id} <span className="t-muted">(re-attempt)</span></>
          : active
            ? <><span className="t-teal">challenge status</span> <span className="t-muted">— view progress in the terminal</span></>
            : <><span className="t-teal">challenge start</span> {ch.id}</>}
      </div>
    </>
  )
}

/** View-only challenge browser; all interaction happens through the `challenge` command. */
export default function ChallengesWindow({ challenge, onMinimize }: { challenge: ChallengeState; onMinimize: () => void }) {
  const [viewingId, setViewingId] = useState<string | null>(null)
  const viewing = CHALLENGES.find(c => c.id === viewingId)

  return (
    <div id="challenges-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TitleBar icon="⚡" title="Challenges" onMinimize={onMinimize} />
      <div id="cw-content">
        {viewing
          ? <ChallengeDetail ch={viewing} state={challenge} onBack={() => setViewingId(null)} />
          : <ChallengeList state={challenge} onOpen={setViewingId} />}
      </div>
    </div>
  )
}
