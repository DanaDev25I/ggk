import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Pb } from './auth.js'; // PocketBase client

const SignUpPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(emailRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5 }
    );
    
    gsap.fromTo(passwordRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
    );

    gsap.fromTo(confirmPasswordRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5, delay: 0.4 }
    );

    gsap.fromTo(submitRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.6 }
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Create a new user in PocketBase
        await Pb.collection('users').create({
          email: values.email,
          password: values.password,
          passwordConfirm: values.confirmPassword,
        });
        
        // Automatically log the user in after sign-up
        await Pb.collection('users').authWithPassword(values.email, values.password);
        
        navigate('/');
      } catch (error) {
        console.error('Sign-up failed:', error);
        // Optionally set an error message to show to the user
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="relative mb-6">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
            ref={emailRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="relative mb-6">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
            ref={passwordRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="relative mb-6">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
            ref={confirmPasswordRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="text-red-500">{formik.errors.confirmPassword}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-teal-600 text-white rounded-full focus:outline-none"
          ref={submitRef}
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-teal-600">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Pb } from './auth.js'; // PocketBase client

const LoginPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(emailRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5 }
    );
    
    gsap.fromTo(passwordRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
    );

    gsap.fromTo(submitRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.4 }
    );
  }, []);

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
      } catch (error) {
        console.error('Login failed:', error);
        // Optionally set an error message to show to the user
      }
    },
  });
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="relative mb-6">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
            ref={emailRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="relative mb-6">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
            ref={passwordRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-teal-600 text-white rounded-full focus:outline-none"
          ref={submitRef}
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-teal-600">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
