import { useEffect } from 'react';

const CURSOR_SIZE = 40; // 20px radius
const CURSOR_COLOR = 'rgba(99, 102, 241, 0.7)'; // indigo-500 with alpha
const CURSOR_SHADOW = '0 0 32px 8px rgba(99, 102, 241, 0.4)';

export default function CursorTrail() {
  useEffect(() => {
    // Create the cursor element
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = `${CURSOR_SIZE}px`;
    cursor.style.height = `${CURSOR_SIZE}px`;
    cursor.style.borderRadius = '50%';
    cursor.style.background = CURSOR_COLOR;
    cursor.style.boxShadow = CURSOR_SHADOW;
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '99999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'background 0.2s';
    cursor.style.mixBlendMode = 'screen';
    cursor.style.opacity = '0.85';
    cursor.style.backdropFilter = 'blur(2px)';
    cursor.style.willChange = 'transform';
    cursor.style.left = '0px';
    cursor.style.top = '0px';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrame;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '0.85';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };
    const handleMouseEnter = () => {
      cursor.style.opacity = '0.85';
    };

    // Animation loop for smooth following
    function animate() {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      animationFrame = requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hide the default cursor
    document.body.style.cursor = 'none';

    // Clean up
    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrame);
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
    };
  }, []);

  return null;
} 