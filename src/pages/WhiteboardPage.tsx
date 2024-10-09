import React, { useState } from 'react';
import axios from 'axios';

interface WhiteboardPageProps {
  messages: Array<{ role: string; content: string }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ role: string; content: string }>>>;
}

const WhiteboardPage: React.FC<WhiteboardPageProps> = ({ messages, setMessages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('Untitled Whiteboard');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const formatMessage = (content: string) => {
    return content
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="Generated image" class="w-full mt-2 rounded">')
      .replace(/\n/g, '<br>');
  };

  const handleMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: message }]);
    setIsLoading(true);
    setInputValue('');

    try {
      const apiKey = localStorage.getItem('groq_api_key');
      if (!apiKey) {
        throw new Error('Groq API key is not set. Please set it in the Admin Settings.');
      }

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: 'You are a knowledgeable AI assistant. Provide helpful information and advice about various topics. Use Markdown-style formatting: ### for headlines and ** for bold text.' },
            ...messages,
            { role: 'user', content: message }
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
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMessage = (index: number) => {
    setMessages(prevMessages => prevMessages.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log('Saving whiteboard...');
    // Implement save functionality
  };

  const handlePublish = () => {
    console.log('Publishing whiteboard...');
    // Implement publish functionality
  };

  const handleShare = () => {
    console.log('Sharing whiteboard...');
    // Implement share functionality
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') setIsEditingTitle(false);
            }}
            className="text-2xl font-bold"
            autoFocus
          />
        ) : (
          <h2 className="text-2xl font-bold" onClick={() => setIsEditingTitle(true)}>{title}</h2>
        )}
        <div>
          <button onClick={() => handleMessage('Generate a prompt')} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Prompt</button>
          <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded mr-2">Save</button>
          <button onClick={handlePublish} className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">Publish</button>
          <button onClick={handleShare} className="px-2 py-1 bg-purple-500 text-white rounded">Share</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4 relative group">
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
            </span>
            <button
              onClick={() => handleRemoveMessage(index)}
              className="absolute top-0 right-0 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
        {isLoading && <p className="text-gray-600">Thinking...</p>}
      </div>
      <div className="p-4 bg-white border-t">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Your custom prompt instructions..."
          className="w-full p-2 border rounded text-left"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessage(inputValue);
            }
          }}
        />
      </div>
    </div>
  );
};

export default WhiteboardPage;