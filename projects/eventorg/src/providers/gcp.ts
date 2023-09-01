import { project } from '../project';
import * as gcp from '@pulumi/gcp';

export const provider = new gcp.Provider('gcp', {
  project: project.id,
});
