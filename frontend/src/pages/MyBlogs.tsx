import React, { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from '../hooks/hoc';
import { BACKEND_URL } from '../config';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchBlogs = async () => {
          try {
              console.log('Fetching blogs...');
              const response = await axios.get(`${BACKEND_URL}/blog/myblogs`, {
                  headers: {
                      Authorization: `${localStorage.getItem('token')}`,
                  },
              });
              console.log('API Response:', response.data);
              
              setBlogs(response.data.blogs || []);
              console.log('Blogs state after setting:', blogs);

              // GSAP animation for cards
              gsap.fromTo(".blog-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
          } catch (err) {
              console.error('Error fetching blogs:', err);
              setError("Failed to fetch blogs");
          }
      };

      fetchBlogs();
  }, []);

  console.log('Current blogs state:', blogs);

  if (error) {
      return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
      <div className="container mx-auto p-4 relative">
          {/* Back Button */}
          <button 
              onClick={() => navigate(-1)} 
              className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
              <FaArrowLeft  className="text-gray-700" />
          </button>

          <h1 className="text-3xl font-bold text-center mb-8">My Blogs</h1>
          {Array.isArray(blogs) && blogs.length === 0 ? (
              <p className="text-center text-gray-500">No blogs found</p>
          ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.isArray(blogs) && blogs.map((blog) => (
                      <Link to={`/blog/${blog.id}`} key={blog.id}>
                          <div 
                              className="blog-card bg-[#f1f4f1] shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105"
                          >
                              <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>
                              <p className="text-gray-700 mb-4">{blog.content}</p>
                              {/* <p className="text-sm text-gray-500">Author: {blog.author.username}</p> */}
                              <p className="text-sm text-gray-500">Date: {new Date(blog.date).toLocaleDateString()}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          )}
      </div>
  );
};

export default withAuth(MyBlogs);