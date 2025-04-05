"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';

interface ProductViewerProps {
  modelPath: string;
}

// Fallback model to use when no model is available
const FallbackModel = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

// Model loader that handles the actual 3D model
const Model = ({ modelPath }: { modelPath: string }) => {
  const { scene } = useGLTF(modelPath, true);
  const { camera } = useThree();

  useEffect(() => {
    // Reset camera position
    camera.position.set(2, 2, 5);
    camera.lookAt(0, 0, 0);
    
    // Center and resize the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    
    scene.position.x = -center.x * scale;
    scene.position.y = -center.y * scale;
    scene.position.z = -center.z * scale;
    scene.scale.set(scale, scale, scale);
    
    // Apply default material if needed
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        if (!mesh.material) {
          mesh.material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        }
      }
    });
  }, [scene, camera]);

  return <primitive object={scene} />;
};

const ProductViewer: React.FC<ProductViewerProps> = ({ modelPath }) => {
  // For real implementation, we'd check if the file exists or handle loading errors
  const modelExists = modelPath && modelPath.length > 0;
  
  // For demo purpose, we'll pretend we have GLB files
  // In real implementation, you'd check if files exist or use proper error handling
  
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}>
          {modelExists ? (
            <Suspense fallback={<FallbackModel />}>
              <Model modelPath={modelPath} />
            </Suspense>
          ) : (
            <FallbackModel />
          )}
        </PresentationControls>
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductViewer;