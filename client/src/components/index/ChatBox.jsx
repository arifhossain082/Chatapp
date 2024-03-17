import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faPlus} from '@fortawesome/free-solid-svg-icons'
import Message from "./Message";
import image from '../../assets/img/favicon.png'
import Input from "./Input";
const ChatBox = () => {
    const userMessage = [
        {
            name: 'Arif Hossain',
            image: image,
            text: 'I am starting work now',
            time: '10:00 AM'
        },
        {
            name: 'Malik Younus',
            image: image,
            text: 'I am starting work now',
            time: '10:00 AM'
        },
        {
            name: 'Masum Ahmed',
            image: image,
            text: 'I am starting work now',
            time: '10:00 AM'
        },
    ]


    return ( 
        <div className="chatBox">
           <div className="chat_header">
            <div className="chat_name">
                <h1>Start & Finish / When back</h1>
            </div>
            <div className="chat_info">
                <FontAwesomeIcon icon={faUser} /> 4
                <button><FontAwesomeIcon icon={faPlus}/> Add</button>
                <span>Share project files, manage tasks and get updates</span>
            </div>
           </div>
           <div className="chat-body">
                {userMessage.map((message, index) => (
                    <Message key={index} userMessage={message}/>
                ))}
            </div>
            <Input />
        </div>
     );
}
 
export default ChatBox;