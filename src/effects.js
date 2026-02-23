// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

function openMobileNav() {
  mobileNav?.classList.add('open');
  mobileNavOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav?.classList.remove('open');
  mobileNavOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

mobileMenuBtn?.addEventListener('click', () => {
  mobileNav?.classList.contains('open') ? closeMobileNav() : openMobileNav();
});
mobileNavOverlay?.addEventListener('click', closeMobileNav);
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

// Close mobile menu on scroll (keeps header consistent)
window.addEventListener('scroll', () => {
  if (mobileNav?.classList.contains('open')) closeMobileNav();
}, { passive: true });

// Scroll car - drives across bottom as you scroll
const scrollCar = document.getElementById('scroll-car');
if (scrollCar) {
  const onScrollCar = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
    scrollCar.style.setProperty('--scroll-progress', progress);
    scrollCar.classList.toggle('hidden', progress > 0.98);
  };
  window.addEventListener('scroll', onScrollCar, { passive: true });
  onScrollCar();
}

// Header shrink on scroll
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

// 3D tilt on cards (desktop only)
document.querySelectorAll('.product-card, .showcase-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 12;
    const tiltY = (x - 0.5) * -12;
    card.style.setProperty('--tilt-x', `${tiltX}deg`);
    card.style.setProperty('--tilt-y', `${tiltY}deg`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});

// Stagger children on reveal
document.querySelectorAll('[data-stagger]').forEach((parent) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(':scope > *').forEach((child, i) => {
            child.style.setProperty('--stagger', i);
          });
          entry.target.classList.add('staggered');
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(parent);
});
