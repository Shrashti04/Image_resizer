import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImagePreview } from './components/ImagePreview';
import { SizeConfigurator } from './components/SizeConfigurator';
import { processImage, downloadAllImages, defaultSizes } from './utils/imageProcessor';
import { ProcessedImage, ImageSize } from './types';
import { Image, AlertCircle } from 'lucide-react';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sizes, setSizes] = useState<ImageSize[]>(defaultSizes);

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const processed = await processImage(file, sizes);
      setProcessedImages(processed);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Error processing image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSizesChange = (newSizes: ImageSize[]) => {
    setSizes(newSizes);
    if (processedImages.length > 0) {
      handleImageSelect(processedImages[0].file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
            <Image className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Resizer Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your image and we'll automatically resize it to all the formats you need
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <SizeConfigurator sizes={sizes} onSizesChange={handleSizesChange} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-sm text-gray-600">Processing your image...</p>
            </div>
          )}

          {processedImages.length > 0 && !isProcessing && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <ImagePreview 
                processedImages={processedImages}
                onDownloadAll={() => downloadAllImages(processedImages)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;