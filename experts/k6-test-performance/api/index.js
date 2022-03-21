const app = require("./app");

const port = 3000;

app
  .listen(port)
  .once("listening", () => {
    console.log(`Server listening at ${3000}`);
  })
  .once("error", (err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
