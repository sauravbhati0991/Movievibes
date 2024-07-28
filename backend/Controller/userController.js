const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../Utilities/catchAsync");
const User = require("../Models/userModel");
const APIFeatures = require("../Utilities/apiFeatures");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    req.fileValidationError = "Not an image! Please upload only images.";
    return cb(null, false);
  }
};
exports.validator = (req, res, next) => {
  if (req.fileValidationError) {
    res.status(200).json({
      status: "error",
      message: req.fileValidationError,
    });
  } else next();
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploaduserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.body.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`../frontend/public/images/${req.file.filename}`);
  next();
});

const filterObj = (obj, ...alloedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (alloedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(200).json({
      status: "error",
      message: "User ID is required.",
    });
  }
  if (req.body.password || req.body.passwordConfirm) {
    res.status(200).json({
      status: "error",
      message: "This Option is not for password change.",
    });
    return;
  }
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;
  const updateduser = await User.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updateduser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findByIdAndUpdate(id, { active: false });
  res.status(200).json({
    status: "success",
    data: null,
  });
});
