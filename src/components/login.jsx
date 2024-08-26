// src/components/LoginPage.js
// (No changes needed if you followed the previous example)

import React from 'react';
import { useForm } from 'react-hook-form';
import PocketBase from 'pocketbase';
import { useNavigate, Link } from 'react-router-dom';

const pb = new PocketBase('http://127.0.0.1:8090');

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitLogin = async (data) => {
    try {
      const authData = await pb.collection('users').authWithPassword(data.username, data.password);
      console.log('User authenticated:', authData);
      navigate('/', { state: { user: authData.record } });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              id="username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <Link to="/signup" className="mt-4 w-full py-2 px-4 text-blue-600 hover:underline focus:outline-none block text-center">
          Need an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
