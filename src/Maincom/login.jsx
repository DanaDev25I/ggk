import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input'; // Import your custom Input component
import { Pb } from './auth.js'; // PocketBase client
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import logo from '../../public/img/world-wide.png';
import Stars from './starbg'; // Import your Stars component
import WestIcon from '@mui/icons-material/West';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(''); // State for error messages

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await Pb.collection('users').authWithPassword(values.email, values.password);
        navigate('/');
        console.log(values);
      } catch (error) {
        // Set a specific error message based on the error
        setLoginError('Invalid email or password');
        console.error('Login failed:', error.response ? error.response.data.message : error.message);
      }
    },
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const handleFocus = (ref) => {
      gsap.to(ref.current, {
        duration: 0.3,
        boxShadow: "0 0 10px 2px rgba(69, 215, 203, 0.8)",
        ease: "power1.out",
      });
    };

    const handleBlur = (ref) => {
      gsap.to(ref.current, {
        duration: 0.3,
        boxShadow: "none",
        ease: "power1.out",
      });
    };

    if (emailRef.current) {
      emailRef.current.addEventListener("focus", () => handleFocus(emailRef));
      emailRef.current.addEventListener("blur", () => handleBlur(emailRef));
    }

    if (passwordRef.current) {
      passwordRef.current.addEventListener("focus", () => handleFocus(passwordRef));
      passwordRef.current.addEventListener("blur", () => handleBlur(passwordRef));
    }

    return () => {
      if (emailRef.current) {
        emailRef.current.removeEventListener("focus", () => handleFocus(emailRef));
        emailRef.current.removeEventListener("blur", () => handleBlur(emailRef));
      }

      if (passwordRef.current) {
        passwordRef.current.removeEventListener("focus", () => handleFocus(passwordRef));
        passwordRef.current.removeEventListener("blur", () => handleBlur(passwordRef));
      }
    };
  }, []);

  const getInputClasses = (field) => {
    const baseClasses = 'w-full h-12 text-lg rounded-full border-2 outline-none transition-colors bg-white dark:bg-gray-800 text-gray-800 dark:text-white';
    const errorClasses = 'border-red-500 shadow-md shadow-red-500'; // Error state styles
    const defaultClasses = 'border-[#01ffff]'; // Default state styles

    return `${baseClasses} ${formik.touched[field] && formik.errors[field] ? errorClasses : defaultClasses}`;
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-gray-800 dark:to-gray-900 overflow-hidden">

      <Stars /> {/* Add the stars component for background effect */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <form 
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-md relative shadow-lg border-t-3 border-[#01ffff] dark:border-[#01ffff]"
        >
            <Link className="flex items-center text-black dark:text-white hover:text-gray-500" to="/">
           <WestIcon fontSize="medium" className="mr-1" />
            Go back
        </Link>
          <img src={logo} alt="logo" className="w-24 h-24 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Log in</h1>
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
          {loginError && (
            <p className="text-red-500 text-center mb-4">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full font-bold h-12 rounded-full text-white bg-[#25d8d8] transition-colors hover:bg-[#01d4d4]"
          >
            Login
          </button>
          <Link to="/signup">
            <button
              type="button"
              className="w-full h-12 rounded-full border-2 border-[#01ffff] mt-2 font-bold text-[#01ffff] transition-colors hover:bg-[#01ffff] hover:text-white"
            >
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
