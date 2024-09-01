import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import robot from '../../public/img/world-wide.png';
import { Link } from 'react-router-dom';
import Starbg from './starbg';
import { useStateContext } from '../store/usecontext';
const Home = () => {
  const [starCount, setStarCount] = useState(40);
  const starsRef = useRef([]);
  const textRefs = useRef([]);

  const { isLoggedIn } = useStateContext(); // Destructure isLoggedIn from AuthContext

  useEffect(() => {
    const updateStarCount = () => {
      setStarCount(window.innerWidth < 768 ? 30 : 100);
    };

    updateStarCount(); // Set initial count
    window.addEventListener('resize', updateStarCount); // Update on resize

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
            scale: 0.5 + Math.random() * 1.5, // Added scaling for more variety
          }
        );
      }
    });
  }, [starCount]);

  useEffect(() => {
    gsap.to('#img', {
      opacity: 1,
      scale: 1.5,
      duration: 1,
      ease: "power2.inOut"
    });

    gsap.to("#span", { opacity: 1, duration: 1.5, delay: 1 });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      textRefs.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power4.out',
        delay: 1,
      }
    );
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <Starbg />
      <div className="relative space-x-4 justify-end flex p-[20px] md:translate-x-[-50px]">
        {!isLoggedIn && (
          <>
            <Link to="/signup" className="mt-6 px-4 py-2 bg-white font-bold text-[#01ffff] rounded-md hover:bg-[#01ffff] hover:text-white transition-all border-3 border-[#01ffff] dark:bg-black dark:text-[#01ffff] dark:border-[#01ffff] dark:hover:bg-[#01ffff] dark:hover:text-white transform hover:scale-105">
              Sign Up
            </Link>
            <Link to="/login" className="mt-6 px-4 py-2 font-bold bg-white text-[#01ffff] rounded-md hover:bg-[#01ffff] hover:text-white transition-all border-3 border-[#01ffff] dark:bg-black dark:text-[#01ffff] dark:border-[#01ffff] dark:hover:bg-[#01ffff] dark:hover:text-white transform hover:scale-105">
              Login
            </Link>
          </>
        )}
      </div>
      <div className="relative z-10 flex flex-col items-center translate-y-[100px]">
        <div className="text-center  dark:text-white">
          <div className="flex gap-7 mb-[80px] md:mb-[60px] mt-[-50px] px-[29px] md:translate-x-[-300px]">
            <img id="img" className="opacity-0 md:h-[80px] h-[60px]" src={robot} alt="Logo" />
            <div className='md:translate-y-[-20px]'>
              <span id="span" className="opacity-0 bg-gradient-to-r from-[#50e9e9] to-[#01ffff] bg-clip-text text-transparent text-4xl italic font-bold transition-colors hover:text-gray-400">
                <span className="text-2xl font-semibold text-white md:translate-x-[40px] ">Welcome to</span><br />
                Webfinder
              </span>
            </div>
          </div>

          <p className="text-lg mx-auto max-w-lg">
            <span ref={(el) => (textRefs.current[0] = el)}>
              Discover a world of possibilities with our curated categories!
            </span>
            <br className="hidden md:block" />
            <span ref={(el) => (textRefs.current[1] = el)}>
              Whether you are looking to dive into thrilling 
            </span>
            <br className="hidden md:block" />
            <span ref={(el) => (textRefs.current[2] = el)}>
              <Link to="/games" className="text-blue-200 hover:underline">games</Link> for endless fun, explore the latest
            </span>
            <br className="hidden md:block" />
            <span ref={(el) => (textRefs.current[3] = el)}>
              <Link to="/movies" className="text-blue-200 hover:underline">movies</Link> for your entertainment, find essential
            </span>
            <br className="hidden md:block" />
            <span ref={(el) => (textRefs.current[4] = el)}>
              <Link to="/apps" className="text-blue-200 hover:underline">apps</Link> to boost your
            </span>
            <br className="hidden md:block" />
            <span ref={(el) => (textRefs.current[5] = el)}>
              productivity, or connect with friends through various
            </span>
            <br className="hidden md:block" />
            <span ref={(el) => (textRefs.current[6] = el)}>
              <Link to="/social-media" className="text-blue-200 hover:underline">social media</Link> platforms, we have it all right here for you!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
