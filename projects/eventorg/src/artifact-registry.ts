import * as gcp from '@pulumi/gcp';
import { region } from './config';
import { project } from './project';
import { apiServices } from './api-services';
import { provider } from './providers/gcp';

export const artifactRepository = new gcp.artifactregistry.Repository(
  'artifact-registry',
  {
    repositoryId: project.projectId,
    location: region,
    format: 'DOCKER',
  },
  { provider, dependsOn: apiServices },
);
