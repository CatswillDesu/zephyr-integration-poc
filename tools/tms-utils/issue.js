const axios = require('axios');
require('dotenv').config();

const { generateJiraAuthToken } = require('./auth');

const { JIRA_API_URL, ADMIN_EMAIL } = process.env;

async function getIssueByTmsLink(tmsLink) {
  const token = generateJiraAuthToken(ADMIN_EMAIL);
  const response = await axios.get(`${JIRA_API_URL}/issue/${tmsLink}`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
  return response.data;
}

module.exports = {
  getIssueByTmsLink
};
