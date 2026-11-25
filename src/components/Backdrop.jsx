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

    // Nodes are batched into one path per alpha level (a handful of fills per frame
    // instead of ~700), which keeps the loop cheap on machines without GPU canvas.
    const LEVELS = 12, buckets = Array.from({ length: LEVELS }, () => []);
    const draw = time => {
      m.x += (m.tx - m.x) * 0.14; m.y += (m.ty - m.y) * 0.14;
      ctx.clearRect(0, 0, w, h);
      const off = (scrollY * 0.12) % GAP;
      const scan = reduceMotion ? -999 : ((time / 9000) % 1) * (h + 240) - 120;
      const near = [];
      for (const b of buckets) b.length = 0;
      ctx.beginPath(); // base nodes (dim, fixed size) → one fill
      for (let gy = -GAP; gy < h + GAP; gy += GAP) {
        const wy = reduceMotion ? 0 : time / 2600 + gy * 0.021, sx = reduceMotion ? 0 : Math.sin(wy) * 3;
        for (let gx = GAP / 2; gx < w + GAP; gx += GAP) {
          const x = gx + sx;
          const y = gy - off + (reduceMotion ? 0 : Math.cos(time / 3100 + gx * 0.017) * 3);
          const ds = Math.abs(y - scan);
          const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy);
          if (d < R && d > 0.01) {
            const k = 1 - d / R;
            near.push(x + dx / d * k * 12, y + dy / d * k * 12, k, ds < 70 ? (1 - ds / 70) * 0.22 : 0);
          } else if (ds < 70) {
            buckets[Math.min(LEVELS - 1, Math.floor((1 - ds / 70) * LEVELS))].push(x, y);
          } else {
            ctx.rect(x - 0.85, y - 0.85, 1.7, 1.7);
          }
        }
      }
      ctx.fillStyle = 'rgba(124,240,182,.13)'; ctx.fill();
      // scan-line band: brighter nodes, grouped by brightness level
      buckets.forEach((b, i) => {
        if (!b.length) return;
        ctx.beginPath();
        for (let j = 0; j < b.length; j += 2) ctx.rect(b[j] - 0.85, b[j + 1] - 0.85, 1.7, 1.7);
        ctx.fillStyle = `rgba(124,240,182,${(0.13 + (i + 0.5) / LEVELS * 0.22).toFixed(3)})`; ctx.fill();
      });
      // nodes near the pointer (a few dozen): individual size/alpha + link line
      ctx.lineWidth = 1;
      for (let i = 0; i < near.length; i += 4) {
        const x = near[i], y = near[i + 1], k = near[i + 2], s = 1.7 + k * 1.8;
        ctx.fillStyle = `rgba(124,240,182,${(0.13 + near[i + 3] + k * 0.6).toFixed(3)})`;
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
        ctx.strokeStyle = `rgba(124,240,182,${(k * 0.22).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(x, y); ctx.stroke();
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
