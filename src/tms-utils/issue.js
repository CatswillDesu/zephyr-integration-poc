const axios = require('axios')

const { JIRA_API_URL, ADMIN_EMAIL } = require('./const')
const { generateJiraAuthToken } = require('./auth')

async function getIssueByTmsLink(tmsLink) {
  const token = generateJiraAuthToken(ADMIN_EMAIL);
  return await axios.get(`${JIRA_API_URL}/issue/${tmsLink}`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  })
}

module.exports = {
  getIssueByTmsLink
}