import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const { currUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currUser.uid && getChats();

    console.log(Object.entries(chats));
  }, [currUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat p-3 flex items-center gap-3 
          text-white hover:bg-slate-800 cursor-pointer"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="w-[50px] h-[50px] rounded-full object-cover"
              src={chat[1].userInfo.photoURL}
              alt="avatar"
            />
            <div className="userChatInfo">
              <span className="text-[18px]">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-[14px] text-gray-400">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chatlist;
