import React, { useState, useEffect,createContext, useContext, useCallback, } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { socketContext } from "./socket";

export const chatContext = createContext()

function ChatContextProvider({children}){

    const [contacts, setContacts] = useState([])
    const [chatList, setChatList] = useState([]);
    const [user,setUser] = useState('')
    const [message, setMessage] = useState("");
  
    const { socket } = useContext(socketContext);
    useEffect(()=>{
        getLocalData();
        getData();
    },[])

    const getData = async () => {
        const customer = await AsyncStorage.getItem("customerId");
        if (customer) {
          const customerId = await JSON.parse(customer);
          setUser(customerId);
        }
      };
    
    const getLocalData =async()=>{
        const jsonValue = await AsyncStorage.getItem('contacts')
        if(jsonValue !== null){
            const data = await JSON.parse(jsonValue)
            setContacts(data)
        }
    }
    const createContact = async (name, vendor)=>{
        setContacts([...contacts, {name,vendor}])
        AsyncStorage.setItem("contacts", JSON.stringify(contacts));
    }
    
    const sendMessageSocket = (receiver, text)=>{
        if(socket === null) return
        socket.emit("send-message", {receiver, text})
    }

    const sendMessage=(recipient, text)=>{
        sendMessageSocket(recipient, text)
        setMessage('')
        addMessage(recipient, text, user )
    }
    const addMessage = ({recipient, text, sender}) =>{
        setChatList([...chatList, { recipient,sender, messages: text}].reverse())
    }
    return(
        <chatContext.Provider value={{contacts, createContact, sendMessage, chatList, setChatList, message, setMessage}}>
            {children}
        </chatContext.Provider>
    )
}
export default ChatContextProvider