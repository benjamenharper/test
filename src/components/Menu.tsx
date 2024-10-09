import React, { useState } from 'react';

interface MenuProps {
  onSelectTool: (tool: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectTool }) => {
  const [isPropertyToolsExpanded, setIsPropertyToolsExpanded] = useState(true);
  const [isAIToolsExpanded, setIsAIToolsExpanded] = useState(true);

  return (
    <div className="w-1/5 bg-gray-100 p-4 overflow-y-auto">
      <ul className="text-sm">
        <li className="mb-2">
          <button onClick={() => onSelectTool('welcome')} className="hover:text-blue-500 font-bold">
            Welcome
          </button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSelectTool('prompt-ideas')} className="hover:text-blue-500 font-bold">
            Prompt Ideas
          </button>
        </li>
        <li className="mb-2">
          <button 
            onClick={() => setIsPropertyToolsExpanded(!isPropertyToolsExpanded)} 
            className="hover:text-blue-500 flex items-center font-bold"
          >
            Property Tools
            <span className="ml-1">{isPropertyToolsExpanded ? '▼' : '▶'}</span>
          </button>
          {isPropertyToolsExpanded && (
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                <button onClick={() => onSelectTool('mls-search')} className="hover:text-blue-500">MLS Search</button>
              </li>
              <li className="mb-2">
                <button onClick={() => onSelectTool('address-search')} className="hover:text-blue-500">Address Search</button>
              </li>
              <li className="mb-2">
                <button onClick={() => onSelectTool('area-search')} className="hover:text-blue-500">Area Search</button>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-2">
          <button 
            onClick={() => setIsAIToolsExpanded(!isAIToolsExpanded)} 
            className="hover:text-blue-500 flex items-center font-bold"
          >
            AI Tools
            <span className="ml-1">{isAIToolsExpanded ? '▼' : '▶'}</span>
          </button>
          {isAIToolsExpanded && (
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                <button onClick={() => onSelectTool('image-gen')} className="hover:text-blue-500">Image Gen</button>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <h3 className="font-bold mt-6 mb-2 text-sm">Account</h3>
      <ul className="text-sm">
        <li className="mb-2">
          <button onClick={() => onSelectTool('profile')} className="hover:text-blue-500">Profile</button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSelectTool('billing')} className="hover:text-blue-500">Billing</button>
        </li>
        <li className="mb-2">
          <button onClick={() => onSelectTool('integrations')} className="hover:text-blue-500">Integrations</button>
        </li>
      </ul>
      <h3 className="font-bold mt-6 mb-2 text-sm">Admin</h3>
      <ul className="text-sm">
        <li className="mb-2">
          <button onClick={() => onSelectTool('admin-settings')} className="hover:text-blue-500">Settings</button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;