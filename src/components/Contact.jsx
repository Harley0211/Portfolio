import { useEffect, useRef, useState } from 'react';

const EMAIL = 'harleydavevalencia@gmail.com';
const RESUME = 'assets/Harley_Dave_Valencia_QA_Resume_2026.pdf';

export default function Contact() {
  const [note, setNote] = useState('');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const say = t => { setNote(t); clearTimeout(timer.current); timer.current = setTimeout(() => setNote(''), 3500); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); say('✓ email copied'); }
    catch (e) { say('Select the address above to copy it'); }
  };

  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <div className="cta rv">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2>Let's ship something that doesn't break.</h2>
            <p>Looking for a remote Software QA, Manual QA or Junior QA Automation role with an international team.</p>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <div className="ctas">
              <button className="btn pri" id="copy" type="button" onClick={copy}>Copy email</button>
              <a className="btn cv" href={RESUME} download>Download résumé <span aria-hidden="true">↓</span></a>
              <a className="btn" href="https://www.linkedin.com/in/hire-me-harley" target="_blank" rel="noopener">LinkedIn</a>
            </div>
            <p className="note" id="note" role="status" aria-live="polite">{note}</p>
          </div>
          <dl className="facts">
            <div><dt>Based in</dt><dd>General Santos, PH</dd></div>
            <div><dt>Work style</dt><dd>Remote · any time zone</dd></div>
            <div><dt>Night shift</dt><dd>Yes</dd></div>
            <div><dt>Start date</dt><dd>Immediately</dd></div>
            <div><dt>Collaboration</dt><dd>Async, Agile/Scrum</dd></div>
          </dl>
        </div>
        <footer><span>© 2026 Harley Dave Valencia</span><span>built by me · <a href="https://github.com/Harley0211/Portfolio/actions" target="_blank" rel="noopener">tested by Playwright + axe on every deploy</a> <span className="acc">✓</span></span></footer>
      </div>
    </section>
  );
}
