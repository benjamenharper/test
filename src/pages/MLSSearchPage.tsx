import React, { useState } from 'react';

interface MLSSearchPageProps {
  onInsertToWhiteboard: (content: string) => void;
}

const MLSSearchPage: React.FC<MLSSearchPageProps> = ({ onInsertToWhiteboard }) => {
  const [mlsId, setMlsId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    setTitle('');
    setPrice('');
    setDescription('');
    setImageUrl('');

    try {
      const trimmedMlsId = mlsId.trim();

      const response = await fetch(
        `https://us-real-estate-listings.p.rapidapi.com/v2/property-by-mls?mlsId=${trimmedMlsId}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'YOUR_API_KEY_HERE', // Replace with your actual API key
            'x-rapidapi-host': 'us-real-estate-listings.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.search && data.search.results && Array.isArray(data.search.results) && data.search.results.length > 0) {
        const property = data.search.results[0];

        if (property) {
          const address = property.location.address;
          const fullAddress = `${address.street_number || ''} ${address.street_suffix || ''}, ${address.city || ''}, ${address.state_code || ''}`.trim();
          const listPrice = property.list_price !== undefined ? `$${property.list_price.toLocaleString()}` : 'Price not available';
          const descriptionText = property.description?.text || 'No description available';
          const propertyImageUrl = property.primary_photo?.href || undefined;

          setTitle(fullAddress || 'No address available');
          setPrice(listPrice);
          setImageUrl(propertyImageUrl || '');
          setDescription(descriptionText);
        } else {
          setError('Property details not available');
        }
      } else {
        setError('No properties found in the response');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('MLS Search Error:', err);
      setError(`An error occurred: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleMLSIdClick = () => {
    setMlsId('24-449959'); // Set the sample MLS ID
    handleSearch(); // Trigger the search
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">MLS Search</h2>
      <div className="mb-4">
        <input
          type="text"
          value={mlsId}
          onChange={(e) => setMlsId(e.target.value)}
          placeholder="Enter MLS ID"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={isLoading || !mlsId}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {/* Sample MLS ID link */}
      <div className="mt-2">
        <span>Try the sample MLS ID: </span>
        <button onClick={handleSampleMLSIdClick} className="text-blue-500 underline ml-1">
          24-449959
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {title && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-lg font-bold mb-2">{price}</p>
          {imageUrl && (
            <img src={imageUrl} alt="Property" className="w-full mb-2 rounded" />
          )}
          <p className="mb-4">{description}</p>

          {/* Individual Send Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => onInsertToWhiteboard(`Title: ${title}`)}
              className="bg-green-500 text-white rounded p-1"
              title="Send Title to Whiteboard"
            >
              Send Title
            </button>
            <button
              onClick={() => onInsertToWhiteboard(`Price: ${price}`)}
              className="bg-green-500 text-white rounded p-1"
              title="Send Price to Whiteboard"
            >
              Send Price
            </button>
            <button
              onClick={() => onInsertToWhiteboard(`Description: ${description}`)}
              className="bg-green-500 text-white rounded p-1"
              title="Send Description to Whiteboard"
            >
              Send Description
            </button>
            <button
              onClick={() => onInsertToWhiteboard(`Image: ![Property Image](${imageUrl})`)}
              className="bg-green-500 text-white rounded p-1"
              title="Send Image to Whiteboard"
            >
              Send Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLSSearchPage;
