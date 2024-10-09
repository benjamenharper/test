import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface OpenAIImageGenProps {
  onInsertToAssistant: (content: string) => void;
}

const OpenAIImageGen: React.FC<OpenAIImageGenProps> = ({ onInsertToAssistant }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const generateImage = async () => {
    setIsLoading(true);
    setError('');
    setImageUrl('');

    if (!apiKey) {
      setError('API key is not set. Please set it in the Settings.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: prompt,
          n: 1,
          size: '512x512',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      setImageUrl(response.data.data[0].url);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`Failed to generate image: ${err.response.data.error.message}`);
        console.error('Error response:', err.response.data);
      } else {
        setError('Failed to generate image. Please try again.');
      }
      console.error('Error details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter image description"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={generateImage}
        disabled={isLoading || !prompt}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Generated image" className="w-full" />
          <button
            onClick={() => onInsertToAssistant(`![Generated image](${imageUrl})`)}
            className="w-full mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Insert Image to Assistant
          </button>
        </div>
      )}
    </div>
  );
};

export default OpenAIImageGen;