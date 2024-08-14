import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const notifications = [
  {
    id: '1',
    message: 'Your friend John Doe liked your post.',
    time: '3:30 PM',
    icon: 'https://example.com/like-icon.png', // Placeholder URL
  },
  {
    id: '2',
    message: 'Jane Smith commented on your photo.',
    time: '2:50 PM',
    icon: 'https://example.com/comment-icon.png', // Placeholder URL
  },
  // Add more notifications as needed
];

const notifiComponent = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <View style={styles.notificationContent}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={notifications}
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
});

export default notifiComponent;