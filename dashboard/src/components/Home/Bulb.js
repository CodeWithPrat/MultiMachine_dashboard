import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Bulb = ({ position, isDarkMode }) => {
  const lightRef = useRef();

  useEffect(() => {
    const light = lightRef.current;

    // Blink the light
    const interval = setInterval(() => {
      light.intensity = isDarkMode ? Math.random() * 2 : Math.random();
    }, 500);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [isDarkMode]);

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <pointLight
        ref={lightRef}
        color={isDarkMode ? 'gold' : 'white'}
        intensity={isDarkMode ? 2 : 1}
        distance={10}
        castShadow
      />
    </group>
  );
};

export default Bulb;
