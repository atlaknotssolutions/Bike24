// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.profileHeader}>
//         <View style={styles.avatar}>
//           <Ionicons name="person" size={50} color="#E30613" />
//         </View>
//         <Text style={styles.name}>Atla Knots</Text>
//         <Text style={styles.phone}>+91 98765 43210</Text>
//         <Text style={styles.status}>✅ Verified Partner</Text>
//       </View>

//       <TouchableOpacity style={styles.menuItem}>
//         <Ionicons name="document-text" size={24} color="#333" />
//         <Text style={styles.menuText}>My Documents</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <Ionicons name="settings" size={24} color="#333" />
//         <Text style={styles.menuText}>Settings</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <Ionicons name="help-circle" size={24} color="#333" />
//         <Text style={styles.menuText}>Help & Support</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.menuItem, {marginTop: 40}]}>
//         <Ionicons name="log-out" size={24} color="#E30613" />
//         <Text style={[styles.menuText, {color: '#E30613'}]}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },
//   profileHeader: { alignItems: 'center', padding: 40, backgroundColor: '#fff' },
//   avatar: { 
//     width: 100, 
//     height: 100, 
//     borderRadius: 50, 
//     backgroundColor: '#ffe6e6', 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     marginBottom: 15 
//   },
//   name: { fontSize: 24, fontWeight: 'bold' },
//   phone: { fontSize: 16, color: '#666', marginTop: 5 },
//   status: { color: 'green', fontWeight: '600', marginTop: 8 },
//   menuItem: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     padding: 20, 
//     backgroundColor: '#fff', 
//     borderBottomWidth: 1, 
//     borderBottomColor: '#eee' 
//   },
//   menuText: { fontSize: 17, marginLeft: 15 },
// });

// export default ProfileScreen;



import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged Out', 'You have been logged out successfully.') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://picsum.photos/id/64/200/200' }} 
            style={styles.avatar} 
          />
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
          </View>
        </View>

        <Text style={styles.name}>Atla Knots</Text>
        <Text style={styles.phone}>+91 98765 43210</Text>
        <Text style={styles.status}>✅ Verified Channel Partner</Text>
        <Text style={styles.partnerSince}>Partner since Feb 2025</Text>
      </View>

      {/* Earnings Card */}
      <View style={styles.earningsCard}>
        <Text style={styles.earningsTitle}>This Month Earnings</Text>
        <Text style={styles.earningsAmount}>₹1,24,750</Text>
        <Text style={styles.earningsSub}>From 12 successful deals</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="wallet" size={26} color="#E30613" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>My Wallet</Text>
            <Text style={styles.menuSubtitle}>Balance: ₹48,750 • Add Money</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="document-text" size={26} color="#E30613" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>My Documents</Text>
            <Text style={styles.menuSubtitle}>GST • PAN • Aadhaar • RC • All Verified</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="trophy" size={26} color="#E30613" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>My Performance</Text>
            <Text style={styles.menuSubtitle}>42 Auctions Won • 87% Success Rate</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="card" size={26} color="#E30613" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Bank Details</Text>
            <Text style={styles.menuSubtitle}>HDFC Bank • ****1234</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="bar-chart" size={26} color="#E30613" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Auction History</Text>
            <Text style={styles.menuSubtitle}>124 Bids Placed</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings" size={26} color="#E30613" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Settings</Text>
            <Text style={styles.menuSubtitle}>Notifications, Privacy, Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle" size={26} color="#E30613" />
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Help & Support</Text>
            <Text style={styles.menuSubtitle}>Contact Us • FAQs</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#E30613" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.2.8 • Cars24 Channel Partner</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },

  profileHeader: { 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    paddingVertical: 40, 
    paddingHorizontal: 20 
  },
  avatarContainer: { 
    position: 'relative', 
    marginBottom: 15 
  },
  avatar: { 
    width: 110, 
    height: 110, 
    borderRadius: 55, 
    borderWidth: 3, 
    borderColor: '#E30613' 
  },
  verifiedBadge: { 
    position: 'absolute', 
    bottom: 4, 
    right: 4, 
    backgroundColor: '#fff', 
    borderRadius: 50 
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  phone: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 6 
  },
  status: { 
    color: '#28a745', 
    fontWeight: '600', 
    fontSize: 15 
  },
  partnerSince: { 
    color: '#999', 
    fontSize: 13, 
    marginTop: 6 
  },

  earningsCard: { 
    backgroundColor: '#fff', 
    margin: 16, 
    padding: 20, 
    borderRadius: 16, 
    elevation: 3 
  },
  earningsTitle: { 
    fontSize: 15, 
    color: '#666' 
  },
  earningsAmount: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#E30613', 
    marginVertical: 6 
  },
  earningsSub: { 
    color: '#28a745', 
    fontWeight: '600' 
  },

  menuContainer: { 
    backgroundColor: '#fff', 
    marginHorizontal: 16, 
    borderRadius: 16, 
    overflow: 'hidden',
    elevation: 2 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  menuTextContainer: { 
    flex: 1, 
    marginLeft: 16 
  },
  menuTitle: { 
    fontSize: 17, 
    fontWeight: '600' 
  },
  menuSubtitle: { 
    fontSize: 13, 
    color: '#666', 
    marginTop: 3 
  },

  logoutButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    margin: 16, 
    padding: 18, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E30613' 
  },
  logoutText: { 
    color: '#E30613', 
    fontSize: 17, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },

  version: { 
    textAlign: 'center', 
    color: '#999', 
    fontSize: 12, 
    marginVertical: 20 
  },
});

export default ProfileScreen;