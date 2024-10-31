import { useEffect, useState } from 'react';
import SidebarMenu from '../../../components/SidebarMenu';
import Cookies from 'js-cookie';

export default function Dashboard() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = Cookies.get('user');

        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="px-2 mx-auto my-10">
            <div className="flex flex-col md:flex-row gap-5">
                <div className="md:w-1/4 mb-5 md:mb-0">
                    <SidebarMenu />
                </div>
                <div className="md:w-3/4">
                    <div className="bg-white shadow-md rounded-lg">
                        <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg font-semibold">
                            DASHBOARD
                        </div>
                        <div className="p-4">
                            Selamat Datang, <strong>{user.name}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
