//import useState dan useEffect
import { useState, useEffect } from 'react';

//import SidebarMenu
import SidebarMenu from '../../../../components/SidebarMenu';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import js cookie
import Cookies from 'js-cookie';

//import api
import api from '../../../../services/api';

//get token from cookies
const token = Cookies.get('token');

export default function UsersEdit() {

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    //define state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //state validation
    const [validation, setValidation] = useState([]);

    //method fetchDetailUser
    const fetchDetailUser = async () => {

        //fetch data
        await api.get(`/api/admin/users/${id}`)
            .then(response => {

                //assign to state
                setName(response.data.data.name);
                setEmail(response.data.data.email);
            })
    }

    //hook useEffect
    useEffect(() => {

        //call method "fetchDetailUser"
        fetchDetailUser();

    }, []);

    //method "updateUser"
    const updateUser = async (e) => {
        e.preventDefault();

        //call api
        api.defaults.headers.common['Authorization'] = token;
        await api.put(`/api/admin/users/${id}`, {
            name: name,
            email: email,
            password: password
        })
            .then(() => {

                //redirect ke halaman users
                navigate('/admin/users')
            })
            .catch(error => {

                //assign error to state validation
                setValidation(error.response.data);
            })
    }


    return (
        <div className="container px-4 mx-auto mt-10 mb-10">
            <div className="flex flex-wrap">
                <div className="w-full mb-4 md:w-1/4 md:mb-0">
                    <SidebarMenu />
                </div>
                <div className="w-full md:w-3/4">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="px-4 py-3 font-semibold text-gray-700 bg-gray-100 rounded-t-lg">
                            EDIT USER
                        </div>
                        <div className="p-5">
                            {
                                validation.errors && (
                                    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
                                        {
                                            validation.errors.map((error, index) => (
                                                <p key={index}>{error.path} : {error.msg}</p>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <form onSubmit={updateUser}>

                                <div className="mb-4">
                                    <label className="block mb-1 font-semibold">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Full Name"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 font-semibold">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Email Address"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 font-semibold">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Password"
                                    />
                                </div>

                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600">
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
