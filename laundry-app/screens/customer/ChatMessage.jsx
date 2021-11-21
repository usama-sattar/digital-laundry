import React, { useState, useEffect, useContext, Fragment } from "react";
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
import { socketContext } from "../../context/socket";

export function ChatMessage({ route }) {
  const {
    chatList,
    setChatList,
    message,
    setMessage,
    sendMessage,
    addMessage,
  } = useContext(chatContext);
  const { recipient } = route.params;
  const { socket } = useContext(socketContext);

  useEffect(() => {
    if (socket === null) return;
    socket.once("load-room", (doc) => {
      setChatList(doc);
    });
    socket.emit("get-room", recipient);
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("recieve-message", addMessage);
  }, [socket, addMessage]);

  useEffect(() => {});
  return (
    <View>
      <FlatList
        style={{ height: "87%", bottom: "3%" }}
        data={chatList}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Msg msg={item.messages} />}
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
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            width: "80%",
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.pinkColor,
            width: " 20%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          disabled={message ? false : true}
          onPress={() => sendMessage(JSON.stringify(recipient.vendor), message)}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function Msg({ msg }) {
  return (
    <Fragment>
      <View style={styles.incomingContainer}>
        <Text style={styles.incomingText}>{msg}</Text>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  incomingContainer: {
    backgroundColor: colors.pinkColor,
    maxWidth: "70%",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    marginVertical: 5,
    borderTopRightRadius: 8,
    padding: 5,
  },
  sentContainer: {
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
});

export default ChatMessage;
