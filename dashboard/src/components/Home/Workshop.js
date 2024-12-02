import React, { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera, 
  Html,
  useProgress,
  ContactShadows,
  Stage 
} from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { machineData, companyInfo } from './Data';
import { 
  Sun, 
  Moon, 
  ArrowRight, 
  Zap, 
  Layers, 
  Globe,
  X,
  Cpu,
  Settings
} from 'lucide-react';

// Explicitly extend the Html component
extend({ Html });

// Optimized Machine Model Component
const MachineModel = ({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1, 
  imageUrl, 
  name, 
  onSelect 
}) => {
  const meshRef = useRef();
  const textureLoader = useLoader(TextureLoader, imageUrl);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle hover animation
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <group 
      position={position} 
      rotation={rotation} 
      onClick={() => onSelect()}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer';
        e.object.scale.set(scale * 1.05, scale * 1.05, scale * 1.05);
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default';
        e.object.scale.set(scale, scale, scale);
      }}
    >
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial 
          map={textureLoader} 
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
      <Html position={[0, 3, 0]} center>
        <div className="text-sm bg-white/70 backdrop-blur-sm p-2 rounded-lg shadow-md">
          {name}
        </div>
      </Html>
    </group>
  );
};

// Enhanced Technology Insights Component
const TechnologyInsights = ({ isDarkMode }) => {
  const insights = [
    {
      Icon: Zap,
      title: "High Performance",
      desc: "AI-powered manufacturing systems",
    },
    {
      Icon: Layers,
      title: "Integrated Solutions",
      desc: "Seamless multi-platform connectivity",
    },
    {
      Icon: Globe,
      title: "Global Standards",
      desc: "Advanced ISO certified processes",
    },
  ];

  return (
    <div 
      className={`
        absolute bottom-6 left-6 p-6 rounded-2xl shadow-2xl 
        transform transition-all duration-300 hover:scale-105
        ${isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 backdrop-blur-xl' 
          : 'bg-gradient-to-br from-white to-gray-50 text-gray-900 backdrop-blur-xl'
        }
      `}
    >
      <h3 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-blue-300' : 'text-blue-700'
      }`}>
        Technology Insights
      </h3>
      {insights.map(({ Icon, title, desc }) => (
        <div 
          key={title} 
          className="flex items-center space-x-6 mb-4 p-3 rounded-xl transition-all hover:bg-gray-100/10"
        >
          <Icon 
            className={`h-10 w-10 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} 
          />
          <div>
            <h4 
              className={`text-lg font-semibold mb-1 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              {title}
            </h4>
            <p 
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Workshop Layout Component
const WorkshopLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const { progress } = useProgress();

  // Improved Machine Positioning Strategy
  const getMachinePositions = useMemo(() => {
    const gridSize = 6; // Spacing between machines
    const gridColumns = Math.ceil(Math.sqrt(machineData.length));
    
    return machineData.map((machine, index) => {
      const row = Math.floor(index / gridColumns);
      const col = index % gridColumns;
      
      return {
        ...machine,
        position: [
          (col - (gridColumns - 1) / 2) * gridSize, 
          0, 
          (row - (Math.ceil(machineData.length / gridColumns) - 1) / 2) * gridSize
        ]
      };
    });
  }, []);

  // Theme Detection and Persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDarkMode));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div 
      className={`h-screen relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-black text-gray-100' 
          : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
      }`}
    >
      {/* Enhanced Navigation */}
      <nav 
        className={`
          absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center 
          backdrop-blur-xl shadow-sm 
          ${isDarkMode 
            ? 'bg-black/50 text-gray-100' 
            : 'bg-white/70 text-gray-900'
          }
        `}
      >
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <img 
              src={companyInfo.logo} 
              alt={`${companyInfo.name} logo`} 
              className="h-12 w-12 rounded-full ring-2 ring-blue-500 transform hover:scale-110 transition-transform"
            />
            <h1 
              className={`text-2xl font-bold tracking-wider ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              {companyInfo.name}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className={`
              p-3 rounded-full transition-all duration-300 
              hover:rotate-12 hover:scale-110
              ${isDarkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }
            `}
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      {/* 3D Canvas */}
      <Canvas 
        shadows 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%' 
        }}
      >
        <Suspense fallback={
          <Html center>
            <div 
              className={`
                text-xl p-6 rounded-2xl shadow-2xl 
                ${isDarkMode 
                  ? 'bg-gray-800 text-gray-100' 
                  : 'bg-white text-gray-900'
                }
              `}
            >
              Loading... {progress.toFixed(0)}%
            </div>
          </Html>
        }>
          <PerspectiveCamera 
            makeDefault 
            position={[0, 15, 25]} 
            fov={45} 
          />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
          />

          <Environment preset={isDarkMode ? "night" : "sunset"} />

          <Stage 
            intensity={0.5} 
            environment={isDarkMode ? "night" : "sunset"}
            shadows={{type: 'accumulative', color: isDarkMode ? '#333' : '#aaa', colorBlend: 2}}
          >
            <ambientLight intensity={isDarkMode ? 0.2 : 0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            {/* Industrial Workshop Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial 
                color={isDarkMode ? '#1f2937' : '#f3f4f6'}
                roughness={0.5}
                metalness={0.3}
              />
            </mesh>

            {/* Machines */}
            {getMachinePositions.map((machine, index) => (
              <MachineModel 
                key={machine.id}
                position={machine.position}
                imageUrl={machine.image}
                name={machine.name}
                onSelect={() => setSelectedMachine(machine)}
              />
            ))}

            <ContactShadows 
              opacity={0.5} 
              scale={50} 
              blur={2} 
              far={10} 
              resolution={256} 
              color={isDarkMode ? '#000' : '#aaa'}
            />
          </Stage>
        </Suspense>
      </Canvas>

      {/* Technology Insights */}
      <TechnologyInsights isDarkMode={isDarkMode} />

      {/* Machine Detail Sidebar */}
      {selectedMachine && (
        <div 
          className={`
            fixed top-1/2 right-0 transform -translate-y-1/2 
            w-[420px] h-[85vh] p-8 z-50 
            rounded-3xl shadow-2xl 
            transition-all duration-500 
            ${isDarkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100' 
              : 'bg-gradient-to-br from-white to-gray-50 text-gray-900'
            }
          `}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 
              className={`text-3xl font-bold ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}
            >
              {selectedMachine.name}
            </h2>
            <button 
              onClick={() => setSelectedMachine(null)}
              className={`
                p-3 rounded-full transition-all 
                ${isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-200' 
                  : 'hover:bg-gray-200 text-gray-800'
                }
              `}
            >
              <X className="h-7 w-7" />
            </button>
          </div>
          
          <img 
            src={selectedMachine.image} 
            alt={selectedMachine.name} 
            className="w-full h-56 object-cover rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform"
          />
          
          <p 
            className={`mb-6 text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {selectedMachine.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(selectedMachine.specs).map(([key, value]) => (
              <div 
                key={key} 
                className={`
                  p-4 rounded-xl 
                  transition-all hover:scale-105 
                  ${isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                <strong 
                  className={`block mb-2 ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-700'
                  }`}
                >
                  {key}
                </strong> 
                {value}
              </div>
            ))}
          </div>

          <button 
            className={`
              mt-6 w-full py-4 rounded-xl 
              transform transition-all hover:scale-105
              ${isDarkMode
                ? 'bg-blue-700 hover:bg-blue-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
            `}
          >
            More Details <ArrowRight className="inline ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkshopLayout;