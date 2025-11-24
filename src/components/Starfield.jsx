import React, { useRef, useEffect } from 'react';

const Starfield = ({ density = 0.0008 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const stars = [];
    const shootingStars = [];

    const STAR_COUNT = Math.max(40, Math.floor(w * h * density));

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.3, 1.4),
        alpha: rand(0.3, 0.9),
        twinkleSpeed: rand(0.002, 0.02),
        phase: Math.random() * Math.PI * 2
      });
    }

    let rafId;

    function spawnShootingStar() {
      shootingStars.push({
        x: rand(w * 0.1, w * 0.9),
        y: rand(0, h * 0.3),
        vx: rand(8, 18),
        vy: rand(4, 10),
        length: rand(80, 220),
        life: 0,
        maxLife: rand(40, 100)
      });
    }

    let shootTimer = 0;

    function onResize() {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    }

    function render() {
      if (reduced) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // draw subtle nebula glow
      const g = ctx.createRadialGradient(w / (2 * dpr), h / (2 * dpr), 10, w / (2 * dpr), h / (2 * dpr), Math.max(w, h));
      g.addColorStop(0, 'rgba(30,36,60,0.08)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // stars
      for (let s of stars) {
        s.phase += s.twinkleSpeed;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        st.x += st.vx;
        st.y += st.vy;
        st.life++;
        const t = st.life / st.maxLife;
        const alpha = 1 - t;
        // tail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 2;
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x - st.vx * 3, st.y - st.vy * 3);
        ctx.stroke();
        // head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(st.x, st.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (st.life > st.maxLife || st.x > window.innerWidth + 50 || st.y > window.innerHeight + 50) {
          shootingStars.splice(i, 1);
        }
      }

      // spawn logic
      shootTimer += Math.random() * 0.5;
      if (shootTimer > 80 && Math.random() < 0.02) {
        spawnShootingStar();
        shootTimer = 0;
      }

      rafId = requestAnimationFrame(render);
    }

    if (!reduced) render();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default Starfield;
