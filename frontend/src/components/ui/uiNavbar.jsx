import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import logo from '../../assets/logo.png';

const navlinks = [
    {
        title: 'Students',
        link: 'students',
    },
    {
        title: 'Appointments',
        link: 'appointments',
    },
    // {
    //   title: "My Appointments",
    //   link: "appointments",
    // },
];

const UiNavbar = () => {
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Retrieve JWT token from local storage
        const token = localStorage.getItem('token');

        const decodeToken = (token) => {
            try {
                // Decode token
                const decoded = JSON.parse(atob(token.split('.')[1]));
                return decoded;
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        };

        // Decode token to get user role
        const decodedToken = decodeToken(token);

        if (decodedToken) {
            setUserRole(decodedToken.role);
        }
    }, []);

    const handleMenu = () => {
        setOpen((prev) => !prev);
    };

    const filteredNavlinks = navlinks.filter((link) => {
        if (userRole === 'Student') {
            return link.title !== 'Students' && link.title !== 'Appointments';
        } else if (userRole === 'Instructor') {
            return link.title !== 'Students';
        }
        return true;
    });
    return (
        <div className="bg-gray-800 ">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img src={logo} className="h-12 w-auto" alt="Logo" />{' '}
                        <a href="/" className="text-yellow-500 ml-2 text-2xl">
                            Asere CDL
                        </a>
                    </div>
                    {/* Nav Links*/}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {filteredNavlinks.map((link, index) => (
                                <a
                                    key={index}
                                    className="text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium"
                                    href={link.link}
                                >
                                    {link.title}
                                </a>
                            ))}
                            <a
                                className="text-yellow-500 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500 px-3 py-2 rounded-md text-md font-medium border"
                                href="/login"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                    {/* hamburger button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            onClick={handleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-gray-700 "
                        >
                            <span className="sr-only">Open Main Manu</span>
                            {open ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>
            {/* mobile-menu */}
            {open ? (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {filteredNavlinks.map((link, index) => (
                            <a
                                key={index}
                                className="text-yellow-500 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                                href={link.link}
                            >
                                {link.title}
                            </a>
                        ))}
                        <div className="px-2 py-2  flex justify-end">
                            <a
                                className="text-yellow-600 transition-all duration-500 hover:bg-gray-600 hover:text-yelow-500  rounded-md text-md font-medium px-1"
                                href="/login"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default UiNavbar;
