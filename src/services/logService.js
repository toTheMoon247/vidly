// import * as Sentry from "@sentry/react";

function init() {
  // Sentry.init({
  //   dsn: "https://eb0e6de67fda45a1a0e1685116e66dea@o513322.ingest.sentry.io/5614991",
  //   release: '1-0-0',
  //   environment: 'test'
  // });
}

function log(error) {
  console.log('This log is just going to the console.');
  // Sentry.captureMessage("New Test");
  // Sentry.captureException(error);
}

export default {
  init,
  log
};
