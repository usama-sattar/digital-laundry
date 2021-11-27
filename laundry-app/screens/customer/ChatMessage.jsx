import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  useRef,
} from "react";
window.navigator.userAgent = "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { colors } from "../../global/colors";
import { chatContext } from "../../context/chat";
import axios from "axios";
import { API } from "../../global/constants";
import io from "socket.io-client/dist/socket.io";

export function ChatMessage({ route }) {
  const { user } = useContext(chatContext);
  const [messages, setMessages] = useState([]);
  const { currentChat } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://192.168.0.107:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${API}/conversation/message/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async () => {
    const message = await {
      sender: user,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => member !== user);

    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${API}/conversation/message`, { message });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <FlatList
        style={{ height: "87%", bottom: "3%" }}
        data={messages && messages.reverse()}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Msg msg={item.text} own={item.sender === user} />
        )}
      />
      <View
        style={{
          marginHorizontal: 20,
          alignSelf: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <TextInput
          placeholder="Type here.."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          style={{
            width: "80%",
            borderWidth: 0.5,
            padding: 8,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryColor,
            width: " 20%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleSubmit()}
          disabled={newMessage ? false : true}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function Msg({ msg, own }) {
  return (
    <Fragment>
      {own ? (
        <View style={styles.outgoingContainer}>
          <Text style={styles.outgoingText}>{msg}</Text>
        </View>
      ) : (
        <View style={styles.incomingContainer}>
          <Text style={styles.incomingText}>{msg}</Text>
        </View>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  incomingContainer: {
    backgroundColor: colors.primaryColor,
    maxWidth: "70%",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    marginVertical: 5,
    borderTopRightRadius: 8,
    padding: 5,
  },
  outgoingContainer: {
    backgroundColor: "white",
    maxWidth: "70%",
    alignSelf: "flex-end",
    marginHorizontal: 15,
    marginVertical: 5,
    borderTopLeftRadius: 8,
    padding: 5,
  },
  incomingText: {
    color: "white",
  },
  outgoingText: {
    color: "black",
  },
});

export default ChatMessage;
