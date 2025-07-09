import { db, storage } from './firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  where
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';

// Plan configuration with upload limits
export const PLAN_LIMITS = {
  free: {
    maxUploads: 5,
    maxInputFieldsPerDoc: 5,
    maxStorageMB: 10
  },
  basic: {
    maxUploads: 25,
    maxInputFieldsPerDoc: 20,
    maxStorageMB: 100
  },
  premium: {
    maxUploads: 100,
    maxInputFieldsPerDoc: 100,
    maxStorageMB: 1000
  }
};

/**
 * Get user document with additional plan information
 */
export const getUserWithPlan = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }
    
    const userData = userDoc.data();
    // Add plan limits to user data
    const planType = userData.planType || 'free';
    const planLimits = PLAN_LIMITS[planType] || PLAN_LIMITS.free;
    
    return {
      ...userData,
      id: userDoc.id,
      planLimits
    };
  } catch (error) {
    console.error("Error getting user with plan:", error);
    throw error;
  }
};

/**
 * Upload a file and create an upload record in the user's uploads subcollection
 */
export const uploadUserFile = async (userId, file, metadata = {}) => {
  try {
    // First get user to check plan limits
    const user = await getUserWithPlan(userId);
    
    // Check if user has exceeded upload count
    const uploadsQuery = collection(db, "users", userId, "uploads");
    const uploadDocs = await getDocs(uploadsQuery);
    
    if (uploadDocs.size >= user.planLimits.maxUploads) {
      throw new Error(`Upload limit reached for ${user.planType} plan. Maximum uploads: ${user.planLimits.maxUploads}`);
    }
    
    // Check file size against plan limits (convert MB to bytes)
    if (file.size > user.planLimits.maxStorageMB * 1024 * 1024) {
      throw new Error(`File size exceeds the ${user.planLimits.maxStorageMB}MB limit for your ${user.planType} plan`);
    }
    
    // 1. Upload file to storage
    const storageRef = ref(storage, `uploads/${userId}/${file.name}-${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Error function
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          // Complete function
          try {
            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Set default number of input fields based on file type or metadata
            // This would be updated later after AI processing
            const inputFields = metadata.inputFields || 0;
            
            // Check input fields against plan limits
            if (inputFields > user.planLimits.maxInputFieldsPerDoc) {
              // If this were a real-time check, you might want to delete the uploaded file here
              throw new Error(`Document has ${inputFields} input fields, which exceeds the limit of ${user.planLimits.maxInputFieldsPerDoc} for your ${user.planType} plan`);
            }
            
            // 2. Create upload record in Firestore
            const uploadData = {
              fileName: file.name,
              originalFileName: file.name,
              fileSize: file.size,
              fileType: file.type,
              fileUrl: downloadURL,
              uploadDate: serverTimestamp(),
              lastModified: serverTimestamp(),
              status: 'uploaded', // 'uploaded', 'processing', 'completed', 'error'
              inputFields: inputFields,
              ...metadata
            };
            
            const uploadRef = await addDoc(
              collection(db, "users", userId, "uploads"),
              uploadData
            );
            
            resolve({
              id: uploadRef.id,
              ...uploadData,
              uploadDate: new Date(), // Convert server timestamp to Date for immediate use
              lastModified: new Date()
            });
          } catch (error) {
            console.error("Error creating upload record:", error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Upload process error:", error);
    throw error;
  }
};

/**
 * Get all uploads for a user
 */
export const getUserUploads = async (userId, options = {}) => {
  try {
    const { orderByField = 'uploadDate', orderDirection = 'desc', limitCount = 50 } = options;
    
    const uploadsQuery = query(
      collection(db, "users", userId, "uploads"),
      orderBy(orderByField, orderDirection),
      limit(limitCount)
    );
    
    const uploadDocs = await getDocs(uploadsQuery);
    const uploads = [];
    
    uploadDocs.forEach(doc => {
      uploads.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return uploads;
  } catch (error) {
    console.error("Error getting user uploads:", error);
    throw error;
  }
};

/**
 * Get a single upload document
 */
export const getUpload = async (userId, uploadId) => {
  try {
    const uploadDoc = await getDoc(doc(db, "users", userId, "uploads", uploadId));
    
    if (!uploadDoc.exists()) {
      throw new Error("Upload document not found");
    }
    
    return {
      id: uploadDoc.id,
      ...uploadDoc.data()
    };
  } catch (error) {
    console.error("Error getting upload:", error);
    throw error;
  }
};

/**
 * Update an upload document
 */
export const updateUpload = async (userId, uploadId, updateData) => {
  try {
    const uploadRef = doc(db, "users", userId, "uploads", uploadId);
    
    // First get the current data to verify against plan limits if needed
    if (updateData.inputFields !== undefined) {
      const user = await getUserWithPlan(userId);
      if (updateData.inputFields > user.planLimits.maxInputFieldsPerDoc) {
        throw new Error(`Cannot update to ${updateData.inputFields} input fields, which exceeds the limit of ${user.planLimits.maxInputFieldsPerDoc} for your ${user.planType} plan`);
      }
    }
    
    // Add lastModified timestamp
    const dataToUpdate = {
      ...updateData,
      lastModified: serverTimestamp()
    };
    
    await updateDoc(uploadRef, dataToUpdate);
    
    return {
      id: uploadId,
      ...dataToUpdate
    };
  } catch (error) {
    console.error("Error updating upload:", error);
    throw error;
  }
};

/**
 * Delete an upload document and its associated file
 */
export const deleteUpload = async (userId, uploadId) => {
  try {
    // First get the upload to get file URL
    const upload = await getUpload(userId, uploadId);
    
    // Delete from storage if we have a URL
    if (upload.fileUrl) {
      try {
        const storageRef = ref(storage, upload.fileUrl);
        await deleteObject(storageRef);
      } catch (storageError) {
        console.warn("Error deleting file from storage:", storageError);
        // Continue with document deletion even if storage delete fails
      }
    }
    
    // Delete the document
    await deleteDoc(doc(db, "users", userId, "uploads", uploadId));
    
    return { success: true, id: uploadId };
  } catch (error) {
    console.error("Error deleting upload:", error);
    throw error;
  }
};

/**
 * Update user plan
 */
export const updateUserPlan = async (userId, planType) => {
  try {
    if (!['free', 'basic', 'premium'].includes(planType)) {
      throw new Error("Invalid plan type. Must be 'free', 'basic', or 'premium'");
    }
    
    const userRef = doc(db, "users", userId);
    
    await updateDoc(userRef, {
      planType,
      lastPlanUpdate: serverTimestamp()
    });
    
    return { success: true, planType };
  } catch (error) {
    console.error("Error updating user plan:", error);
    throw error;
  }
};
