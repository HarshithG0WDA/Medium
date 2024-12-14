import { Appbar } from "./Appbar";

export const BlogRender = ({ blog }: { blog: any }) => {
    return (
        <div>
            <Appbar />
            <div className="grid grid-cols-12 px-10 w-full mt-10 gap-8">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold pl-20">
                        {blog.title || "Untitled"}
                    </div>
                    <div className="pl-20 pt-2 text-gray-500">
                        Posted on {formatDate(blog.publishedDate)}
                    </div>
                    <div className="pl-20 pt-8 font-medium text-lg">
                        {blog.content || "No content available for this blog."}
                    </div>
                </div>
                <div className="col-span-4 p-6">
                    <div className="text-gray-600 font-semibold">Author</div>
                    <div className="pt-3">
                        <div className="flex items-center gap-4">
                            <Avatar name={blog.author?.name || "Anonymous"} />
                            <div>
                                <div className="font-bold text-2xl">
                                    {blog.author?.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-gray-500 text-lg">
                                    {blog.author?.persona ||
                                        "This author prefers to stay mysterious."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-semibold text-xl text-gray-600 dark:text-gray-300">
                {name?.[0]?.toUpperCase() || "?"}
            </span>
        </div>
    );
}

function formatDate(date: string): string {
    if (!date) return "Unknown Date";
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
}