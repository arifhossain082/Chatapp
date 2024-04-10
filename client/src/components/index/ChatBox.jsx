import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faPlus} from '@fortawesome/free-solid-svg-icons'
import Message from "./Message";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddMembers from "./AddMembers";

const ChatBox = () => {
    
    const { selectedChat, isLoadingChatUser, messages, saveMessage, isMessageLoading} = useContext(ChatContext)
    const {user} = useContext(AuthContext)
    const [textMessage, setTextMessage] = useState('')
    const [isVisibleAddNewMembers, setIsVisibleAddNewMembers] =useState(false)

    const visibleClick = ()=>{
        setIsVisibleAddNewMembers(!isVisibleAddNewMembers)
    }
   
    return ( 
        <div className="chatBox">
           <div className="chat_header">
            <div className="chat_name">
            { selectedChat?.name ? (
                <h1>{isLoadingChatUser ? 'Loading...' : selectedChat?.name}</h1>
            ) : (
                <h1>{isLoadingChatUser ? 'Loading...' : selectedChat?.userInfo.name}</h1>
            )
            }
                
            </div>
            <div className="chat_info">
                <FontAwesomeIcon icon={faUser} /> {selectedChat?.members?.length}
                <button onClick={visibleClick}><FontAwesomeIcon icon={faPlus}/> Add</button>
                {isVisibleAddNewMembers && (
                    <AddMembers chatId={selectedChat?._id}/>
                )}
                <span>Share project files, manage tasks and get updates</span>
            </div>
           </div>
           <div className="chat-body">
            {isMessageLoading && (
                <p>Loading...</p>
            )}
                {messages?.map((message) => (
                    <Message key={message?._id} userMessage={message} user={user}/>
                ))}
            </div>
            <Input textMessage={textMessage} setTextMessage={setTextMessage} saveMessage={saveMessage} />
           
           
        </div>
        
     )
}
 
export default ChatBox;