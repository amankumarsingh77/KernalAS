import { Link } from "react-router-dom";
import Features from "../components/home/Features";
import Statistics from "../components/home/Statistics";
import { CarouselHome } from "../components/home/CarouselHome";
import Steps from "../components/home/Steps";


<main className="flex min-h-screen flex-col">

    <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col" >

            <div className="text-center lg:w-2/3 w-full">

                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Sync your data to your favourite cloud Providers</h1>
                <p className="mb-8 leading-relaxed">Introducing FileFlush, your hassle-free solution for seamless file synchronization across multiple cloud platforms. With FileFlush, users can upload their files just once, and our advanced synchronization technology ensures that those files are instantly mirrored across their chosen cloud providers.</p>
                <div className="flex justify-center" >
                    <Link to="/signup" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg ">
                        <div className="flex items-center gap-2">
                            <h3>Get Started</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                    </Link>
                    {/* <Link href="/dashboard" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Upload</Link>
                <Link href='/addcloud' className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Add Cloud</Link> */}
                </div>
            </div>
        </div>
    </section>
    <div>
        <Features />
    </div>
    <div className=" h-full">
        <Statistics />
    </div>
    <div>
        <CarouselHome />
    </div>
    <div>

        <Steps />
    </div>
</main>