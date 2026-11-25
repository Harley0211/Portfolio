import { useEffect } from 'react';

export const reduceMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Page-wide behaviour that works on the rendered DOM: scroll reveals,
   nav state + timeline fill, hero spotlight and card tilt. */
export default function usePageEffects() {
  useEffect(() => {
    const cleanups = [];

    /* reveal on scroll */
    const timers = [];
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        const t = e.target; t.classList.add('in'); io.unobserve(t);
        timers.push(setTimeout(() => { t.style.transitionDelay = ''; t.classList.add('done'); }, 1100));
      }
    }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach((el, i) => {
      el.style.transitionDelay = (el.matches('.card,.kit,.stat,.feat,.shot') ? (i % 3) * 90 : 0) + 'ms';
      io.observe(el);
    });
    cleanups.push(() => { io.disconnect(); timers.forEach(clearTimeout); });

    /* nav state + timeline fill */
    const nav = document.getElementById('nav'), tl = document.getElementById('tl'), fill = document.getElementById('tlfill');
    const navLinks = [...document.querySelectorAll('.links a[href^="#"]:not(.btn)')];
    const secs = navLinks.map(a => document.querySelector(a.getAttribute('href')));
    const onScroll = () => {
      nav.classList.toggle('scrolled', scrollY > 10);
      const r = tl.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
      fill.style.height = (p * (r.height - 16)) + 'px';
      tl.querySelectorAll('.job').forEach(j => j.classList.toggle('lit', j.getBoundingClientRect().top < vh * 0.7));
      let cur = -1; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 140) cur = i; });
      navLinks.forEach((a, i) => a.classList.toggle('on', i === cur));
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    cleanups.push(() => removeEventListener('scroll', onScroll));

    /* hero spotlight + card tilt */
    if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
      const glow = document.getElementById('glow');
      const hero = document.querySelector('.hero');
      const onHero = e => {
        const r = glow.getBoundingClientRect();
        glow.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        glow.style.setProperty('--my', (e.clientY - r.top) + 'px');
      };
      hero.addEventListener('pointermove', onHero);
      cleanups.push(() => hero.removeEventListener('pointermove', onHero));
      document.querySelectorAll('.card').forEach(c => {
        const move = e => {
          const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty('--cx', x * 100 + '%'); c.style.setProperty('--cy', y * 100 + '%');
          c.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-4px)`;
        };
        const leave = () => { c.style.transform = ''; };
        c.addEventListener('pointermove', move); c.addEventListener('pointerleave', leave);
        cleanups.push(() => { c.removeEventListener('pointermove', move); c.removeEventListener('pointerleave', leave); });
      });
    }

    return () => cleanups.forEach(f => f());
  }, []);
}
