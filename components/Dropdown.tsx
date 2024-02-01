"use client";

import Link from "next/link";
import React, { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const options = ["Option 1", "Option 2", "Option 3"];
  return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Select an option
        </button>

        {isOpen && (
          <div className=" flex flex-col absolute top-8 mt-2 bg-white border rounded shadow-md w-full text-black">
            {options.map((option, index) => (
              <Link key={index} className="p-2" href="/">
                {option}
              </Link>
            ))}
          </div>
        )}
      </div>
  );
}

export default Dropdown;
