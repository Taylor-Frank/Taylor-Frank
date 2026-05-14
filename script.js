// NAV scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// CANVAS BACKGROUND — animated geometric lines
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let W, H, points, animFrame;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initPoints();
}

function initPoints() {
  const count = Math.floor((W * H) / 18000);
  points = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.5 + 0.5,
  }));
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  // Move points
  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });

  // Draw connections
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.12;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Draw dots
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fill();
  });

  animFrame = requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

// Subtle mouse interaction — points near cursor get nudged
window.addEventListener('mousemove', (e) => {
  points.forEach(p => {
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      p.vx -= (dx / dist) * 0.03;
      p.vy -= (dy / dist) * 0.03;
      // Cap speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.5) {
        p.vx = (p.vx / speed) * 1.5;
        p.vy = (p.vy / speed) * 1.5;
      }
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.what-grid, .project-card, .strip-item, .contact-inner h2, .contact-sub'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.7s ease ${i * 60}ms, transform 0.7s ease ${i * 60}ms`;
  observer.observe(el);
});
