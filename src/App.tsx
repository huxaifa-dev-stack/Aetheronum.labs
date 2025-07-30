import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoginScreen from './components/Authentication/LoginScreen';
import Sidebar from './components/Navigation/Sidebar';
import CommandDashboard from './components/Dashboard/CommandDashboard';
import AILab from './components/Labs/AILab';
import QuantumLab from './components/Labs/QuantumLab';
import OSLab from './components/Labs/OSLab';
import NotebookSystem from './components/Notebook/NotebookSystem';
import Terminal from './components/Terminal/Terminal';
import WindowManager from './components/WindowManager/WindowManager';

function MainApp() {
  const { state } = useApp();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showTerminal, setShowTerminal] = useState(false);

  if (!state.isAuthenticated) {
    return <LoginScreen />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <CommandDashboard />;
      case 'ai':
        return <AILab />;
      case 'quantum':
        return <QuantumLab />;
      case 'os':
        return <OSLab />;
      case 'notebook':
        return <NotebookSystem />;
      default:
        return <CommandDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 border-b border-gray-600 p-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-mono text-green-400">
              ● SECURE CONNECTION
            </div>
            <div className="text-sm font-mono text-gray-400">
              NODE: DELTA-7 | SESSION: {Date.now().toString().slice(-6)}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-1 text-sm font-mono border border-gray-600 transition-colors"
            >
              TERMINAL
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          {renderActiveSection()}
          
          {showTerminal && (
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <Terminal />
            </div>
          )}
        </div>
      </div>

      <WindowManager />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;