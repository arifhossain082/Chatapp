const Message = ({userMessage}) => {
    return ( 
        <div className="message">
            <div className="message_img">
                <img src={userMessage.image} alt="" />
            </div>
            <div className="message-text">
                <p className="name"><strong>{userMessage.name}</strong></p>
                <p>{userMessage.text}</p>
            </div>
            <div className="message-time">
                <small>{userMessage.time}</small>
            </div>
        </div>
     );
}
 
export default Message;