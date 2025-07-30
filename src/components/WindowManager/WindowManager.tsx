import React, { useState } from 'react';
import { Minimize2, X, Maximize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WindowState } from '../../types';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

function Window({ window, children }: WindowProps) {
  const { dispatch } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
      
      dispatch({
        type: 'UPDATE_WINDOW',
        payload: {
          id: window.id,
          updates: { zIndex: Date.now() }
        }
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      dispatch({
        type: 'UPDATE_WINDOW',
        payload: {
          id: window.id,
          updates: {
            position: {
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y
            }
          }
        }
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset]);

  const closeWindow = () => {
    dispatch({ type: 'REMOVE_WINDOW', payload: window.id });
  };

  const minimizeWindow = () => {
    dispatch({
      type: 'UPDATE_WINDOW',
      payload: {
        id: window.id,
        updates: { isMinimized: !window.isMinimized }
      }
    });
  };

  if (window.isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 bg-gray-800 border border-gray-600 p-2 z-50">
        <button
          onClick={minimizeWindow}
          className="text-gray-300 hover:text-gray-100 font-mono text-sm"
        >
          {window.title}
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bg-gray-800 border border-gray-600 shadow-lg"
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex
      }}
    >
      <div
        className="window-header bg-gray-700 border-b border-gray-600 p-2 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-mono text-gray-100">{window.title}</span>
        <div className="flex space-x-1">
          <button
            onClick={minimizeWindow}
            className="text-gray-400 hover:text-gray-200 p-1"
          >
            <Minimize2 className="w-3 h-3" />
          </button>
          <button
            onClick={closeWindow}
            className="text-gray-400 hover:text-red-400 p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function WindowManager() {
  const { state } = useApp();

  return (
    <>
      {state.windows.map((window) => (
        <Window key={window.id} window={window}>
          <div className="h-full p-4 overflow-auto">
            {/* Window content will be rendered based on component type */}
            <div className="text-gray-300 font-mono">
              {window.component === 'terminal' && <div>Terminal content</div>}
              {window.component === 'notebook' && <div>Notebook content</div>}
              {window.component === 'monitor' && <div>Monitor content</div>}
            </div>
          </div>
        </Window>
      ))}
    </>
  );
}