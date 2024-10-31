//import useState dan useEffect
import { useState, useEffect } from 'react';

//import SidebarMenu
import SidebarMenu from '../../../../components/SidebarMenu';

//import Link
import { Link } from 'react-router-dom';

//import js cookie
import Cookies from 'js-cookie';

//import api
import api from '../../../../services/api';

export default function UsersIndex() {

    //ini state "users"
    const [users, setUsers] = useState([]);

    //define method "fetchDataUsers"
    const fetchDataUsers = async () => {

        //get token from cookies inside the function to ensure it's up-to-date
        const token = Cookies.get('token');

        if (token) {
            //set authorization header with token
            api.defaults.headers.common['Authorization'] = token;

            //fetch data from API with Axios
            try {
                const response = await api.get('/api/admin/users');
                //assign response data to state "users"
                setUsers(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.error("Token is not available!");
        }

    }

    //run hook useEffect
    useEffect(() => {

        //call method "fetchDataUsers"
        fetchDataUsers();

    }, []);

    //define method "deleteUser"
    const deleteUser = async (id) => {

        //get token from cookies inside the function to ensure it's up-to-date
        const token = Cookies.get('token');

        if (token) {
            //set authorization header with token
            api.defaults.headers.common['Authorization'] = token;

            try {

                //fetch data from API with Axios
                await api.delete(`/api/admin/users/${id}`);

                //call method "fetchDataUsers"
                fetchDataUsers();

            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        } else {
            console.error("Token is not available!");
        }

    }

    return (
        <div className="container px-4 mx-auto mt-10 mb-10">
            <div className="flex flex-wrap">
                <div className="w-full mb-4 md:w-1/4 md:mb-0">
                    <SidebarMenu />
                </div>
                <div className="w-full md:w-3/4">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-t-lg">
                            <span className="font-semibold text-gray-700">USERS</span>
                            <Link
                                to="/admin/users/create"
                                className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600"
                            >
                                ADD USER
                            </Link>
                        </div>
                        <div className="p-5">
                            <table className="min-w-full border border-gray-200">
                                <thead>
                                    <tr className="text-white bg-gray-800">
                                        <th className="px-4 py-2 border-b">Full Name</th>
                                        <th className="px-4 py-2 border-b">Email Address</th>
                                        <th className="w-1/6 px-4 py-2 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length > 0
                                            ? users.map((user, index) => (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="px-4 py-2 border-b">{user.name}</td>
                                                    <td className="px-4 py-2 border-b">{user.email}</td>
                                                    <td className="flex px-4 py-2 text-center border-b">
                                                        <Link
                                                            to={`/admin/users/edit/${user.id}`}
                                                            className="px-2 py-1 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
                                                        >
                                                            EDIT
                                                        </Link>
                                                        <button onClick={() => deleteUser(user.id)}
                                                            className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600"
                                                        >
                                                            DELETE
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))

                                            : <tr>
                                                <td colSpan="3" className="py-4 text-center">
                                                    <div className="text-red-600">Data Belum Tersedia!</div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
