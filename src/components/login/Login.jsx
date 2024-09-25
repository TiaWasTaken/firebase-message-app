import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {

  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  })

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if(e.target.files[0]){
      setAvatar({
        file:e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden"; 
    document.body.style.scrollbarWidth = "none";
    toast.success("Logged in successfully");
  }

const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  const formData = new FormData(e.target);
  
  const { username, email, password } = Object.fromEntries(formData);
  console.log(email, password);

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
  
    const imgUrl = await upload(avatar.file);

    await setDoc(doc(db, "users", res.user.uid),{
        username: username,
        email: email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
    
    await setDoc(doc(db, "userchats", res.user.uid),{
        chats: [],
      });

    console.log("User created:", res.user);
    document.body.style.overflow = "hidden"; 
    document.body.style.scrollbarWidth = "none";
    toast.success("User registered successfully");

  } catch (err) {
    document.body.style.overflow = "hidden"; 
    document.body.style.scrollbarWidth = "none";
    console.error("Error occurred during registration:", err);

    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className= "login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign in"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Don't have an account?</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload a Profile Image</label>
          <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign up"}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
