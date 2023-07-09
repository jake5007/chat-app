import React from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Chatlist from "./Chatlist";

const Sidebar = () => {
  return (
    <div className="sidebar basis-1/3 bg-gray-700">
      <Navbar />
      <Searchbar />
      <Chatlist />
    </div>
  );
};

export default Sidebar;
