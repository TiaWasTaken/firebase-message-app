import "./addUser.css"
import { db } from "../../../../lib/firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { arrayUnion } from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";


const AddUser = () => {

  const { currentUser } = useUserStore();
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


  const handleAdd = async () => {
    // add user to the database
    

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");



    try {

      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      })

      // add chat to the user we are adding
      await updateDoc(doc(userChatsRef, user.id), {
        chats:arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      })

      // add chat to the current user (logged in user)
       await updateDoc(doc(userChatsRef, currentUser.id), {
        chats:arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      })
     

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
        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
