const ZypherClient = require('zapi_nodejs');

const BASE_URL = 'https://prod-play.zephyr4jiracloud.com/connect';
const ACCESS_KEY =
  'NDkzYWFhYjMtYWRhMC0zZTY2LTlmYmUtNmU4NWQ4M2EyZTFkIDYxNWQ5N2U5MDQ4MzYwMDA2YTU1ZTZiNiBVU0VSX0RFRkFVTFRfTkFNRQ';
const SECRET_KEY = 'QcpWlmwgqx7sXMzO_9ONeU0bvDcZG30GrpJQyCE4LVM';
const ACCOUNT_ID = '615d97e9048360006a55e6b6';

const jwtClient = new ZypherClient(
  BASE_URL,
  ACCESS_KEY,
  SECRET_KEY,
  ACCOUNT_ID
);

const generateJwt = (method, relativeUrl) =>
  jwtClient.generateJWT(
    method,
    `https://prod-api.zephyr4jiracloud.com/${relativeUrl}`,
    5000
  );

module.exports = {
  generateJwt,
};
