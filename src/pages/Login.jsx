import React from "react";
import bg from "../assets/bg.jpg";
import addAvatar from "../assets/addAvatar.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button
            className="bg-blue-400 rounded-md p-3 font-bold
            text-white text-[18px] hover:opacity-90"
            type="submit"
          >
            Sign in
          </button>
          {err && <span>Somthing went wrong...</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
