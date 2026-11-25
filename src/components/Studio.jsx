import { studio } from '../data.js';
import Dots from './Dots.jsx';

/* AI QA Studio case study. The live demo URL comes only from data.js (studio.live). */
export default function Studio() {
  const dir = studio.dir;
  return (
    <section className="sec" id="studio">
      <div className="wrap">
        <div className="head rv"><div><p className="tag">Case study · side project</p><h2>AI QA Studio</h2></div><p>A QA workspace that turns screenshots and requirement documents into test cases with a local AI, orchestrated by n8n. Built end to end for my QA team.</p></div>

        <div className="studio">
          <figure className="frame rv">
            <div className="bar"><Dots /><span>~/ai-qa-studio $ play demo.mp4</span></div>
            <video controls muted playsInline preload="none" poster={dir + 'ai-qa-studio-poster.jpg'} width="1280" height="720" aria-label="AI QA Studio demo video, 2 minutes 44 seconds, no sound, with on-screen captions">
              <source src={dir + 'ai-qa-studio-demo-720p.mp4'} type="video/mp4" />
            </video>
            <figcaption>Demo · 2:44 · no sound, captions on screen · made-up demo data only</figcaption>
          </figure>

          <div className="brief rv">
            <div><h3>The problem</h3><p id="st-problem">{studio.problem}</p></div>
            <div><h3>My role</h3><p id="st-role">{studio.role}</p></div>
            <div className="ctas">
              <a className="btn pri" id="st-live" href={studio.live} target="_blank" rel="noopener">Open live demo <span aria-hidden="true">↗</span></a>
              <a className="btn" id="st-repo" href={studio.repo} target="_blank" rel="noopener">Source on GitHub <span aria-hidden="true">↗</span></a>
            </div>
            <p className="live-note"><span className="dot"></span>The live demo runs on my own PC through a Cloudflare tunnel, so it may occasionally be offline. If it is, the video above shows the full flow. New sign-ups get a Tester account with no projects until an admin assigns some.</p>
          </div>
        </div>

        <div className="stats" id="st-stats">
          {studio.stats.map(([n, t]) => <div className="stat rv" key={n}><b>{n}</b><span>{t}</span></div>)}
        </div>

        <h3 className="sub rv">What it does</h3>
        <div className="feats" id="st-feats">
          {studio.features.map(([h, t]) => (
            <div className="feat rv" key={h}><h4><span className="acc" aria-hidden="true">✓</span> {h}</h4><p>{t}</p></div>
          ))}
        </div>

        <div className="studio two">
          <div className="frame rv">
            <div className="bar"><Dots /><span>~/ai-qa-studio $ cat how-it-works</span></div>
            <ol className="flow" id="st-flow">{studio.flow.map(s => <li key={s}>{s}</li>)}</ol>
            <p className="flow-note">No data leaves the PC. A second n8n workflow sends the app's designed emails through Gmail.</p>
          </div>
          <div className="brief rv"><h3>Tech stack</h3><p className="chips" id="st-stack">{studio.stack.map(s => <span key={s}>{s}</span>)}</p></div>
        </div>

        <h3 className="sub rv">Screenshots <span className="mono">· click to open full size</span></h3>
        <div className="shots" id="st-shots">
          {studio.shots.map(([f, cap]) => (
            <figure className="shot rv" key={f}>
              <a href={`${dir}shots/${f}.png`} target="_blank" rel="noopener"><img src={`${dir}thumbs/${f}.jpg`} alt={cap} width="800" height="450" loading="lazy" decoding="async" /></a>
              <figcaption>{cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
