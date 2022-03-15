const failWhen = (percent) => () => {
  console.log(`Eu tenho ${100 * percent}% de chance de falhar`);

  return Math.random() < percent
    ? Promise.reject(new Error("Eu falhei"))
    : Promise.resolve("Funcionou!");
};

const shoudHalt = (retries, attempt) => {
  return attempt >= retries;
};

const delay = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// Full Jitter (DynamoDB)
const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const addJitter = (backoff) => randomBetween(0, backoff);

const calculateBackoff = ({ minDelay, maxDelay, factor, jitter }, attempt) => {
  const attemptBackoff = minDelay * factor ** attempt;
  const backoff = Math.min(attemptBackoff, maxDelay);
  const jitterBackoff = jitter ? addJitter(backoff) : backoff;

  console.debug({ backoff, jitterBackoff });

  return jitterBackoff;
};

const invokeAction = (config, action, args, attempt) =>
  action(...args).catch((err) =>
    shoudHalt(config.retries, attempt)
      ? // Atingiu número máximo de tentativas? Sobe o erro
        Promise.reject(err)
      : // Não atingiu? Tenta novamente
        delay(calculateBackoff(config, attempt)).then(
          invokeAction(config, action, args, attempt + 1)
        )
  );

/**
 * action (...) => Promise<?>
 * config: retries, minDelay, maxDelay, factor
 */
const retry =
  (config, action) =>
  (...args) =>
    invokeAction(config, action, args, 0);

const invocarSericoDeCompra = failWhen(0.7);

const invocarSericoDeCompraComRetry = retry(
  { retries: 15, minDelay: 100, maxDelay: 500, factor: 2, jitter: true },
  invocarSericoDeCompra
);

invocarSericoDeCompraComRetry().then(console.log).catch(console.error);
