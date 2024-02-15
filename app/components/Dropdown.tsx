"use client";

import Link from "next/link";
import React, { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMSIYfCJdNMn2ZflsSbPpfXXaTDvqZ5NlWvw&usqp=CAU";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const options = ["Profile", "Logout "];
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
          <Link className="p-2  text-nowrap" href="/">
            {options[0]}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
