import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const messages = [
  {
    id: '1',
    name: 'John Doe',
    message: 'Hey, are we still on for the weekend?',
    time: '2:15 PM',
    avatar: 'https://example.com/avatar1.png', // Placeholder URL
  },
  {
    id: '2',
    name: 'Jane Smith',
    message: 'Can you send me the documents?',
    time: '1:45 PM',
    avatar: 'https://example.com/avatar2.png', // Placeholder URL
  },
  // Add more messages as needed
];

const messageComponent = () => {
  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
});

export default messageComponent;