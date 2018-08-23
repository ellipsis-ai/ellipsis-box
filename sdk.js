"use strict";

const BoxSDK = require('box-node-sdk');

module.exports = (ellipsis, configJsonString, enterpriseId) => {
  const configJSON = JSON.parse(configJsonString || ellipsis.env.BOX_CONFIG);
  const sdk = BoxSDK.getPreconfiguredInstance(configJSON);
  return sdk.getAppAuthClient('enterprise', enterpriseId || ellipsis.env.BOX_APP_ENTERPRISE_ID);
}
