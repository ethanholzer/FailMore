// FailMore marketing site: nav state, scroll reveals, the tracker demo, the flame and sharing
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// nav gets its white background as soon as the page scrolls, so it never sits on top of text
const nav = document.querySelector('[data-nav]');
const navState = () => nav.classList.toggle('solid', window.scrollY > 2);
window.addEventListener('scroll', navState, { passive: true });
navState();

// reveal cards as they scroll in
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// tracker demo + glitch play when the section comes into view
const trk = document.querySelector('[data-trk]'), glitch = document.querySelector('.glitch');
// The demo takes about 3.4s to finish, then it holds for 5s and plays again, only while it's on screen
const RUN = 3400, HOLD = 5000;
let loopT = null, glitchT = null, inView = false;
const restart = el => { el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); };
const play = () => {
  clearTimeout(loopT); clearTimeout(glitchT);
  restart(trk); restart(glitch);
  glitchT = setTimeout(() => restart(glitch), 3200);
  if (inView && !reduce) loopT = setTimeout(play, RUN + HOLD);
};
new IntersectionObserver(([e]) => {
  inView = e.isIntersecting;
  if (inView) play(); else { clearTimeout(loopT); clearTimeout(glitchT); }
}, { threshold: .4 }).observe(trk);

// the app's purple flame, behind the hero and the price section
window.addEventListener('load', () => {
  if (!window.lottie) return;
  fetch('assets/flame.json').then(r => r.json()).then(data => {
    document.querySelectorAll('[data-flame]').forEach(box => window.lottie.loadAnimation({
      container: box, renderer: 'svg', loop: true, autoplay: !reduce, animationData: data,
      // the flames only fill the bottom of the animation's square canvas (y 229 to 400 of 400),
      // so crop to that strip and let it cover the section by width or height, whichever is larger
      rendererSettings: { preserveAspectRatio: 'xMidYMax slice', viewBoxSize: '0 226 400 174' },
    }));
  }).catch(() => {});
});

// the "one lifter tells three friends" animation from the app's onboarding, playing only while it's on screen
window.addEventListener('load', () => {
  const box = document.querySelector('[data-share-anim]');
  if (!box || !window.lottie) return;
  fetch('assets/share.json').then(r => r.json()).then(data => {
    const anim = window.lottie.loadAnimation({ container: box, renderer: 'svg', loop: true, autoplay: false, animationData: data });
    if (reduce) { anim.goToAndStop(Math.round(anim.totalFrames * .6), true); return; }
    new IntersectionObserver(([e]) => e.isIntersecting ? anim.play() : anim.pause(), { threshold: .2 }).observe(box);
  }).catch(() => {});
});

// share: the native sheet on phones, copy the link everywhere else
const toastEl = document.querySelector('[data-toast]');
let toastT;
const toast = msg => { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2400); };
document.querySelector('[data-share]').addEventListener('click', async () => {
  const data = { title: 'FailMore', text: 'FailMore is a quality workout tracker. It’s only $8.99, no subscription. You should get it too!', url: location.origin + location.pathname };
  if (navigator.share) { try { await navigator.share(data); } catch {} return; }
  try { await navigator.clipboard.writeText(data.url); toast('Link copied'); } catch { toast(data.url); }
});

// the logger clip loops by itself, hold it still for anyone who prefers less motion
if (reduce) document.querySelectorAll('video[autoplay]').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });
