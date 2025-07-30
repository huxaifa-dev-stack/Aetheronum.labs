import React, { useState } from 'react';
import { Eye, Shield, Terminal, Fingerprint } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';

const mockUsers: User[] = [
  { id: '1', name: 'Dr. Sarah Chen', clearanceLevel: 5, department: 'AI Research', lastLogin: new Date() },
  { id: '2', name: 'Marcus Rodriguez', clearanceLevel: 4, department: 'Quantum Computing', lastLogin: new Date() },
  { id: '3', name: 'Elena Volkov', clearanceLevel: 3, department: 'Cybersecurity', lastLogin: new Date() },
  { id: '4', name: 'James Wright', clearanceLevel: 2, department: 'OS Development', lastLogin: new Date() }
];

export default function LoginScreen() {
  const { dispatch } = useApp();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [passcode, setPasscode] = useState('');
  const [biometricStep, setBiometricStep] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    setPasscode('');
  };

  const handlePasscodeSubmit = () => {
    if (passcode.length >= 6) {
      setBiometricStep(true);
    }
  };

  const handleBiometricScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === selectedUser);
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
        dispatch({ 
          type: 'ADD_LOG', 
          payload: {
            id: Date.now().toString(),
            timestamp: new Date(),
            level: 'info',
            module: 'AUTH',
            message: `User ${user.name} authenticated successfully`,
            user: user.name
          }
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-600 rounded-none p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-mono text-gray-100 mb-2">AETHERONUM RESEARCH LAB</h1>
          <p className="text-gray-400 text-sm font-mono">CLASSIFIED SYSTEM ACCESS</p>
        </div>

        {!biometricStep ? (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-mono mb-2">
                SELECT RESEARCH PERSONNEL
              </label>
              <div className="space-y-2">
                {mockUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => handleUserSelect(user.id)}
                    className={`w-full text-left p-3 border font-mono text-sm transition-colors ${
                      selectedUser === user.id 
                        ? 'border-gray-400 bg-gray-700 text-gray-100' 
                        : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{user.name}</span>
                      <span className="text-xs text-gray-500">CL-{user.clearanceLevel}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{user.department}</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedUser && (
              <div>
                <label className="block text-gray-300 text-sm font-mono mb-2">
                  SECURITY PASSCODE
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-gray-100 font-mono text-sm p-3 focus:outline-none focus:border-gray-400"
                    placeholder="Enter 6+ digit passcode"
                    onKeyPress={(e) => e.key === 'Enter' && handlePasscodeSubmit()}
                  />
                  <Eye className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                </div>
                
                <button
                  onClick={handlePasscodeSubmit}
                  disabled={passcode.length < 6}
                  className="w-full mt-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-gray-100 font-mono text-sm p-3 border border-gray-600 transition-colors"
                >
                  PROCEED TO BIOMETRIC SCAN
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="relative">
              <Fingerprint className={`w-24 h-24 mx-auto transition-colors ${
                isScanning ? 'text-green-500' : 'text-gray-400'
              }`} />
              {isScanning && (
                <div className="absolute inset-0 border-2 border-green-500 animate-pulse rounded-full"></div>
              )}
            </div>
            
            <div>
              <h3 className="text-gray-100 font-mono text-lg mb-2">BIOMETRIC VERIFICATION</h3>
              <p className="text-gray-400 text-sm font-mono mb-4">
                {isScanning ? 'Scanning in progress...' : 'Place finger on scanner'}
              </p>
              
              {!isScanning ? (
                <button
                  onClick={handleBiometricScan}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-mono text-sm p-3 border border-gray-600 transition-colors"
                >
                  INITIATE SCAN
                </button>
              ) : (
                <div className="text-green-500 font-mono text-sm">
                  <Terminal className="w-4 h-4 inline mr-2" />
                  Authenticating...
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 font-mono text-center">
            SYSTEM VERSION 2.47.3 | NODE: DELTA-7 | SECURE CONNECTION
          </p>
        </div>
      </div>
    </div>
  );
}