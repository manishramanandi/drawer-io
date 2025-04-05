"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';

interface ProductViewerProps {
  modelPath: string;
  scale?: number;
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
  const { scene } = useGLTF(modelPath); // remove `true` as second param

  const { camera } = useThree();

  useEffect(() => {
    if (!scene) return;

    camera.position.set(2, 2, 5);
    camera.lookAt(0, 0, 0);

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;

    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    scene.scale.set(scale, scale, scale);
  }, [scene, camera]);

  return <primitive object={scene} />;
};



const ProductViewer = ({ modelPath }: { modelPath: string }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />

        <Suspense fallback={<FallbackModel />}>
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <Model modelPath={modelPath} />
          </PresentationControls>
        </Suspense>

        <OrbitControls enableZoom enablePan enableRotate minDistance={2} maxDistance={10} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/model/monitor/monitor.gltf");

export default ProductViewer;