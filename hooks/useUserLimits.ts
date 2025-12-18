import { useState } from 'react';
import { QuotaKey } from '../types/plans';
import { LITE_LIMITS } from '../utils/quotas';

type UsageState = Record<QuotaKey, number>;

const INITIAL_USAGE: UsageState = {
  users: 1,
  integrations: 0,
  storageGB: 0,
};

export function useUserLimits() {
  const [usage, setUsage] = useState<UsageState>(INITIAL_USAGE);

  const canUse = (key: QuotaKey, amount = 1): boolean =>
    usage[key] + amount <= LITE_LIMITS[key];

  const consume = (key: QuotaKey, amount = 1): void => {
    setUsage(prev => ({
      ...prev,
      [key]: prev[key] + amount,
    }));
  };

  return {
    usage,
    limits: LITE_LIMITS,
    canUse,
    consume,
  };
}
