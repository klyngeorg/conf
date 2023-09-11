import './iam';
import './project';
import './api-services';
import './artifact-registry';
import { IdentityPoolGithubSetup } from './identity-pool';
import { provider as gcpProvider } from './providers/gcp';
import { provider as githubProvider } from './providers/github';
import { deploymentServiceAccount } from './service-account';

new IdentityPoolGithubSetup(
  'eventorg',
  {
    repo: 'eventorg',
    owner: 'klyngeorg',
    serviceAccount: deploymentServiceAccount,
  },
  { providers: [gcpProvider, githubProvider] },
);
