import React, { useEffect, useState } from 'react'
import logo from "../assets/mern-media-logo.png"
import { FaRegUserCircle } from "react-icons/fa";
import avatar from "../assets/avatar.svg"
import { auth } from '../firebase/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

const NavBar = () => {
    const [islogged, setIslogged] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const dropItems = [
        {
            name: "Account",
            icon: FaRegUserCircle,
        },
        {
            name: "Logout",
            icon: IoIosLogOut
        }
    ]

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {

        setTimeout(() => {
            if (auth.currentUser) {
                setIslogged(true);
            }
        }, 1000);
    }, [auth.currentUser])

    const navigate = useNavigate();
    const logoOnclick = () => {
        navigate("/dash");
    }
    return (
        <nav className='bg-gray-800 shadow-lg flex justify-between sticky top-0 w-full h-14 items-center'>
            <div className='cursor-pointer' onClick={() => { logoOnclick() }}>
                <img src={logo} className='w-10 h-10 cursor-pointer'></img>
            </div>
            <div className=''>
                <div className='flex items-center max-sm:hidden '>
                    <div >

                        <Link to={"/dash"} className='text-white p-2'>Dashboard</Link>
                    </div>
                    <div>
                        <Link to={"/pricing"} className='text-white p-2'>Pricing</Link>
                    </div>
                    <div>
                        <Link to={"/contactus"} className='text-white p-2'>Contact Us</Link>
                    </div>
                    <div>
                        <Link to={"/aboutus"} className='text-white p-2'>About Us</Link>
                    </div>
                </div>
            </div>
            {islogged ? (

                <div>
                    <button onClick={toggleDropdown} className='text-white p-2 max-sm:hidden'>
                        <img className='w-8 h-8' src={avatar}>
                        </img>
                    </button>
                    {isOpen && (
                        <div className="absolute  right-0 mt-2 w-48 bg-gray-800 border border-gray-400  rounded shadow-md p-2">
                            {dropItems.map((item) =>
                                <Link to={"#"} className=" w-full flex gap-5 justify-start items-center py-2 px-4 text-white hover:bg-gray-300 hover:text-black rounded-md">
                                    <item.icon />
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    )}
                </div>

            ) : (
                <div className='flex flex-cols'>
                    <button className='border rounded-lg text-white px-2 py-3 '>Login</button>
                    <button>Signup</button>
                </div>
            )}



        </nav>
    )
}

export default NavBar