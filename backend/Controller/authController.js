const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsync = require("../Utilities/catchAsync");
const User = require("../Models/userModel");
const { promisify } = require("util");

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
    sameSite: "None",
  };
  res.cookie("jwt", accessToken, cookieOptions);
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
    res.cookie("jwt", newAccessToken, cookieAccessOptions);
    res.cookie("jwt-refresh-token", newRefreshToken, {
      ...cookieOptions,
      httpOnly: true,
      path: "/api/v1/users/refresh-token",
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
    createAccessAndRefreshToken(newUser, 200, res);
  } else {
    res.status(200).json({
      status: "error",
      data: "exists",
    });
  }
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(200).json({
      status: "error",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ACCESS
    );
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(200).json({
        status: "error",
        message: "The user belonging to this token no longer exists.",
      });
    }

    if (freshUser.changePasswordAfter(decoded.iat)) {
      return res.status(200).json({
        status: "error",
        message: "User recently changed password! Please log in again.",
      });
    }

    req.user = freshUser;
    next();
  } catch (err) {
    return res.status(200).json({
      status: "error",
      message: "Invalid token! Please log in again.",
    });
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(200).json({
        status: "error",
        message: "You do not have permission to perform this action.",
      });
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id).select("+password");
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    res.status(200).json({
      status: "error",
      message: "Your current password is wrong.",
    });
  } else {
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.confirmNewPassword;
    await user.save();
    createAccessAndRefreshToken(user, 200, res);
  }
});
