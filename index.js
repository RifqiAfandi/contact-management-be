require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cors = require("cors");

const router = require("/routes");
const morgan = require("morgan");
const expressEjsLayouts = require("express-ejs-layouts");
const { Model } = require("sequelize");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use("view-engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", "layouts");

app.use("/api", router);

module.exports = app;