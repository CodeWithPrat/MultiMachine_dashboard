import React, { useState, useEffect, Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Html,
  useProgress,
  ContactShadows,
  Stage,
} from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from "three";
import { machineData, companyInfo } from "./Data";
import {
  Sun,
  Moon,
  ArrowRight,
  Zap,
  Layers,
  Globe,
  X,
  Cpu,
  Settings,
} from "lucide-react";

// Extend the HTML component from react-three-fiber for custom HTML in 3D scene
extend({ Html });

// Optimized Machine Model Component - Renders individual machine models in 3D
const MachineModel = ({
  position, // 3D position of the machine
  rotation = [0, 0, 0], // Optional rotation (default is no rotation)
  scale = 1, // Optional scale (default is 1:1)
  imageUrl, // Texture image for the machine
  name, // Name of the machine
  onSelect, // Callback when machine is selected
}) => {
  // Reference to the mesh for animation and interactions
  const meshRef = useRef();

  // Load the texture for the machine using React Three Fiber's texture loader
  const textureLoader = useLoader(TextureLoader, imageUrl);

  // Animate the mesh with a subtle hover effect using useFrame
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle sine wave rotation on Y-axis
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      // Handle machine selection on click
      onClick={() => onSelect()}
      // Change cursor and slightly scale up on hover
      onPointerOver={(e) => {
        document.body.style.cursor = "pointer";
        e.object.scale.set(scale * 1.05, scale * 1.05, scale * 1.05);
      }}
      // Reset cursor and scale on pointer out
      onPointerOut={(e) => {
        document.body.style.cursor = "default";
        e.object.scale.set(scale, scale, scale);
      }}
    >
      {/* 3D mesh for the machine */}
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[5, 5, 6]} />
        <meshStandardMaterial
          map={textureLoader}
          roughness={0.5} // Slightly rough surface
          metalness={1} // Slight metallic appearance
        />
      </mesh>
      {/* Machine name label */}
      <Html position={[0, 3, 0]} center>
        <div className=" flex justify-center align-middle w-52 text-sm bg-white/50 backdrop-blur-sm p-2 rounded-lg shadow-md">
          {name}
        </div>
      </Html>
    </group>
  );
};

// Technology Insights Component - Displays key technological features
const TechnologyInsights = ({ isDarkMode }) => {
  // Array of technology insights with icons and descriptions
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
      // Dynamic styling based on dark/light mode
      className={`
        absolute bottom-6 left-6 p-6 rounded-2xl shadow-2xl 
        transform transition-all duration-300 hover:scale-105
        ${isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 backdrop-blur-xl"
          : "bg-gradient-to-br from-white to-gray-50 text-gray-900 backdrop-blur-xl"
        }
      `}
    >
      {/* Section title */}
      <h3
        className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-blue-300" : "text-blue-700"
          }`}
      >
        Technology Insights
      </h3>
      {/* Render each insight */}
      {insights.map(({ Icon, title, desc }) => (
        <div
          key={title}
          className="flex items-center space-x-6 mb-4 p-3 rounded-xl transition-all hover:bg-gray-100/10"
        >
          {/* Insight icon */}
          <Icon
            className={`h-10 w-10 ${isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
          />
          <div>
            {/* Insight title */}
            <h4
              className={`text-lg font-semibold mb-1 ${isDarkMode ? "text-blue-300" : "text-blue-700"
                }`}
            >
              {title}
            </h4>
            {/* Insight description */}
            <p
              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
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

// New Blinking Bulb Component
const BlinkingBulb = ({ position, isDarkMode }) => {
  const bulbRef = useRef();
  const lightRef = useRef();
  const [isBlinking, setIsBlinking] = useState(false);
  const blinkIntervalRef = useRef(null);

  // Implement proper blinking mechanism
  useEffect(() => {
    if (!isDarkMode) {
      // Reset blinking when not in dark mode
      setIsBlinking(false);
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
      return;
    }

    // Start blinking in dark mode
    setIsBlinking(true);
    
    blinkIntervalRef.current = setInterval(() => {
      if (lightRef.current && bulbRef.current) {
        // Toggle between fully on and completely off
        lightRef.current.intensity = lightRef.current.intensity > 0 ? 0 : 3;
      }
    }, 500); // Blink every 500ms

    // Cleanup interval on unmount or mode change
    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [isDarkMode]);

  // Additional dynamic lighting and subtle movement
  useFrame(({ clock }) => {
    if (!isDarkMode || !bulbRef.current) return;

    const time = clock.getElapsedTime();
    
    // Subtle bulb movement
    bulbRef.current.rotation.x = Math.sin(time) * 0.1;
    bulbRef.current.rotation.y = Math.cos(time) * 0.1;
  });

  return isDarkMode ? (
    <group ref={bulbRef} position={position}>
      {/* Bulb Mesh */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={isBlinking ? 1 : 0.5}
        />
      </mesh>
      
      {/* Point Light */}
      <pointLight 
        ref={lightRef}
        color="#FFD700"
        intensity={isBlinking ? 3 : 1}
        distance={30}
        decay={2}
        castShadow
      />
    </group>
  ) : null;
};

// Main Workshop Layout Component
const WorkshopLayout = () => {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme toggle
  const [selectedMachine, setSelectedMachine] = useState(null); // Selected machine details
  const { progress } = useProgress(); // Loading progress for 3D assets

  // Optimized machine positioning strategy using useMemo
  const getMachinePositions = useMemo(() => {
    const gridSize = 12; // Spacing between machines
    const gridColumns = Math.ceil(Math.sqrt(machineData.length));

    // Calculate grid-based positions for machines
    return machineData.map((machine, index) => {
      const row = Math.floor(index / gridColumns);
      const col = index % gridColumns;

      return {
        ...machine,
        position: [
          (col - (gridColumns - 1) / 2) * gridSize,
          0,
          (row - (Math.ceil(machineData.length / gridColumns) - 1) / 2) *
          gridSize,
        ],
      };
    });
  }, []);

  // Theme detection and persistence on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set initial theme based on localStorage or system preference
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDarkMode));
  }, []);

  // Update body class and localStorage when theme changes
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Theme toggle handler
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Calculate bulb positions (6 bulbs spread across the workshop)
  const bulbPositions = [
    [-20, 15, -15],
    [20, 15, -15],
    [-20, 15, 15],
    [20, 15, 15],
    [0, 15, -20],
    [0, 15, 20]
  ];

  return (
    <div
      // Full-screen container with dynamic background
      className={`h-screen relative overflow-hidden ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 to-black text-gray-100"
        : "bg-gradient-to-br from-gray-50 to-white text-gray-900"
        }`}
    >
      {/* Navigation Bar */}
      <nav
        className={`
          absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center 
          backdrop-blur-xl shadow-sm 
          ${isDarkMode
            ? "bg-black/50 text-gray-100"
            : "bg-white/70 text-gray-900"
          }
        `}
      >
        {/* Company Logo and Name */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 group">
            <img
              src={companyInfo.logo}
              alt={`${companyInfo.name} logo`}
              className="h-16 w-16 rounded-full 
      ring-4 ring-blue-500/50 
      shadow-lg
      transform transition-all duration-300 
      group-hover:scale-110 
      group-hover:rotate-6 
      group-hover:shadow-xl"
            />
            <div>
              <h1
                className={`
          text-3xl font-extrabold tracking-wider 
          ${isDarkMode
                    ? "text-blue-300 group-hover:text-blue-200"
                    : "text-blue-800 group-hover:text-blue-900"
                  }
          transition-colors duration-300
        `}
              >
                {companyInfo.name}
              </h1>
              <p
                className={`
          text-sm font-medium uppercase tracking-widest 
          ${isDarkMode
                    ? "text-gray-400 group-hover:text-gray-300"
                    : "text-gray-600 group-hover:text-gray-800"
                  }
          transition-colors duration-300
        `}
              >
                {companyInfo.dept}
              </p>
            </div>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`
              p-3 rounded-full transition-all duration-300 
              hover:rotate-12 hover:scale-110
              ${isDarkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            `}
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      {/* 3D Canvas for Rendering Workshop */}
      <Canvas
        shadows
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Suspense for loading 3D assets */}
        <Suspense
          fallback={
            <Html center>
              <div
                className={`
                text-xl p-6 rounded-2xl shadow-2xl 
                ${isDarkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                  }
              `}
              >
                Loading... {progress.toFixed(0)}%
              </div>
            </Html>
          }
        >
          {/* Camera Setup */}
          <PerspectiveCamera makeDefault position={[0, 15, 25]} fov={35} />

          {/* Orbit Controls for 3D Scene */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
          />

          {/* Environment Lighting */}
          <Environment preset={isDarkMode ? "night" : "sunset"} />

          {/* Stage for Rendering Machines */}
          <Stage
            intensity={0.5}
            environment={isDarkMode ? "night" : "sunset"}
            shadows={{
              type: "accumulative",
              color: isDarkMode ? "#333" : "#aaa",
              colorBlend: 2,
            }}
          >
            {/* Lighting Setup */}
            <ambientLight intensity={isDarkMode ? 2.2 : 0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            {/* Blinking Bulbs */}
            {bulbPositions.map((position, index) => (
              <BlinkingBulb 
                key={`bulb-${index}`} 
                position={position} 
                isDarkMode={isDarkMode} 
              />
            ))}

            {/* Industrial Workshop Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
              <planeGeometry args={[60, 40]} />
              <meshStandardMaterial
                color={isDarkMode ? "#1f2937" : "#f3f4f6"}
                roughness={0.5}
                metalness={0.3}
              />
            </mesh>

            {/* Render Machines */}
            {getMachinePositions.map((machine, index) => (
              <MachineModel
                key={machine.id}
                position={machine.position}
                imageUrl={machine.image}
                name={machine.name}
                onSelect={() => setSelectedMachine(machine)}
              />
            ))}

            {/* Contact Shadows for Depth */}
            <ContactShadows
              opacity={0.5}
              scale={50}
              blur={2}
              far={10}
              resolution={256}
              color={isDarkMode ? "#000" : "#aaa"}
            />
          </Stage>
        </Suspense>
      </Canvas>

      {/* Technology Insights Panel */}
      <TechnologyInsights isDarkMode={isDarkMode} />

      {/* Machine Detail Sidebar */}
      {selectedMachine && (
        <div
          className={`
      fixed top-1/2 right-0 transform -translate-y-1/2 
      w-[420px] max-h-[85vh] p-6 z-50 
      rounded-3xl shadow-2xl 
      overflow-y-auto 
      transition-all duration-500 
      scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-blue-300
      ${isDarkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 scrollbar-track-gray-800 scrollbar-thumb-blue-800"
              : "bg-gradient-to-br from-white to-gray-50 text-gray-900"
            }
    `}
        >
          {/* Machine Detail Header - Sticky positioning */}
          <div
            className="sticky top-0 z-10 bg-opacity-90 mb-6 pb-4"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(31, 41, 55, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex justify-between items-center">
              <h2
                className={`text-2xl font-bold truncate pr-4 ${isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
              >
                {selectedMachine.name}
              </h2>
              {/* Close Button */}
              <button
                onClick={() => setSelectedMachine(null)}
                className={`
            p-3 rounded-full transition-all flex-shrink-0
            ${isDarkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-200 text-gray-800"
                  }
          `}
              >
                <X className="h-7 w-7" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Machine Image */}
            <div className="relative group">
              <img
                src={selectedMachine.image}
                alt={selectedMachine.name}
                className="w-full h-64 object-cover rounded-2xl shadow-lg 
          transform transition-transform group-hover:scale-105"
              />
            </div>

            {/* Machine Description */}
            <p
              className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              {selectedMachine.description}
            </p>

            {/* Additional Details Section */}
            <div>
              <h3
                className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}
              >
                Technical Specifications
              </h3>
              {/* Machine Specifications - More Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(selectedMachine.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className={`
                p-4 rounded-xl 
                transition-all hover:scale-105 
                ${isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                      }
              `}
                  >
                    <strong
                      className={`block mb-2 text-sm uppercase tracking-wider ${isDarkMode ? "text-blue-300" : "text-blue-700"
                        }`}
                    >
                      {key}
                    </strong>
                    <span
                      className={`text-base ${isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Additional Sections */}
            {selectedMachine.additionalInfo && (
              <div className="mt-6">
                <h3
                  className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-blue-300" : "text-blue-700"
                    }`}
                >
                  Additional Information
                </h3>
                <div
                  className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                >
                  <p
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    {selectedMachine.additionalInfo}
                  </p>
                </div>
              </div>
            )}

            {/* More Details Button */}
            <button
              className={`
          mt-6 w-full py-4 rounded-xl 
          transform transition-all hover:scale-105
          ${isDarkMode
                  ? "bg-blue-700 hover:bg-blue-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
                }
        `}
            >
              More Details <ArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopLayout;
