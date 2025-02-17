export interface ImageSize {
  width: number;
  height: number;
  label: string;
  enabled: boolean;
}

export interface ProcessedImage {
  size: ImageSize;
  dataUrl: string;
  file: File;
}

export interface CustomSize {
  width: number;
  height: number;
  label: string;
}