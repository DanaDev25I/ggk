import { useState, useEffect } from 'react';
import { Pb } from './auth.js'; 
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Home = () => {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(Pb.authStore.isValid);
  const [userEmail, setUserEmail] = useState(Pb.authStore.model?.email || '');
  const [userName, setUserName] = useState(Pb.authStore.model?.username || '');

  useEffect(() => {
    let isMounted = true;

    const fetchProfilePic = async () => {
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
    } catch (error) {
      console.error('Error logging out:', error.message || error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    oldPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Old Password is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const AvatarSchema = Yup.object().shape({
    avatar: Yup.mixed(),
  });

  const handleProfileUpdate = async (values) => {
    try {
      const formData = new FormData();

      // Check if the user is trying to update their password
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

        // Append password fields to the FormData
        formData.append('oldPassword', values.oldPassword);
        formData.append('password', values.password);
        formData.append('passwordConfirm', values.confirmPassword);
      }

      // Append the username if it needs to be updated
      if (values.username && values.username.trim() !== '') {
        formData.append('username', values.username);
      }

      // Make the update request
      const updatedUser = await Pb.collection('users').update(Pb.authStore.model.id, formData);

      // Update local states with the new information
      setUserName(updatedUser.username);

      setError(''); // Clear any previous error
    } catch (err) {
      setError(`Error updating profile: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      console.error('Error updating profile:', err.response || err);
    }
  };

  const handleAvatarUpdate = async (values) => {
    try {
      const formData = new FormData();

      // Append the avatar file if it exists
      if (values.avatar && values.avatar instanceof File) {
        formData.append('avatar', values.avatar);
      }

     
      const updatedUser = await Pb.collection('users').update(Pb.authStore.model.id, formData);

      // Update local states with the new information
      if (updatedUser.avatar) {
        const updatedProfilePicUrl = Pb.files.getUrl(updatedUser, updatedUser.avatar);
        setProfilePicUrl(updatedProfilePicUrl);
      }

      setError(''); // Clear any previous error
    } catch (err) {
      setError(`Error updating avatar: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      console.error('Error updating avatar:', err.response || err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {profilePicUrl ? (
          <img
            src={profilePicUrl}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-gray-300"
          />
        ) : (
          <p className="text-gray-500 mb-4">Loading profile picture...</p>
        )}

        {isLoggedIn ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Hi <br/> {userName}</h1>

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
              <Form className="mb-4">
                <div className="mb-4">
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    name="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    name="password"
                    type="password"
                    placeholder="New Password"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Update Profile
                </button>
              </Form>
            </Formik>

            <Formik
              initialValues={{ avatar: null }}
              validationSchema={AvatarSchema}
              onSubmit={handleAvatarUpdate}
            >
              {({ setFieldValue }) => (
                <Form className="mb-4">
                  <div className="mb-4">
                    <input
                      name="avatar"
                      type="file"
                      onChange={(event) => {
                        setFieldValue('avatar', event.currentTarget.files[0]);
                      }}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Update Avatar
                  </button>
                </Form>
              )}
            </Formik>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Home Page!</h1>
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home
