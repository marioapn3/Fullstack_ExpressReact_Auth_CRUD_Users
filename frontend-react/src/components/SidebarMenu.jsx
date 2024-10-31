import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from 'js-cookie';

export default function SidebarMenu() {

    // Menggunakan hook `useNavigate` untuk navigasi
    const navigate = useNavigate();

    //destructure context "setIsAuthenticated"
    const { setIsAuthenticated } = useContext(AuthContext);

    // method to handle logout
    const logout = () => {

        //remove token and user on cookies
        Cookies.remove('token');
        Cookies.remove('user');

        //assign false to state "isAuthenticated"
        setIsAuthenticated(false);

        // redirect to login
        navigate("/login", { replace: true });
    }
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="px-4 py-2 font-semibold text-white bg-gray-800 rounded-t-lg">
                MAIN MENU
            </div>
            <div className="p-4">
                <div className="flex flex-col space-y-2">
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-gray-800 transition bg-gray-100 rounded-md hover:bg-gray-200">
                        Dashboard
                    </Link>
                    <Link to="/admin/users" className="block px-4 py-2 text-gray-800 transition bg-gray-100 rounded-md hover:bg-gray-200">
                        Users
                    </Link>
                    <a onClick={logout} className="block px-4 py-2 text-gray-800 transition bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    )
}
