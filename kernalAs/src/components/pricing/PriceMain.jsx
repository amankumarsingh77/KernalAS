import React from 'react'
import { plans } from './plans'
import PriceCard from './PriceCard'
import Success from './Success'
const PriceMain = () => {
    return (
        <div className='bg-gray-900 flex w-auto gap-5 justify-center items-center max-sm:block max-sm:p-7 sm:h-screen'>
            {plans.map((plan) => {
                return (
                    <PriceCard plan={plan} />
                )

            })}
        </div>


    )
}

export default PriceMain
