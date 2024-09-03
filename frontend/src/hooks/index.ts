import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": string
    "author": {
        "username": string
    }
    "date": Date
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
                console.log(blog);
                
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/blog/all`);
          setBlogs(response.data.blogs);
          console.log(blogs);
          
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);
  
    return {
      loading,
      blogs
    };
}