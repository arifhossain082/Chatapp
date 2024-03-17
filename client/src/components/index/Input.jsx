import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/Button";
import Input_Field from "../utils/Input_Field";

const Input = () => {
    const [value, setValue] = useState('')

    const handleChange = ()=>{}
    const handleSubmit = ()=>{}

    const button_style = {
        border: 'none',
    }
    return ( 
        <div className="input">
            <form onSubmit={handleSubmit} className="form">
               <Input_Field type='text' placeholder='Message' name='message' value={value} handleChange={handleChange}/>
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