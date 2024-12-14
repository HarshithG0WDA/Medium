import { Appbar } from "../components/Appbar";
import { BlogRender } from "../components/BlogRender";
import { BlogRenderSkeleton } from "../components/Spinner"; // Import the skeleton
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || "",
    });

    if (loading || !blog) {
        return (
            <div>
                <BlogRenderSkeleton /> {/* Render the skeleton here */}
            </div>
        );
    }

    return (
        <div>
            <BlogRender blog={blog} />
        </div>
    );
};