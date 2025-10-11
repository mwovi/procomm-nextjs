'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  excerpt: string;
  url: string;
}

export default function ShareButton({ title, excerpt, url }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share Article
    </button>
  );
}