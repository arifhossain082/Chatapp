const ChatList = ({image, name, handleClick}) => {
    return ( 
        <div className="chats" onClick={handleClick}>
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