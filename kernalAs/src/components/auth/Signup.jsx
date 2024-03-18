import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom"

const provider = new GoogleAuthProvider();
const Signup = () => {
    const navigate = useNavigate();
    const signupRedirect = (page) => {
        navigate(`../${page}`);
    }
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if (!formData.username.trim()) {
            validationErrors.username = "username is required"
        }

        if (!formData.email.trim()) {
            validationErrors.email = "email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "email is not valid"
        }

        if (!formData.password.trim()) {
            validationErrors.password = "password is required"
        } else if (formData.password.length < 6) {
            validationErrors.password = "password should be at least 6 char"
        }

        if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = "password not matched"
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            register();
        }

    }
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            signupRedirect("dash")
        } catch (error) {
            console.error(error.message);
            setErrors("Failed to create an account");
        } finally {
            // setLoading(false);
        }
    };


    const onGoogleSignin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);

            if (credential) {
                const newuser = result.user;
                signupRedirect('dash');
            }
        } catch (error) {
            console.error('Error while signing in with Google:', error);
            alert('Error while signing in');
        }
    };
    return (
        <div className="flex bg-black">

            <div className="w-full md:w-2/5 bg-black flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
                <div>
                    <h1 className="text-4xl font-bold mb-4 text-white">Daily Code</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="opacity-50">
                                <i className="fas fa-arrow-down fa-3x"></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-screen md:w-3/5 bg-gray-900 flex justify-center items-center">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="p-10 bg-darkblue rounded-lg shadow-xl">
                        <h1 className="text-2xl font-bold mb-2 text-white">Sign Up</h1>
                        <p className="mb-8 text-[#B6B6B6]">Already have an account? <span onClick={() => signupRedirect("login")} className="text-lightblue cursor-pointer">Log in to your account</span></p>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-[#B6B6B6]">Username</label>
                                <input onChange={handleChange} type="username" name="username" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                                {errors.username && <p className='text-red-600 text-sm'>{errors.username}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-[#B6B6B6]">Email</label>
                                <input onChange={handleChange} type="email" name="email" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                                {errors.email && <p className='text-red-600 text-sm'>{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-[#B6B6B6]">Password</label>
                                <input onChange={handleChange} type="password" name="password" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                                {errors.password && <p className='text-red-600 text-sm'>{errors.password}</p>}

                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#B6B6B6]">Confirm Password</label>
                                <input onChange={handleChange} type="password" name="confirmPassword" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                                {errors.confirmPassword && <p className='text-red-600 text-sm'>{errors.confirmPassword}</p>}

                            </div>

                            <button type="submit" onClick={handleSubmit} className="w-full mt-4 py-2 px-4 bg-lightblue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-opacity-50">Sign Up</button>
                        </form>
                        <div className="flex items-center justify-between my-6">
                            <hr className="w-full bg-lightgray" />
                            <p className="px-3 text-lightgray">OR</p>
                            <hr className="w-full bg-lightgray" />
                        </div>
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="text-darkgray hover:text-white">
                                <i className="fab fa-github fa-2x"></i>
                            </a>
                            <a href="#" className="text-darkgray hover:text-white">
                                <i className="fab fa-google fa-2x" onClick={onGoogleSignin}></i>
                            </a>
                            <a href="#" className="text-darkgray hover:text-white">
                                <i className="fab fa-apple fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
