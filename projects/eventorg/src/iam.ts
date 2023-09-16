import * as gcp from '@pulumi/gcp';
import { developers } from './config';
import { project } from './project';
import { provider } from './providers/gcp';
import { deploymentServiceAccount } from './service-account';

developers.map(
  member =>
    new gcp.projects.IAMMember(
      `${member}-editor-access`,
      {
        member,
        role: 'roles/editor',
        project: project.projectId,
      },
      { provider },
    ),
);

new gcp.projects.IAMMember(
  'cloud-run-access',
  {
    member: deploymentServiceAccount.email.apply(
      email => `serviceAccount:${email}`,
    ),
    role: 'roles/run.admin',
    project: project.projectId,
  },
  { provider },
);

const defaultServiceAccount = gcp.compute.getDefaultServiceAccount(
  {},
  { provider },
);

new gcp.serviceaccount.IAMMember(
  'act-as-access',
  {
    member: deploymentServiceAccount.email.apply(
      email => `serviceAccount:${email}`,
    ),
    role: 'roles/iam.serviceAccountUser',
    serviceAccountId: defaultServiceAccount.then(account => account.id),
  },
  { provider },
);
