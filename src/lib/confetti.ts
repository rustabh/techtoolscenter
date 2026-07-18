/** Tiny dependency-free confetti burst for milestone moments. Client-only. */
export function confetti(count = 90) {
  if (typeof document === "undefined") return;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  const colors = ["#4f46e5", "#22d3ee", "#f59e0b", "#10b981", "#f43f5e", "#a855f7"];
  const parts = Array.from({ length: count }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 3,
    vx: (Math.random() - 0.5) * 12,
    vy: Math.random() * -12 - 4,
    size: Math.random() * 6 + 4,
    color: colors[(Math.random() * colors.length) | 0],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
  }));
  let frame = 0;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach((p) => {
      p.vy += 0.35; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frame++;
    if (frame < 120) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}
