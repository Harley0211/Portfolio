import { work } from '../data.js';

export default function Work() {
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <div className="head rv"><h2>Selected work</h2><p>Real projects, from enterprise telecom QA to the AI tooling I'm building on the side.</p></div>
        <div className="grid" id="cards">
          {work.map(w => (
            <article className="card rv" key={w.title}>
              <p className="tag">{w.tag}</p>
              <h3>{w.title}</h3>
              <p className="body">{w.body}</p>
              <p className="chips">{w.chips.map(c => <span key={c}>{c}</span>)}</p>
              {w.link && (/^https?:/.test(w.link[0])
                ? <a className="more" href={w.link[0]} target="_blank" rel="noopener">{w.link[1]}</a>
                : <a className="more" href={w.link[0]}>{w.link[1]}</a>)}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
