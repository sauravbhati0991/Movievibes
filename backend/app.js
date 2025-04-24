const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./Routes/apiRouter");
const userRouter = require("./Routes/userRouter");
const clientRouter = require("./Routes/clientRouter");

const app = express();

app.use(
  cors({
    origin: ['https://movie-vibes.onrender.com', 'https://movie-vibes.onrender.com/'],
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/apikey", apiRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", clientRouter);

app.use((req, res, next) => {
  if (req.fileValidationError) {
    return res.status(200).json({
      status: "error",
      message: req.fileValidationError,
    });
  }
  next();
});

module.exports = app;
