import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const commands = {
  help: 'Available commands: help, clear, status, users, projects, logs, scan, matrix, neural',
  clear: '',
  status: 'System Status: OPERATIONAL | Security: MAXIMUM | Uptime: 47d 12h 34m',
  users: 'Active users: 8 | Current session: Dr. Sarah Chen (CL-5)',
  projects: 'Active projects: 12 | Critical: 3 | High priority: 5',
  logs: 'Recent activity: 2,847 entries | Errors: 0 | Warnings: 3',
  scan: 'Network scan initiated... [47/255] hosts discovered | All secure',
  matrix: 'Entering the matrix... Just kidding. This is a research lab.',
  neural: 'Neural networks: 4 training | 12 deployed | Accuracy avg: 94.2%'
};

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'AETHERONUM RESEARCH LAB TERMINAL v2.47.3',
    'Secure connection established. Type "help" for commands.',
    ''
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    dispatch({
      type: 'ADD_TERMINAL_COMMAND',
      payload: {
        command: cmd,
        output: commands[trimmedCmd as keyof typeof commands] || `Command not found: ${cmd}`,
        timestamp: new Date(),
        user: state.user?.name || 'Unknown'
      }
    });

    dispatch({
      type: 'ADD_LOG',
      payload: {
        id: Date.now().toString(),
        timestamp: new Date(),
        level: 'info',
        module: 'TERMINAL',
        message: `Command executed: ${cmd}`,
        user: state.user?.name
      }
    });

    if (trimmedCmd === 'clear') {
      setHistory(['AETHERONUM RESEARCH LAB TERMINAL v2.47.3', '']);
    } else {
      const output = commands[trimmedCmd as keyof typeof commands] || `Command not found: ${cmd}`;
      setHistory(prev => [...prev, `$ ${cmd}`, output, '']);
    }

    setCommandHistory(prev => [cmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-600 flex flex-col h-96">
      <div className="bg-gray-800 border-b border-gray-600 p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-gray-300" />
          <span className="text-sm font-mono text-gray-300">SECURE TERMINAL</span>
        </div>
        <button className="text-gray-400 hover:text-gray-200">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 bg-black"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none font-mono"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}