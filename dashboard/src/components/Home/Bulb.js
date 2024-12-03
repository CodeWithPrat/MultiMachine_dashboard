import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const BlinkinBulb = ({ position, isDarkMode, onBlinkComplete }) => {
  const bulbRef = useRef();
  const lightRef = useRef();
  const [blinkCount, setBlinkCount] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const blinkIntervalRef = useRef(null);
  const blinkStateRef = useRef(false);

  useEffect(() => {
    if (!isDarkMode) {
      // Reset blinking when not in dark mode
      setIsBlinking(false);
      setBlinkCount(0);
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
      // Ensure light is off
      if (lightRef.current) {
        lightRef.current.intensity = 0;
      }
      return;
    }

    // Start blinking sequence
    setIsBlinking(true);
    setBlinkCount(0);
    
    blinkIntervalRef.current = setInterval(() => {
      if (lightRef.current && bulbRef.current) {
        // Toggle between fully on and completely off
        blinkStateRef.current = !blinkStateRef.current;
        lightRef.current.intensity = blinkStateRef.current ? 3 : 0;

        // Increment blink count when going from off to on
        if (blinkStateRef.current) {
          setBlinkCount(prev => {
            const newCount = prev + 1;
            // Stop blinking after 3 full blinks (6 total state changes)
            if (newCount >= 3) {
              clearInterval(blinkIntervalRef.current);
              // Ensure final state is fully on
              lightRef.current.intensity = 5; // Brighter for full illumination
              setIsBlinking(false);
              onBlinkComplete(); // Trigger floor lighting effect
            }
            return newCount;
          });
        }
      }
    }, 500); // Blink every 500ms

    // Cleanup interval on unmount or mode change
    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [isDarkMode, onBlinkComplete]);

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
      
      {/* Point Light with more intense and wider spread */}
      <pointLight 
        ref={lightRef}
        color="#FFD700"
        intensity={0} // Start with 0 intensity
        distance={50} // Increased distance
        decay={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  ) : null;
};

export default BlinkinBulb;