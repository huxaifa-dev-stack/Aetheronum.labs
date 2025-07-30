import React, { useState } from 'react';
import { Terminal, Cpu, HardDrive, Wifi, RefreshCw } from 'lucide-react';

export default function OSLab() {
  const [processes] = useState([
    { pid: 1024, name: 'kernel_scheduler', cpu: 12.3, memory: 256, status: 'running' },
    { pid: 1157, name: 'network_driver', cpu: 3.4, memory: 128, status: 'sleeping' },
    { pid: 1289, name: 'filesystem_cache', cpu: 8.7, memory: 512, status: 'running' },
    { pid: 1345, name: 'memory_manager', cpu: 15.2, memory: 1024, status: 'running' },
    { pid: 1456, name: 'interrupt_handler', cpu: 2.1, memory: 64, status: 'running' }
  ]);

  const [bootLogs] = useState([
    '[0.000000] Linux version 6.2.0-research',
    '[0.000156] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1',
    '[0.000234] KERNEL supported cpus: Intel',
    '[0.001234] BIOS-provided physical RAM map',
    '[0.002156] ACPI: Early table checksum verification',
    '[0.003890] Memory: 32GB available',
    '[0.004567] CPU: 16 cores detected',
    '[0.005234] PCI: Using configuration type 1',
    '[0.006789] Research modules loaded successfully'
  ]);

  const [syscalls] = useState([
    { name: 'sys_read', count: 234567, avg_time: '0.23ms' },
    { name: 'sys_write', count: 189234, avg_time: '0.34ms' },
    { name: 'sys_open', count: 45678, avg_time: '1.2ms' },
    { name: 'sys_close', count: 43210, avg_time: '0.1ms' },
    { name: 'sys_mmap', count: 12345, avg_time: '2.1ms' }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-mono text-gray-100 flex items-center">
          <Terminal className="w-6 h-6 mr-2" />
          OPERATING SYSTEM KERNEL LAB
        </h2>
        <div className="text-sm font-mono text-gray-400">
          KERNEL: 6.2.0-research | ARCH: x86_64 | SMP: 16 cores
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Process Monitor */}
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
              <Cpu className="w-5 h-5 mr-2" />
              PROCESS MONITOR
            </h3>
            
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-4 text-xs font-mono text-gray-400 pb-2 border-b border-gray-700">
                <span>PID</span>
                <span>PROCESS</span>
                <span>CPU%</span>
                <span>MEM(KB)</span>
                <span>STATUS</span>
              </div>
              
              {processes.map(process => (
                <div key={process.pid} className="grid grid-cols-5 gap-4 text-sm font-mono text-gray-200 py-2 hover:bg-gray-700">
                  <span>{process.pid}</span>
                  <span className="truncate">{process.name}</span>
                  <span className={process.cpu > 10 ? 'text-yellow-400' : 'text-green-400'}>
                    {process.cpu.toFixed(1)}%
                  </span>
                  <span>{process.memory}</span>
                  <span className={
                    process.status === 'running' ? 'text-green-400' : 
                    process.status === 'sleeping' ? 'text-blue-400' : 'text-gray-400'
                  }>
                    {process.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Call Tracker */}
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4">SYSCALL TRACKER</h3>
            
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4 text-xs font-mono text-gray-400 pb-2 border-b border-gray-700">
                <span>SYSCALL</span>
                <span>COUNT</span>
                <span>AVG TIME</span>
              </div>
              
              {syscalls.map((syscall, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 text-sm font-mono text-gray-200 py-2 hover:bg-gray-700">
                  <span className="text-cyan-400">{syscall.name}</span>
                  <span>{syscall.count.toLocaleString()}</span>
                  <span>{syscall.avg_time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Boot Logs & System Info */}
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4">BOOT SEQUENCE</h3>
            
            <div className="bg-black p-4 max-h-64 overflow-y-auto">
              {bootLogs.map((log, index) => (
                <div key={index} className="text-xs font-mono text-green-400 mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
              <HardDrive className="w-5 h-5 mr-2" />
              SYSTEM RESOURCES
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-mono mb-1">
                  <span className="text-gray-300">CPU Usage</span>
                  <span className="text-gray-300">23%</span>
                </div>
                <div className="w-full bg-gray-600 h-2">
                  <div className="h-2 bg-blue-500" style={{ width: '23%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-mono mb-1">
                  <span className="text-gray-300">Memory</span>
                  <span className="text-gray-300">67%</span>
                </div>
                <div className="w-full bg-gray-600 h-2">
                  <div className="h-2 bg-yellow-500" style={{ width: '67%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-mono mb-1">
                  <span className="text-gray-300">Disk I/O</span>
                  <span className="text-gray-300">12%</span>
                </div>
                <div className="w-full bg-gray-600 h-2">
                  <div className="h-2 bg-green-500" style={{ width: '12%' }} />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700 space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-gray-200">47d 12h 34m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processes</span>
                  <span className="text-gray-200">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Load Average</span>
                  <span className="text-gray-200">2.34</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
              <Wifi className="w-5 h-5 mr-2" />
              NETWORK STATUS
            </h3>
            
            <div className="space-y-3 text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">Interface</span>
                <span className="text-green-400">eth0 UP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">IP Address</span>
                <span className="text-gray-200">192.168.1.100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">RX Packets</span>
                <span className="text-gray-200">2,847,392</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">TX Packets</span>
                <span className="text-gray-200">2,934,128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bandwidth</span>
                <span className="text-gray-200">1Gbps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}