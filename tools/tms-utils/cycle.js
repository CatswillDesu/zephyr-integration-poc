const axios = require('axios');
require('dotenv').config();

const { generateJwt } = require('./auth');
const { getIssueByTmsLink } = require('./issue');

const { API_URL, ACCESS_KEY } = process.env;

async function showTestCyclesByProject(projectId) {
  const route = `/cycles/search?projectId=${projectId}&versionId=-1`;
  const reqToken = generateJwt('GET', route);

  const response = await axios.get(API_URL + route, {
    headers: {
      Authorization: 'JWT ' + reqToken,
      zapiAccessKey: ACCESS_KEY
    }
  });

  console.log(response.data);
}

(async () => {
  const PROJECT_ISSUE_KEY = 'ZT-6';
  const {
    fields: {
      project: { id: projectId }
    }
  } = await getIssueByTmsLink(PROJECT_ISSUE_KEY);

  showTestCyclesByProject(projectId);
})();
