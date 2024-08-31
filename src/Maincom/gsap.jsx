// animations.js
import gsap from 'gsap';
 const animateElements = (refs) => {
  const { emailRef, usernameRef, passwordRef, confirmPasswordRef, submitRef } = refs;

  gsap.fromTo(emailRef.current, 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 0.5 }
  );
  
  gsap.fromTo(usernameRef.current, 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
  );

  gsap.fromTo(passwordRef.current, 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 0.5, delay: 0.4 }
  );

  gsap.fromTo(confirmPasswordRef.current, 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 0.5, delay: 0.6 }
  );

  gsap.fromTo(submitRef.current, 
    { opacity: 0, scale: 0.9 }, 
    { opacity: 1, scale: 1, duration: 0.5, delay: 0.8 }
  );
};


export default animateElements