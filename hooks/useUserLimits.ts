import { useState } from 'react';
import { LITE_LIMITS } from '../utils/quotaLimits';

export default function useUserLimits() {
  const [limits, setLimits] = useState({
    users: 1,
    integrations: 0,
    storageGB: 0,
  });

  const checkLimit = (type, amount = 1) => {
    if (limits[type] + amount > LITE_LIMITS[type]) {
      return false;
    }
    return true;
  };

  const incrementLimit = (type, amount = 1) => {
    setLimits(prev => ({ ...prev, [type]: prev[type] + amount }));
  };

  return { limits, checkLimit, incrementLimit };
}
