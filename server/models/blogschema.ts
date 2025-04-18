import * as mongoose from "mongoose";

export interface IBlog extends mongoose.Document {
  title: string;
  description: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
}

const blogSchema = new mongoose.Schema<IBlog>({
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

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
