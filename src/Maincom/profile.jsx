import { useState, useEffect } from 'react';
import { Pb } from './auth.js'; 
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import withAuth from './Hoc.jsx';
import { Spinner } from "@nextui-org/spinner"
import Starbg from './starbg.jsx';

const Home = () => {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(Pb.authStore.isValid);
  const [, setUserEmail] = useState(Pb.authStore.model?.email || '');
  const [userName, setUserName] = useState(Pb.authStore.model?.username || '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    oldPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Old Password is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  useEffect(() => {
    let isMounted = true;
    const fetchProfilePic = async () => {
      setLoading(true);
      try {
        const user = Pb.authStore.model;
        if (!user) {
          if (isMounted) setError('User is not logged in.');
          return;
        }

        const userRecord = await Pb.collection('users').getOne(user.id);

        if (userRecord.avatar) {
          const fileUrl = Pb.files.getUrl(userRecord, userRecord.avatar);
          if (isMounted) setProfilePicUrl(fileUrl);
        } else {
          if (isMounted) setError('Set a profile picture');
        }
      } catch (err) {
        if (isMounted) {
          setError('Error fetching profile picture.');
          console.error('Error fetching profile picture:', err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProfilePic();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    Pb.authStore.onChange(() => {
      setIsLoggedIn(Pb.authStore.isValid);
      setUserEmail(Pb.authStore.model?.email || '');
      setUserName(Pb.authStore.model?.username || '');
    });
  }, []);

  const handleLogout = async () => {
    try {
      await Pb.authStore.clear();
      setIsLoggedIn(false);
      setProfilePicUrl('');
      setUserEmail('');
      setUserName('');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message || error);
    }
  };

  const AvatarSchema = Yup.object().shape({
    avatar: Yup.mixed(),
  });

  const handleProfileUpdate = async (values) => {
    try {
      const formData = new FormData();

      // Password update logic
      if (values.password || values.confirmPassword) {
        if (!values.oldPassword || values.oldPassword.trim() === '') {
          setError('Old password is required to change your password.');
          return;
        }
        if (values.password.length < 8 || values.password.length > 72) {
          setError('Password must be between 8 and 72 characters.');
          return;
        }
        if (values.password !== values.confirmPassword) {
          setError('Passwords do not match.');
          return;
        }

        formData.append('oldPassword', values.oldPassword);
        formData.append('password', values.password);
        formData.append('passwordConfirm', values.confirmPassword);
      }

      // Username update logic
      if (values.username && values.username.trim() !== '') {
        formData.append('username', values.username);
      }

      const updatedUser = await Pb.collection('users').update(Pb.authStore.model.id, formData);

      setUserName(updatedUser.username);

      await Pb.authStore.clear();
      setIsLoggedIn(false);
      setProfilePicUrl('');
      setUserEmail('');
      setUserName('');
      setError(''); 
      navigate('/login');
    } catch (err) {
      setError(`Error updating profile: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      console.error('Error updating profile:', err.response || err);
    }
  };

  const handleAvatarUpdate = async (values) => {
    try {
      const formData = new FormData();

      if (values.avatar && values.avatar instanceof File) {
        formData.append('avatar', values.avatar);
      }

      setLoading(true);
      const updatedUser = await Pb.collection('users').update(Pb.authStore.model.id, formData);

      if (updatedUser.avatar) {
        const updatedProfilePicUrl = Pb.files.getUrl(updatedUser, updatedUser.avatar);
        setProfilePicUrl(updatedProfilePicUrl);
      }

      setError('');
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(`Error updating avatar: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      console.error('Error updating avatar:', err.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <Starbg />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 dark:bg-black p-6 overflow-y-auto">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-md relative shadow-lg border-t-4 border-[#01ffff] shadow-[#01ffff]">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Spinner size="lg" />
            </div>
          ) : profilePicUrl ? (
            <img
              src={profilePicUrl}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-3 border-[#01ffff]"
            />
          ) : (
            <p className="text-gray-500 mb-4 text-center">Loading profile picture...</p>
          )}
          
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">Hi <br /> {userName}</h1>
          
          <Formik
            initialValues={{
              username: userName,
              oldPassword: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={ProfileSchema}
            onSubmit={handleProfileUpdate}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4 ">
                <div>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    className={`w-full px-4 py-2 rounded-full bg-white dark:bg-gray-600 dark:text-white ${errors.username && touched.username ? 'border-red-500' : ''}`}
                  />
                  {errors.username && touched.username && <p className="text-red-500 mt-2">{errors.username}</p>}
                </div>
                <div>
                  <Field
                    name="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    className={`w-full px-4 py-2 rounded-full bg-white dark:bg-gray-600 dark:text-white ${errors.oldPassword && touched.oldPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.oldPassword && touched.oldPassword && <p className="text-red-500 mt-2">{errors.oldPassword}</p>}
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="New Password"
                    className={`w-full px-4 py-2 rounded-full bg-white dark:bg-gray-600 dark:text-white ${errors.password && touched.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && touched.password && <p className="text-red-500 mt-2">{errors.password}</p>}
                </div>
                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={`w-full px-4 py-2 rounded-full bg-white dark:bg-gray-600 dark:text-white ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && touched.confirmPassword && <p className="text-red-500 mt-2">{errors.confirmPassword}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Update Profile
                </button>
              </Form>
            )}
          </Formik>
      
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>

       {/* Avatar Section */}
{isLoggedIn && (
  <div className="relative md:w-1/2 md:pl-8 mt-6 md:mt-0 max-h-screen overflow-auto">
    <div className="bg-white dark:bg-gray-900 shadow-[#01ffff] p-8 rounded-lg shadow-lg max-w-md w-full text-center">
      <Formik
        initialValues={{ avatar: null }}
        validationSchema={AvatarSchema}
        onSubmit={handleAvatarUpdate}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <input
                id="avatar"
                name="avatar"
                type="file"
                onChange={(event) => {
                  setFieldValue('avatar', event.currentTarget.files[0]);
                }}
                className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-600 dark:text-white"
              />
              {errors.avatar && touched.avatar && <p className="text-red-500 mt-2">{errors.avatar}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              Update Avatar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default withAuth(Home);
