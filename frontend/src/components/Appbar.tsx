import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex items-center justify-between px-10 mt-4 pb-4 mb-4">
        <Link to={'/'}>
            <div className="text-3xl font-bold">
                Medium
            </div>
        </Link>
        <div>
            <Link to={"/publish"}>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-10">Publish</button>
            </Link>
            <Avatar name="Harshith"></Avatar>
        </div>

    </div>
}
// Fix this later, violation of DRY, but don't want to do the ugly thing that hkirat bhaiya did
function Avatar({ name }: { name: string }){
    return (
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-semibold text-xl text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>)}