import React from "react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-4 py-4 bg-white border-b-2 border-black shadow-md">
            <h1 className="text-xl font-bold text-black">Taf</h1>
            <ul className="flex gap-4 text-black">
                <li className="hover:underline"><a href="#home">Home</a></li>
                <li className="hover:underline"><a href="#about">About</a></li>
            </ul>
            <button className="px-4 py-2 border-2 border-black bg-black text-white rounded-md hover:bg-white hover:text-black transition-colors">
                Login
            </button>
        </nav>
    );
}
