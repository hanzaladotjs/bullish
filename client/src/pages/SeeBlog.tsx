import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const SeeBlog = () => {
  const [blog, setBlog] = useState<any>([]);
  const { id } = useParams<{ id: string }>();

  const fetchBlog = async () => {
    const response = await fetch(`localhost:3000/api/blogs/${id}`);

    const data = await response.json();

    setBlog(data);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className=" flex justify-center items-center h-80">
      <div className="p-4 max-w-screen prose">
        <div className="text-4xl text-center p-5 border rounded-4xl hover:bg-white break-words">{blog.title}  </div>
        <div className="text-2xl text-center p-5 underline break-words">{blog.description}</div>
        <div className="text-xl break-words">{blog.content} </div>
    </div>
    </div>
  );
};
