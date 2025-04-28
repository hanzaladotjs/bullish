import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="p-4">
          <h1 className="text-3xl mb-4 text-black">hey! explorer</h1>
          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <ul>
              {blogs.map((blog) => (
                <li key={blog._id} className="mb-2 border p-5 hover:bg-black">
            <Link to={`/${blog._id}`}>
            
                {blog.title}
            </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}