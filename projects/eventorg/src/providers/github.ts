import * as github from '@pulumi/github';

export const provider = new github.Provider('eventorg', {
  owner: 'klyngeorg',
});
