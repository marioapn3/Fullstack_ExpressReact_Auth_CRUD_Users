import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="p-5 mb-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="container mx-auto py-5">
                <h1 className="text-4xl font-bold text-gray-800">FULLSTACK JAVASCRIPT DEVELOPER</h1>
                <p className="text-lg text-gray-600 mt-4">Belajar Full Stack JavaScript Developer dengan Express dan React di SantriKoding.com</p>
                <hr className="my-4" />
                <Link to="/register" className="btn bg-blue-600 text-white text-lg py-2 px-4 rounded-lg mr-3 hover:bg-blue-700">REGISTER</Link>
                <Link to="/login" className="btn bg-gray-500 text-white text-lg py-2 px-4 rounded-lg hover:bg-gray-600">LOGIN</Link>
            </div>
        </div>
    )
}
