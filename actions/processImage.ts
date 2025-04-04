"use server";

import { Client } from "@gradio/client";

export default async function processImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const blob = new Blob([await file.arrayBuffer()], { type: file.type });
  const apiKey = process.env.HF_API_KEY as `hf_${string}` | undefined;

  try {
    // Connect to the Space once and reuse the connection
    const app = await Client.connect("TencentARC/InstantMesh", { 
      hf_token: apiKey,
      status_callback: (status) => {
        console.log("Connection status:", status);
      }
    });
    
    console.log("✅ Connected to Hugging Face Space");

    // Step 1: Upload and Check Image
    console.log("Uploading image...");
    const checkResult = await app.predict("/check_input_image", [blob]);
    console.log("✅ Image check result:", checkResult.data);

    // Step 2: Preprocess Image
    console.log("Preprocessing image...");
    const preprocessResult = await app.predict("/preprocess", [blob, true]);
    console.log("✅ Preprocessing complete:", preprocessResult.data);

    // Step 3: Generate Multi-View Images with proper parameters
    // Use quality=50 (medium) and random_seed=42 for consistent results
    console.log("Generating multi-view images...");
    const generateMvsResult = await app.predict("/generate_mvs", [blob, 50, 42]);
    console.log("✅ Multi-view generation complete:", generateMvsResult.data);

    // Step 4: Generate 3D Model
    console.log("Creating 3D model...");
    const make3DResult = await app.predict("/make3d", []);
    
    // The result contains [OBJ URL, GLB URL]
    const modelUrls = make3DResult.data as [string | undefined, string | undefined];
    const glbUrl = modelUrls[1]; // We use GLB for Three.js compatibility
    
    if (!glbUrl) {
      throw new Error("Failed to retrieve the GLB model URL.");
    }

    // Add a cache-busting parameter to ensure fresh model loading in Three.js
    const cacheBustedUrl = `${glbUrl}?t=${Date.now()}`;
    
    console.log("✅ 3D model generated:", cacheBustedUrl);
    return cacheBustedUrl;
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    
    // More descriptive error handling
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        throw new Error("The model processing timed out. Try with a simpler image or try again later.");
      } else if (error.message.includes("403")) {
        throw new Error("Authentication failed. Please check your API key.");
      } else if (error.message.includes("429")) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else if (error.message.includes("queue")) {
        throw new Error("The service is currently busy. Please try again in a few minutes.");
      }
    }
    
    throw new Error("Failed to process the image. Please try again.");
  }
}