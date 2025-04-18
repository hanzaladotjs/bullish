import express, { NextFunction } from "express";
import { Blog } from "../models/blogschema";
import { user } from "../models/userschema";
import { Request, Response } from "express";
import { authMiddleware } from "./auth";
import * as mongoose from "mongoose";


const router = express.Router();

// all

router.get("/", async (req: Request, res: Response): Promise<any> => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// create new

router.post(
  "/new",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction)=> {
    try {
      const { title, description, content } = req.body;

      if (!title || !description || !content) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const blog = new Blog({
        title,
        description,
        content,
        author: req.body._userId
      });
      await blog.save();
      res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// gimme blog by id
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const blog = await Blog.findById(req.params.id).populate("author", "username");
      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }
      res.json(blog);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  });

// update blog by id

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      const { title, description, content } = req.body;
      if (!title || !description || !content) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const blog = await Blog.findById(req.params.id);
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
      await blog.save();
      res.json(blog);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  });


  router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      // Check existence and authorization before deletion
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
      }
      if (blog.author.toString() !== req.body._userId) {
        res.status(403).json({ message: "Not authorized" });
        return;
      }
  
      // Perform the delete operation
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ message: "Blog deleted" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  });
 


  

export default router;