import { baseURL, getRequest, postRequest } from '../../../services/services'
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../../context/ChatContext";




const ChatList = ({image, name, chat}) => {

    const { setSelectedChat } = useContext(ChatContext)

    const handleCreatChat = () => {
        setSelectedChat(chat)
    }

    // const initalChatInfo = {
    //         firstId: user_id,
    //         secondId: login_user_id
    // }
    // const [chatError, setChatError] = useState(null)
    // const [chatLoading, setChatLoading] = useState(false)
    // const [chatInfo, setChatInfo] = useState(initalChatInfo)
    
    
    // const handleCreatChat = async () => { 
    //      setSelectedChat(null);
    //        const response = await postRequest(
    //         `${baseURL}/chats`,
    //         JSON.stringify(initalChatInfo)
    //     )

    //        setChatLoading(false)
    //        if(response?.error){
    //           return setChatError(response?.error)
    //        }
    //        setSelectedChat(response)
    //      }

  //For create new Chat
    return ( 
        <div className="chats" onClick={handleCreatChat}>
            <div className="image_of_chats">
            <img src={image} alt="" />
            </div>
            <div className="name_of_chats">
                <p>{name}</p>
            </div>
        </div>
     );
}
 
export default ChatList;