import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { run } from '../Ai/config'; 

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false); // New state to track message sending
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [numberofpage, setnumberofpage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchhistory, setSearchhistory] = useState([]);
  const [err,seterr] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        return;
      }
      setLoading(true);
  
      try {
        const apiKey = "AIzaSyCuMZ1F76WQQETg3GBLu9eOkOi3p9xzeLQ";
        const cx = 'f4589861069644b07';
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&start=${(numberofpage - 1) * 10 + 1}`;
        const response = await axios.get(apiUrl);
        const items = response.data.items || [];
        setSearchhistory((prev) => [...prev, searchTerm]);
        const totalResults = response.data.searchInformation.totalResults || 0; 
        setData(items);
        setTotalResults(totalResults);  
      } catch (error) {
        console.error('Error fetching data:', error);
        seterr(true)
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
    setIsSending(true); // Disable sending until message processing is complete
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
      
      // Remove typing indicator after message is fully displayed
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, typing: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error while running chat:", error);
      seterr(true)
    } finally {
      setLoading(false);
      setIsSending(false); // Re-enable sending after processing is complete
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
      searchhistory, isSending ,
       err
    }}>
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
