import React, { useState } from 'react';
import { Atom, Zap, RotateCw, Activity, Target } from 'lucide-react';

export default function QuantumLab() {
  const [qubits, setQubits] = useState(16);
  const [gateSequence, setGateSequence] = useState<string[]>([]);
  const [coherenceTime, setCoherenceTime] = useState(125.7);
  const [fidelity, setFidelity] = useState(99.8);

  const gates = ['H', 'X', 'Y', 'Z', 'CNOT', 'T', 'S', 'RX', 'RY', 'RZ'];
  
  const qubitStates = Array.from({ length: qubits }, (_, i) => ({
    id: i,
    state: Math.random() > 0.5 ? '|0⟩' : '|1⟩',
    probability: Math.random(),
    entangled: Math.random() > 0.7 ? Math.floor(Math.random() * qubits) : null
  }));

  const addGate = (gate: string) => {
    setGateSequence(prev => [...prev, gate]);
  };

  const clearCircuit = () => {
    setGateSequence([]);
  };

  const runCircuit = () => {
    setCoherenceTime(prev => prev - Math.random() * 5);
    setFidelity(prev => Math.max(95, prev - Math.random() * 0.5));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-mono text-gray-100 flex items-center">
          <Atom className="w-6 h-6 mr-2" />
          QUANTUM COMPUTING LAB
        </h2>
        <div className="text-sm font-mono text-gray-400">
          QPU: IBM-Q-07 | QUBITS: {qubits} | TEMP: 15mK
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Quantum Circuit Builder */}
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4">QUANTUM CIRCUIT BUILDER</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {gates.map(gate => (
                    <button
                      key={gate}
                      onClick={() => addGate(gate)}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-mono text-sm px-3 py-2 border border-gray-600 transition-colors"
                    >
                      {gate}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={runCircuit}
                    className="bg-blue-700 hover:bg-blue-600 text-gray-100 p-2 border border-blue-600 transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                  <button
                    onClick={clearCircuit}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-100 p-2 border border-gray-600 transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-700 p-4 min-h-32">
                <div className="text-sm font-mono text-gray-300 mb-2">Circuit Sequence:</div>
                <div className="flex flex-wrap gap-2">
                  {gateSequence.map((gate, index) => (
                    <span key={index} className="bg-blue-900 text-blue-300 px-2 py-1 text-xs font-mono rounded">
                      {gate}
                    </span>
                  ))}
                  {gateSequence.length === 0 && (
                    <span className="text-gray-500 font-mono text-sm">No gates added</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3">
                  <div className="text-xs font-mono text-gray-400 mb-1">COHERENCE TIME</div>
                  <div className="text-sm font-mono text-gray-100">{coherenceTime.toFixed(1)}μs</div>
                </div>
                <div className="bg-gray-700 p-3">
                  <div className="text-xs font-mono text-gray-400 mb-1">FIDELITY</div>
                  <div className="text-sm font-mono text-gray-100">{fidelity.toFixed(2)}%</div>
                </div>
                <div className="bg-gray-700 p-3">
                  <div className="text-xs font-mono text-gray-400 mb-1">GATES</div>
                  <div className="text-sm font-mono text-gray-100">{gateSequence.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Qubit State Visualizer */}
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              QUBIT STATE MONITOR
            </h3>
            
            <div className="grid grid-cols-8 gap-2">
              {qubitStates.map(qubit => (
                <div key={qubit.id} className="bg-gray-700 border border-gray-600 p-3 text-center">
                  <div className="text-xs font-mono text-gray-400 mb-1">Q{qubit.id}</div>
                  <div className="text-sm font-mono text-gray-100 mb-1">{qubit.state}</div>
                  <div className="w-full bg-gray-600 h-1 mb-1">
                    <div 
                      className="h-1 bg-cyan-500"
                      style={{ width: `${qubit.probability * 100}%` }}
                    />
                  </div>
                  {qubit.entangled !== null && (
                    <div className="text-xs text-cyan-400">
                      ⟷Q{qubit.entangled}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4">SYSTEM PARAMETERS</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-gray-300 mb-2">
                  Qubits: {qubits}
                </label>
                <input
                  type="range"
                  min="2"
                  max="32"
                  value={qubits}
                  onChange={(e) => setQubits(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-gray-300">Temperature</span>
                  <span className="text-cyan-400">15.2 mK</span>
                </div>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-gray-300">Error Rate</span>
                  <span className="text-yellow-400">0.23%</span>
                </div>
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-gray-300">Calibration</span>
                  <span className="text-green-400">OPTIMAL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              ERROR CORRECTION
            </h3>
            
            <div className="space-y-3">
              <div className="bg-gray-700 p-3">
                <div className="text-sm font-mono text-gray-200 mb-2">Surface Code</div>
                <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>Logical Qubits:</span>
                  <span>4</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>Distance:</span>
                  <span>3</span>
                </div>
              </div>
              
              <div className="bg-gray-700 p-3">
                <div className="text-sm font-mono text-gray-200 mb-2">Stabilizer Check</div>
                <div className="text-xs font-mono text-green-400">All syndromes stable</div>
              </div>
              
              <div className="bg-gray-700 p-3">
                <div className="text-sm font-mono text-gray-200 mb-2">Correction Rate</div>
                <div className="w-full bg-gray-600 h-2">
                  <div className="h-2 bg-green-500" style={{ width: '94%' }} />
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1">94% success</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-600 p-6">
            <h3 className="text-lg font-mono text-gray-100 mb-4">RECENT RESULTS</h3>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="text-gray-300">
                <span className="text-gray-500">12:34:56</span> Bell state prepared
              </div>
              <div className="text-gray-300">
                <span className="text-gray-500">12:34:23</span> GHZ state measured
              </div>
              <div className="text-gray-300">
                <span className="text-gray-500">12:33:45</span> Teleportation success
              </div>
              <div className="text-gray-300">
                <span className="text-gray-500">12:33:12</span> Error corrected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}