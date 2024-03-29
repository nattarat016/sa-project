"use client";

import Link from "next/link";
import React, { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMSIYfCJdNMn2ZflsSbPpfXXaTDvqZ5NlWvw&usqp=CAU"

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const options = ["Option 1", "Option 2", "Option 3"];
  return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-blue-500 bg-cover focus:outline-none overflow-hidden w-10 h-10  focus:shadow-outline  rounded-full  "
        >
            <img className=" h-auto w-auto " src={img} alt="" />
          
        </button>

        {isOpen && (
          <div className=" p-2 w-fit flex flex-col absolute top-8 mt-2 bg-white border rounded shadow-md text-black">
            {options.map((option, index) => (
              <Link key={index} className="p-2  text-nowrap" href="/">
                {option}
              </Link>
            ))}
          </div>
        )}
      </div>
  );
}

export default Dropdown;
