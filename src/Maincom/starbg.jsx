// StarsBackground.js
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const StarsBackground = () => {
  const [starCount, setStarCount] = useState(100);
  const starsRef = useRef([]);

  useEffect(() => {
    const updateStarCount = () => {
      setStarCount(window.innerWidth < 768 ? 30 : 100);
    };

    updateStarCount();
    window.addEventListener('resize', updateStarCount);

    return () => window.removeEventListener('resize', updateStarCount);
  }, []);

  useEffect(() => {
    starsRef.current.forEach((star, i) => {
      if (star) {
        gsap.fromTo(
          star,
          { opacity: 0, y: -50 },
          {
            opacity: Math.random(),
            y: 50,
            duration: 2 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            delay: i * 0.01,
            ease: 'power2.inOut',
            scale: 0.5 + Math.random() * 1.5,
          }
        );
      }
    });
  }, [starCount]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
        <div className="signup-space w-full h-full">
          {[...Array(starCount)].map((_, i) => (
            <div
              key={i}
              className="signup-stars bg-[#01ffff] dark:bg-[#00bcd4] rounded-full absolute"
              ref={(el) => (starsRef.current[i] = el)}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${10}px`,
                height: `${10}px`,
                boxShadow: `0 0 ${Math.random() * 20}px ${Math.random() * 3}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(StarsBackground);
