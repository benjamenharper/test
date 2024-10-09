import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ChatAssistantProps interface
interface ChatAssistantProps {
  onInsertToWhiteboard: (content: string) => void;
  messages: Array<{ role: string; content: string }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ role: string; content: string }>>>;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ messages, setMessages, onInsertToWhiteboard }) => {
  const [instructionInput, setInstructionInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Effect to check for the API key
  useEffect(() => {
    const apiKey = localStorage.getItem('groq_api_key');
    if (!apiKey) {
      setError('Groq API key is not set. Please set it in the Admin Settings.');
    }
  }, []);

  // Function to send prompt to the Groq API
  const sendPromptToGroq = async (prompt: string) => {
    setIsLoading(true);
    setError('');

    const apiKey = localStorage.getItem('groq_api_key');
    if (!apiKey) {
      setError('Groq API key is not set. Please set it in the Admin Settings.');
      setIsLoading(false);
      return;
    }

    const content = messages.map(msg => msg.content).join('\n\n');

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `${prompt}\n\nContent:\n${content}` },
          ],
          max_tokens: 1024,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const assistantReply = response.data.choices[0].message.content;
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: assistantReply }]);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setError('Failed to process the request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle instruction input submit
  const handleInstructionInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && instructionInput.trim()) {
      sendPromptToGroq(instructionInput.trim());
      setInstructionInput('');
    }
  };

  return (
    <div className="p-4 bg-white border-t">
      {/* Chat Messages Display */}
      <div className="messages mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role}</strong>: {msg.content}
          </div>
        ))}
      </div>

      {/* Instruction Input */}
      <input
        type="text"
        value={instructionInput}
        onChange={(e) => setInstructionInput(e.target.value)}
        onKeyPress={handleInstructionInputSubmit}
        placeholder="Type Instructions or Prompt for AI Remix..."
        className="w-full p-2 border rounded mb-2"
      />

      {/* Action Buttons */}
      <div className="flex justify-between mb-2">
        <button onClick={() => sendPromptToGroq('Rewrite the following content to improve clarity and coherence:')} className="px-2 py-1 bg-gray-500 text-white rounded">Rewrite</button>
        <button onClick={() => sendPromptToGroq('Compare the following two properties:')} className="px-2 py-1 bg-gray-500 text-white rounded">Compare</button>
        <button onClick={() => sendPromptToGroq('Generate a list of FAQs based on the following content:')} className="px-2 py-1 bg-gray-500 text-white rounded">FAQs</button>
        <button onClick={() => sendPromptToGroq('Format the following content to improve readability:')} className="px-2 py-1 bg-gray-500 text-white rounded">Format</button>
        <button onClick={() => setMessages([])} className="px-2 py-1 bg-gray-500 text-white rounded">Clear</button>
      </div>

      {/* Loading and Error Messages */}
      {isLoading && <p className="text-gray-600">Processing...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ChatAssistant;
