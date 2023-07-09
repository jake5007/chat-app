import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import bg from "../assets/bg.jpg";

const Home = () => {
  return (
    <div
      className="home h-[100vh] flex bg-no-repeat bg-cover
        justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="container border border-black 
        border-solid rounded-md w-[60%] h-[75%] flex overflow-hidden"
      >
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default Home;
