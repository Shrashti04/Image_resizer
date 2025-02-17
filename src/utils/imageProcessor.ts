import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { ImageSize, ProcessedImage } from '../types';

export const defaultSizes: ImageSize[] = [
  { width: 300, height: 250, label: 'Medium Rectangle', enabled: true },
  { width: 728, height: 90, label: 'Leaderboard', enabled: true },
  { width: 160, height: 600, label: 'Wide Skyscraper', enabled: true },
  { width: 300, height: 600, label: 'Half Page', enabled: true }
];

export async function processImage(file: File, sizes: ImageSize[] = defaultSizes): Promise<ProcessedImage[]> {
  const processedImages: ProcessedImage[] = [];
  const enabledSizes = sizes.filter(size => size.enabled);

  for (const size of enabledSizes) {
    try {
      const compressedFile = await imageCompression(file, {
        maxWidthOrHeight: Math.max(size.width, size.height),
        useWebWorker: true
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      canvas.width = size.width;
      canvas.height = size.height;

      const img = new Image();
      img.src = URL.createObjectURL(compressedFile);

      await new Promise((resolve) => {
        img.onload = () => {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const scale = Math.min(
            size.width / img.width,
            size.height / img.height
          );

          const x = (size.width - img.width * scale) / 2;
          const y = (size.height - img.height * scale) / 2;

          ctx.drawImage(
            img,
            x,
            y,
            img.width * scale,
            img.height * scale
          );

          resolve(null);
        };
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const resizedFile = await fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => new File([blob], file.name, { type: 'image/jpeg' }));

      processedImages.push({
        size,
        dataUrl,
        file: resizedFile
      });
    } catch (error) {
      console.error(`Error processing image for size ${size.width}x${size.height}:`, error);
    }
  }

  return processedImages;
}

export async function downloadAllImages(images: ProcessedImage[]) {
  const zip = new JSZip();
  
  images.forEach((image) => {
    const fileName = `${image.size.label.toLowerCase().replace(/\s+/g, '-')}-${image.size.width}x${image.size.height}.jpg`;
    zip.file(fileName, image.file);
  });
  
  const content = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(content);
  link.download = 'processed-images.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}