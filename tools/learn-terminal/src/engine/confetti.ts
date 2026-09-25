/* engine/confetti.ts — celebration burst drawn on the fixed confetti canvas */

interface Piece {
  x: number; y: number; vx: number; vy: number;
  w: number; h: number; color: string;
  rot: number; rotV: number; life: number; decay: number; gravity: number;
}

const COLORS = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#01a3a4', '#f368e0', '#ff9f43', '#10ac84', '#ee5a24', '#0abde3'];

let canvas: HTMLCanvasElement | null = null;
let pieces: Piece[] = [];
let running = false;

export function registerConfettiCanvas(el: HTMLCanvasElement | null) {
  canvas = el;
}

export function launchConfetti() {
  pieces = [];
  const cx = window.innerWidth / 2;
  for (let i = 0; i < 120; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    pieces.push({
      x: cx + (Math.random() - .5) * 200,
      y: window.innerHeight * .35,
      vx: Math.cos(angle) * speed,
      vy: -Math.abs(Math.sin(angle) * speed) - 2,
      w: 4 + Math.random() * 6,
      h: 3 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - .5) * .3,
      life: 1,
      decay: .004 + Math.random() * .006,
      gravity: .12 + Math.random() * .06,
    });
  }
  if (!running) { running = true; loop(); }
}

function loop() {
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) { running = false; return; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!pieces.length) { running = false; return; }
  pieces.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= .99;
    p.rot += p.rotV; p.life -= p.decay;
    if (p.life <= 0) return;
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });
  pieces = pieces.filter(p => p.life > 0);
  requestAnimationFrame(loop);
}
