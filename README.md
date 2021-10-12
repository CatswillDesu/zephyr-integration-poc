# Prerequisites to make project up and running:

## Fill in .env variables with your own data

- Create new .env file in project direcory folder and check .env.example

1. Navigate to project's zephyr squad section and get API Keys (ACCESS and SECRET keys)
2. To get ACCOUNT_ID you have to click on your profle icon and then click "Profile" button. account's id will be displayed in page's url.
3. In order to get JIRA_API_TOKEN go to "https://id.atlassian.com/manage-profile/security/api-tokens" page and create the token.
4. ADMIN_EMAIL variable should be filled with you atlassian account's email (admin permissions is required at project).
5. Replace marked JIRA_API_URL part with your jira peronsal cloud domain
6. Also you are going to need DEMO_CYCLE_ID variable. You can get it following steps below.

- Create new test cycle you want automated tests to execute in.
- Go to "/tools/tms-utils/cycle.js" file and replace PROJECT_ISSUE_KEY with any issue key of the project you want to integrate test executions to.
- run "node ./tools/tms-utils/cycle.js" command in terminal and you will see project cycle's data in console.
- Pick cycle you need and place it's ID into DEMO_CYCLE_ID env variable.

7. (NOT REQUIRED). To get TEST_DETAILS_FIELD_ID follow those steps:

- Navigate 'Settings -> Apps', then click "Custom Fields" in "ZEPHYR SQUAD" navbar section.
- Open your networks tab in your browser developer tools.
- Create new custom field of multi-line text field type.
- You will see "customField" request item in network tab, open its conetnts and wou will find "id" property that you need.
- Place it in .env TEST_DETAILS_FIELD_ID variable.

### To link tests with your poject you need to create two issues with zephyr's "test" issue type and replace "tmsLink" state field in "src/test/" test files
