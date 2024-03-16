import React, { useState } from 'react'

const ContactCard = () => {
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        console.log(email, title, description);
    }


    return (
        <div className='w-full flex items-center justify-center'>
            <div className="p-10 bg-darkblue rounded-lg shadow-xl w-[50%] max-w-96">
                <h1 className="text-2xl font-bold mb-2 text-white">Contact Us</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-lightgray">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                        {/* {errors.email && <span>{errors.email}</span>} */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-lightgray">Title</label>
                        <input onChange={(e) => { setTitle(e.target.value) }} type="email" name="email" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                        {/* {errors.email && <span>{errors.email}</span>} */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-lightgray">Description</label>
                        <input onChange={(e) => { setDescription(e.target.value) }} type="text" name="description" className="mt-1 px-3 py-2 bg-darkgray text-white w-full rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-lightblue" />
                        {/* {errors.email && <span>{errors.email}</span>} */}
                    </div>
                    <button type="submit" onClick={handleSubmit} className="w-full py-2 px-4 bg-lightblue text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-opacity-50">Contact</button>
                </form>

            </div>
        </div>
    )
}

export default ContactCard
