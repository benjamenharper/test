import React, { useState } from 'react';

interface ImageGenPageProps {
  onInsertToWhiteboard: (content: string) => void;
}

const ImageGenPage: React.FC<ImageGenPageProps> = ({ onInsertToWhiteboard }) => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      // Simulating an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock image URL (using a placeholder service)
      const mockImageUrl = `https://via.placeholder.com/512x512.png?text=${encodeURIComponent(prompt)}`;
      
      setImageUrl(mockImageUrl);
    } catch (err) {
      console.error('Image Generation Error:', err);
      setError('An error occurred while generating the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Image Generation</h2>
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
        onClick={handleGenerateImage}
        disabled={isLoading || !prompt}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {imageUrl && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-6 relative">
          <img src={imageUrl} alt="Generated image" className="w-full rounded" />
          <button
            onClick={() => onInsertToWhiteboard(`![Generated image](${imageUrl})\n\nPrompt: ${prompt}`)}
            className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700"
            title="Insert to Whiteboard"
          >
            ➤
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGenPage;