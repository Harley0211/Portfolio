import { jobs } from '../data.js';

export default function Experience() {
  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <div className="head rv"><h2>Experience</h2><p>3+ years of hands-on testing, from freelance manual work to a full-time remote QA role.</p></div>
        <div className="tl" id="tl">
          <div className="fill" id="tlfill"></div>
          {jobs.map(j => (
            <div className="job rv" key={j.org + j.role}>
              <div className="when">{j.when}</div>
              <div><h3>{j.role} <span className="acc">· {j.org}</span>{j.now ? <span className="now">now</span> : null}</h3><p>{j.body}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
