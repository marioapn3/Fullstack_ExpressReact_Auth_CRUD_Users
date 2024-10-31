import { Link } from "react-router-dom";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl">HOME</Link>
          <button
            className="text-gray-200 md:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="https://santrikoding.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              SANTRIKODING.COM
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-5">
        <AppRoutes />
      </div>
    </div>
  );
}
