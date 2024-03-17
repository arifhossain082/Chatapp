import Profile from "./sidebar-components/Profile";
import Profile_img from '../../assets/img/IMG_0949.png';
import Button from "../button/Button";
import {faPlus, faComment} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import team_image from '../../assets/img/team_image.jpg';
import starting_image from '../../assets/img/starting_image.png';
import internal_image from '../../assets/img/default-group-5.png'
import maintenance_image from '../../assets/img/27048061708899847550626b.jpg'
import support_image from '../../assets/img/3da630917088999941cdb1e2.jpg'
import ChatList from "./sidebar-components/ChatList";


const Navbar = () => {
  const default_Chats = [
    {
      name: 'Start & Finish / When back',
      image: starting_image,
    },
    {
      name: 'Main Team Chat',
      image: team_image,
    },
    {
      name: 'Internal Software (Chat)',
      image: internal_image,
    },
    {
      name: '3. WP Maintenance (Silvercrow, JHA, TR)',
      image: maintenance_image
    },
    {
      name: '5. Support (Ethical Team, E4A etc)',
      image: support_image
    }
  ]
    
  const [chats, setChats] = useState([...default_Chats])
  //For create new Chat
  const handleCreatClick = () => {  }

  //For Help using CHATGPT
  const handleHelpClick = () => {  }

  // For open chat of the chat lists
  const handleOpenChat = () => {}
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
          <Profile image={Profile_img} userName={'Arif Hossain'} status={'Busy'}/>
          <div className="button_section">
            <Button text={'New Chat'} handleClick={handleCreatClick} icon={faPlus}/>
            <Button text={'Help'} handleClick={handleHelpClick} icon={faComment} style={customCssForButton}/>
          </div>

          <div className="chatList">
            <div className="chatList-title">
              <p>Open Chats</p>
            </div>
            <div className="chat-items">
              {chats.map((chat,index) => (
                <ChatList key={index} name={chat.name} image={chat.image} handleClick={handleOpenChat}/>
                
              ))}
            </div>
          </div>
        </div>
     );
}
 
export default Navbar;