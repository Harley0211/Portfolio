import { kit } from '../data.js';

export default function Skills() {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <div className="head rv"><h2>Toolkit</h2><p>What I reach for when a release has to be right.</p></div>
        <div className="grid" id="kit" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))' }}>
          {kit.map(([g, items]) => (
            <div className="kit rv" key={g}><h3>{g}</h3><ul>{items.map(i => <li key={i}>{i}</li>)}</ul></div>
          ))}
        </div>
        <div className="edu rv"><span><strong>BS Information Technology</strong> · New Brighton School of the Philippines</span><span className="mono">2021 — 2025</span></div>
        <div className="edu rv" style={{ marginTop: 12 }}><span><strong>Training</strong> · Playwright with JavaScript, Udemy (in progress) · Cybersecurity, ADB Institute (2026) · WordPress Certificate</span></div>
      </div>
    </section>
  );
}
