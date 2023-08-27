import * as gcp from '@pulumi/gcp';
import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import { provider } from './providers/legacy-gcp';

const identityPool = new gcp.iam.WorkloadIdentityPool(
  'main-github',
  {
    disabled: false,
    workloadIdentityPoolId: 'main-github',
  },
  { provider },
);

export const identityPoolProvider = new gcp.iam.WorkloadIdentityPoolProvider(
  'main-github',
  {
    workloadIdentityPoolId: identityPool.workloadIdentityPoolId,
    workloadIdentityPoolProviderId: 'main-github',
    oidc: {
      issuerUri: 'https://token.actions.githubusercontent.com',
    },
    attributeMapping: {
      'google.subject': 'assertion.sub',
      'attribute.actor': 'assertion.actor',
      'attribute.repository': 'assertion.repository',
    },
  },
  { provider },
);

export interface IdentityPoolGithubArgs {
  repo: pulumi.Input<string>;
  owner: pulumi.Input<string>;
  serviceAccount: gcp.serviceaccount.Account;
}

export const getIdentityPoolMember = (
  owner: pulumi.Input<string>,
  repo: pulumi.Input<string>,
): pulumi.Output<string> =>
  pulumi.interpolate`principalSet://iam.googleapis.com/${identityPool.name}/attribute.repository/${owner}/${repo}`;

export class IdentityPoolGithubSetup extends pulumi.ComponentResource {
  constructor(
    name: string,
    args: IdentityPoolGithubArgs,
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super('klyngeorg:github:IdentityPoolGithub', name, args, opts);
    const { repo, owner, serviceAccount } = args;

    new gcp.serviceaccount.IAMMember(
      `iam-workload-${name}`,
      {
        serviceAccountId: serviceAccount.id,
        role: 'roles/iam.workloadIdentityUser',
        member: getIdentityPoolMember(owner, args.repo),
      },
      { parent: this, provider, deleteBeforeReplace: true },
    );

    new gcp.serviceaccount.IAMMember(
      `iam-infra-token-${name}`,
      {
        serviceAccountId: serviceAccount.id,
        role: 'roles/iam.serviceAccountTokenCreator',
        member: getIdentityPoolMember(owner, args.repo),
      },
      { parent: this, provider, deleteBeforeReplace: true },
    );

    new github.ActionsSecret(
      `${name}-google-service-accuont`,
      {
        repository: repo,
        secretName: 'GOOGLE_SERVICE_ACCOUNT',
        plaintextValue: serviceAccount.email,
      },
      { parent: this, deleteBeforeReplace: true },
    );

    new github.ActionsSecret(
      `${name}-identity-provider`,
      {
        repository: repo,
        secretName: 'WORKLOAD_IDENTITY_PROVIDER',
        plaintextValue: identityPoolProvider.name,
      },
      { parent: this, deleteBeforeReplace: true },
    );
  }
}
