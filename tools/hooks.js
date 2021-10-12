const { getIssueByTmsLink } = require('./tms-utils/issue');
const { createExecution, updateExecution } = require('./tms-utils/execution');
const { clearLogFromAnsiColors } = require('./helpers');
require('dotenv').config();

const { DEMO_CYCLE_ID } = process.env;

global.afterEach(writeResultsToZephyr);

async function writeResultsToZephyr() {
  const state = expect.getState();
  if (!state.tmsLink) return;
  console.log('IN THE HOOK');
  const {
    id: issueId,
    fields: {
      project: { id: projectId }
    }
  } = await getIssueByTmsLink(state.tmsLink);

  const { id: executionId } = await createExecution(
    issueId,
    projectId,
    DEMO_CYCLE_ID
  );

  const executionStatus = state.failed ? 2 : 1;

  await updateExecution(executionId, issueId, projectId, DEMO_CYCLE_ID, {
    status: {
      id: executionStatus
    }
  });

  // if (state.failed) {
  //   const testDetailsText = clearLogFromAnsiColors(state.errorMessage)
  // }
}
