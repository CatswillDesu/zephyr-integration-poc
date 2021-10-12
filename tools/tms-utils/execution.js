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

// (async () => {
//   const {
//     data: {
//       id: issueId,
//       fields: {
//         project: { id: projectId }
//       }
//     }
//   } = await getIssueByTmsLink('ZT-1');

//   const { id: executionId } = await createExecution(
//     issueId,
//     projectId,
//     DEMO_CYCLE_ID
//   );

//   const updateData = {
//     status: {
//       id: 2
//     }
//   };

//   try {
//     const execution = await updateExecutionsCustomField(
//       executionId,
//       EXECUTION_DETAILS_FIELD_ID,
//       '432432ilkhmlkm fm lkgmkfdmg k lkmfpdmglfdg kfmgkdfglfd,gl;fd,'
//     );
//   } catch (e) {
//     console.log(e);
//   }
//   const execution = await updateExecution(
//     executionId,
//     issueId,
//     projectId,
//     DEMO_CYCLE_ID,
//     updateData
//   );
//   console.log(execution);
// })();

// (async () => {
//   const route = '/cycles/search?projectId=10001&versionId=-1';
//   const dToken = generateJwt('GET', route);
//   try {
//     const d = await axios.get(API_URL + route, {
//       headers: {
//         Authorization: 'JWT ' + dToken,
//         zapiAccessKey: ACCESS_KEY
//       }
//     });
//     console.log(d);
//   } catch (e) {
//     console.log(e);
//   }
// })();

module.exports = {
  createExecution,
  updateExecution
};
