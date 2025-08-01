import React from "react";

export default function AcceptedFormats() {
  return (
    <div className="accepted-formats-section w-full flex items-center justify-center border-t border-b border-[#e5e5e5] py-6 mt-8">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-20 h-10 bg-[#2196F3] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-brand font-normal text-lg">.PNG</span>
          </div>
          <span className="text-gray-600 text-sm font-semibold tracking-wide">PNG Images</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-20 h-10 bg-[#2196F3] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-brand font-normal text-lg">.JPG</span>
          </div>
          <span className="text-gray-600 text-sm font-semibold tracking-wide">JPEG Images</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-20 h-10 bg-[#2196F3] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-brand font-normal text-lg">.WEBP</span>
          </div>
          <span className="text-gray-600 text-sm font-semibold tracking-wide">Web Images</span>
        </div>
      </div>
    </div>
  );
}
