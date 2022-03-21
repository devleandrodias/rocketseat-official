const serveless = require("serverless-http");

const app = require("./app");

const handler = serveless(app);

module.exports = { handler };
