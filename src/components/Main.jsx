import React, { useContext } from "react";
import add from "../assets/add.svg";
import cam from "../assets/camera.svg";
import etc from "../assets/etc.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Main = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="main basis-2/3">
      <div
        className="chatInfo bg-gray-700 flex 
        justify-between items-center h-[70px] p-3 text-gray-300"
      >
        <span>{data.user?.displayName}</span>
        <div className="chatIcons flex gap-3 cursor-pointer">
          <img className="w-[24px]" src={cam} alt="cam" />
          <img className="w-[24px]" src={add} alt="add" />
          <img className="w-[24px]" src={etc} alt="etc" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Main;
