const express = require("express");
const authController = require("../Controller/authController");
const clientController = require("../Controller/clientController");
const userController = require("../Controller/userController");
const Router = express.Router();

Router.use(authController.protect);

Router.route("/client").get(clientController.getClientPage);
Router.route("/myprofile").get(userController.getMe, userController.getOne);

module.exports = Router;
