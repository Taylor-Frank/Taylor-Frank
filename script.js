// Subtle spotlight that follows the cursor
const spotlight = document.createElement('div');
spotlight.style.cssText = `
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: background 0.15s ease;
`;
document.body.appendChild(spotlight);

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(180,180,180,0.04) 0%, transparent 70%)`;
});
