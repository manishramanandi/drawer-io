"use client";

import { useState, useRef, Suspense, useEffect } from 'react';
import processImage from '@/actions/processImage'; // Your server action
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Upload, RotateCw } from "lucide-react";
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SheetClose } from "@/components/ui/sheet";

// Model component remains the same
function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url);
  const { camera, scene } = useThree();
  
  useEffect(() => {
    if (gltf?.scene) {
      const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      
      gltf.scene.position.x -= center.x;
      gltf.scene.position.y -= center.y;
      gltf.scene.position.z -= center.z;
      
      const maxDim = Math.max(size.x, size.y, size.z);
      
      if (camera instanceof THREE.PerspectiveCamera) {
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
        camera.position.z = cameraZ * 1.5;
        
        camera.near = 0.1;
        camera.far = cameraZ * 3;
        camera.updateProjectionMatrix();
      }
    }
  }, [gltf, camera]);
  
  return <primitive object={gltf.scene} />;
}

// Loading placeholder remains the same
function ModelPlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  );
}

export default function ModelBuilderSheet() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');
  const [progressValue, setProgressValue] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setFile(selectedFile);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress('Uploading image...');
    setProgressValue(10);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const steps = [
        { message: 'Checking image compatibility...', value: 20 },
        { message: 'Preprocessing image...', value: 40 },
        { message: 'Generating multi-view images...', value: 60 },
        { message: 'Creating 3D model...', value: 80 },
        { message: 'Finalizing...', value: 90 }
      ];
      
      let stepIndex = 0;
      const progressInterval = setInterval(() => {
        if (stepIndex < steps.length) {
          setProgress(steps[stepIndex].message);
          setProgressValue(steps[stepIndex].value);
          stepIndex++;
        }
      }, 3000);

      const result = await processImage(formData);
      clearInterval(progressInterval);
      
      setModelUrl(result);
      setProgress('Conversion complete!');
      setProgressValue(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    formRef.current?.reset();
    setFile(null);
    setPreview(null);
    setModelUrl(null);
    setError(null);
    setProgress('');
    setProgressValue(0);
  };

  return (
    <div className="flex flex-col gap-4 h-full max-h-full overflow-y-auto">
      {/* Input interface - Takes up top portion */}
      <div className="w-full">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              preview ? 'border-gray-300' : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
          >
            <label className="block cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {preview ? 'Change image' : 'Click to upload image'}
                </span>
                <span className="text-xs text-muted-foreground/70">
                  PNG, JPG, or WEBP (max 5MB)
                </span>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
                disabled={loading}
              />
            </label>
            
            {preview && (
              <div className="mt-4 relative h-32 w-full">
                <Image 
                  src={preview} 
                  alt="Preview" 
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="space-y-2">
              <Progress value={progressValue} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">{progress}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!file || loading}
              className="flex-1"
            >
              {loading ? 'Processing...' : 'Generate 3D Model'}
            </Button>
            
            {file && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </Button>
            )}
          </div>
        </form>

        {modelUrl && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              Your 3D model has been generated successfully.
            </AlertDescription>
            <SheetClose asChild>
              <Button
                className="w-full mt-2 bg-green-600 hover:bg-green-700"
                asChild
              ><a
                  href={modelUrl}
                  download="model.glb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download GLB Model
                </a>
              </Button>
            </SheetClose>
          </Alert>
        )}
      </div>
      
      {/* 3D Viewer - Takes up bottom portion */}
      <div className="w-full h-64 rounded-lg overflow-hidden border bg-gray-100">
        {modelUrl ? (
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Suspense fallback={<ModelPlaceholder />}>
              <Stage environment="city" intensity={0.6}>
                <Model url={modelUrl} />
              </Stage>
            </Suspense>
            <OrbitControls autoRotate />
          </Canvas>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">
              {loading ? (
                <div className="flex flex-col items-center">
                  <RotateCw className="h-12 w-12 text-muted-foreground animate-spin" />
                  <p className="mt-2 text-muted-foreground text-base">Processing your model...</p>
                </div>
              ) : (
                <>
                  <div className="rounded-full bg-gray-200 p-4 inline-flex mb-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="32" 
                      height="32" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      className="text-gray-400"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" y1="22" x2="12" y2="12"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">3D Model Viewer</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload an image above to generate a 3D model.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}