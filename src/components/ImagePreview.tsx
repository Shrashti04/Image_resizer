import React, { useState } from 'react';
import { Download, Share2, Twitter, Lock } from 'lucide-react';
import { ProcessedImage } from '../types';

interface ImagePreviewProps {
  processedImages: ProcessedImage[];
  onDownloadAll: () => void;
}

export function ImagePreview({ processedImages, onDownloadAll }: ImagePreviewProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postingImageIndex, setPostingImageIndex] = useState<number | null>(null);
  const [twitterError, setTwitterError] = useState<string | null>(null);

  const downloadSingle = async (image: ProcessedImage) => {
    try {
      const response = await fetch(image.dataUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.size.label.toLowerCase().replace(/\s+/g, '-')}-${image.size.width}x${image.size.height}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const handleTwitterPost = async (image: ProcessedImage, index: number) => {
    setPostingImageIndex(index);
    setTwitterError(null);
    
    try {
      // Simulated API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would be handled by your backend
      console.log(`Posting image ${image.size.label} to Twitter...`);
      
      // Simulated success message
      alert(`Image would be posted to Twitter as a private post: ${image.size.label} (${image.size.width}x${image.size.height})`);
    } catch (error) {
      console.error('Error posting to Twitter:', error);
      setTwitterError('Failed to post to Twitter. Please try again.');
    } finally {
      setPostingImageIndex(null);
    }
  };

  const handlePostAll = async () => {
    setIsPosting(true);
    setTwitterError(null);
    
    try {
      // Simulated API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would post all images in sequence
      alert('All images would be posted to Twitter as private posts');
    } catch (error) {
      console.error('Error posting all images to Twitter:', error);
      setTwitterError('Failed to post all images to Twitter. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Processed Images
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePostAll}
            disabled={isPosting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPosting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Posting...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Post All Private
              </>
            )}
          </button>
          <button
            onClick={onDownloadAll}
            disabled={isPosting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4 mr-2" />
            Download All
          </button>
        </div>
      </div>

      {twitterError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{twitterError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processedImages.map((image, index) => (
          <div key={index} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {image.size.label} ({image.size.width}x{image.size.height})
              </h3>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image.dataUrl}
                  alt={`${image.size.label} preview`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {(image.file.size / 1024).toFixed(1)} KB
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTwitterPost(image, index)}
                    disabled={postingImageIndex !== null}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {postingImageIndex === index ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-1" />
                        Post Private
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => downloadSingle(image)}
                    disabled={postingImageIndex !== null}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}