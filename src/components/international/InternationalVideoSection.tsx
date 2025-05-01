
import React from 'react';
import { Play } from 'lucide-react';
import LazyImage from '@/components/ui/LazyImage';

const InternationalVideoSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold">Video of the day</h2>
      </div>
      
      <div className="relative">
        <LazyImage 
          src="/lovable-uploads/dd32855b-5fb2-489b-b817-706758675c13.png" 
          alt="Video Preview" 
          aspectRatio="16/9"
          className="w-full h-auto" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 rounded-full w-12 h-12 flex items-center justify-center">
            <Play className="text-white" fill="white" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md">
          <div className="text-center">
            <p className="font-bold text-lg">1XBET</p>
            <p className="text-sm mb-2">120% BONUS FOR YOUR FIRST DEPOSIT!</p>
            <p className="text-sm mb-2">GET YOUR 33 000 INR!</p>
            <button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold mt-2">
              GET YOUR BONUS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalVideoSection;
