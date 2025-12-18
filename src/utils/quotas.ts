import { QuotaKey } from '../types/plans';

export const LITE_LIMITS: Record<QuotaKey, number> = {
  users: 1,
  integrations: 2,
  storageGB: 5,
};
