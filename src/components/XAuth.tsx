import React from 'react';

interface XAuthProps {
  onAuth: (token: string) => void;
}

export function XAuth({ onAuth }: XAuthProps) {

  const handleConnect = () => {
    window.location.href = "https://twitter.com/intent/tweet?text=Check+out+this+awesome+image!&url=https://cdn.pixabay.com/photo/2015/12/13/05/46/mannequin-1090714_1280.jpg";
  };

  return (
    <div className="flex items-center justify-center p-4">
      <button
        onClick={handleConnect}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Connect to X
      </button>
    </div>
  );
}