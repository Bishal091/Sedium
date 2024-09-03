import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const blogContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blogs.length > 0 && blogContainerRef.current) {
      gsap.from(blogContainerRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [blogs]);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={blogContainerRef}>
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.username || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={new Date(blog.date).toISOString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};