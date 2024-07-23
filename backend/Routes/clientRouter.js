const express = require("express");
const authController = require("../Controller/authController");
const clientController = require("../Controller/clientController");
const Router = express.Router();

Router.use(authController.protect);

Router.route("/movies").get(clientController.getClientPage);
Router.route("/movies/:id").get(clientController.getClientPage);
Router.route("/tvshows").get(clientController.getClientPage);
Router.route("/tvshows/:id").get(clientController.getClientPage);
Router.route("/peoples").get(clientController.getClientPage);
Router.route("/peoples/:id").get(clientController.getClientPage);

module.exports = Router;
