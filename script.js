(() => {
  const track = document.querySelector('.experience');
  const can = document.querySelector('.can-anchor');
  const tab = document.querySelector('.pull-tab');
  const panel = document.querySelector('.score-panel');
  const splash = document.querySelector('.opening-splash');
  const milk = document.querySelector('.milk-scene');
  const liquid = document.querySelector('.liquid');
  const intro = document.querySelector('.hero-copy');
  const memory = document.querySelector('.second-copy');
  const cue = document.querySelector('.scroll-cue');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  let scheduled = false;
  function render() {
    scheduled = false;
    const rect = track.getBoundingClientRect();
    const p = reduced.matches ? 0 : clamp(-rect.top / Math.max(1, track.offsetHeight - innerHeight));
    const eased = p * p * (3 - 2 * p);
    document.documentElement.style.setProperty('--p', p);
    can.style.transform = `translate(-50%, -50%) rotate(${10 - eased * 41}deg)`;
    const lift = clamp((p - .04) / .16);
    const settle = clamp((p - .25) / .16);
    const panelProgress = clamp((p - .11) / .13);
    const splashProgress = clamp((p - .22) / .28);
    const tabAngle = (lift * 68 - settle * 55) * Math.PI / 180;
    // Project the tab around its fixed rivet; the scored panel folds into the can.
    const tabProjection = .22 * Math.cos(tabAngle) + .97 * Math.sin(tabAngle);
    tab.setAttribute('transform', `translate(516 46) scale(1 ${tabProjection})`);
    panel.setAttribute('transform', `translate(0 50) scale(1 ${Math.cos(panelProgress * 78 * Math.PI / 180)}) translate(0 -50)`);
    panel.style.opacity = 1 - panelProgress * .5;
    splash.style.opacity = clamp(splashProgress * 4);
    splash.style.transform = `scale(${.35 + splashProgress * .65}, ${splashProgress * .7})`;
    milk.style.transform = `translateY(${-eased * innerHeight * .62}px)`;
    liquid.style.transform = `translateY(${-eased * innerHeight * .94}px)`;
    const introFade = 1 - clamp((p - .08) / .26);
    intro.style.opacity = introFade;
    intro.style.transform = `translateY(${-p * 110}px)`;
    intro.style.visibility = introFade === 0 ? 'hidden' : 'visible';
    intro.style.pointerEvents = introFade < .1 ? 'none' : 'auto';
    memory.style.opacity = clamp((p - .43) / .24);
    memory.style.transform = `translateY(${(1 - clamp((p - .43) / .24)) * 35}px)`;
    cue.style.opacity = 1 - clamp(p * 6);
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(render); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  render();
})();
