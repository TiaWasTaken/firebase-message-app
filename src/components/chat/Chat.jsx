import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { toast } from 'react-toastify';
import { useUserStore } from '../../lib/userStore';
import { arrayUnion, updateDoc } from 'firebase/firestore';


const Chat = () => {

  const [open, setOpen] = useState(false);

  const [text, setText] = useState('');

  const [chat, setChat] = useState();

  const { chatId, user } = useChatStore();

  const { currentUser } = useUserStore();

  const endRef = useRef(null);

useEffect(() => {
  endRef.current?.scrollIntoView({ behavior: "smooth" });
}, []);

useEffect(() => {
  if (!chatId) return; // Return early if chatId is not available
  const unSub = onSnapshot(doc(db, "chats", chatId ), (res) => {
      setChat(res.data())
    })

    return () => {
      unSub();
    }
  }, [chatId])


const handleEmoji = e => {
 setText(prev => prev + e.emoji); 
}


const handleSend = async () => {
    if(text === ""){
      return;
    }

    try {
      
      await updateDoc(doc(db, "chats", chatId), {
          messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date()
        })
      });

      // Loop through userchats and update the last message
      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {

        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if(userChatsSnapshot.exists()){
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex((chat) => chat.chatId === chatId);
          
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = new Date().getTime();

          await updateDoc(userChatsRef, {
            chats:userChatsData.chats,
          });
        }
      });

      setText('');

    } catch (err) {
      console.log(err);
      document.body.style.overflow = "hidden";
      document.body.style.scrollbarWidth = "none";
      toast.error("Failed to send message");
    }
  }

const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior like line breaks
      handleSend(); // Trigger the send function
    }
  };
  
  return (
    <div className ='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        { chat?.messages?.map((message, index) => (
          <div className="message own" key={message?.createdAt || index }>
            {message.img && <img src={message.img} alt="" />}
            <div className="texts">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Write a message..." value={text} onChange={e=>setText(e.target.value)} onKeyPress = {handleKeyPress}/>
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick = {()=> setOpen(prev => !prev)}/>
          <div className="picker">
           <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>
    </div>
   )
}

export default Chat
