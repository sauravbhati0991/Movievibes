const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsync = require("../Utilities/catchAsync");
const User = require("../Models/userModel");

const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};
const signRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const createAccessAndRefreshToken = async (user, statusCode, res) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };
  res.cookie("jwt-access-token", accessToken, cookieOptions);
  res.cookie("jwt-refresh-token", refreshToken, {
    ...cookieOptions,
    httpOnly: true,
    path: "/api/v1/Users/refresh-token",
  });
  user.password = undefined;
  user.refreshToken = undefined;
  res.status(statusCode).json({
    status: "success",
    accessToken,
    refreshToken,
    data: {
      user,
    },
  });
};

exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookie || req.body;
  const user = await User.findOne({ refreshToken }).select("+refreshToken");
  if (!refreshToken) {
    res.status(200).json({
      status: "error",
      message: "No refresh token proviede.",
    });
  } else if (!user) {
    res.status(200).json({
      status: "error",
      message: "Invalid Refresh Token.",
    });
  } else {
    const newAccessToken = signAccessToken(user._id);
    const newRefreshToken = signRefreshToken(user._id);
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    };
    res.cookie("jwt-access-token", newAccessToken, cookieAccessOptions);
    res.cookie("jwt-refresh-token", newRefreshToken, {
      ...cookieOptions,
      httpOnly: true,
      path: "/api/v1/Users/refresh-token",
    });
    res.status(200).json({
      status: "Success",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      data: {
        user,
      },
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(200).json({
      status: "error",
      message: "Incorrect email or password.",
    });
  } else {
    createAccessAndRefreshToken(user, 200, res);
  }
});

exports.signup = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    createAccessAndRefreshToken(newUser, 200, res);
  } else {
    res.status(200).json({
      status: "error",
      data: "Exists",
    });
  }
});
