import React from 'react'
import { GrStorage } from 'react-icons/gr';
import { IoCloudUploadOutline, IoSync, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineDevices, MdOutlineImportantDevices } from 'react-icons/md';
// import { IoMdSettings } from 'react-icons/io';


const Features = () => {
    const features = [
        {
            name: "One-Time Upload",
            icon: IoCloudUploadOutline,
        },
        {
            name: "Multi-Cloud Sync",
            icon: IoSync
        },
        {
            name: "Cross-Platform Compatibility",
            icon: MdOutlineDevices
        },
        {
            name: "Customizable Settings",
            icon: IoSettingsOutline
        },
        {
            name: "Storage Optimization",
            icon: GrStorage
        },
        {
            name: "User Friendly Interface",
            icon: MdOutlineImportantDevices
        }
    ]
    return (
        <section className="text-gray-600 body-font">
            <div className="container  mx-auto" >
                <div className="text-center mb-20" >
                    <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Features</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">The website is still under beta version. Not all features might work as expected.</p>
                </div>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2" >
                    {features.map((feature) => {
                        return (
                            <div className="p-2 sm:w-1/2 w-full" key={feature.name}>
                                <div className="bg-gray-100 rounded flex p-4 h-full items-center gap-2" >
                                    <feature.icon color='#6366F1' size='20px' />
                                    <span className="title-font font-medium">{feature.name}</span>
                                </div>
                            </div>
                        )
                    })}

                </div>
                {/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button> */}
            </div>
        </section>
    )
}

export default Features