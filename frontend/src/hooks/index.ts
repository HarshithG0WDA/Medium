import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    "content" : string;
    "title" : string;
    "id" : string;
    "author" : {
        "name" : string
    }
}

export const useBlog = ({id} : {id : string}) => {
    const [blog, setBlog] = useState<any[]>([]);
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const fetchBlog = async () => {

            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers:
                    {
                        Authorization: localStorage.getItem("token"),
                    }
                        
                });
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return { blog, loading };

}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {

            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers:
                    {
                        Authorization: localStorage.getItem("token"),
                    }
                        
                });
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading };
};