const express = require("express");
const authController = require("../Controller/authController");
const userController = require("../Controller/userController");
const Router = express.Router();

Router.route("/login").post(authController.login);
Router.route("/signup").post(authController.signup);
Router.route("/refresh-token").post(authController.refreshToken);

Router.route("/").get(userController.getAll).post(userController.createOne);
Router.route("/:id")
  .get(userController.getOne)
  .patch(userController.UpdateOne)
  .delete(userController.deleteOne);

module.exports = Router;
