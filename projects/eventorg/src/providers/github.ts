import * as github from '@pulumi/github';
import { gitHubToken } from '../stack-refs';

export const provider = new github.Provider('eventorg', {
  owner: 'klyngeorg',
  token: gitHubToken,
});
