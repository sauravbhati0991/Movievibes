const express = require("express");
const apiController = require("../Controller/apiController");
const Router = express.Router();

Router.route("/").get(apiController.getApiKey);

module.exports = Router;
