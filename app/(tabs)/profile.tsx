
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';


const Profile = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarText}>9:41</Text>
      </View>

      {/* Header with icons */}
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => router.push('/screens/Settings')}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => router.push('/screens/BookMarks')}>
            <Ionicons name="bookmark-outline" size={24} color="black" style={styles.iconSpacing} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log('Booking icon pressed');
            router.push('/screens/BookingSaved');
          }}>
            <Ionicons name="calendar-outline" size={24} color="black" style={styles.iconSpacing} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color="black" style={styles.iconSpacing} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImagePlaceholder}>
          <Text>Profile Image</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            <Text style={styles.statNumber}>21</Text>
            <Text style={styles.statLabel}> Friends</Text>
          </Text>
          <Text style={styles.stats}>
            <Text style={styles.statNumber}>123</Text>
            <Text style={styles.statLabel}> Activities Done</Text>
          </Text>
        </View>
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
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>🏀 Basketball</Text>
          <View style={styles.activityButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
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
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>🏊‍♂️ Swimming</Text>
          <View style={styles.activityButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
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
  },
  statusBar: {
    height: 44,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f9f9f9',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statsContainer: {
    flex: 1,
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    color: '#000',
  },
  activityButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 4,
    marginLeft: 8,
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


// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { TouchableOpacity } from 'react-native';

// const Profile = () => {
//   const router = useRouter();

//   return (
//     <ScrollView style={styles.container}>
//       {/* Status Bar */}
//       <View style={styles.statusBar}>
//         <Text style={styles.statusBarText}>9:41</Text>
//       </View>

//       {/* Header with icons */}
//       <View style={styles.headerIcons}>
//         <TouchableOpacity onPress={() => router.push('/screens/Settings')}>
//           <Ionicons name="settings-outline" size={24} color="black" />
//         </TouchableOpacity>
//         <View style={styles.headerButtons}>
//           <TouchableOpacity onPress={() => router.push('/screens/BookMarks')}>
//             <Ionicons name="bookmark-outline" size={24} color="black" style={styles.iconSpacing} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="calendar-outline" size={24} color="black" style={styles.iconSpacing} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Ionicons name="add-circle-outline" size={24} color="black" style={styles.iconSpacing} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Profile Header */}
//       <View style={styles.profileHeader}>
//         <View style={styles.profileImagePlaceholder}>
//           <Text>Profile Image</Text>
//         </View>
//         <View style={styles.statsContainer}>
//           <Text style={styles.stats}>
//             <Text style={styles.statNumber}>21</Text>
//             <Text style={styles.statLabel}> Friends</Text>
//           </Text>
//           <Text style={styles.stats}>
//             <Text style={styles.statNumber}>123</Text>
//             <Text style={styles.statLabel}> Activities Done</Text>
//           </Text>
//         </View>
//       </View>

//       {/* User Bio */}
//       <View style={styles.bioSection}>
//         <Text style={styles.userName}>Alec Whitman</Text>
//         <Text style={styles.userBio}>
//           I love exploring new parks, hitting the courts, and meeting like-minded people in the community!
//         </Text>
//       </View>

//       {/* Activity Sections */}
//       <View style={styles.activitySection}>
//         <View style={styles.activityHeader}>
//           <Text style={styles.activityTitle}>🏀 Basketball</Text>
//           <View style={styles.activityButtons}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="add-circle-outline" size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="ellipsis-horizontal" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
//           <View style={styles.imagePlaceholder}>
//             <Text>Image 1</Text>
//           </View>
//           <View style={styles.imagePlaceholder}>
//             <Text>Image 2</Text>
//           </View>
//           {/* Add more placeholders as necessary */}
//         </ScrollView>
//       </View>

//       <View style={styles.activitySection}>
//         <View style={styles.activityHeader}>
//           <Text style={styles.activityTitle}>🏊‍♂️ Swimming</Text>
//           <View style={styles.activityButtons}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="add-circle-outline" size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="ellipsis-horizontal" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
//           <View style={styles.imagePlaceholder}>
//             <Text>Image 1</Text>
//           </View>
//           <View style={styles.imagePlaceholder}>
//             <Text>Image 2</Text>
//           </View>
//           {/* Add more placeholders as necessary */}
//         </ScrollView>
//       </View>

//       {/* Add more categories similarly */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   statusBar: {
//     height: 44,
//     paddingTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   statusBarText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
//   headerButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconSpacing: {
//     marginLeft: 16,
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   profileImagePlaceholder: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   statsContainer: {
//     flex: 1,
//   },
//   stats: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   statNumber: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#777',
//   },
//   bioSection: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   userBio: {
//     fontSize: 14,
//     color: '#555',
//   },
//   activitySection: {
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//   },
//   activityHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   activityTitle: {
//     fontSize: 16,
//     color: '#000',
//   },
//   activityButtons: {
//     flexDirection: 'row',
//   },
//   iconButton: {
//     padding: 4,
//     marginLeft: 8,
//   },
//   horizontalScroll: {
//     flexDirection: 'row',
//   },
//   imagePlaceholder: {
//     width: 150,
//     height: 100,
//     borderRadius: 10,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
// });

// export default Profile;
