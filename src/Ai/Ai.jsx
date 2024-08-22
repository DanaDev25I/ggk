import { useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@nextui-org/react';
import { useStateContext } from '../store/usecontext'; // Adjust the path to where your context file is located

const Main = () => {
  const [input, setInput] = useState('');
  const { resultData,newChat,  loading, setLoading, showResults, setShowResults, onSent } = useStateContext();

  const handleSendMessage = async () => {
    setLoading(true);
    await onSent(input);
    setLoading(false);
    setShowResults(true);
    setInput('');

    gsap.fromTo(".result", { opacity: 0 }, { opacity: 1, duration: 1 });
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gray-100">
      <div className="flex items-center justify-between p-4 text-xl text-gray-600 bg-white shadow-md">
        <p>Gemini</p>
        <Button onClick={newChat}>NewChat</Button>
      </div>
      <div className="container mx-auto p-4">
        {!showResults ? (
          <>
            <div className="my-12 text-center">
              <p className="text-4xl font-medium text-gray-400">
                <span className="bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent">Welcome to Ai Chatbot</span>
              </p>
              <p className="text-xl mt-4">How can I help you today?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
            </div>
          </>
        ) : (
          <div className="p-4 max-h-70vh overflow-y-auto">
            <div className="flex items-center gap-4 mb-8">
            </div>
            <div>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="result" dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a prompt here"
            className="flex-1 p-2 border rounded-lg"
          />
          <div className="flex items-center gap-4">
            {input && (
              <Button
                onClick={handleSendMessage}
                className="w-6 cursor-pointer"
              >Search</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
