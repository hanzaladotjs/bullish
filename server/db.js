"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
mongoose_1.default.connect(process.env.connection_string).then(function () {
    console.log("Connected to MongoDB");
});
