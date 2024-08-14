import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header with icons */}
      <View style={styles.headerIcons}>
        <Ionicons name="settings-outline" size={24} color="black" />
        <View style={styles.headerButtons}>
          <Ionicons name="create-outline" size={24} color="black" />
          <Ionicons name="bookmark-outline" size={24} color="green" style={styles.bookmarkIcon} />
        </View>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImagePlaceholder}>
          <Text>Profile Image</Text>
        </View>
        <Text style={styles.stats}>
          <Text style={styles.statNumber}>21</Text>
          <Text style={styles.statLabel}> Friends</Text>
        </Text>
        <Text style={styles.stats}>
          <Text style={styles.statNumber}>123</Text>
          <Text style={styles.statLabel}> Activities Done</Text>
        </Text>
      </View>

      {/* User Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.userName}>Alec Whitman</Text>
        <Text style={styles.userBio}>
          I love exploring new parks, hitting the courts, and meeting like-minded people in the community!
        </Text>
      </View>

      {/* Activity Sections */}
      <View style={styles.activitySection}>
        <Text style={styles.activityTitle}>🏀 Basketball</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={styles.imagePlaceholder}>
            <Text>Image 1</Text>
          </View>
          <View style={styles.imagePlaceholder}>
            <Text>Image 2</Text>
          </View>
          {/* Add more placeholders as necessary */}
        </ScrollView>
      </View>

      <View style={styles.activitySection}>
        <Text style={styles.activityTitle}>🏊‍♂️ Swimming</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={styles.imagePlaceholder}>
            <Text>Image 1</Text>
          </View>
          <View style={styles.imagePlaceholder}>
            <Text>Image 2</Text>
          </View>
          {/* Add more placeholders as necessary */}
        </ScrollView>
      </View>

      {/* Add more categories similarly */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40, // Added top padding to bring down the page content
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkIcon: {
    marginLeft: 16, // Add some space between the edit and bookmark icons
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f9f9f9',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  bioSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#555',
  },
  activitySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  activityTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default Profile;

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const profile = () => {
//   return (
//     <View>
//       <Text>profile</Text>
//     </View>
//   )
// }

// export default profile

