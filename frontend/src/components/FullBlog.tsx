import React, { useEffect } from 'react';
import { Blog } from "../hooks";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { gsap } from 'gsap';

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate();
    console.log(blog);

    const dateToDisplay = blog.date 
        ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
        : 'Unknown Date';

    useEffect(() => {
        // GSAP animation for content fade-in and slide-up
        gsap.fromTo(".blog-content", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
    }, []);

    return (
        <div className="relative mx-auto lg:w-[70%]">
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shadow-lg z-10"
            >
                <FaArrowLeft className="text-gray-700 text-xl" />
            </button>

            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 my-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2 blog-content bg-white shadow-xl rounded-lg p-8 md:p-12">
                        <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
                        <p className="text-gray-600 mb-4">Posted on {dateToDisplay}</p>
                        <div className="text-gray-800 leading-relaxed">
                            {/* Assuming blog.content is HTML-safe */}
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                    </div>
                    <aside className="col-span-1 max-h-[20vh]">
                        <div className="bg-white shadow-xl rounded-lg p-6 h-full">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Author</h2>
                            <div className="flex items-center">
                                {/* Uncomment and style Avatar if needed */}
                                {/* <div className="pr-4 flex-shrink-0">
                                    <Avatar size="big" name={blog.author.username || "Anonymous"} />
                                </div> */}
                                <div>
                                    {/* Uncomment and style Author details if needed */}
                                    <p className="text-lg font-bold text-gray-800">{blog.author.username || "Anonymous"}</p>
                                    <p className="pt-2 text-gray-600"> {/* Author details here if available */} </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}