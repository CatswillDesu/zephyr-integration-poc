const btoa = require('btoa')
const ZypherClient = require('zapi_nodejs');

const { BASE_URL, ACCESS_KEY, SECRET_KEY, ACCOUNT_ID, API_URL, JIRA_API_TOKEN } = require('./const')

const jwtClient = new ZypherClient(
  BASE_URL,
  ACCESS_KEY,
  SECRET_KEY,
  ACCOUNT_ID
);

const generateJwt = (method, route) =>
  jwtClient.generateJWT(
    method,
    (API_URL + route),
    5000
  );

const generateJiraAuthToken = (userEmail) => btoa(`${userEmail}:${JIRA_API_TOKEN}`);

module.exports = {
  generateJwt,
  generateJiraAuthToken
};
