import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {

  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  })

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

  return (
    <div className= "login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign in</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Don't have an account?</h2>
        <form>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload a Profile Image</label>
          <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Login
