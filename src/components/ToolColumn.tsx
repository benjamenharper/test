import React, { useState } from 'react';
import MLSSearchPage from '../pages/MLSSearchPage';
import AddressSearchPage from '../pages/AddressSearchPage';
import AreaSearchPage from '../pages/AreaSearchPage';
import ImageGenPage from '../pages/ImageGenPage';
import AdminSettingsPage from '../pages/AdminSettingsPage';
import PromptIdeas from './PromptIdeas';

interface ToolColumnProps {
  selectedTool: string | null;
  onInsertToWhiteboard: (content: string) => void;
  className?: string;
}

const ToolColumn: React.FC<ToolColumnProps> = ({ selectedTool, onInsertToWhiteboard, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [properties, setProperties] = useState([
    { address: '123 Main St, Anytown, USA', id: 1 },
    { address: '456 Elm St, Springfield, IL', id: 2 },
    { address: '789 Oak Ave, Lakeside, CA', id: 3 },
  ]);

  const handleDelete = (id: number) => {
    setProperties(properties.filter(prop => prop.id !== id));
  };

  const handleSendToWhiteboard = (address: string) => {
    onInsertToWhiteboard(`Property: ${address}`);
  };

  const renderTool = () => {
    switch (selectedTool) {
      case 'welcome':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Welcome to RealtySynth</h2>
            <p className="mb-4">
              Select a tool from the menu to get started. You can add property data, generate images, 
              and then remix it with AI in the whiteboard.
            </p>
            <h3 className="text-lg font-semibold mb-2">Sample Properties</h3>
            <ul className="space-y-2">
              {properties.map((property) => (
                <li key={property.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{property.address}</span>
                  <div>
                    <button
                      onClick={() => handleSendToWhiteboard(property.address)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      title="Send to Whiteboard"
                    >
                      ➤
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'prompt-ideas':
        return <PromptIdeas onInsertToWhiteboard={onInsertToWhiteboard} />;
      case 'mls-search':
        return <MLSSearchPage onInsertToWhiteboard={onInsertToWhiteboard} />;
      case 'address-search':
        return <AddressSearchPage onInsertToWhiteboard={onInsertToWhiteboard} />;
      case 'area-search':
        return <AreaSearchPage onInsertToWhiteboard={onInsertToWhiteboard} />;
      case 'image-gen':
        return <ImageGenPage onInsertToWhiteboard={onInsertToWhiteboard} />;
      case 'admin-settings':
        return <AdminSettingsPage />;
      default:
        return <p>Select a tool from the menu to get started.</p>;
    }
  };

  return (
    <div className={`relative border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-8' : className}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-2 right-0 z-10 p-0.5 bg-gray-200 hover:bg-gray-300 transition-colors"
        style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}
        title={isCollapsed ? "Expand" : "Collapse"}
      >
        {isCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        )}
      </button>
      <div className={`overflow-y-auto h-full ${isCollapsed ? 'invisible' : 'visible'}`}>
        {renderTool()}
      </div>
    </div>
  );
};

export default ToolColumn;