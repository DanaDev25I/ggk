import { useState, useEffect, useRef } from 'react';
import { Button, } from '@nextui-org/react';
import { useStateContext } from '../store/usecontext';
import { gsap } from 'gsap';
import rbobot from '../../public/img/robot.png';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useMediaQuery } from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
const Main = () => {
  const [input, setInput] = useState('');
  const { messages, newChat, loading, onSent, showResults } = useStateContext();
  const chatContainerRef = useRef(null); 
  const loadingRef = useRef(null); 
  const { theme } = useTheme();
  const inputRef = useRef(null);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:1200px)');
  
  const iconSize = isSmallScreen ? 20 : isMediumScreen ? 70 : 55;

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    await onSent(input);
    setInput('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (loading && loadingRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(loadingRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'ease.inOut'
      })
      .to(loadingRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'ease.inOut'
      });
    }
  }, [loading]);

  useEffect(() => {
    const inputElement = inputRef.current;

    const handleFocus = () => {
      gsap.to(inputElement, {
        duration: 0.3,
        boxShadow: "0 0 10px 2px rgba(69, 215, 203, 0.8)",
        ease: "power1.out",
      });
    };

    const handleBlur = () => {
      gsap.to(inputElement, {
        duration: 0.3,
        boxShadow: "none",
        ease: "power1.out",
      });
    };

    inputElement.addEventListener("focus", handleFocus);
    inputElement.addEventListener("blur", handleBlur);

    return () => {
      inputElement.removeEventListener("focus", handleFocus);
      inputElement.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleInput = () => {
    handleSendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInput();
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gray-100 dark:bg-black">
      <div className={` ${theme === "dark" ? 'bg-black' : 'bg-white'} font-bold px-6 flex justify-between items-center md:px-[250px] py-4`}>
        <Link to="/" className="flex items-center justify-center gap-2 mb-4">
          <img className="h-12" src={rbobot} alt="Logo" />
          <span className={`font-bold bg-gradient-to-r from-[#50e9e9] to-${theme === "dark" ? 'white' : 'black'} bg-clip-text text-transparent text-2xl pr-7 italic hover:text-gray-400 font-bold transition-colors`}>
            Ai Chat
          </span>
        </Link>

        <Button className='border-2 border-[#01ffff]' onClick={newChat}>New Chat</Button>
      </div>
      <div className="container mx-auto p-4">
        {!showResults ? (
          <div className="my-12 text-center">
            <p className="text-4xl font-medium text-gray-400">
              <span className={`bg-gradient-to-r from-[#01ffff] to-${theme === "dark" ? 'white' : 'black'} bg-clip-text text-transparent font-bold text-2xl md:text-4xl pr-7 italic hover:text-gray-400  transition-colors`}>
                Welcome to Ai Chat
              </span>
            </p>
            <p className="md:text-2xl mt-4">How can I help you today?</p>
          </div>
        ) : (
          <div
            ref={chatContainerRef} // Attach ref to the chat container
            className="p-4 max-h-[70vh] overflow-hidden"
          >
            {messages.map((msg, index) => (
              <div key={index} className="mb-8 flex items-start gap-4">
                <img
                  src={rbobot}
                  alt="Gemini Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="result mt-2" dangerouslySetInnerHTML={{ __html: msg.response }} />
                </div>
              </div>
            ))}
            {loading && (
              <div ref={loadingRef} className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            )}
          </div>
        )}
       <div className="text-center text-gray-500 mt-20 flex flex-col items-center w-full">
  <div className="fixed md:p-6 p-2 bottom-5">
    <div className="relative"> 
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        ref={inputRef}
        className="md:p-4 p-2 pr-[50px] md-2 md:pr-[75px] border-2 pl-4 border-gray-300 text-lg md:w-[800px] rounded-full outline-none" 
      />
      <SendIcon
        className="absolute right-[20px] md:right-8 fonts top-1/2 transform -translate-y-1/2 dark:text-[#01ffff] cursor-pointer text-[#2acbcb]"
        onClick={handleInput}
        sx={{iconSize}}
      />
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Main;

