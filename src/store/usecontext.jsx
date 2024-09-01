import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { run } from '../Ai/config';
import {Pb} from '../Maincom/auth.js'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [numberofpage, setnumberofpage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(Pb.authStore.isValid);
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const authResponse = await Pb.collection('users').authWithPassword(email, password);
      // Assuming authResponse contains user info
      setUser({ email, ...authResponse });
     setErr(null); // Clear any previous error
    } catch (err) {
     setErr(err.message || 'Login failed'); // Set error message
      throw err; // Rethrow error if needed
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const user = Pb.authStore.model;
        if (user) {
          const userRecord = await Pb.collection('users').getOne(user.id);
          if (userRecord.avatar) {
            const fileUrl = Pb.files.getUrl(userRecord, userRecord.avatar);
            if (isMounted) setProfilePicUrl(fileUrl);
          }
          if (userRecord.username) {
            if (isMounted) setUserName(userRecord.username);
          }
        }
      } catch (err) {
        setErr('Error fetching profile data.');
        console.error('Error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  useEffect(() => {
    Pb.authStore.onChange(() => {
      setIsLoggedIn(Pb.authStore.isValid);
      setUserName(Pb.authStore.model?.username || '');
      setProfilePicUrl(Pb.authStore.model?.avatar || '');
    });
  }, []);

  const handleLogout = async () => {
    try {
      await Pb.authStore.clear();
      setIsLoggedIn(false);
      setProfilePicUrl('');
      setUserName('');
      setErr('');
    } catch (error) {
      setErr('Error logging out.');
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        return;
      }
      setLoading(true);

      try {
        const apiKey = "AIzaSyAupSPqcjb4ugYAa3gGWRSHTv6xnxubG9w";
        const cx = '768b5d2139b45494a';
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&start=${(numberofpage - 1) * 10 + 1}`;
        const response = await axios.get(apiUrl);
        const items = response.data.items || [];
        const totalResults = response.data.searchInformation.totalResults || 0; 
        setData(items);
        setTotalResults(totalResults);  
      } catch (error) {
        console.error('Error fetching data:', error);
        setErr(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, numberofpage]);

  const delayPara = (index, nextWord, callback) => {
    setTimeout(() => {
      callback(nextWord);
    }, index * 7); 
  };

  const onSent = async (prompt) => {
    setIsSending(true);
    const newMessage = { prompt, response: '', loading: true, typing: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    setShowResults(true);

    try {
      const response = await run(prompt);
      let responseArray = response.split("**");
      let newResponse = responseArray
        .map((part, i) => (i % 2 === 0 ? part : `<b>${part}</b>`))
        .join("");
      let formattedResponse = newResponse.split("*").join("<br/>");
      let responseArray2 = formattedResponse.split("");
      let currentResponse = '';

      responseArray2.forEach((nextWord, i) => {
        delayPara(i, nextWord, (word) => {
          currentResponse += word;
          setMessages((prevMessages) =>
            prevMessages.map((msg, index) =>
              index === prevMessages.length - 1
                ? { ...msg, response: currentResponse }
                : msg
            )
          );
        });
      });
      
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, typing: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error while running chat:", error);
      setErr(true);
    } finally {
      setLoading(false);
      setIsSending(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    setShowResults(false);
    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ 
      messages, loading, showResults, onSent, newChat, searchTerm, setSearchTerm, data, setData, 
      setShowResults, setLoading, 
      setnumberofpage, numberofpage, 
      totalResults, setTotalResults, 
      isSending,  err, isLoggedIn, setIsLoggedIn,
      profilePicUrl, userName, handleLogout ,login,user
    }}>
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);