import "./addUser.css"
import { db } from "../../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

const AddUser = () => {

  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {

      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      // if query is not empty we are going to update our user
      if(!querySnapshot.empty){
        setUser(querySnapshot.docs[0].data());
      } else {
      document.body.style.overflow = "hidden";
      document.body.style.scrollbarWidth = "none";
      toast.error("Sorry " + username + " not found!");
      }

    } catch (error) {
      console.log(error);
      document.body.style.overflow = "hidden";
      document.body.style.scrollbarWidth = "none";
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="username" name="username"/>
        <button>Search</button>
      </form>
      {user && <div className="user">
        <div className="detail">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{ user.username }</span>
        </div>
        <button>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
