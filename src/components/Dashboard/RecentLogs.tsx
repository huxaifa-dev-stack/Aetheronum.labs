import React, { useEffect } from 'react';
import { Terminal, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const mockLogs = [
  { level: 'info' as const, module: 'AI-LAB', message: 'Model training epoch 147 completed', user: 'Dr. Chen' },
  { level: 'warning' as const, module: 'QUANTUM', message: 'Qubit coherence below threshold', user: 'Marcus R.' },
  { level: 'error' as const, module: 'SECURITY', message: 'Unauthorized access attempt blocked', user: 'System' },
  { level: 'info' as const, module: 'OS-LAB', message: 'Kernel module loaded successfully', user: 'James W.' },
  { level: 'critical' as const, module: 'NETWORK', message: 'High latency detected on node 7', user: 'System' }
];

export default function RecentLogs() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      dispatch({
        type: 'ADD_LOG',
        payload: {
          id: Date.now().toString(),
          timestamp: new Date(),
          level: randomLog.level,
          module: randomLog.module,
          message: randomLog.message,
          user: randomLog.user
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-600 p-6">
      <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
        <Terminal className="w-5 h-5 mr-2" />
        SYSTEM LOGS
      </h3>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {state.logs.slice(0, 10).map((log) => {
          const LogIcon = getLogIcon(log.level);
          return (
            <div key={log.id} className="bg-gray-700 border-l-2 border-gray-600 p-3">
              <div className="flex items-start space-x-2">
                <LogIcon className={`w-4 h-4 mt-0.5 ${getLogColor(log.level)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-mono text-gray-400">
                      {log.module}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-gray-200 break-words">
                    {log.message}
                  </p>
                  {log.user && (
                    <span className="text-xs font-mono text-gray-500">
                      {log.user}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}