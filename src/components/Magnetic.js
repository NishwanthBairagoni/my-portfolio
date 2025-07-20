import { useRef, useEffect } from 'react';
import React from 'react';

/**
 * Usage:
 * <Magnetic><button className="magnetic ...">Button</button></Magnetic>
 */
export default function Magnetic({ children, strength = 0.25, scale = 1.05, threshold = 100 }) {
  const ref = useRef();
  const rafId = useRef();
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const isActive = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMouseMove(e) {
      const rect = el.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      const dist = Math.hypot(mouseX.current - btnX, mouseY.current - btnY);
      isActive.current = dist < threshold;
    }

    function animate() {
      if (isActive.current) {
        const rect = el.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        const dx = (mouseX.current - btnX) * strength;
        const dy = (mouseY.current - btnY) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        el.style.zIndex = 2;
        el.classList.add('magnetic-hover');
      } else {
        el.style.transform = '';
        el.style.zIndex = '';
        el.classList.remove('magnetic-hover');
      }
      rafId.current = requestAnimationFrame(animate);
    }
    rafId.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (el) {
        el.style.transform = '';
        el.style.zIndex = '';
        el.classList.remove('magnetic-hover');
      }
    };
  }, [strength, scale, threshold]);

  // Only allow a single React element as a child
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, { ref });
} 