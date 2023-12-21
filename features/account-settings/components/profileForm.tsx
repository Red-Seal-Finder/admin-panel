import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";

const ProfileForm = () => {
    return (
        <div className='w-[50%]'>
            <form>
                <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <FaRegUserCircle className="h-12 w-12 text-gray-300" aria-hidden="true" />
                        <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                        Change
                        </button>
                    </div>
                </div>
                <div className="col-span-full mt-5">
                    <h3 className="block text-sm font-medium leading-6 text-gray-900">
                        Personal information
                    </h3>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        placeholder='Raphael Okoye'
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder='example@gmail.com'
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="col-span-full mt-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder='Password'
                        className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default ProfileForm



