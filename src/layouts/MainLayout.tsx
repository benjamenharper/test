import React, { useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ToolColumn from '../components/ToolColumn';
import AssistantColumn from '../components/AssistantColumn';

const MainLayout: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: string; content: string }>>([]);

  const handleInsertToAssistant = (content: string) => {
    setAssistantMessages(prevMessages => [...prevMessages, { role: 'user', content }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Menu onSelectTool={setSelectedTool} />
        <ToolColumn selectedTool={selectedTool} onInsertToAssistant={handleInsertToAssistant} />
        <AssistantColumn messages={assistantMessages} setMessages={setAssistantMessages} />
      </div>
    </div>
  );
};

export default MainLayout;