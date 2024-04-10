const Message = ({userMessage, user}) => {

// // Create a Date object from the timestamp string
// const date = new Date(userMessage.createdAt);

// // Get the components of the date
// const year = date.getFullYear();
// const month = date.getMonth() + 1; // Months are zero-based, so add 1
// const day = date.getDate();
// const hours = date.getHours();
// const minutes = date.getMinutes();

// // Format the date and time as desired
// const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
// const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - messageDate.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in a week

    if (timeDiff > oneWeek) {
        // Display the full date if message is older than a week
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return messageDate.toLocaleDateString('en-US', options);
    } else {
        // Display day name and time if message is within a week
        const options = { weekday: 'short', hour: 'numeric', minute: 'numeric' };
        return messageDate.toLocaleDateString('en-US', options);
    }
};

    return ( 
        <div className="message">
            <div className="message_img">
                {userMessage?.sender && (
                   <img src={userMessage?.sender?.image} alt="" />
                )
                }
                
            </div>
            <div className="message-text">
                <p className="name"><strong>{
                    userMessage?.sender && (
                        userMessage?.sender?.name
                    )
                    }</strong></p>
                <p>{userMessage?.text}</p>
            </div>
            <div className="message-time">
                <small>{formatMessageTime(userMessage.createdAt)}</small>
            </div>
        </div>
     );
}
 
export default Message;