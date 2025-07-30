export interface User {
  id: string;
  name: string;
  clearanceLevel: 1 | 2 | 3 | 4 | 5;
  department: string;
  lastLogin: Date;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string[];
  deadline: Date;
  lab: LabType;
  timeline: TimelineEntry[];
}

export interface TimelineEntry {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  details: string;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'critical';
  module: string;
  message: string;
  user?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lab: LabType;
  created: Date;
  modified: Date;
  linkedNotes: string[];
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  uptime: string;
  activeUsers: number;
  runningProcesses: number;
}

export type LabType = 'ai' | 'quantum' | 'os' | 'neuromorphic' | 'blockchain' | 'cybersecurity' | 'symbiosis';

export interface WindowState {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  zIndex: number;
}

export interface TerminalCommand {
  command: string;
  output: string;
  timestamp: Date;
  user: string;
}