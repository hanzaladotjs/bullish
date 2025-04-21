import React from "react";
import { useState, useEffect } from "react";

export const Explore = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        const response = await fetch('http://localhost:3000/api/blogs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      
    };

    useEffect(() => {
      fetchData();
    }, [blogs]);

    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="p-4">
          <h1 className="text-3xl mb-4">Explore All Blogs</h1>
          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <ul>
              {blogs.map((blog) => (
                <li key={blog._id} className="mb-2">
                  {blog.title || 'Untitled'}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}