const btoa = require('btoa');
const ZephyrClient = require('zapi_nodejs');
const axios = require('axios');
require('dotenv').config();

const {
  BASE_URL,
  ACCESS_KEY,
  SECRET_KEY,
  ACCOUNT_ID,
  API_URL,
  JIRA_API_TOKEN
} = process.env;

const jwtClient = new ZephyrClient(
  BASE_URL,
  ACCESS_KEY,
  SECRET_KEY,
  ACCOUNT_ID
);

const generateJwt = (method, route) =>
  jwtClient.generateJWT(method, API_URL + route, 3600);

const generateJiraAuthToken = userEmail =>
  btoa(`${userEmail}:${JIRA_API_TOKEN}`);

module.exports = {
  generateJwt,
  generateJiraAuthToken
};
