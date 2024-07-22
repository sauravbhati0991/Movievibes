const express = require("express");
const cors = require("cors");
const apiRouter = require("./Routes/apiRouter");
const userRouter = require("./Routes/userRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/apikey", apiRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
