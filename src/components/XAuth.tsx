// src/components/XAuth.tsx
import { useState } from 'react';
import { authenticateX } from '../utils/xApi';

interface XAuthProps {
  onAuth: (token: string) => void;
}

export function XAuth({ onAuth }: XAuthProps) {
  const [loading, setLoading] = useState(false);
  
  const handleConnect = async () => {
    setLoading(true);
    try {
      const token = await authenticateX();
      onAuth(token);
    } catch (err) {
      console.error('Authentication failed', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center p-4">
      <button
        onClick={handleConnect}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {loading ? 'Connecting...' : 'Connect to X'}
      </button>
    </div>
  );
}