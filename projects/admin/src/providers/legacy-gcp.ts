import * as gcp from '@pulumi/gcp';
import { adminProjectId } from '../config';

export const provider = new gcp.Provider('bjerk-core-google', {
  project: adminProjectId,
});
