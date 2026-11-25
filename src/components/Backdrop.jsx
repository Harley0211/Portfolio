import { useEffect, useRef } from 'react';
import { reduceMotion } from '../usePageEffects.js';

/* Interactive page background: a drifting grid of mint "test nodes".
   - a slow scan line sweeps down the screen (echoes the hero runner)
   - nodes near the pointer light up, link to it and move aside
   - the grid shifts a little with scroll
   Reduced motion: one static frame, no animation loop. */
const GAP = 44, R = 170;

export default function Backdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let w = 0, h = 0, raf = 0;
    const m = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };

    const draw = time => {
      m.x += (m.tx - m.x) * 0.14; m.y += (m.ty - m.y) * 0.14;
      ctx.clearRect(0, 0, w, h);
      const off = (scrollY * 0.12) % GAP;
      const scan = reduceMotion ? -999 : ((time / 9000) % 1) * (h + 240) - 120;
      const near = [];
      for (let gy = -GAP; gy < h + GAP; gy += GAP) {
        for (let gx = GAP / 2; gx < w + GAP; gx += GAP) {
          let x = gx + (reduceMotion ? 0 : Math.sin(time / 2600 + gy * 0.021) * 3);
          let y = gy - off + (reduceMotion ? 0 : Math.cos(time / 3100 + gx * 0.017) * 3);
          let a = 0.13, s = 1.7;
          const ds = Math.abs(y - scan);
          if (ds < 70) a += (1 - ds / 70) * 0.22;
          const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy);
          if (d < R && d > 0.01) {
            const k = 1 - d / R;
            x += dx / d * k * 12; y += dy / d * k * 12;
            a += k * 0.6; s += k * 1.8;
            near.push(x, y, k);
          }
          ctx.fillStyle = `rgba(124,240,182,${a.toFixed(3)})`;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < near.length; i += 3) {
        ctx.strokeStyle = `rgba(124,240,182,${(near[i + 2] * 0.22).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(near[i], near[i + 1]); ctx.stroke();
      }
    };

    const loop = t => { draw(t); raf = requestAnimationFrame(loop); };
    const start = () => { if (!reduceMotion && !raf) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const resize = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0);
    };
    const onMove = e => { m.tx = e.clientX; m.ty = e.clientY; if (m.x < -1e3) { m.x = m.tx; m.y = m.ty; } };
    const onOut = e => { if (!e.relatedTarget) { m.tx = m.ty = -1e4; } };
    const onVis = () => (document.hidden ? stop() : start());

    resize(); start();
    addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVis);
    if (!reduceMotion) { addEventListener('pointermove', onMove, { passive: true }); document.addEventListener('pointerout', onOut); }
    return () => {
      stop();
      removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return <canvas className="backdrop" ref={ref} aria-hidden="true"></canvas>;
}
