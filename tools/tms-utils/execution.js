const axios = require('axios');
require('dotenv').config();

const { generateJwt } = require('./auth');

const { ACCESS_KEY, API_URL } = process.env;

async function createExecution(issueId, projectId, cycleId) {
  const reqBody = {
    projectId,
    issueId,
    versionId: -1,
    cycleId,
    assigneeType: 'currentUser'
  };
  const reqToken = generateJwt('POST', '/execution');

  const response = await axios.post(`${API_URL}/execution`, reqBody, {
    headers: {
      Authorization: 'JWT ' + reqToken,
      zapiAccessKey: ACCESS_KEY
    }
  });

  console.log(response.data.execution.id);
  return response.data.execution;
}

async function updateExecution(
  executionId,
  issueId,
  projectId,
  cycleId,
  updateData
) {
  const route = `/execution/${executionId}`;
  const reqToken = generateJwt('PUT', route);
  const response = await axios.put(
    API_URL + route,
    {
      issueId,
      projectId,
      cycleId,
      versionId: -1,
      ...updateData
    },
    {
      headers: {
        Authorization: 'JWT ' + reqToken,
        zapiAccessKey: ACCESS_KEY
      }
    }
  );

  return response.data.execution;
}

async function updateExecutionsCustomField(
  executionId,
  customFieldId,
  updateValue
) {
  const route = `/executions/${executionId}/customField`;
  const reqToken = generateJwt('PUT', route);

  const response = await axios.put(
    API_URL + route,
    {
      customFieldId,
      value: updateValue
    },
    {
      headers: {
        Authorization: 'JWT ' + reqToken,
        zapiAccessKey: ACCESS_KEY
      }
    }
  );

  return response.data;
}

module.exports = {
  createExecution,
  updateExecution
};
