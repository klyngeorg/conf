import * as gcp from '@pulumi/gcp';
import { billingAccount, organizationNumber, projectId } from './config';

const nullProvider = new gcp.Provider('null');

export const project = new gcp.organizations.Project(
  'eventorg',
  {
    projectId,
    name: 'eventorg',
    billingAccount,
    orgId: organizationNumber,
  },
  { provider: nullProvider },
);
