import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);

    const register = async (e) => {
        e.preventDefault();

        await api.post('/api/register', {
            name: name,
            email: email,
            password: password,
        })
            .then(() => {
                navigate("/login");
            })
            .catch(error => {
                setValidation(error.response.data);
            })
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">REGISTER</h4>
                    <hr className="mb-4" />
                    {validation.errors && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {validation.errors.map((error, index) => (
                                <p key={index} className="text-sm">{error.path} : {error.msg}</p>
                            ))}
                        </div>
                    )}
                    <form onSubmit={register}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-1">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Password"
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">REGISTER</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
