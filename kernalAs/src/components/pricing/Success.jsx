import React from 'react'
import Tick from "../../assets/green-tick.gif"
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    const dashNavigate = () => {
        navigate("/dash")
    }
    const expiresOn = (timestamp) => {
        const date = new Date(timestamp * 1000);
        date.setDate(date.getDate() + 30);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Adding 1 to get the correct month
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}:${seconds}`;
    };

    // Example usage



    const timeConverter = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds by multiplying with 1000

        // Get individual components of the date
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
    return (
        <div className='flex justify-center items-center h-full bg-gray-900'>
            <div class="w-full max-w-[570px] rounded-[20px] bg-gray-900 py-12 px-8 text-center md:py-[60px] md:px-[70px]">
                <div className=' w-full justify-center flex p-3'>
                    <img className='rounded-full' src={Tick}></img>
                </div>
                <h3 class="text-white pb-2 text-xl font-bold sm:text-2xl">Payment Successful</h3>
                <span class="bg-indigo-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded "></span>
                <div>
                    <p class="text-gray-400 mb-3 text-base leading-relaxed">Plan : {data.planName}</p>
                    <p class="text-gray-400 mb-3 text-base leading-relaxed">Amount : {data.amount}</p>
                    <p class="text-gray-400 mb-3 text-base leading-relaxed">Order Id : {data.razorpay_order_id}</p>
                    <p class="text-gray-400 mb-3 text-base leading-relaxed">Purchased : {timeConverter(data.createdAt)}</p>
                    <p className='text-gray-400 mb-8 text-base leading-relaxed'>Expires On : {expiresOn(data.createdAt)}</p>
                </div>

                <div class="flex flex-wrap gap-3">
                    <button class="bg-indigo-500 border-indigo-500 block w-full rounded-lg border p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
                        onClick={() => dashNavigate()}
                    >Back To Dashboard</button>
                </div>
            </div>
        </div>


    )
}

export default Success
