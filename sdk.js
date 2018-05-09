"use strict";

const BoxSDK = require('box-node-sdk');

module.exports = ellipsis => {
  const configJSON = JSON.parse(ellipsis.env.BOX_CONFIG);
  const sdk = BoxSDK.getPreconfiguredInstance(configJSON);
  return sdk.getAppAuthClient('enterprise', ellipsis.env.BOX_APP_ENTERPRISE_ID);
}
