import { Fragment } from 'react';
import Runner from './Runner.jsx';

const RESUME = 'assets/Harley_Dave_Valencia_QA_Resume_2026.pdf';
const HEADLINE = 'I break software before your users do.';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="glow" id="glow"></div>
      <div className="wrap">
        <div>
          <p className="status"><span className="dot"></span>Open to remote roles · available now</p>
          <h1 id="h1">
            {HEADLINE.split(' ').map((w, i) => (
              <Fragment key={i}>{i > 0 && ' '}<span className="w" style={{ animationDelay: `${i * 70}ms` }}>{w}</span></Fragment>
            ))}
          </h1>
          <p className="lede rv">I'm <strong style={{ color: 'var(--ink)' }}>Harley Dave Valencia</strong>, a Software QA Engineer keeping releases reliable on the LotusFlare / T-Mobile Fiber platform. Manual, automation, web and API testing, now pairing Playwright with AI-driven workflows.</p>
          <div className="ctas rv">
            <a className="btn pri" href="#work">See my work <span aria-hidden="true">→</span></a>
            <a className="btn cv" href={RESUME} download>Download résumé <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <Runner />
      </div>
    </header>
  );
}
