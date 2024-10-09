import React, { useState } from 'react';
import MLSSearchPage from '../pages/MLSSearchPage';
import AddressSearchPage from '../pages/AddressSearchPage';
import AreaSearchPage from '../pages/AreaSearchPage';
import ImageGenPage from '../pages/ImageGenPage';
import AdminSettingsPage from '../pages/AdminSettingsPage';
import PromptIdeas from './PromptIdeas';
import ChatAssistant from './ChatAssistant'; // Import the ChatAssistant component
import WelcomeMsg from './welcomeMSG'; // Import the new WelcomeMsg component


interface ToolColumnProps {
  selectedTool: string | null;
  onInsertToWhiteboard: (content: string) => void;
  className?: string;
}

const ToolColumn: React.FC<ToolColumnProps> = ({ selectedTool, onInsertToWhiteboard, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]); // State for chat messages

  const renderTool = () => {
    switch (selectedTool) {
      case 'welcome':
        return <WelcomeMsg onInsertToWhiteboard={onInsertToWhiteboard} />;
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
        return <p><br/>&nbsp;&nbsp;Select a tool from the menu to get started.</p>;
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
