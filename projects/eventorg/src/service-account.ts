import * as gcp from '@pulumi/gcp';
import { provider } from './providers/gcp';
import { apiServices } from './api-services';

export const serviceAccount = new gcp.serviceaccount.Account(
  'eventorg',
  {
    accountId: 'eventorg',
  },
  { dependsOn: apiServices, provider },
);
