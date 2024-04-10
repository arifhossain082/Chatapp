import { Children, createContext, useCallback, useEffect, useState } from "react";
import { baseURL, getRequest, postRequest, putRequest } from '../services/services'
import { io } from 'socket.io-client'


export const ChatContext = createContext();
export const ChatContextProvider = ({children, user}) => {
    //All users
    const [users, setUsers] = useState([])

    //Current chat
    const [selectedChat, setSelectedChat] = useState(null);

    //All chats
    const [chats, setChats] = useState([])
    const [newChat, setNewChat] = useState({
      name: '',
      description: '',
      members: []
  })
    //Messages
    const [messages, setMesssages] = useState([])
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    const [newMessage, setNewMessage] = useState(null)
    const [textMessageError, setTextMessageError] = useState('')

    const [messageUserinfo, setMessageUserInfo] = useState(null)
    const [senderId, setSenderId] = useState('')

    //Todo states
    const [todos, setTodos] = useState([]);
    const [isTodoLoading, setIsTodoLoading] = useState(false);
    const [todoError, setTodoError] = useState('');
    
    //Socket
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)

    useEffect(()=>{
      const newSocket = io('http://127.0.0.1:3000')
      setSocket(newSocket)

      return ()=>{
        newSocket.disconnect()
      }
    },[user])

    useEffect(()=>{
      if(socket === null || !user?._id) return;
      socket.emit("addNewUser", user._id);
      socket.on("getOnlineUsers", (res)=>{
        setOnlineUsers(res)
      })
    },[socket])

    useEffect(()=>{
      if (socket === null) return
      socket.emit("sendMessage", {...newMessage})
    },[newMessage])

    useEffect(()=>{
      if(socket === null) return
      socket.on("getMessage", (res) => {
        if(selectedChat?._id !== res.chatId) return
        setMesssages((prev) => [...prev, res])
      })
      return()=>{
        socket.off("getMessage")
      }
    }, [socket, selectedChat])


    //GET Todos
    useEffect(()=>{
       const getAllTodos = async()=>{
        setIsTodoLoading(true);
        
        const response = await getRequest(`${baseURL}/todos`)
        if(response?.error){
          return setTodoError(response?.error)
        }
        setIsTodoLoading(false);
        setTodos(response);
       }
       getAllTodos()
    }, [user])

    const insertTodo = useCallback(async(userId, todoText, setTodoText)=>{
      const response = await postRequest(
        `${baseURL}/todos`,
         JSON.stringify({
            userId: userId,
            text: todoText
         })
      )
      if(response?.error){
        console.log(response?.error)
      }

      setTodos(prev => [...prev, response])
      setTodoText('')
      
    }, [])
   //Update ToDo
    const updateTodo = useCallback(async(todoId)=>{
      const response = await putRequest(`${baseURL}/todos/${todoId}`)
      if(response?.error){
        console.log(response?.error)
      }
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, status: 'COMPLETED' } : todo
        )
      );
    }, []) 



    //update chat info for make new chat
    const updateChatDetails = useCallback((chatDetails) => {
      setNewChat(chatDetails);
  });

  useEffect(()=>{
    if(user){
      setNewChat({
        ...newChat,
        members: [...newChat.members, user?._id]
      })
    }
  }, [user])

  //Insert new chat
  const insertNewChat = useCallback(async(e)=>{
    e.preventDefault()
    const response = await postRequest(
      `${baseURL}/chats/groupChat`,
      JSON.stringify(newChat)
    )
console.log(response);
  if(response?.error){
    return console.log(response?.error);
  }
  setChats(prev => [...prev, response]);
  setNewChat({
    name: '',
    description: '',
    members: []
  })

  },[newChat])

  const insertSingleChat = useCallback(async(firstId, secondId)=>{
    const response = await postRequest(
      `${baseURL}/chats`,
      JSON.stringify({
        firstId: firstId,
        secondId: secondId
      })
    )
    if(response?.error){
      console.log(response?.error)
    }
    const chatId = chats.find(chat => chat?._id === response?._id)
    if(chatId){
      const user = await getRequest(`${baseURL}/users/${firstId}`)
      const updateSingleChat = {...response, userInfo:user}
      setSelectedChat(updateSingleChat)
      return
    }
    setChats(prev => [...prev, response])
    const user = await getRequest(`${baseURL}/users/${firstId}`)
    const updateSingleChat = {...response, userInfo:user}
    setSelectedChat(updateSingleChat)
  },[])
 
  //Add new members in chat
  const addNewMember = useCallback(async(chatId, members)=>{
    const response = await postRequest(
      `${baseURL}/chats/addMembers`,
      JSON.stringify({
        chatId: chatId,
        newMembers: members
      })
    )
    if(response?.error){
      console.log(response?.error)
    }

    return response

  },[])

  //Get the user info 
   useEffect(()=>{
    const getmessageInfo = async()=>{
         const response = await getRequest(`${baseURL}/users/${senderId}`)
         if(response?.error){
            console.log(response?.error);
         }
         setMessageUserInfo(response)
    }
    getmessageInfo()
}, [])
 
    // useEffect(()=>{
    //     const makeChatName = async()=>{
           
    //         if (selectedChat && !selectedChat.name) {
    //         //     const id = selectedChat?.members?.find(u => u !== user?._id);
            
    //         // setIsLoadingChatUser(true)
    //         //  const response = await getRequest(`${baseURL}/users/${id}`)
    //         //  if(response?.error){
    //         //     console.log(response?.error)
    //          }
    //          setChatUser(response)
    //          setIsLoadingChatUser(false)
    //         }
    //     }
    //     makeChatName()
    // }, [selectedChat])
    

    //get All users
    useEffect(()=>{
        const getAllUsers = async () => {
            try{
               const response = await getRequest(`${baseURL}/users`);
               if (response.error) {
                console.error('Error fetching users:', response.error);
            }
            setUsers([])
            let allUsers = response.filter(u => u?._id !== user?._id)
            setUsers(allUsers)

            }catch(e){
                console.log(e)
            }
        }
        getAllUsers()
    }, [user])
  

    //Get all chats
    useEffect(()=>{
        const getAllChats = async () => {
            try{
               const response = await getRequest(`${baseURL}/chats/${user?._id}`);
               if (response.error) {
                console.error('Error fetching users:', response.error);
            }
             // Fetch user info for each senderId in the messages
             const updatedChats = await Promise.all(
                response.map(async chat => {
                  if(!chat?.name){
                    const oppositeId = chat?.members?.find(id => id !== user?._id)
                    if(oppositeId){
                        const oppositeUser = await getRequest(`${baseURL}/users/${oppositeId}`);
                        return {...chat, userInfo: oppositeUser}
                    }
                  }else{
                    return chat;
                  }
                  
                })
                );

            setChats(updatedChats)

            }catch(e){
                console.log(e)
            }
        }
        getAllChats()
    }, [user])


    //Get messages
    useEffect(()=>{
        const getMessage = async()=>{
          setIsMessageLoading(true)
          const response = await getRequest(`${baseURL}/messages/${selectedChat?._id}`);
          if(response?.error){
            console.log(response.error);
            return  setErrorMessage(response?.error)
              
          }
          // Fetch user info for each senderId in the messages
        const updatedMessages = await Promise.all(
        response.map(async message => {
          // Fetch user info for senderId
          const user = await getRequest(`${baseURL}/users/${message.senderId}`); // Assuming you have an API function to fetch user by ID
          // Combine user info with message object
          return { ...message, sender: user };
        })
      );
          setIsMessageLoading(false);

          setMesssages(updatedMessages);
        }
        getMessage()
      }, [selectedChat])


      //Insert new Message
    const saveMessage = useCallback(async(textMessage, setTextMessage, senderId, chatId)=>{
        if(!textMessage) return console.log('Please type something...');
        const response = await postRequest(
         `${baseURL}/messages/`,
         JSON.stringify({
            chatId: chatId,
            senderId: senderId,
            text: textMessage
         })
        )
        
        if(response?.error){
         setTextMessageError(response?.error)
        }
        const user = await getRequest(`${baseURL}/users/${senderId}`);
        const updateMessage = {...response, sender: user}
        setNewMessage(updateMessage)
        setMesssages((prev) => [...prev, updateMessage])
        setTextMessage('')
        
    }, [])

    return(
        <ChatContext.Provider value={{
            users,
            chats,
            newChat,
            updateChatDetails,
            selectedChat,
            setSelectedChat,
            messages,
            isMessageLoading,
            newMessage,
            saveMessage,
            setNewMessage,
            messageUserinfo,
            setSenderId,
            insertNewChat,
            insertTodo,
            todos,
            updateTodo,
            onlineUsers,
            insertSingleChat,
            addNewMember

        }}>
            {children}
        </ChatContext.Provider>
    )

}