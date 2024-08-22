import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { run } from '../Ai/config'; 

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  useEffect(() => {
  const fetchData = async () => {
    if (!searchTerm) {
      return;
    }
    setLoading(true);

    try {
      const apiKey = 'AIzaSyCuMZ1F76WQQETg3GBLu9eOkOi3p9xzeLQ';
      const cx = 'f4589861069644b07';
      const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}`;
      const response = await axios.get(apiUrl);
      const items = response.data.items || [];
      setData(items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

    fetchData();
  }, [searchTerm]);

  const  delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((previousResult) => previousResult + nextWord);
    }, index * 10);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResults(true);
   
    
    try {
      const response = await run(prompt);
      let responseArray = response.split("**");
      let newResponse = "";
      
      for (let i = 0; i < responseArray.length; i++) {
        newResponse += (i % 2 === 0 ? responseArray[i] : `<b>${responseArray[i]}</b>`);
      }
      
      let newResponse2 = newResponse.split("*").join("<br/>");
      let newResponseArray = newResponse2.split("");
      
      newResponseArray.forEach((nextWord, i) => {
        delayPara(i, nextWord + "");
      });
    } catch (error) {
      console.error("Error while running chat:", error);
    } finally {
      setLoading(false);
     
    }
  };

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
  
  };

  return (
    <StateContext.Provider value={{ 
      searchTerm, setSearchTerm, data, setData, 
      showResults, setShowResults, loading, setLoading, 
      resultData, setResultData, onSent, newChat 
    }}>
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
