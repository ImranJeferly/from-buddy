import { useState, useEffect } from 'react';
import { getEffectiveUploadQuota } from '@/lib/ipRestrictions';

export function useUploadQuota(userData, userId) {
  const [quotaInfo, setQuotaInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuotaInfo() {
      if (!userData || !userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const info = await getEffectiveUploadQuota(userData, userId);
        setQuotaInfo(info);
        setError(null);
      } catch (err) {
        console.error('Error fetching quota info:', err);
        setError(err);
        // Fallback to normal quota calculation
        const normalQuota = userData.planType === 'basic' ? 15 : userData.planType === 'pro' ? Infinity : 3;
        setQuotaInfo({ 
          quota: normalQuota, 
          restricted: false,
          fallback: true 
        });
      } finally {
        setLoading(false);
      }
    }

    fetchQuotaInfo();
  }, [userData, userId]);

  // Calculate remaining uploads
  const remaining = quotaInfo?.quota === Infinity 
    ? Infinity 
    : Math.max(0, (quotaInfo?.quota || 0) - (userData?.uploadCount || 0));

  return {
    quotaInfo,
    loading,
    error,
    remaining,
    isRestricted: quotaInfo?.restricted || false,
    restrictionReason: quotaInfo?.reason,
    restrictionType: quotaInfo?.restrictionType
  };
}