import React, { useEffect } from 'react';
import { Activity, Users, Server, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SystemMetrics from './SystemMetrics';
import ActiveProjects from './ActiveProjects';
import RecentLogs from './RecentLogs';

export default function CommandDashboard() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_METRICS',
        payload: {
          cpu: Math.max(20, Math.min(90, state.systemMetrics.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(30, Math.min(85, state.systemMetrics.memory + (Math.random() - 0.5) * 5)),
          network: Math.max(10, Math.min(95, state.systemMetrics.network + (Math.random() - 0.5) * 15)),
          activeUsers: Math.max(5, Math.min(15, state.systemMetrics.activeUsers + Math.floor((Math.random() - 0.5) * 3))),
          runningProcesses: Math.max(200, Math.min(300, state.systemMetrics.runningProcesses + Math.floor((Math.random() - 0.5) * 10)))
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch, state.systemMetrics]);

  const statusItems = [
    { label: 'System Status', value: 'OPERATIONAL', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Security Level', value: 'MAXIMUM', icon: AlertTriangle, color: 'text-yellow-500' },
    { label: 'Lab Zones', value: '7 ACTIVE', icon: Server, color: 'text-blue-500' },
    { label: 'Clearance', value: `CL-${state.user?.clearanceLevel}`, icon: Users, color: 'text-purple-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-mono text-gray-100 mb-2">COMMAND DASHBOARD</h1>
          <p className="text-gray-400 font-mono text-sm">
            Welcome back, {state.user?.name} | {state.user?.department}
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm font-mono text-gray-300">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>LIVE</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {statusItems.map((item, index) => (
          <div key={index} className="bg-gray-800 border border-gray-600 p-4">
            <div className="flex items-center justify-between mb-2">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-xs font-mono text-gray-500">{item.label}</span>
            </div>
            <div className={`text-lg font-mono ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <SystemMetrics />
        </div>
        <div>
          <RecentLogs />
        </div>
      </div>

      <ActiveProjects />
    </div>
  );
}