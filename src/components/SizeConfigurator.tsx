import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ImageSize, CustomSize } from '../types';

interface SizeConfiguratorProps {
  sizes: ImageSize[];
  onSizesChange: (sizes: ImageSize[]) => void;
}

export function SizeConfigurator({ sizes, onSizesChange }: SizeConfiguratorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSize, setNewSize] = useState<CustomSize>({
    width: 0,
    height: 0,
    label: ''
  });

  const handleToggleSize = (index: number) => {
    const updatedSizes = sizes.map((size, i) => 
      i === index ? { ...size, enabled: !size.enabled } : size
    );
    onSizesChange(updatedSizes);
  };

  const handleAddSize = () => {
    if (newSize.width && newSize.height && newSize.label) {
      onSizesChange([
        ...sizes,
        { ...newSize, enabled: true }
      ]);
      setNewSize({ width: 0, height: 0, label: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Output Sizes</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Custom Size
        </button>
      </div>

      {isAdding && (
        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Label (e.g., Square)"
              value={newSize.label}
              onChange={(e) => setNewSize({ ...newSize, label: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Width (px)"
              value={newSize.width || ''}
              onChange={(e) => setNewSize({ ...newSize, width: parseInt(e.target.value) || 0 })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Height (px)"
              value={newSize.height || ''}
              onChange={(e) => setNewSize({ ...newSize, height: parseInt(e.target.value) || 0 })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsAdding(false)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSize}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Size
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              size.enabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex-1">
              <div className="font-medium text-gray-900">{size.label}</div>
              <div className="text-sm text-gray-500">
                {size.width}x{size.height}
              </div>
            </div>
            <button
              onClick={() => handleToggleSize(index)}
              className={`ml-3 inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${
                size.enabled
                  ? 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {size.enabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}