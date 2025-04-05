// types/supabase.ts
export interface UploadResult {
    path: string;
    publicUrl: string;
}

export interface ProcessImageRequest {
    imageUrl: string;
}

export interface ProcessImageResponse {
    modelUrl: string;
    message: string;
}

export interface ApiError {
    error: string;
}