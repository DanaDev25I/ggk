import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Pb } from './auth.js'; // PocketBase client

const SignUpPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const submitRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
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
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      avatar: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      username: Yup.string()
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Append user details
        formData.append('email', values.email);
        formData.append('username', values.username);
        formData.append('password', values.password);
        formData.append('passwordConfirm', values.confirmPassword);

        // Append avatar if it exists
        if (values.avatar) {
          formData.append('avatar', values.avatar);
        }

        // Create user
        await Pb.collection('users').create(formData);

        // Authenticate user
        await Pb.collection('users').authWithPassword(values.email, values.password);

        // Navigate to another page after successful sign-up
        navigate('/pro');
      } catch (error) {
        console.error('Sign-up failed:', error.response ? error.response.data.message : error.message);
        alert('Sign-up failed: ' + (error.response ? error.response.data.message : error.message));
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
            id="username"
            name="username"
            type="text"
            placeholder="Your username"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
            ref={usernameRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-red-500">{formik.errors.username}</p>
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
        <div className="relative mb-6">
          <input
            id="avatar"
            name="avatar"
            type="file"
            onChange={(event) => {
              formik.setFieldValue('avatar', event.currentTarget.files[0]);
            }}
            className="w-full text-gray-800"
            ref={avatarRef}
          />
          {formik.touched.avatar && formik.errors.avatar ? (
            <p className="text-red-500">{formik.errors.avatar}</p>
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