"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '@/lib/AuthContext';
import { uploadUserFile, getUserUploads } from '@/lib/firestoreHelpers';

const FormUploader = () => {
  const { currentUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userUploads, setUserUploads] = useState([]);

  // Fetch user uploads on component mount
  React.useEffect(() => {
    if (currentUser) {
      fetchUserUploads();
    }
  }, [currentUser]);

  // Fetch user uploads
  const fetchUserUploads = async () => {
    if (!currentUser) return;
    
    try {
      const uploads = await getUserUploads(currentUser.uid);
      setUserUploads(uploads);
    } catch (error) {
      console.error('Error fetching uploads:', error);
      setError('Failed to load your uploads. Please try again later.');
    }
  };

  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!currentUser) {
      setError('You must be logged in to upload files.');
      return;
    }

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Check file type - adjust accepted types as needed
    const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'];
    if (!acceptedTypes.includes(file.type)) {
      setError(`File type "${file.type}" not supported. Please upload a PDF or image file.`);
      return;
    }

    // Reset states
    setError(null);
    setSuccess(false);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Custom metadata for the file
      const metadata = {
        uploadedBy: currentUser.uid,
        originalFileName: file.name,
        fileType: file.type,
        inputFields: 0, // This will be updated after AI processing
        processingStatus: 'pending'
      };

      // Upload the file
      const uploadResult = await uploadUserFile(currentUser.uid, file, metadata);
      
      setSuccess(true);
      setUploadProgress(100);
      
      // Refresh the user uploads
      fetchUserUploads();

      // Simulate processing (in a real app, you'd trigger processing here)
      setTimeout(() => {
        simulateProcessing(uploadResult.id);
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [currentUser]);

  // Simulate processing (in a real app, this would be a backend process)
  const simulateProcessing = async (uploadId) => {
    if (!currentUser) return;
    
    try {
      // In a real app, this would be replaced with actual form field detection results
      const randomFieldCount = Math.floor(Math.random() * 15) + 1; // 1-15 random fields
      
      // This would be replaced with your actual update logic using the updateUpload function
      console.log(`Processing upload ${uploadId} - detected ${randomFieldCount} input fields`);
      
      // Refresh uploads to show updated status
      fetchUserUploads();
    } catch (error) {
      console.error('Processing error:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="my-8">
      <h2 className="text-2xl font-coiny text-brand-blue mb-6">Upload Your Form</h2>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          {error}
        </div>
      )}
      
      {/* Success message */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
          Form uploaded successfully! We're processing your document...
        </div>
      )}
      
      {/* Upload area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-brand-blue bg-blue-50' : 'border-gray-300 hover:border-brand-blue hover:bg-blue-50'}`}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div className="space-y-3">
            <p className="text-gray-600">Uploading...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-brand-blue h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            {isDragActive ? (
              <p className="font-medium text-brand-blue">Drop your form here...</p>
            ) : (
              <>
                <p className="font-medium text-gray-700">Drag &amp; drop your form here</p>
                <p className="text-sm text-gray-500">or click to browse files (PDF, JPG, PNG)</p>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* User uploads list */}
      {userUploads.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-coiny text-gray-700 mb-4">Your Uploads</h3>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {userUploads.map((upload) => (
                <li key={upload.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* File type icon */}
                      <div className="mr-3 flex-shrink-0">
                        {upload.fileType.includes('pdf') ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      
                      {/* File info */}
                      <div>
                        <p className="font-medium text-gray-800 truncate max-w-xs">
                          {upload.fileName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(upload.uploadDate?.toDate?.() || upload.uploadDate).toLocaleString()} • 
                          {upload.inputFields} fields detected
                        </p>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div>
                      {upload.status === 'completed' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Ready
                        </span>
                      ) : upload.status === 'error' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Error
                        </span>
                      ) : upload.status === 'processing' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Processing
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormUploader;
