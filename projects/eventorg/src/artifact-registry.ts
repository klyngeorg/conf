import * as gcp from '@pulumi/gcp';
import * as github from '@pulumi/github';
import { developers, region } from './config';
import { project } from './project';
import { apiServices } from './api-services';
import { provider as gcpProvider } from './providers/gcp';
import { provider as githubProvider } from './providers/github';
import { serviceAccount } from './service-account';
import { interpolate } from '@pulumi/pulumi';

export const artifactRepository = new gcp.artifactregistry.Repository(
  'artifact-registry',
  {
    repositoryId: project.projectId,
    location: region,
    format: 'DOCKER',
  },
  { provider: gcpProvider, dependsOn: apiServices },
);

new gcp.artifactregistry.RepositoryIamMember(
  `eventorg-repo-admin`,
  {
    member: serviceAccount.email.apply(email => `serviceAccount:${email}`),
    role: 'roles/artifactregistry.repoAdmin',
    repository: artifactRepository.id,
  },
  { provider: gcpProvider },
);

developers.map(
  member =>
    new gcp.artifactregistry.RepositoryIamMember(
      `${member}-repo-reader`,
      {
        member,
        role: 'roles/artifactregistry.reader',
        repository: artifactRepository.id,
      },
      { provider: gcpProvider },
    ),
);

new github.ActionsSecret(
  'container-registry-secret',
  {
    repository: 'eventorg',
    secretName: 'CONTAINER_REGISTRY',
    plaintextValue: interpolate`${artifactRepository.location}-docker.pkg.dev/${project.projectId}/${artifactRepository.repositoryId}`,
  },
  { provider: githubProvider, deleteBeforeReplace: true },
);
