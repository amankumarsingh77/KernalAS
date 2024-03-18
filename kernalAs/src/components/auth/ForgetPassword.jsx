import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom"

const provider = new GoogleAuthProvider();
const ForgetPassword = () => {
    const navigate = useNavigate();
    const signupRedirect = () => {
        navigate("/login");
    }
    const [formData, setFormData] = useState({
        email: ''
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

        if (!formData.email.trim()) {
            validationErrors.email = "email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "email is not valid"
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            sendEmail();
        }

    }
    const sendEmail = async () => {
        try {
            const user = await sendPasswordResetEmail(
                auth,
                formData.email
            );

        } catch (error) {

            setErrors("Failed to create an account");
        } finally {

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
                    <div className="p-10 bg-darkblue rounded-lg shadow-xl w-96">
                        <h1 className="text-2xl font-bold mb-3 text-white text-center">Forgot Password</h1>
                        <form>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-[#B6B6B6]">Email</label>
                                <input onChange={handleChange} type="email" name="email" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                                {errors.email && <p className='text-red-600 text-sm'>{errors.email}</p>}
                            </div>
                            <button type="submit" onClick={handleSubmit} className="w-full mt-4 py-2 px-4 bg-lightblue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-opacity-50">Send Mail    </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
