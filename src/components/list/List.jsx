import ChatList from "./chatList/ChatList.jsx";
import Userinfo from "./userInfo/Userinfo.jsx";
import "./list.css"

const List = () => {
  return (
    <div className ='list'>
      <Userinfo />
      <ChatList />
    </div>
  )
}

export default List
