"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});
exports.Blog = mongoose.model("Blog", blogSchema);
