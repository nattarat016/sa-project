import { Box, Button, Link } from "@mui/material";
import React from "react";
import Login from "./login/page";
import AuthButton from "../components/AuthButton";

export default function page() {
  return (
    <div className=" mt-14">
      <div className=" mb-5">
        <span className=" text-2xl">ระบบบันทิกการทำกิจกรรมจิตอาสา</span>
      </div>
      <center>
        <div>
          <Link href="/register">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mx-1">
              Sign Up
            </button>
          </Link>
          <Link href="/">
            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 border border-slate-700 rounded mx-1">
              Learnmore
            </button>
          </Link>
        </div>
      </center>
    </div>
  );
}
