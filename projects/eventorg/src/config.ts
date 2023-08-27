import * as pulumi from '@pulumi/pulumi';

export const config = new pulumi.Config();

export const billingAccount = config.require('billingAccount');
export const organizationNumber = config.require('organizationNumber');
export const projectId = config.require('projectId');
export const region = config.require('region');
export const zone = config.require('zone');
