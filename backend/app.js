const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./Routes/apiRouter");
const userRouter = require("./Routes/userRouter");
const clientRouter = require("./Routes/clientRouter");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/apikey", apiRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", clientRouter);

module.exports = app;
