const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const dbPath = path.join(
  __dirname,
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
);
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/product/", async (request, response) => {
  const getTransactions = `
    SELECT
    *
    FROM
      transaction
    WHERE
    title="product"`;
  const array = await db.all(getTransactions);
  response.send(getTransactions);
});
