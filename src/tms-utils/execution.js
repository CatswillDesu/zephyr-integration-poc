const axios = require('axios');

const { ACCESS_KEY, API_URL } = require('./const')
const { generateJwt } = require('./auth')
const { getIssueByTmsLink } = require('./issue')

async function createExecution(tmsLink) {
  const { data: { id: issueId } } = await getIssueByTmsLink(tmsLink);
  console.log(issueId)
}

createExecution('ZT-1')