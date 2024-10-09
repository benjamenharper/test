import React from 'react';
import AssistantPage from '../pages/AssistantPage';

interface AssistantColumnProps {
  messages: Array<{ role: string; content: string }>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{ role: string; content: string }>>>;
}

const AssistantColumn: React.FC<AssistantColumnProps> = ({ messages, setMessages }) => {
  return (
    <div className="w-2/5 overflow-y-auto">
      <AssistantPage messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default AssistantColumn;