import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MessageComponent from '@/components/MessageComponent';
import NotifiComponent from '@/components/NotifiComponent';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'notifications' && styles.activeTab]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}>
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
            Messages
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'notifications' ? <NotifiComponent /> : <MessageComponent />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 16, // Added padding to the tabs
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 16, // Added padding to the content
  },
});

export default Inbox;


// import { View, Text } from 'react-native'
// import React from 'react'

// const inbox = () => {
//   return (
//     <View>
//       <Text>inbox</Text>
//     </View>
//   )
// }

// export default inbox