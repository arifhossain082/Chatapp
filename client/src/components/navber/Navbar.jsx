import Profile from "./sidebar-components/Profile";
import Button from "../button/Button";
import {faPlus, faComment} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import ChatList from "./sidebar-components/ChatList";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import CreateNewChat from "./sidebar-components/CreateNewChat";




const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const { users, chats, newChat, updateChatDetails, insertNewChat, onlineUsers, insertSingleChat } = useContext(ChatContext)
  const [isVisibleChat, setIsVisibleChat] = useState(false)

 


  //For Help using CHATGPT
  const handleHelpClick = () => {  }

  // For open chat of the chat lists
  const handleCreatClick = () => {
    setIsVisibleChat(!isVisibleChat)
  }
  const customCssForButton = {
    position:'absolute', 
    right: '10px'
  }
    return (
      
        <div className="sidebar">
          <div className="sidebar-top">
              <div className="company-name">
                <span>Tom's Enterprise</span>
              </div>
              <div className="invite-link">
                <a href="#">Invite</a>
              </div>
          </div>
          <Profile image={user.image} userName={user.name} status={'Busy'} handleLogOut={logoutUser}/>
          <div className="button_section">
            <Button text={'New Chat'} handleClick={handleCreatClick} icon={faPlus}/>
            <Button text={'Help'} handleClick={handleHelpClick} icon={faComment} style={customCssForButton}/>
            {isVisibleChat && (
              <CreateNewChat newChat={newChat} updateChatDetails={updateChatDetails} handleSubmit={insertNewChat}/>
            )}
          </div>

          <div className="chatList">
            <div className="chatList-title">
              <p>Open Chats</p>
            </div>
            <div className="chat-items">
              {chats.map((chat) => (
                <ChatList key={chat._id} name={chat.name ? chat.name : chat.userInfo?.name} image={chat.image ? chat.image : chat.userInfo.image} chat={chat} />
                
              ))}
            </div>
          </div>
          <div className="onlineUsers">
          <div className="chatList-title">
              <p>Users</p>
            </div>
            <div className="chat-items">
              {users.map((u) => (
                  <div className="chats" key={u?._id} onClick={()=>insertSingleChat(u?._id, user?._id)}>
                  <div className="image_of_chats">
                  <img src={u?.image} alt="" />
                  </div>
                  <div className="name_of_chats">
                      <p>{u?.name}</p>
                  </div>
                  <div className={onlineUsers?.some((ou) => ou.userId === u?._id) ? 'online' : ''} ></div>
                  </div>
              ))}
                
            </div>
          </div>
        </div>
     );
}
 
export default Navbar;