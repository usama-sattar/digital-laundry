import React, { useEffect, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { chatContext } from "../../context/chat";
import { ListItem, Avatar } from "react-native-elements";

export default function ChatScreen({ route, navigation }) {
  const { data } = route.params;
  const { contacts, createContact } = useContext(chatContext);

  useEffect(() => {
    createContact(data.name, data.vendor);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {contacts.length > 0 ? (
          contacts.map((contact, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() =>
                navigation.navigate("ChatMessageScreen", { recipient: contact })
              }
            >
              <ListItem.Content>
                <ListItem.Title>{contact.name}</ListItem.Title>
                <ListItem.Subtitle>{contact.vendor}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        ) : (
          <Text>No contacts</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
