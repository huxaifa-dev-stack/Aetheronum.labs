import React from 'react';
import { Cpu, HardDrive, Wifi, Timer } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SystemMetrics() {
  const { state } = useApp();
  const { systemMetrics } = state;

  const metrics = [
    { label: 'CPU Usage', value: systemMetrics.cpu, icon: Cpu, color: systemMetrics.cpu > 80 ? 'text-red-500' : systemMetrics.cpu > 60 ? 'text-yellow-500' : 'text-green-500' },
    { label: 'Memory', value: systemMetrics.memory, icon: HardDrive, color: systemMetrics.memory > 80 ? 'text-red-500' : systemMetrics.memory > 60 ? 'text-yellow-500' : 'text-green-500' },
    { label: 'Network', value: systemMetrics.network, icon: Wifi, color: 'text-blue-500' }
  ];

  return (
    <div className="bg-gray-800 border border-gray-600 p-6">
      <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
        <Timer className="w-5 h-5 mr-2" />
        SYSTEM METRICS
      </h3>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-sm font-mono text-gray-300">{metric.label}</span>
              </div>
              <span className={`text-sm font-mono ${metric.color}`}>{metric.value}%</span>
            </div>
            <div className="w-full bg-gray-700 h-2">
              <div 
                className={`h-2 transition-all duration-300 ${
                  metric.value > 80 ? 'bg-red-500' : 
                  metric.value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-gray-700 space-y-2">
          <div className="flex justify-between text-sm font-mono">
            <span className="text-gray-400">Uptime</span>
            <span className="text-gray-200">{systemMetrics.uptime}</span>
          </div>
          <div className="flex justify-between text-sm font-mono">
            <span className="text-gray-400">Active Users</span>
            <span className="text-gray-200">{systemMetrics.activeUsers}</span>
          </div>
          <div className="flex justify-between text-sm font-mono">
            <span className="text-gray-400">Processes</span>
            <span className="text-gray-200">{systemMetrics.runningProcesses}</span>
          </div>
        </div>
      </div>
    </div>
  );
}