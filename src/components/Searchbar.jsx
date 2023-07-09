import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Searchbar = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // 개선 필요. 일부만 일치해도 user들 목록 뜨도록 해야함
  const handleSearch = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (u) => {
    await dispatch({ type: "CHANGE_USER", payload: u.displayName });
    // check whether the group(chats in firestore) exists, if not, create new one
    const combinedId =
      currUser.uid > user.uid
        ? currUser.uid + user.uid
        : user.uid + currUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currUser.uid,
            displayName: currUser.displayName,
            photoURL: currUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className="search border border-solid border-gray-500">
      <div className="searchForm p-[10px]">
        <input
          className="bg-transparent text-white border-none 
          outline-none placeholder:text-gray-300 max-w-[100%] w-full"
          type="text"
          placeholder="find a user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found...</span>}
      {user && (
        <div
          className="userChat p-3 flex items-center gap-3 
          text-white hover:bg-slate-800 cursor-pointer"
          onClick={() => handleSelect(user)}
        >
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={user.photoURL}
            alt="avatar"
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
