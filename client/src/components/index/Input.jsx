import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/Button";
import Input_Field from "../utils/Input_Field";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext'

const Input = ({textMessage, setTextMessage, saveMessage}) => {
    const { selectedChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call saveMessage here
        saveMessage(textMessage, setTextMessage, user?._id, selectedChat?._id);
    };
    const handleChange = (e) => {
        setTextMessage(e.target.value)
    }

    const button_style = {
        border: 'none',
    }
    return ( 
        <div className="input">
            <form className="form" onSubmit={handleSubmit}>
               <Input_Field type='text' placeholder='Message' value={textMessage} name='text' handleChange={handleChange}/>
               <Button style={button_style} type="submit" icon={faPaperPlane} />
            </form>
            <div className="input-tools">
                <div><b>B</b></div>
                <div><i>I</i></div>
                <div><u>U</u></div>
                <div><FontAwesomeIcon icon={faFileImage} /></div>
            </div>
        </div>
     );
}
 
export default Input;