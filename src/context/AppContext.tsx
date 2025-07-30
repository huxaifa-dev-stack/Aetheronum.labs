import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Project, LogEntry, Note, SystemMetrics, WindowState, TerminalCommand } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  projects: Project[];
  logs: LogEntry[];
  notes: Note[];
  systemMetrics: SystemMetrics;
  windows: WindowState[];
  terminalHistory: TerminalCommand[];
  activeConnections: number;
}

type AppAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_LOG'; payload: LogEntry }
  | { type: 'UPDATE_METRICS'; payload: Partial<SystemMetrics> }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: { id: string; updates: Partial<Note> } }
  | { type: 'ADD_WINDOW'; payload: WindowState }
  | { type: 'UPDATE_WINDOW'; payload: { id: string; updates: Partial<WindowState> } }
  | { type: 'REMOVE_WINDOW'; payload: string }
  | { type: 'ADD_TERMINAL_COMMAND'; payload: TerminalCommand }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; updates: Partial<Project> } };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  projects: [],
  logs: [],
  notes: [],
  systemMetrics: {
    cpu: 45,
    memory: 67,
    network: 23,
    uptime: '47d 12h 34m',
    activeUsers: 8,
    runningProcesses: 234
  },
  windows: [],
  terminalHistory: [],
  activeConnections: 0
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, windows: [] };
    case 'ADD_LOG':
      return { ...state, logs: [action.payload, ...state.logs].slice(0, 1000) };
    case 'UPDATE_METRICS':
      return { ...state, systemMetrics: { ...state.systemMetrics, ...action.payload } };
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => 
          note.id === action.payload.id ? { ...note, ...action.payload.updates } : note
        )
      };
    case 'ADD_WINDOW':
      return { ...state, windows: [...state.windows, action.payload] };
    case 'UPDATE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(window => 
          window.id === action.payload.id ? { ...window, ...action.payload.updates } : window
        )
      };
    case 'REMOVE_WINDOW':
      return { ...state, windows: state.windows.filter(w => w.id !== action.payload) };
    case 'ADD_TERMINAL_COMMAND':
      return { ...state, terminalHistory: [action.payload, ...state.terminalHistory].slice(0, 100) };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.id ? { ...project, ...action.payload.updates } : project
        )
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}