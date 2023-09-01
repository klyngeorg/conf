import * as pulumi from '@pulumi/pulumi';

const bjerkConf = new pulumi.StackReference('branches/branches-main/main');

export const gitHubToken = pulumi.secret(
  bjerkConf.requireOutput('githubToken'),
);
