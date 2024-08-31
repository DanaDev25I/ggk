import  { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "@nextui-org/spinner";
import logo from '../../public/img/world-wide.png';
import StarField from './starbg'; // Import the new StarField component
import { Pb } from './auth.js'; // PocketBase client

const AvatarUploadStep = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [signUpError, setSignUpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [starCount, setStarCount] = useState(100);

  useEffect(() => {
    const updateStarCount = () => {
      setStarCount(window.innerWidth < 768 ? 30 : 100);
    };

    updateStarCount();
    window.addEventListener('resize', updateStarCount);

    return () => window.removeEventListener('resize', updateStarCount);
  }, []);

  const formik = useFormik({
    initialValues: {
      avatar: null,
    },
    onSubmit: async (values) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));

      setLoading(true);

      try {
        const formData = new FormData();

        formData.append('email', userDetails.email);
        formData.append('username', userDetails.username);
        formData.append('password', userDetails.password);
        formData.append('passwordConfirm', userDetails.confirmPassword);

        if (values.avatar) {
          formData.append('avatar', values.avatar);
        }

        await Pb.collection('users').create(formData);
        await Pb.collection('users').authWithPassword(userDetails.email, userDetails.password);

        navigate('/pro');
      } catch (error) {
        setSignUpError('Please choose a picture.');
        console.error('Sign-up failed:', error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen p-3 bg-white dark:bg-black">
      <div className="absolute inset-0">
        <StarField starCount={starCount} />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-md relative shadow-lg border-t-3 border-[#01ffff] shadow-[#01ffff]"
      >
        <img src={logo} alt="logo" className="w-24 h-24 translate-x-[130px] md:translate-x-[140px] mb-1" />
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Sign Up - Step 2</h1>

        <div className="flex flex-col items-center gap-4 mb-8">
          <label className="block w-full text-gray-700 dark:text-gray-300 mb-2 cursor-pointer">
            <input
              id="avatar"
              name="avatar"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                formik.setFieldValue('avatar', file);
                setAvatarPreview(URL.createObjectURL(file));
              }}
              className="sr-only"
              accept="image/*"
            />
            <div className="flex items-center justify-center w-full h-12 rounded-full text-white bg-[#01ffff] hover:bg-[#0094b0]">
              <span className="text-sm font-semibold">Select</span>
            </div>
          </label>

          {avatarPreview && (
            <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 rounded-full border-2 border-[#01ffff]" />
          )}
        </div>

        {signUpError && (
          <p className="text-red-500 text-center mb-4">{signUpError}</p>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-12">
            <Spinner type="points" color="primary" size="lg" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full font-bold h-12 rounded-full text-white bg-[#01ffff] transition-colors"
          >
            Complete Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default AvatarUploadStep;
