import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
const AddMembers = ({chatId}) => {
    const { users, addNewMember, selectedChat } = useContext(ChatContext)
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [newMembers, setNewMembers] = useState([])

    useEffect(() => {
        // Set selectedUsers to selectedChat.members when the component mounts
        setSelectedUsers(selectedChat?.members || []);
    }, [selectedChat]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        addNewMember(chatId, newMembers);
        setSelectedUsers([]);
    }
    const handleCheckBox = (e)=>{
        const userId = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setNewMembers([...newMembers, userId]);
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setNewMembers(newMembers.filter(id => id !== userId));
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    }
    return ( 
        <div className="add_members">
             <form onSubmit={handleSubmit}>
                <div className='all-users'>
                    <div className="list">
                        <table>
                        {users.map((user) => (
                            <tr key={user?._id}>
                                <td>
                                <img src={user?.image} alt="" />
                                </td>
                                <td><h4>{user?.name}</h4></td>
                                <td><input type="checkbox" value={user?._id} className='checkbox' onChange={handleCheckBox} checked={selectedUsers?.includes(user?._id)} /></td>
                            </tr>
                        ))}
                        
                        </table>
                    </div>
                </div>
                <input type="submit" value="Create new Chat" />
            </form>
        </div>
     );
}
 
export default AddMembers;