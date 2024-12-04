import { BsPinMap } from "react-icons/bs"
import { FaUpload } from "react-icons/fa6"
import { FiUserPlus } from "react-icons/fi"
import { TbCloudPlus } from "react-icons/tb"

const Steps = () => {
    const steps = [
        {
            id: 1,
            icon: FiUserPlus,
            name: "Create An Account",
            description: "Its just a click of a button to signup to our service."
        },
        {
            id: 2,
            icon: TbCloudPlus,
            name: "Add Cloud",
            description: "Add your prefered cloud providers by logging into them."
        },
        {
            id: 3,
            icon: BsPinMap,
            name: "Select Destination",
            description: "Select your destination cloud provider to upload to"
        },
        {
            id: 4,
            icon: FaUpload,
            name: "Upload",
            description: "Select the destination Upload your files or folders"
        }
    ]
    return (
        <section className="text-gray-600 body-font">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 mt-3 text-gray-900 text-center">Easy And Friendly UI</h1>
            <div className="container px-5 py-24 mx-auto flex flex-wrap" >

                {steps.map((step) => {
                    return (
                        <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto" key={step.id}>
                            <div className="h-full w-6 absolute left-0 inset-0 flex items-center justify-center" >
                                <div className="h-full w-1 bg-gray-200 pointer-events-none" ></div>
                            </div>
                            <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm" >{step.id}</div>
                            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row" >
                                <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center" >
                                    <step.icon size={35} />
                                </div>
                                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0" >
                                    <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">{step.name}</h2>
                                    <p className="leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Steps