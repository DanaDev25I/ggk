import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useStateContext } from '../store/usecontext';

const Main = () => {
  const [input, setInput] = useState('');
  const { messages, newChat, loading, onSent, showResults } = useStateContext();

  const handleSendMessage = async () => {
    if (!input.trim()) {
      return; // Prevent sending empty messages
    }
    await onSent(input);
    setInput('');
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gray-100">
      <div className="flex items-center justify-between p-4 text-xl text-gray-600 bg-white shadow-md">
        <p>Gemini</p>
        <Button onClick={newChat}>New Chat</Button>
      </div>
      <div className="container mx-auto p-4">
        {!showResults ? (
          <div className="my-12 text-center">
            <p className="text-4xl font-medium text-gray-400">
              <span className="bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent">
                Welcome to Ai Chatbot
              </span>
            </p>
            <p className="text-xl mt-4">How can I help you today?</p>
          </div>
        ) : (
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-8">
                <div className="text-sm text-gray-500">You: {msg.prompt}</div>
                <div className="result mt-2" dangerouslySetInnerHTML={{ __html: msg.response }} />
              </div>
            ))}
          </div>
        )}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a prompt here"
            className="flex-1 p-2 border rounded-lg"
            aria-label="Chat prompt input"
          />
          <Button
            onClick={handleSendMessage}
            className="w-6 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
