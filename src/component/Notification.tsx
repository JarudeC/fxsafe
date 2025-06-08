"use client";

import { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation to complete before calling onClose
      setTimeout(() => {
        onClose();
      }, 500);
    }, 2500); // Start fade out after 2.5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-[9999]">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          type === 'success'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}
      >
        <span className="text-lg">
          {type === 'success' ? '✓' : '✕'}
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
} 