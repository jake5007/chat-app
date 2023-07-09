import React, { useState } from "react";
import bg from "../assets/bg.jpg";
import addAvatar from "../assets/addAvatar.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div
      className="form_container h-[100vh] flex bg-no-repeat bg-cover
        justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="form_wrapper bg-white px-[60px] py-[30px]
        rounded-[12px] gap-7 flex flex-col items-center
        shadow-[2px_3px_15px_5px_rgba(0,0,0,0.3)]"
      >
        <span className="text-blue-600/80 font-bold text-3xl">Chit-Chat</span>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <label
            htmlFor="upload"
            className="cursor-pointer flex items-center gap-3 
            text-blue-600/80 text-md"
          >
            <img
              src={addAvatar}
              alt="add_avatar"
              className="w-[55px] h-[55px] object-contain"
            />
            <span>Add an Avatar</span>
          </label>
          <input className="hidden" type="file" id="upload" />
          <button
            className="bg-blue-400 rounded-md p-3 font-bold
            text-white text-[18px] hover:opacity-90"
            type="submit"
          >
            Sign up
          </button>
          {err && <span>Somthing went wrong...</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
