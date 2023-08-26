import * as pulumi from '@pulumi/pulumi';

export const config = new pulumi.Config();

export const adminProjectId = config.require('adminProjectId');
export const billingAccount = config.require('billingAccount');
export const organizationNumber = config.require('organizationNumber');
