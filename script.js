// Light/dark theme toggle
(function () {
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute(
        'aria-label',
        isLight ? 'Zum dunklen Modus wechseln' : 'Zum hellen Modus wechseln'
      );
    }
  }

  // The inline script in <head> already set data-theme before first paint;
  // this just syncs the button's ARIA state with it.
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* localStorage unavailable (private mode, disabled storage) — theme just won't persist */
      }
    });
  }
})();

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll-reveal for cards and sections
const revealTargets = document.querySelectorAll(
  '.module-card, .project-card, .section-inner, .contact-card'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
}

// Mouse-driven micro-interactions: only for fine-pointer devices with real
// hover (skips touch entirely) and never when reduced motion is requested.
const supportsFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const enableMouseEffects = supportsFineHover && !prefersReducedMotion;

if (enableMouseEffects) {

  // --- 1. Hero spotlight that follows the cursor ---
  const hero = document.querySelector('.hero');
  if (hero) {
    let heroFrame = null;
    let heroEvent = null;

    hero.addEventListener('mousemove', (e) => {
      heroEvent = e;
      if (heroFrame) return;
      heroFrame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((heroEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((heroEvent.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--spot-x', `${x}%`);
        hero.style.setProperty('--spot-y', `${y}%`);
        heroFrame = null;
      });
      hero.classList.add('spotlight-active');
    });

    hero.addEventListener('mouseleave', () => {
      hero.classList.remove('spotlight-active');
    });
  }

  // --- 2. Subtle 3D tilt on skill/project cards ---
  const tiltCards = document.querySelectorAll('.module-card, .project-card');
  const maxTiltDeg = 4;

  tiltCards.forEach((card) => {
    let tiltFrame = null;
    let tiltEvent = null;

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0s, border-color .15s ease, background-color .3s ease';
    });

    card.addEventListener('mousemove', (e) => {
      tiltEvent = e;
      if (tiltFrame) return;
      tiltFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const px = (tiltEvent.clientX - rect.left) / rect.width;
        const py = (tiltEvent.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * (maxTiltDeg * 2);
        const rotateX = (0.5 - py) * (maxTiltDeg * 2);
        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        tiltFrame = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (tiltFrame) {
        cancelAnimationFrame(tiltFrame);
        tiltFrame = null;
      }
      card.style.transition = 'transform .4s ease, border-color .15s ease, background-color .3s ease';
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // --- 4. Magnetic pull on primary/ghost buttons ---
  const magneticButtons = document.querySelectorAll('.btn');
  const maxMagneticShift = 6;

  magneticButtons.forEach((btn) => {
    let magFrame = null;
    let magEvent = null;

    btn.addEventListener('mousemove', (e) => {
      magEvent = e;
      if (magFrame) return;
      magFrame = requestAnimationFrame(() => {
        const rect = btn.getBoundingClientRect();
        const relX = magEvent.clientX - (rect.left + rect.width / 2);
        const relY = magEvent.clientY - (rect.top + rect.height / 2);
        const shiftX = Math.max(-maxMagneticShift, Math.min(maxMagneticShift, relX * 0.3));
        const shiftY = Math.max(-maxMagneticShift, Math.min(maxMagneticShift, relY * 0.3));
        btn.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        magFrame = null;
      });
    });

    btn.addEventListener('mouseleave', () => {
      if (magFrame) {
        cancelAnimationFrame(magFrame);
        magFrame = null;
      }
      btn.style.transform = '';
    });
  });
}
