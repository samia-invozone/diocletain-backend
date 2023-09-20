const express = require("express");

const path = require("path");

const Joi = require("joi");

const cron = require("node-cron");

const indexRoutes = require("./routes");

const db = require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
