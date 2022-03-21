import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Counter } from "k6/metrics";

//#region Config
const config = {
  BASE_URL: __ENV.BASE_URL || "http://localhost:3000",
  POSSIBLE_NAMES: [
    "Leandro",
    "Thaisa",
    "Beatriz",
    "Gustavo",
    "Joao",
    "Marcelo",
  ],
};

//#endregion

//#region Helpers
const randomElement = (xs) => {
  return xs[Math.floor(Math.random() * xs.length)];
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
//#endregion

//#region Checks
const checks = (response) => {
  check(response, {
    "response type is json": (r) =>
      r.headers["Content-Type"] &&
      r.headers["Content-Type"].startsWith("application/json"),
    "response body has greet": (r) => r.json("greet"),
    "response is success": (r) => r.status === 200,
  });
};

//#endregion

//#region Metrics
const IODuration = new Trend("x_request_delay");
const ServerErrors = new Counter("server_errors");

const report = (response) => {
  const durationHeader = response.headers["X-Request-Delay"];

  const duration = parseFloat(durationHeader);

  if (duration) {
    IODuration.add(duration);
  }

  if (response.status >= 500 && response.status < 600) {
    ServerErrors.add(1);
  }

  return response;
};

//#endregion

//#region Request
const get = ({ name, delay } = {}) => {
  const nameParam = name || "";
  const delayParam = delay || 0;
  const url = `${config.BASE_URL}/hello/${nameParam}?delay=${delayParam}`;
  const response = http.get(url);
  return checks(report(response));
};

//#endregion

//#region Options
export const options = {
  // stages: [
  //   { target: 1, duration: "5s" },
  //   { target: 2, duration: "5s" },
  // ],
  scenarios: {
    root: buildScenario("rootRequest", "0"),
    named: buildScenario("namedRequest", "18m"),
    expensive: buildScenario("expensiveRequest", "36m"),
  },
  thresholds: {
    server_errors: ["count<=5"],
    x_request_delay: ["p(95)<=100"],
  },
};

const buildScenario = (exec, startTime) => ({
  exec,
  startTime,
  executor: "ramping-arrival-rate",
  preAllocateVUs: 10,
  maxVUs: 20,
  timeunit: "1m",
  startRate: 100,
  stages: [
    {
      target: 100,
      duration: "5m",
    },
    {
      target: 200,
      duration: "5m",
    },
    {
      target: 100,
      duration: "5m",
    },
    {
      target: 0,
      duration: "2m",
    },
  ],
});

//#endregion

//#region Executions
export default () => {
  // const BASE_URL = "http://localhost:3000";
  // const response = http.get(`${BASE_URL}/hello?delay=200`);
  // checks(report(response));

  get();
  sleep(randomInt(1, 2));

  get({ name: randomElement(config.POSSIBLE_NAMES) });
  sleep(randomInt(1, 2));

  get({
    name: randomElement(config.POSSIBLE_NAMES),
    delay: randomInt(100, 500),
  });
};

//#endregion
