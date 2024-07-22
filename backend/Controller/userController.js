const catchAsync = require("../Utilities/catchAsync");
const User = require("../Models/userModel");
const APIFeatures = require("../Utilities/apiFeatures");

exports.getOne = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    res.status(200).json({
      status: "error",
      message: "No User found with this ID.",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  }
});

exports.createOne = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(200).json({
      status: "error",
      message: "No user found with this id.",
    });
  } else {
    res.status(204).json({
      status: "success",
      data: {
        data: null,
      },
    });
  }
});

exports.UpdateOne = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(200).json({
      status: "error",
      message: "No user found with this id.",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  }
});

exports.getAll = catchAsync(async (req, res, next) => {
  let filter = {};
  const features = new APIFeatures(User.find(filter), req.query)
    .filter()
    .sort()
    .limiting()
    .pagination()[0];
  const users = await features.query;
  res.status(200).json({
    status: "success",
    page: new APIFeatures(User.find(), req.query).pagination()[1] || 1,
    results: users.length,
    data: {
      data: users,
    },
  });
});
