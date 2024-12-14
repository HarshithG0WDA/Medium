import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import Shimmer from "../components/skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
          <Appbar />
          <div className='flex justify-center'>
            <div className="max-w-5xl w-full px-3">
              <Shimmer />
              <Shimmer />
              <Shimmer />
              <Shimmer />
              <Shimmer />
              <Shimmer />
              <Shimmer />
            </div>
          </div>
        </div>
      }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-5xl w-full px-3">
                    {blogs.map((blog, index) => (
                        <div key={index}>
                            <BlogCard
                                id = {blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.publishedDate}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};