import React, { useEffect, useState } from 'react';
import './MouseAnimation.css';

const MouseAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners to the entire document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div 
        className="cursor-dot"
        style={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: '16px',
          height: '16px',
          background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999999,
          pointerEvents: 'none',
          boxShadow: '0 0 30px rgba(14, 165, 233, 0.8)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Cursor ring */}
      <div 
        className="cursor-ring"
        style={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: '60px',
          height: '60px',
          border: '3px solid rgba(14, 165, 233, 0.4)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 999998,
          pointerEvents: 'none',
          animation: 'pulse 2.5s infinite',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Cursor trail dots */}
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
            width: '8px',
            height: '8px',
            background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 999997,
            pointerEvents: 'none',
            animation: `trailFade 1.2s ease-out ${index * 0.1}s forwards`,
            mixBlendMode: 'screen'
          }}
        />
      ))}
    </>
  );
};

export default MouseAnimation; 