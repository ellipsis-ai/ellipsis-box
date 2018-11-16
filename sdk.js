"use strict";

const BoxSDK = require('box-node-sdk');

module.exports = (ellipsis, configJsonString, enterpriseId) => {
  const jsonString = configJsonString || ellipsis.env.BOX_CONFIG;
  const enterpriseIdToUse = enterpriseId || ellipsis.env.BOX_APP_ENTERPRISE_ID;
  const errors = [];
  if (!jsonString) {
    errors.push("No Box configuration found. Set ellipsis.env.BOX_CONFIG or pass it in as the second parameter.");
  }
  if (!enterpriseIdToUse) {
    errors.push("No Box enterprise ID set. Set ellipsis.env.BOX_APP_ENTERPRISE_ID or pass it in as the third parameter.");
  }
  if (errors.length > 0) {
    throw new Error(`Error initializing Box:\n- ${errors.join("\n -")}`);
  }
  const configJSON = JSON.parse(jsonString);
  const sdk = BoxSDK.getPreconfiguredInstance(configJSON);
  return sdk.getAppAuthClient('enterprise', enterpriseIdToUse);
}
