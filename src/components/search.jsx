import React from "react";

export default function Search() {
    return (
        <section className="flex justify-center items-center bg-white py-12 w-full">
            <div className="w-full max-w-4xl px-4">
                <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-md px-4 py-3 border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 border-2 border-black bg-black text-white rounded-md shadow-sm hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}
