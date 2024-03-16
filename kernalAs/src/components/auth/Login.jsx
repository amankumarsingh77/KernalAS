import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/mern-media-logo.png"

const provider = new GoogleAuthProvider();

const Login = () => {
    const navigate = useNavigate();

    const loginRedirect = (page) => {
        navigate(`../${page}`);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const checkCurrentUser = () => {
        if (auth?.currentUser?.displayName) {
            loginRedirect('dash');
        }
    };

    const [errors, setErrors] = useState({});

    useEffect(() => {
        checkCurrentUser();

    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email is not valid';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password should be at least 6 characters';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            register();
        }
    };

    const register = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            loginRedirect('dash');
        } catch (error) {
            console.error(error.message);
            setErrors('Failed to create an account');
        }
    };

    const onGoogleSignin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);

            if (credential) {
                const newuser = result.user;
                loginRedirect('dash');
            }
        } catch (error) {
            console.error('Error while signing in with Google:', error);
            alert('Error while signing in');
        }
    };
    return (
        <div className="flex bg-black">

            <div className="w-full md:w-2/5 bg-black flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
                <div className='flex items-center justify-center'>
                    <img className='w-14 h-14' src={Logo}></img>
                    <h1 className="text-4xl font-bold p-2 text-white">KernalAs</h1>

                </div>
            </div>
            <div className="w-full h-screen md:w-3/5 bg-gray-900 flex justify-center items-center">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="p-10 bg-darkblue rounded-lg shadow-xl">
                        <h1 className="text-2xl font-bold mb-2 text-white">Log In</h1>

                        <p className="mb-8 text-white flex">New to Neon? <span onClick={() => loginRedirect("signup")} className="text-lightblue cursor-pointer ml-2">Sign up for an account</span></p>
                        <form>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-lightgray">Email</label>
                                <input onChange={handleChange} type="email" name="email" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                                {errors.email && <span>{errors.email}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-lightgray">Password</label>
                                <input onChange={handleChange} type="password" name="password" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                                {errors.password && <span>{errors.password}</span>}
                                <a href="/forgotpassword" className="text-sm text-lightblue float-right mt-2">Forgot Password?</a>
                            </div>
                            <div className="mb-6">
                                <input type="checkbox" id="remember" className="rounded text-lightblue focus:ring-lightblue" />
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-lightgray">Remember me</label>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="w-full py-2 px-4 bg-lightblue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-opacity-50">Log In</button>
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

export default Login
