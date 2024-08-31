import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input'; // Custom Input component
import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import StarsBackground from './starbg'; // Import StarsBackground
import validation from './yup.js';
import { useEffect } from 'react';
import logo from '../../public/img/world-wide.png';
import WestIcon from '@mui/icons-material/West';

const UserDetailsStep = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validation,
    onSubmit: (values) => {
      localStorage.setItem('userDetails', JSON.stringify(values));
      navigate('/signup/avatar');
    },
  });

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleFocus = useCallback((ref) => {
    gsap.to(ref.current, {
      duration: 0.3,
      boxShadow: '0 0 10px 2px rgba(69, 215, 203, 0.8)',
      ease: 'power1.out',
    });
  }, []);

  const handleBlur = useCallback((ref) => {
    gsap.to(ref.current, {
      duration: 0.3,
      boxShadow: 'none',
      ease: 'power1.out',
    });
  }, []);

  useEffect(() => {
    const refs = [emailRef, usernameRef, passwordRef, confirmPasswordRef];

    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.addEventListener('focus', () => handleFocus(ref));
        ref.current.addEventListener('blur', () => handleBlur(ref));
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.removeEventListener('focus', () => handleFocus(ref));
          ref.current.removeEventListener('blur', () => handleBlur(ref));
        }
      });
    };
  }, [handleFocus, handleBlur]);

  const getInputClasses = (field) => {
    const baseClasses =
      'w-full h-12 text-lg rounded-full border-2 outline-none transition-colors bg-white dark:bg-gray-800 text-gray-800 dark:text-white';
    const errorClasses = 'border-red-500 shadow-md shadow-red-500';
    const defaultClasses = 'border-[#01ffff]';

    return `${baseClasses} ${formik.touched[field] && formik.errors[field] ? errorClasses : defaultClasses}`;
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-gray-800 dark:to-gray-900 overflow-hidden">

      <StarsBackground />
      <div className='relative p-4  z-10 flex flex-col items-center justify-center w-full h-full'>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-md relative shadow-lg border-t-3 border-[#01ffff] shadow-[#01ffff]"
      >
       <Link className="flex items-center text-black dark:text-white hover:text-gray-500" to="/">
           <WestIcon fontSize="medium" className="mr-1" />
            Go back
        </Link>
        
        <img src={logo} alt="logo" className="w-24 h-24 translate-x-[118px] md:translate-x-[140px] mb-1" />
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Sign Up - Step 1</h1>

        <div className="relative mb-8">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className={getInputClasses('email')}
            ref={emailRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="relative mb-8">
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Your username"
            className={getInputClasses('username')}
            ref={usernameRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">{formik.errors.username}</p>
          ) : null}
        </div>

        <div className="relative mb-8">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            className={getInputClasses('password')}
            ref={passwordRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="relative mb-8">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className={getInputClasses('confirmPassword')}
            ref={confirmPasswordRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full font-bold h-12 rounded-full text-white bg-[#28e7e7] transition-colors"
        >
          Next Step
        </button>
      </form>
      </div>
    </div>
  );
};

export default UserDetailsStep;
