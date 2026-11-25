import { words } from '../data.js';

/* The row is rendered twice so the CSS slide (-50%) loops seamlessly. */
export default function Marquee() {
  const row = pass => words.flatMap((w, i) => [<span key={`${pass}w${i}`}>{w}</span>, <span key={`${pass}d${i}`}>·</span>]);
  return (
    <div className="mq" aria-hidden="true"><div id="mq">{row('a')}{row('b')}</div></div>
  );
}
