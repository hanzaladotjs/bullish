"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogschema_1 = require("../models/blogschema");
const auth_1 = require("./auth");
const router = express_1.default.Router();
// all
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogschema_1.Blog.find();
    res.json(blogs);
}));
// create new
router.post("/new", auth_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, content } = req.body;
        if (!title || !description || !content) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const blog = new blogschema_1.Blog({
            title,
            description,
            content,
            author: req.body._userId
        });
        yield blog.save();
        res.status(201).json({ message: "Blog created successfully", blog });
    }
    catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
// gimme blog by id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogschema_1.Blog.findById(req.params.id).populate("author", "username");
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        res.json(blog);
    }
    catch (_a) {
        res.status(500).json({ message: "Server error" });
    }
}));
// update blog by id
router.put("/:id", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, content } = req.body;
        if (!title || !description || !content) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const blog = yield blogschema_1.Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        if (blog.author.toString() !== req.body._userId) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        blog.title = title;
        blog.description = description;
        blog.content = content;
        yield blog.save();
        res.json(blog);
    }
    catch (_a) {
        res.status(500).json({ message: "Server error" });
    }
}));
router.delete("/:id", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check existence and authorization before deletion
        const blog = yield blogschema_1.Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        if (blog.author.toString() !== req.body._userId) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        // Perform the delete operation
        yield blogschema_1.Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted" });
    }
    catch (_a) {
        res.status(500).json({ message: "Server error" });
    }
}));
exports.default = router;
