import { useForm } from 'react-hook-form';
import PocketBase from 'pocketbase';
import { useNavigate, Link } from 'react-router-dom';

const pb = new PocketBase('https://search-app.pockethost.io/');

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitLogin = async (data) => {
    try {
      const authData = await pb.collection('users').authWithPassword(data.email, data.password);
      console.log('User authenticated:', authData);
      navigate('/', { state: { user: authData.record } });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmitLogin)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="relative mb-6">
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Your email address"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="relative mb-6">
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            placeholder="Your password"
            className="w-full h-12 pl-14 pr-4 text-lg rounded-full border-2 border-teal-400 outline-none transition-colors bg-white text-gray-800 focus:border-teal-800"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-teal-600 text-white rounded-full focus:outline-none"
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
