import * as gcp from '@pulumi/gcp';
import { developers } from './config';
import { project } from './project';
import { provider } from './providers/gcp';

developers.map(
  member =>
    new gcp.projects.IAMMember(
      `${member}-cluster-access`,
      {
        member,
        role: 'roles/run.developer',
        project: project.projectId,
      },
      { provider },
    ),
);
