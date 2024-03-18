import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const PriceCard = ({ plan }) => {
    const navigate = useNavigate();

    const handlePayment = async (amount, plan) => {
        const planName = plan;
        // Make a request to your server to create a Razorpay order
        const response = await axios.post('http://64.227.177.24:3001/create-order',
            {
                amount: amount * 100
            });
        const order = response.data;

        const options = {
            key: 'rzp_test_GxDb6mfIvPQTXw', // Replace with your Razorpay Key
            amount: order.amount,
            currency: order.currency,
            name: 'KernalAs',
            description: 'Purchase Description',
            order_id: order.id,
            handler: function (response) {
                const data = { ...response, amount, createdAt: order.created_at, planName }
                navigate("/payment/success", { state: data });
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    return (
  
        <div
            class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-80 "
        >
            <div class="p-1 bg-green-200"></div>
            <div class="p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">{plan.name}</h2>
                <p class="text-gray-600 mb-6">Perfect for growing businesses</p>
                <p class="text-4xl font-bold text-gray-800 mb-6">₹{plan.price}</p>
                <ul class="text-sm text-gray-600 mb-6">
                    
                {plan.features.map((feature) => {
                    return (
                    
                    <li class="mb-2 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        class="w-4 h-4 mr-2 text-green-500"
                    >
                        <path
                            d="M5 13l4 4L19 7"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        ></path>
                    </svg>
                    <p>{feature}</p>
                </li>
                    )
                })}
                </ul>
            </div>
            <div class="p-4">
                <button
                    onClick={()=>{ handlePayment(plan.price, plan.name) }}
                    class="w-full bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800"
                >
                    Select Plan
                </button>
            </div>
        </div>


    )
}

export default PriceCard
