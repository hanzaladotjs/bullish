import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const SeeBlog = () => {
  const [blog, setBlog] = useState<any>([]);
  const {id} = useParams<{id: string}>()

  const fetchBlog = async () => {
    const response = await fetch(`localhost:3000/api/blogs/${id}`)

    const data = await response.json()

    setBlog(data)
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div>
      <div>{blog.title} hi</div>
      <div>{blog.description} abc</div>
      <div>{blog.content} yoyo</div>
    </div>
  );
};
