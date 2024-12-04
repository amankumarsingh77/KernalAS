import { GoFileSymlinkFile } from "react-icons/go"
import { PiUsers } from "react-icons/pi"
import { TbCloudNetwork } from "react-icons/tb"

const Statistics = () => {
    const stats = [
        {
            name: "Users",
            value: "3.4k",
            icon: PiUsers
        },
        {
            name: "Files",
            value: "10.2k",
            icon: GoFileSymlinkFile
        },
        {
            name: "Cloud Providers",
            value: "4",
            icon: TbCloudNetwork
        },
        // {
        //     name: "Active Users",
        //     value: ""
        // }
    ]
    return (
        < section className="text-gray-600 body-font" >
            <div className="container px-5 py-20 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Statistics</h1>
                    {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p> */}
                </div>
                <div className="flex flex-wrap -m-4 text-center items-center justify-center">
                    {stats.map((stat) => {
                        return (
                            <div key={stat.name} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg  ">
                                    <stat.icon color='#6366F1' size='45px' className="inline-block p-1" />
                                    <h2 className="title-font font-medium text-3xl text-gray-900">{stat.value}</h2>
                                    <p className="leading-relaxed">{stat.name}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </ section>
    )
}

export default Statistics
