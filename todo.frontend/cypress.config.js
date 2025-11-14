const { defineConfig } = require("cypress");
const codeCoverageTask = require("@cypress/code-coverage/task");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
  },
});
