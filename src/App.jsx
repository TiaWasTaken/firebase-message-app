import Detail from "./components/detail/Detail.jsx";
import Chat from "./components/chat/Chat.jsx";
import List from "./components/list/List.jsx";
import Login from "./components/login/Login.jsx";
import Notification from "./components/notification/Notification.jsx";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";


const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);      
    });

    return () => {
      unSub();
    }
  }, [fetchUserInfo]);


  if(isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className='container'>
      {
        currentUser ? (
          <>
          <List />
          <Chat />
          <Detail />
          </>
        ) : 
        (
          <Login/>
        )
      }
      <Notification />
    </div>
  )
}

export default App
