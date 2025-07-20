import { useEffect, useRef, useState } from 'react';

// Simple magnet SVG icon
const MagnetSVG = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="2" width="6" height="12" rx="3" fill="#6366f1"/>
    <rect x="16" y="2" width="6" height="12" rx="3" fill="#6366f1"/>
    <rect x="6" y="14" width="16" height="8" rx="8" fill="#818cf8"/>
    <rect x="6" y="20" width="16" height="3" rx="1.5" fill="#a5b4fc"/>
  </svg>
);

export default function MagnetCursor() {
  const cursorRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide on small screens
    const checkScreen = () => {
      if (window.innerWidth < 640) setVisible(false);
      else setVisible(true);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);

    // Hide system cursor
    document.body.style.cursor = 'none';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrame;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };
    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };
    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    function animate() {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('resize', checkScreen);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 36,
        height: 36,
        zIndex: 999999,
        pointerEvents: 'none',
        transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1)',
        opacity: 1,
        willChange: 'transform',
        filter: 'drop-shadow(0 2px 8px #6366f1aa)',
        userSelect: 'none',
      }}
    >
      <MagnetSVG />
    </div>
  );
} 