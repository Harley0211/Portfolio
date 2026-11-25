import { autos } from '../data.js';
import Dots from './Dots.jsx';

/* Playwright automation case studies, rendered from `autos` in data.js. */
export default function Automation() {
  return (
    <section className="sec" id="automation">
      <div className="wrap">
        <div className="head rv"><div><p className="tag">Case studies · test automation</p><h2>Playwright frameworks</h2></div><p>Two automation frameworks I designed from scratch in JavaScript: page objects, fixtures, data-driven tests, reporting and CI.</p></div>
        <div id="cases">
          {autos.map((a, n) => (
            <article className="case" id={a.id} key={a.id}>
              <div className="case-head rv">
                <div><p className="tag">Case study {String(n + 1).padStart(2, '0')} · Playwright</p><h3>{a.title}</h3><p>{a.lede}</p></div>
                <a className="btn" href={a.repo} target="_blank" rel="noopener">View code on GitHub <span aria-hidden="true">↗</span></a>
              </div>
              <div className="stats">
                {a.facts.map(([v, t]) => <div className="stat rv" key={t}><b>{v}</b><span>{t}</span></div>)}
              </div>
              <div className="studio">
                <div className="frame rv">
                  <div className="bar"><Dots /><span>~/{a.id} $ {a.cmd}</span></div>
                  <div className="lst" tabIndex={0} role="region" aria-label={`${a.title}: list of tests`}>
                    {a.listing.flatMap(([g, items]) => [
                      <p className="g" key={g}>{g}</p>,
                      ...items.map(t => <p key={g + t}>› {t}</p>)
                    ])}
                  </div>
                </div>
                <div className="brief rv"><h3>What I built</h3><ul className="built">{a.built.map(b => <li key={b}>{b}</li>)}</ul></div>
              </div>
              <div className="studio two">
                <div className="frame rv">
                  <div className="bar"><Dots /><span>{a.flowTitle}</span></div>
                  <ol className="flow">{a.flow.map(s => <li key={s}>{s}</li>)}</ol>
                </div>
                <div className="brief rv">
                  <div><h3>Project structure</h3><pre className="tree">{a.tree}</pre></div>
                  <div><h3>Stack</h3><p className="chips">{a.stack.map(s => <span key={s}>{s}</span>)}</p></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
