import { useState, useEffect } from 'react';
import { Pb } from './auth.js'; 
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Spinner } from "@nextui-org/spinner"

const Home = () => {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(Pb.authStore.isValid);
  const [, setUserEmail] = useState(Pb.authStore.model?.email || '');
  const [userName, setUserName] = useState(Pb.authStore.model?.username || '');
  const [loading, setLoading] = useState(false); // Add a loading state
  
 

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    oldPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Old Password is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });






  useEffect(() => {
    let isMounted = true;
    const fetchProfilePic = async () => {
      setLoading(true); // Start loading
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
        if (isMounted) setLoading(false); // Stop loading
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

      if (values.avatar && values.avatar instanceof File) {
        formData.append('avatar', values.avatar);
      }

      setLoading(true); // Start loading
      const updatedUser = await Pb.collection('users').update(Pb.authStore.model.id, formData);

      if (updatedUser.avatar) {
        const updatedProfilePicUrl = Pb.files.getUrl(updatedUser, updatedUser.avatar);
        setProfilePicUrl(updatedProfilePicUrl);
      }

      setError('');
    } catch (err) {
      setError(`Error updating avatar: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      console.error('Error updating avatar:', err.response || err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Profile Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center md:w-1/2 md:border-r md:border-gray-300 md:pr-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Spinner size="lg" />
          </div>
        ) : profilePicUrl ? (
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




            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 mt-4"
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

      {/* Avatar Section */}
      {isLoggedIn && (
        <div className="hidden md:block md:w-1/2 md:pl-8">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4">Update Avatar</h2>

            <Formik
              initialValues={{ avatar: null }}
              validationSchema={AvatarSchema}
              onSubmit={handleAvatarUpdate}
            >
              {({ setFieldValue }) => (
                <Form>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
