import * as gcp from '@pulumi/gcp';
import { provider } from './providers/legacy-gcp';

export const serviceAccount = new gcp.serviceaccount.Account(
  'admin',
  {
    accountId: 'klyngeorg-admin',
    displayName: 'Administrator service account',
    description: 'Used by CI/CD to deploy infrastructure'
  },
  { deleteBeforeReplace: true, protect: true, provider },
);
