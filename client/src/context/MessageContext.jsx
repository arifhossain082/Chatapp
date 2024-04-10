import { createContext, useCallback, useEffect, useState } from "react";
import { baseURL, getRequest, postRequest, putRequest, deleteRequest } from '../services/services'

export const MessageContext = createContext();
export const MessageContextProvider = ({children, chatId}) => {
    const [messages, setMesssages] = useState([])
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
//     // const [newMessage, setNewMessage] = useState('')
//     // const [isNewMsgLoading, setIsNewMsgLoading] = useState(false)
//     // const [newMsgError, setNewMsgError] =useState('')
//     // const [updateMsgInfo, setUpdateMsgInfo] = useState('')
// console.log(messages)

    useEffect(()=>{
      const getMessage = async()=>{
        setIsMessageLoading(true)
        setMesssages([1, 2, 3])
        setIsMessageLoading(false)
        // const response = await getRequest(`${baseURL}/messages/${chatId}`);
        // if(response?.error){
        //   console.log(response.error);
        //   return  setErrorMessage(response?.error)
            
        // }
        // setIsMessageLoading(false);
        // setMesssages(response);
      }
      getMessage()
    }, [chatId])
    

//     // const newMessageInfo = useCallback((info) => {
//     //   setNewMessage(info);
//     // }, [])


    // const saveMessage = useCallback(async(e)=>{
    //     e.preventDefault()
    //     setIsNewMsgLoading(true);
    //     const response = await postRequest(
    //      `${baseURL}/messages/`,
    //      JSON.stringify(newMessage)
    //     )

    //     if(response?.error){
    //      setNewMsgError(response?.error)
    //     }

    //     setIsNewMsgLoading(false)
    //     setMessages(...response)

    // }, [newMessage])
    

//     // const updateInfo = useCallback((info) => {
//     //   setUpdateMsgInfo(info)
//     // },[])


//     // const updateMessage = useCallback(async(e)=>{
      
//     //     const response = await putRequest(
//     //       `${baseURL}/messages/${updateMsgInfo?._id}`,
//     //       JSON.stringify(updateMsgInfo)
//     //     )

//     //     if(response?.error){
//     //       console.log(response?.error)
//     //     }

//     //     setMesssages(...response)
//     // }, [updateMsgInfo])
    

//     // const deleteMsg = useCallback(async(msgId)=>{
//     //   const response = await deleteRequest(`${baseURL}/messages/${msgId}`)
//     //   if(response?.error){
//     //     console.log(response?.error)
//     //   }
//     //   return response
//     // }, [])


    return(
      <MessageContext.Provider value={{
        messages,
        isMessageLoading,
        errorMessage
//         // newMessage,
//         // isNewMsgLoading,
//         // newMsgError,
//         // newMessageInfo,
//         // updateInfo,
//         // deleteMsg,
//         // saveMessage,
//         // updateMessage
      }} >
        {children}
      </MessageContext.Provider>
    )

  }