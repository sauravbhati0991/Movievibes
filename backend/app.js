const express = require("express");
const cors = require("cors");
const apiRouter = require("./Routes/apiRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", apiRouter);

module.exports = app;
