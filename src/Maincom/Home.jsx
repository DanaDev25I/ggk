import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const StarAnimation = () => {
  const starsRef = useRef([]);

  useEffect(() => {
    starsRef.current.forEach((star, i) => {
      gsap.fromTo(
        star,
        { opacity: 0, y: -50 },
        {
          opacity: Math.random(),
          y: 50,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
          ease: 'power1.inOut',
        }
      );
    });
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative w-full h-full">
          <div className="signup-space w-full h-full">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="signup-stars bg-white rounded-full absolute"
                ref={(el) => (starsRef.current[i] = el)}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 80}px`, // Responsive size range
                  height: `${20 + Math.random() * 80}px`, // Responsive size range
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarAnimation;
