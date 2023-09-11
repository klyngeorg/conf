import * as gcp from '@pulumi/gcp';
import { provider } from './providers/gcp';
import { apiServices } from './api-services';

export const serviceAccount = new gcp.serviceaccount.Account(
  'eventorg-worker',
  {
    accountId: 'eventorg-worker',
  },
  { dependsOn: apiServices, provider },
);
