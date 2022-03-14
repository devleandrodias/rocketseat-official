const { v4: uuidv4 } = require("uuid");
const express = require("express");

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountByCpf(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((x) => x.cpf === cpf);

  req.customer = customer;

  !customer ? res.status(400).json({ message: "Customer not found" }) : next();
}

function getBalance(statement) {
  return statement.reduce((pv, cv) => {
    if (cv.type === "Credit") {
      return pv + cv.amount;
    } else {
      return pv - cv.amount;
    }
  }, 0);
}

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const customer = { id: uuidv4(), cpf, name, statement: [] };

  const customerAlreadyExists = customers.some((x) => x.cpf === cpf);

  if (customerAlreadyExists) {
    res.status(400).send({ message: "Customer already exists!" });
  }

  customers.push(customer);

  res.status(201).send();
});

app.get("/account", (_, res) => {
  res.status(200).json(customers);
});

app.use(verifyIfExistsAccountByCpf);

app.get("/account/statement", verifyIfExistsAccountByCpf, (req, res) => {
  res.status(200).json(customers.find((x) => x.cpf === req.customer.cpf));
});

app.get("/account/statement/date", (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (x) => x.createdAt.toDateString() === new Date(dateFormat).toDateString()
  );

  res.json(statement);
});

app.get("/account/balance", (req, res) => {
  res.json({ balance: getBalance(req.customer.statement) });
});

app.post("/account/deposit", (req, res) => {
  const { customer } = req;

  const { description, amount } = req.body;

  const operation = {
    amount,
    description,
    type: "Credit",
    createdAt: new Date(),
  };

  customer.statement.push(operation);

  res.status(200).send();
});

app.post("/account/withdraw", (req, res) => {
  const { customer } = req;
  const { amount } = req.body;
  const balance = getBalance(customer.statement);

  if (balance < amount) {
    res.status(400).json({ error: "Insufficient funds!" });
  } else {
    const operation = {
      amount,
      type: "Debit",
      createAt: new Date(),
    };

    customer.statement.push(operation);

    res.status(200).send();
  }
});

app.put("/account", (req, res) => {
  const { customer } = req;
  const { name } = req.body;
  customer.name = name;
  res.status(204).send();
});

app.delete("/account", (req, res) => {
  const { customer } = req;
  customers.splice(customer, 1);
  res.status(200).json(customers);
});

app.listen(3000, () => {
  console.log("Server is running");
});
