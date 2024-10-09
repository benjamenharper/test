import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import ToolColumn from './components/ToolColumn';
import WhiteboardColumn from './components/WhiteboardColumn';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [whiteboardMessages, setWhiteboardMessages] = useState<Array<{ role: string; content: string }>>([]);

  const handleInsertToWhiteboard = (content: string) => {
    setWhiteboardMessages(prevMessages => [...prevMessages, { role: 'user', content }]);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Menu onSelectTool={setSelectedTool} />
          <ToolColumn selectedTool={selectedTool} onInsertToWhiteboard={handleInsertToWhiteboard} className="w-1/2" />
          <WhiteboardColumn messages={whiteboardMessages} setMessages={setWhiteboardMessages} className="flex-grow" />
        </div>
      </div>
    </Router>
  );
};

export default App;