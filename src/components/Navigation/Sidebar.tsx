import React from 'react';
import { 
  Home, Brain, Atom, Terminal, Cpu, Link, Shield, 
  Users, BookOpen, Activity, Settings, LogOut 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { state, dispatch } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Command Dashboard', icon: Home, clearance: 1 },
    { id: 'ai', label: 'AI Laboratory', icon: Brain, clearance: 2 },
    { id: 'quantum', label: 'Quantum Computing', icon: Atom, clearance: 3 },
    { id: 'os', label: 'OS Kernel Lab', icon: Terminal, clearance: 2 },
    { id: 'neuromorphic', label: 'Neuromorphic Lab', icon: Cpu, clearance: 4 },
    { id: 'blockchain', label: 'Blockchain Research', icon: Link, clearance: 2 },
    { id: 'cybersecurity', label: 'Cybersecurity Lab', icon: Shield, clearance: 3 },
    { id: 'symbiosis', label: 'Human-AI Symbiosis', icon: Users, clearance: 5 },
    { id: 'notebook', label: 'Research Notes', icon: BookOpen, clearance: 1 },
    { id: 'monitor', label: 'System Monitor', icon: Activity, clearance: 1 }
  ];

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    dispatch({
      type: 'ADD_LOG',
      payload: {
        id: Date.now().toString(),
        timestamp: new Date(),
        level: 'info',
        module: 'AUTH',
        message: `User ${state.user?.name} logged out`,
        user: state.user?.name
      }
    });
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-600 flex flex-col">
      <div className="p-4 border-b border-gray-600">
        <h1 className="text-lg font-mono text-gray-100 mb-1">AETHERONUM</h1>
        <p className="text-xs font-mono text-gray-400">RESEARCH LAB</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {menuItems.map((item) => {
            const hasAccess = state.user && state.user.clearanceLevel >= item.clearance;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => hasAccess && onSectionChange(item.id)}
                disabled={!hasAccess}
                className={`w-full flex items-center space-x-3 p-3 mb-1 text-left font-mono text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-gray-700 text-gray-100 border-l-2 border-blue-500'
                    : hasAccess
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                {!hasAccess && (
                  <span className="text-xs text-red-400">CL-{item.clearance}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-600 p-4">
        <div className="mb-4">
          <p className="text-sm font-mono text-gray-100">{state.user?.name}</p>
          <p className="text-xs font-mono text-gray-400">{state.user?.department}</p>
          <p className="text-xs font-mono text-gray-500">
            Clearance Level: {state.user?.clearanceLevel}
          </p>
        </div>
        
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-200 font-mono text-sm transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 p-2 text-gray-400 hover:text-red-400 font-mono text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}