import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { chatContext } from "../../context/chat";
import { ListItem, Avatar } from "react-native-elements";
import { API } from "../../global/constants";
import axios from "axios";

export default function ChatScreen({ route, navigation }) {
  if (route.params) {
    const { data } = route.params;
  }
  const { user } = useContext(chatContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${API}/conversation/60b143c25b73f61e9028d467`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  return (
    <View style={styles.container}>
      <View>
        {conversations.length > 0 ? (
          conversations.map((c, i) => (
            <Pressable
              onPress={() =>
                navigation.navigate("ChatMessageScreen", { currentChat: c })
              }
            >
              <ConversationContainer
                conversation={c}
                currentUser={user}
                index={i}
              />
            </Pressable>
          ))
        ) : (
          <Text>No contacts</Text>
        )}
      </View>
    </View>
  );
}

function ConversationContainer({
  conversation,
  currentUser,
  index,
  navigation,
}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    const getUser = async () => {
      try {
        const res = await axios.get(`${API}/vendors/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return user === null ? (
    <Text>Nothing</Text>
  ) : (
    user.map((u) => {
      return (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{u.name}</ListItem.Title>
            <ListItem.Subtitle>{u.phone}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    })
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
