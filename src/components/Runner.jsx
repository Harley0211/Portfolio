import { useEffect, useState } from 'react';
import { checks } from '../data.js';
import { reduceMotion } from '../usePageEffects.js';
import Dots from './Dots.jsx';

/* The hero "test run": each check appears, then turns green; ends on "6 passed · 0 failed". */
export default function Runner() {
  const [run, setRun] = useState(0);       // bump to re-run
  const [state, setState] = useState(() => checks.map(() => 0)); // 0 hidden · 1 shown · 2 passed
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    setState(checks.map(() => 0)); setPassed(0);
    const step = reduceMotion ? 0 : 520, timers = [];
    const mark = (i, v) => setState(s => { const n = [...s]; n[i] = Math.max(n[i], v); return n; });
    checks.forEach((_, i) => {
      timers.push(setTimeout(() => mark(i, 1), 600 + i * step));
      timers.push(setTimeout(() => { mark(i, 2); setPassed(i + 1); }, 600 + i * step + (reduceMotion ? 0 : 380)));
    });
    return () => timers.forEach(clearTimeout);
  }, [run]);

  const n = checks.length;
  const sum = passed === 0 ? 'running…' : passed === n ? `${n} passed · 0 failed · ready to hire` : `${passed}/${n} passed`;

  return (
    <div className="runner" role="group" aria-label="A Playwright test run where all six checks for Harley's QA skills pass">
      <div className="bar" aria-hidden="true"><Dots /><span>~/harley $ npx playwright test harley.spec.js</span></div>
      <div className="log">
        <div id="lines" key={run} aria-hidden="true">
          {checks.map(([t, ms], i) => (
            <div key={i} className={'ln' + (state[i] >= 1 ? ' show' : '') + (state[i] === 2 ? ' ok' : '')}>
              <b>{state[i] === 2 ? '✓' : '◌'}</b><span>{t}</span><em>{ms}ms</em>
            </div>
          ))}
        </div>
        <div className="prog" aria-hidden="true"><div id="prog" style={{ width: passed ? (passed / n * 100) + '%' : '0' }}></div></div>
        <div className="sum"><span id="sum">{sum}</span><button className="rerun" id="rerun" type="button" onClick={() => { setState(checks.map(() => 0)); setPassed(0); setRun(r => r + 1); }}>↻ re-run</button></div>
      </div>
      <div className="scan"></div>
    </div>
  );
}
