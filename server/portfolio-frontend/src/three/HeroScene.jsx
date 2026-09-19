import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

function FloatingObject({ shape, color, position, scale = 1, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t * 0.2 * speed) * 0.4 + t * 0.05 * speed;
    mesh.current.rotation.y = t * 0.08 * speed;

    const targetX = position[0] + state.pointer.x * 0.35;
    const targetY = position[1] + state.pointer.y * 0.2;
    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.03;
    mesh.current.position.y += (targetY - mesh.current.position.y) * 0.03;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
      case 'torus': return <torusGeometry args={[0.8, 0.28, 16, 48]} />;
      case 'box': return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
      default: return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [shape]);

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} flatShading />
      </mesh>
    </Float>
  );
}

function Wireframe({ position, scale = 1, speed = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.15 * speed;
    mesh.current.rotation.x = t * 0.08 * speed;
  });
  return (
    <Float speed={1 * speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        <torusKnotGeometry args={[0.7, 0.18, 100, 12]} />
        <meshBasicMaterial color="#3B5BFF" wireframe />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 4, 4]} intensity={1.1} color="#FFF8E8" />
      <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#B8A9E8" />

      <FloatingObject shape="box" color="#3B5BFF" position={[-3.2, 1.1, -1]} scale={0.62} speed={0.9} />
      <FloatingObject shape="icosahedron" color="#F5C842" position={[3.1, 0.6, -2]} scale={0.85} speed={1.1} />
      <FloatingObject shape="torus" color="#1A1A1A" position={[2.3, -1.6, -0.5]} scale={0.55} speed={0.7} />
      <FloatingObject shape="octahedron" color="#B8A9E8" position={[-2.6, -1.4, -1.5]} scale={0.6} speed={1.2} />
      <Wireframe position={[0.4, -0.2, -3]} scale={1.15} speed={1} />

      <Environment preset="studio" environmentIntensity={0.25} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Scene />
    </Canvas>
  );
}