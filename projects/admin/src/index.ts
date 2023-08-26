import { IdentityPoolGithubSetup } from './identity-pool';
import { provider as legacyGcpProvider } from './providers/legacy-gcp';
import { provider as githubProvider } from './providers/github';
import { serviceAccount } from './service-account';

new IdentityPoolGithubSetup(
  'conf',
  {
    repo: 'conf',
    owner: 'klyngeorg',
    serviceAccount: serviceAccount,
  },
  { providers: [legacyGcpProvider, githubProvider] },
);
