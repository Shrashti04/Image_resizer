import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    maxSize: 10485760 // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className="relative border-2 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 transition-all duration-300 bg-gradient-to-b from-blue-50 to-white"
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative z-10">
        {isDragActive ? (
          <div className="animate-pulse">
            <ImageIcon className="mx-auto h-16 w-16 text-blue-500" />
            <p className="mt-4 text-lg font-medium text-blue-600">
              Drop your image here
            </p>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-16 w-16 text-blue-500" />
            <p className="mt-4 text-lg font-medium text-gray-900">
              Drag and drop your image here
            </p>
            <p className="mt-2 text-sm text-gray-600">
              or click to browse your files
            </p>
          </>
        )}
        <div className="mt-4 text-xs text-gray-500">
          Supports PNG, JPG/JPEG, and GIF (max 10MB)
        </div>
      </div>
    </div>
  );
}