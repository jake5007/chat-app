import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const owner = message.senderId === currUser.uid;

  return (
    <div
      ref={ref}
      className={`message owner flex ${
        owner ? "flex-row-reverse" : "flex-row"
      } gap-5 mb-3`}
    >
      <div className="messageInfo flex flex-col text-gray-600">
        <img
          className="w-[40px] h-[40px] rounded-full object-cover"
          src={
            message.senderId === currUser.uid
              ? currUser.photoURL
              : data.user.photoURL
          }
          alt="avatar"
        />
        <span>just now</span>
      </div>
      <div
        className={`messageContent max-w-[80%] flex flex-col gap-3 ${
          owner ? "items-end" : ""
        }`}
      >
        <p
          className={`${
            owner
              ? "bg-sky-300 text-white rounded-l-lg rounded-br-lg"
              : "bg-white text-black rounded-r-lg rounded-bl-lg"
          } px-[20px] py-[10px] max-w-max`}
        >
          {message.text}
        </p>
        {message.img && (
          <img className="w-[50%]" src={message.img} alt="avatar" />
        )}
      </div>
    </div>
  );
};

export default Message;
