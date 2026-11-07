// Green starlight background with shooting stars, ported from the design prototype.

export interface Starfield {
  pause(): void;
  resume(): void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  a: number;
  sp: number;
  ph: number;
  k: number;
}

interface Shot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  max: number;
}

const R = Math.random;
const MAX_STARS = 900;
const MAX_DPR = 1.5;
const MOBILE_BAR_MAX = 160;

function sprite(stops: [number, string][]): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 32;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
  }
  return canvas;
}

export function startStarfield(canvas: HTMLCanvasElement, reduceMotion: boolean): Starfield {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { pause() {}, resume() {} };

  const sprites = [
    sprite([[0, "rgba(240,255,240,1)"], [0.18, "rgba(134,239,172,.9)"], [0.45, "rgba(34,197,94,.25)"], [1, "rgba(28,185,0,0)"]]),
    sprite([[0, "rgba(187,247,208,1)"], [0.2, "rgba(74,222,128,.8)"], [0.5, "rgba(28,185,0,.2)"], [1, "rgba(28,185,0,0)"]]),
    sprite([[0, "rgba(74,222,128,.9)"], [0.25, "rgba(28,185,0,.6)"], [0.6, "rgba(21,128,61,.15)"], [1, "rgba(21,128,61,0)"]]),
  ];

  let W = 0;
  let H = 0;
  let stars: Star[] = [];
  let shots: Shot[] = [];
  let paused = false;
  let last = performance.now();
  let t = 0;
  let next = 2.5;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  function draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, W, H);
    context.globalCompositeOperation = "lighter";
    const ox = (pointer.x - W / 2) * -0.014;
    const oy = (pointer.y - H / 2) * -0.014;
    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.sp + s.ph);
      const glint = twinkle > 0.97 && s.k === 0 ? 1.6 : 1;
      const d = s.r * (5 + 3 * twinkle) * glint;
      context.globalAlpha = s.a * (0.3 + 0.7 * twinkle);
      context.drawImage(sprites[s.k], s.x + ox * s.z - d / 2, s.y + oy * s.z - d / 2, d, d);
    }
    for (const s of shots) {
      const fade = Math.sin((Math.PI * s.life) / s.max);
      const speed = Math.hypot(s.vx, s.vy);
      const tx = s.x - (s.vx / speed) * s.len;
      const ty = s.y - (s.vy / speed) * s.len;
      context.globalAlpha = 1;
      context.lineCap = "round";
      let gradient = context.createLinearGradient(tx, ty, s.x, s.y);
      gradient.addColorStop(0, "rgba(28,185,0,0)");
      gradient.addColorStop(1, `rgba(74,222,128,${0.22 * fade})`);
      context.strokeStyle = gradient;
      context.lineWidth = 6;
      context.beginPath();
      context.moveTo(tx, ty);
      context.lineTo(s.x, s.y);
      context.stroke();
      gradient = context.createLinearGradient(tx, ty, s.x, s.y);
      gradient.addColorStop(0, "rgba(28,185,0,0)");
      gradient.addColorStop(0.7, `rgba(74,222,128,${0.45 * fade})`);
      gradient.addColorStop(1, `rgba(230,255,230,${fade})`);
      context.strokeStyle = gradient;
      context.lineWidth = 1.6;
      context.beginPath();
      context.moveTo(tx, ty);
      context.lineTo(s.x, s.y);
      context.stroke();
      context.globalAlpha = fade;
      context.drawImage(sprites[0], s.x - 9, s.y - 9, 18, 18);
    }
    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
  }

  function resize(context: CanvasRenderingContext2D) {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    pointer.x = pointer.tx = W / 2;
    pointer.y = pointer.ty = H / 2;
    const count = Math.round(Math.min(MAX_STARS, (W * H) / 1600));
    stars = Array.from({ length: count }, () => {
      const k = R() < 0.1 ? 0 : R() < 0.55 ? 1 : 2;
      return {
        x: R() * W,
        y: R() * H,
        z: R(),
        r: 0.35 + R() ** 3 * 1.5 + (k === 0 ? 0.4 : 0),
        a: 0.25 + R() * 0.6,
        sp: 0.3 + R() * 1.8,
        ph: R() * 6.283,
        k,
      };
    });
    if (reduceMotion) draw(context);
  }

  function shoot(x?: number, y?: number) {
    if (reduceMotion) return;
    const direction = R() < 0.5 ? 1 : -1;
    const angle = ((16 + R() * 24) * Math.PI) / 180;
    const speed = 13 + R() * 9;
    shots.push({
      x: x ?? W * (0.1 + R() * 0.8),
      y: y ?? H * R() * 0.45,
      vx: Math.cos(angle) * speed * direction,
      vy: Math.sin(angle) * speed,
      len: 110 + R() * 170,
      life: 0,
      max: 40 + R() * 30,
    });
  }

  function step(dt: number) {
    t += dt / 60;
    next -= dt / 60;
    if (next <= 0) {
      shoot();
      next = R() < 0.18 ? 0.3 + R() * 0.5 : 3.5 + R() * 6; // Occasional quick double.
    }
    for (const s of shots) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life += dt;
    }
    shots = shots.filter((s) => s.life < s.max);
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
  }

  function loop(context: CanvasRenderingContext2D, now: number) {
    requestAnimationFrame((time) => loop(context, time));
    const dt = Math.min(3, (now - last) / 16.67);
    last = now;
    if (paused || document.hidden) return;
    step(dt);
    draw(context);
  }

  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    // Mobile URL bars change the height while scrolling. Don't reshuffle the stars for that.
    if (window.innerWidth === W && Math.abs(window.innerHeight - H) < MOBILE_BAR_MAX) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => resize(ctx), 150);
  });
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
    },
    { passive: true },
  );
  document.addEventListener("pointerleave", () => {
    pointer.tx = W / 2;
    pointer.ty = H / 2;
  });
  window.addEventListener("pointerdown", (event) => {
    const target = event.target as Element | null;
    if (!target?.closest("a, button, input, label, .prompt, .gateway")) shoot(event.clientX, event.clientY);
  });

  resize(ctx);
  if (!reduceMotion) requestAnimationFrame((time) => loop(ctx, time));

  return {
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    },
  };
}
