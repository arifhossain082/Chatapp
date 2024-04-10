import { useContext, useState } from 'react';
import Input from '../../utils/Input_Field'
import Button from '../../button/Button';
import { ChatContext } from '../../../context/ChatContext';

const CreateNewChat = ({newChat, updateChatDetails, handleSubmit}) => {
    const { users } = useContext(ChatContext);
    const handleChange = (e) => {
      const {name, value} = e.target;
      updateChatDetails({...newChat, [name]:value})
    }

    const handleCheckBox = (e)=>{
        const userId = e.target.value;
        const isChecked = e.target.checked;

        if(isChecked){
            updateChatDetails({
                ...newChat,
                members: [...newChat.members, userId]
            })
        }else{
            updateChatDetails({
                ...newChat,
                members: newChat.members.filter((id) => id !== userId)
            })
        }
    }

    return ( 
     <>
     <div className="create-new-chat">
        <div className="chat-info-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Chat Title</label>
                <Input type={'text'} name={'name'} placeholder={'Enter your chat name'} handleChange={handleChange} value={newChat.name} />
                <br />
                <br />
                <label htmlFor="description">Chat description</label>
                <Input type={'text'} name={'description'} placeholder={'Enter your chat description'} handleChange={handleChange} value={newChat.description} />
                <div className='all-users'>
                    <div className="list">
                        <table>
                        {users.map((user) => (
                            <tr key={user?._id}>
                                <td>
                                <img src={user.image} alt="" />
                                </td>
                                <td><h4>{user.name}</h4></td>
                                <td><input type="checkbox" value={user._id} className='checkbox' onChange={handleCheckBox} checked={newChat.members.includes(user._id)} /></td>
                            </tr>
                        ))}
                        
                        </table>
                    </div>
                </div>
                <input type="submit" value="Create new Chat" />
            </form>
        </div>
     </div>
     </>

     );
}
 
export default CreateNewChat;