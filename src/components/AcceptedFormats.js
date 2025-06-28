import React from "react";

export default function AcceptedFormats() {
  return (
    <div className="accepted-formats-section w-full flex items-center justify-center border-t border-b border-[#e5e5e5] py-4 mt-8">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" />
          <span className="text-gray-600 text-sm font-semibold tracking-wide">Images</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" />
          <span className="text-gray-600 text-sm font-semibold tracking-wide">PDF</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gray-200 rounded-lg" />
          <span className="text-gray-600 text-sm font-semibold tracking-wide">Document</span>
        </div>
      </div>
    </div>
  );
}
