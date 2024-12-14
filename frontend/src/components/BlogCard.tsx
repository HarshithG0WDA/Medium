import { Dot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id : number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 cursor-pointer">
                <div className="flex items-center mb-4 text-gray-500">
                    <Avatar name={authorName} />
                    <span className="ml-2 font-bold text-lg">{authorName}</span>
                    <Dot className=" font-extralight" />
                    <span>{publishedDate}</span>
                </div>
                <div className="mb-2 text-xl font-bold text-gray-800">{title}</div>
                <div className="mb-4 text-gray-600">{content.slice(0, 100) + '...'}</div>
                <div className="text-sm text-gray-500">
                    {`${Math.ceil(content.length / 100)} minutes read`}
                </div>
                <div className="mt-4 bg-slate-200 h-1 w-full"></div>
            </div>
        </Link>
    );
};

export function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    );
}