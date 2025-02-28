import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";


export default function Navbar() {
    const [isTherapyDropdownOpen, setIsTherapyDropdownOpen] = useState(false); // State to control therapy dropdown
    const dropdownRef = useRef(null); // Ref for the dropdown
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        Toastify({
            text: "Succeed Logout",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right,rgb(99, 100, 100),rgb(0, 0, 0))",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        navigate('/login')
    };

    const toggleTherapyDropdown = () => {
        setIsTherapyDropdownOpen(!isTherapyDropdownOpen); // Toggle dropdown visibility
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsTherapyDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Left Side: Clinic Name */}
               
                <Link to={'/'} className="text-2xl font-bold text-blue-500">
                    <span className="text-white">Chiro</span>practive
                </Link>

                {/* Middle: Navigation Links */}
                <div className="flex space-x-8">
                    {/* Therapy Dropdown */}
    

                    {/* News */}
                    <Link to={"/news"} className="hover:text-blue-500">
                        News
                    </Link>

                    {/* My Reservation */}
                    <Link to={"/my-reservation"} className="hover:text-blue-500">
                        My Reservation
                    </Link>

                    {/* My Treatment Record */}
                    <Link to={"/my-treatment-record"} className="hover:text-blue-500">
                        My Treatment Record
                    </Link>
                </div>

                {/* Right Side: Login/Logout Button */}
                <div>
                    {localStorage.access_token ? (
                        <button
                            onClick={handleLogout}
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to={'/login'}>

                        <button
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Login
                        </button>
                        </Link>

                    )}
                </div>
            </div>
        </nav>
    );
}