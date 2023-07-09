import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currUser } = useContext(AuthContext);

  return (
    <div
      className="navbar flex items-center bg-sky-950 text-slate-100
        py-5 px-1 justify-between h-[70px]"
    >
      <span className="logo font-bold">Chit-Chat</span>
      <div className="user flex items-center gap-2">
        <img
          className="bg-slate-100 h-[34px] w-[34px] rounded-full object-cover"
          src={currUser.photoURL}
          alt="avatar"
        />
        <span>{currUser.displayName}</span>
        <button
          className="px-2 py-1 bg-gray-700 text-slate-100 text-[13px]"
          onClick={() => signOut(auth)}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
