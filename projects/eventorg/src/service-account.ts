import * as gcp from '@pulumi/gcp';
import { provider } from './providers/gcp';

export const serviceAccount = new gcp.serviceaccount.Account(
  'eventorg',
  {
    accountId: 'eventorg',
  },
  { provider },
);
