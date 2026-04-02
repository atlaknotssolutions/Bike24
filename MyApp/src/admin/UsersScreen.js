// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   Pressable,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { ChevronRight, Play, Plus, Info } from 'lucide-react-native';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// const CARD_WIDTH = SCREEN_WIDTH * 0.65;
// const CARD_HEIGHT = CARD_WIDTH * 0.5625;
// const SPACING = 12;

// const romanticShows = [
//   { id: 1, title: "Love in the Clouds", thumb: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=225&fit=crop" },
//   { id: 2, title: "Hidden Love", thumb: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=225&fit=crop" },
//   { id: 3, title: "Queen of Tears", thumb: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=225&fit=crop" },
//   { id: 4, title: "Inheritors", thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop" },
//   { id: 5, title: "When I Fly Towards You", thumb: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=400&h=225&fit=crop" },
// ];

// const kidsFilms = [
//   { id: 101, title: "Chhota Bheem: The Crown", thumb: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=225&fit=crop" },
//   { id: 102, title: "Motu Patlu: Kung Fu", thumb: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&h=225&fit=crop" },
//   { id: 103, title: "Doraemon: Nobita", thumb: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=225&fit=crop" },
//   { id: 104, title: "Oggy & Cockroaches", thumb: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=225&fit=crop" },
//   { id: 105, title: "Shinchan Movie", thumb: "https://images.unsplash.com/photo-1606164587034-81b84c4e11d0?w=400&h=225&fit=crop" },
//   { id: 106, title: "Tom & Jerry", thumb: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=225&fit=crop" },
// ];

// const koreanContent = [
//   { id: 201, title: "Vincenzo", thumb: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=225&fit=crop" },
//   { id: 202, title: "Crash Landing on You", thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop" },
//   { id: 203, title: "Squid Game", thumb: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=400&h=225&fit=crop" },
//   { id: 204, title: "Weak Hero Class 1", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop" },
//   { id: 205, title: "Moving", thumb: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=225&fit=crop" },
//   { id: 206, title: "Sweet Home", thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=225&fit=crop" },
// ];

// const actionMovies = [
//   { id: 301, title: "Extraction 2", thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop" },
//   { id: 304, title: "Top Gun: Maverick", thumb: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=225&fit=crop" },
// ];

// const trendingShorts = [
//   ...koreanContent.slice(0, 3),
//   ...actionMovies.slice(0, 2),
//   { id: 401, title: "Viral Dance", thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop" },
//   { id: 402, title: "Funny Reels", thumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=225&fit=crop" },
// ];

// function SectionHeader({ title }) {
//   return (
//     <View style={styles.sectionHeader}>
//       <Text style={styles.sectionTitle}>{title}</Text>
//       <ChevronRight size={20} color="#aaa" />
//     </View>
//   );
// }

// function MovieCard({ item, onPress }) {
//   const [pressed, setPressed] = useState(false);

//   const progress = Math.floor(Math.random() * 60 + 40);

//   return (
//     <Pressable
//       onPress={() => onPress(item)}
//       onPressIn={() => setPressed(true)}
//       onPressOut={() => setPressed(false)}
//       style={({ pressed: p }) => [
//         styles.cardContainer,
//         pressed && styles.cardPressed,
//       ]}
//     >
//       <Image
//         source={{ uri: item.thumb }}
//         style={styles.cardImage}
//         resizeMode="cover"
//       />

//       {pressed && (
//         <View style={styles.cardOverlay}>
//           <View style={styles.cardControls}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Play size={20} color="black" fill="white" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButtonOutline}>
//               <Plus size={20} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButtonOutline}>
//               <Info size={20} color="white" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.cardTitle}>{item.title}</Text>
//         </View>
//       )}

//       <View style={styles.progressContainer}>
//         <View style={styles.progressBg}>
//           <View style={[styles.progressFill, { width: `${progress}%` }]} />
//         </View>
//         <Text style={styles.progressText}>{progress}% watched</Text>
//       </View>
//     </Pressable>
//   );
// }

// function ShortItem({ item, onPress }) {
//   return (
//     <TouchableOpacity
//       onPress={() => onPress(item)}
//       style={styles.shortItem}
//       activeOpacity={0.8}
//     >
//       <View style={styles.shortImageContainer}>
//         <Image
//           source={{ uri: item.thumb }}
//           style={styles.shortImage}
//           resizeMode="cover"
//         />
//         <View style={styles.rankBadge}>
//           <Text style={styles.rankText}>#{item.id % 10 || 1}</Text>
//         </View>
//       </View>
//       <Text style={styles.shortTitle} numberOfLines={1}>
//         {item.title}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// export default function UsersScreen() {
//   const navigation = useNavigation();

//   // const handleItemPress = (item) => {
//   //   navigation.navigate({
//   //     name: 'VideoDetail',
//   //     params: {
//   //       id: item.id || 1,
//   //       item ,
//   //     },
//   //   });
//   // };
// const handleItemPress = (item) => {
//   navigation.navigate('VideoDetail', {
//     id: item.id,
//     item,
//   });
// };

//   const renderHorizontalList = (data) => (
//     <FlatList
//       data={data}
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       keyExtractor={(item) => item.id.toString()}
//       contentContainerStyle={{ paddingHorizontal: SPACING }}
//       snapToInterval={CARD_WIDTH + SPACING}
//       decelerationRate="fast"
//       scrollEventThrottle={16}
//       renderItem={({ item }) => (
//         <View style={{ width: CARD_WIDTH, marginRight: SPACING }}>
//           <MovieCard item={item} onPress={handleItemPress} />
//         </View>
//       )}
//     />
//   );

//   const renderGrid = (data) => (
//     <FlatList
//       data={data}
//       numColumns={2}
//       keyExtractor={(item) => item.id.toString()}
//       columnWrapperStyle={{ gap: 12 }}
//       contentContainerStyle={{ paddingHorizontal: SPACING, paddingBottom: 12 }}
//       renderItem={({ item }) => (
//         <View style={{ flex: 1 }}>
//           <ShortItem item={item} onPress={handleItemPress} />
//         </View>
//       )}
//     />
//   );

//   const sections = [
//     { key: 'recommended', title: 'Recommended Videos', type: 'horizontal', data: romanticShows },
//     { key: 'trending', title: 'Trending Videos', type: 'horizontal', data: koreanContent },
//     { key: 'shorts-trending', title: 'Trending Shorts', type: 'grid', data: trendingShorts },
//     { key: 'latest', title: 'Latest Videos', type: 'horizontal', data: kidsFilms },
//     { key: 'subscription', title: 'Subscription Videos', type: 'horizontal', data: [
//       ...romanticShows.slice(2),
//       ...koreanContent.slice(1, 4),
//       ...actionMovies,
//     ]},
//     { key: 'shorts-top', title: 'Top Shorts', type: 'grid', data: trendingShorts },
//   ];

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={sections}
//         keyExtractor={(item) => item.key}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}
//         renderItem={({ item }) => (
//           <View style={styles.section}>
//             <SectionHeader title={item.title} />
//             {item.type === 'horizontal' ? renderHorizontalList(item.data) : renderGrid(item.data)}
//           </View>
//         )}
//         initialNumToRender={4}
//         maxToRenderPerBatch={6}
//         windowSize={5}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: SPACING,
//     marginBottom: 8,
//   },
//   sectionTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   // Card (row items)
//   cardContainer: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#111',
//   },
//   cardImage: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//   },
//   cardPressed: {
//     transform: [{ scale: 1.04 }],
//   },
//   cardOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'flex-end',
//     padding: 12,
//   },
//   cardControls: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   iconButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   iconButtonOutline: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     borderWidth: 1.5,
//     borderColor: 'rgba(255,255,255,0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   cardTitle: {
//     color: 'white',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   // Progress under card
//   progressContainer: {
//     marginTop: 6,
//     paddingHorizontal: 2,
//   },
//   progressBg: {
//     height: 3,
//     backgroundColor: '#444',
//     borderRadius: 2,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#e50914',
//   },
//   progressText: {
//     color: '#aaa',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   // Shorts grid
//   shortItem: {
//     marginBottom: 16,
//   },
//   shortImageContainer: {
//     position: 'relative',
//     aspectRatio: 16 / 9,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   shortImage: {
//     flex: 1,
//   },
//   rankBadge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   rankText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   shortTitle: {
//     color: 'white',
//     fontSize: 14,
//     marginTop: 6,
//     fontWeight: '500',
//   },
// });

// Shorts.js


// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import Video from 'react-native-video';           // npm install react-native-video
// import { Heart, MessageCircle, Share2, Volume2, VolumeX, MoreHorizontal, Music2 } from 'lucide-react-native';
// import Toast from 'react-native-toast-message';   // npm install react-native-toast-message

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const shortsData = [
//   {
//     id: 's1',
//     title: 'Amazing Nature Moments',
//     views: '2.6M views',
//     likes: '145K',
//     comments: '3.2K',
//     videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
//   },
//   {
//     id: 's2',
//     title: 'Cute Cats Compilation',
//     views: '4.2M views',
//     likes: '220K',
//     comments: '8.5K',
//     videoUrl: 'https://www.w3schools.com/html/movie.mp4',
//   },
//   // Add 5–10 more items for better testing
// ];

// export default function UsersScreen() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [liked, setLiked] = useState({});
//   const [muted, setMuted] = useState(true);

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 70, // 70% visible → consider "current"
//   }).current;

//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       const newIndex = shortsData.findIndex(
//         (item) => item.id === viewableItems[0].item.id
//       );
//       if (newIndex !== -1 && newIndex !== currentIndex) {
//         setCurrentIndex(newIndex);
//       }
//     }
//   }, [currentIndex]);

//   // Show toast only once when component mounts (or you can tie it to index change)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       Toast.show({
//         type: 'info',
//         text1: '👀 Watch more reels → swipe up',
//         position: 'bottom',
//         visibilityTime: 2800,
//         bottomOffset: 100,
//       });
//     }, 10000);

//     return () => clearTimeout(timer);
//   }, []);

//   const renderItem = ({ item, index }) => {
//     const isActive = index === currentIndex;

//     return (
//       <View style={styles.videoContainer}>
//         <Video
//           source={{ uri: item.videoUrl }}
//           style={StyleSheet.absoluteFill}
//           resizeMode="cover"
//           repeat={true}
//           paused={!isActive}
//           muted={muted}
//           playInBackground={false}
//           playWhenInactive={false}
//           ignoreSilentSwitch="ignore" // iOS
//           onError={(e) => console.log('Video error:', e)}
//         />

//         {/* Dark overlay */}
//         <View style={styles.overlay} />

//         {/* Bottom info */}
//         <View style={styles.bottomInfo}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.views}>{item.views}</Text>
//           <View style={styles.audioRow}>
//             <Music2 size={16} color="white" />
//             <Text style={styles.audioText}>Original Audio</Text>
//           </View>
//         </View>

//         {/* Right action buttons */}
//         <View style={styles.rightActions}>
//           <TouchableOpacity
//             style={styles.actionBtn}
//             onPress={() =>
//               setLiked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
//             }
//           >
//             <Heart
//               size={32}
//               color={liked[item.id] ? '#ff0048' : 'white'}
//               fill={liked[item.id] ? '#ff0048' : 'transparent'}
//             />
//             <Text style={styles.actionCount}>{item.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionBtn}>
//             <MessageCircle size={32} color="white" />
//             <Text style={styles.actionCount}>{item.comments}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionBtn}>
//             <Share2 size={32} color="white" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionBtn}
//             onPress={() => setMuted((prev) => !prev)}
//           >
//             {muted ? (
//               <VolumeX size={32} color="white" />
//             ) : (
//               <Volume2 size={32} color="white" />
//             )}
//           </TouchableOpacity>

//           <MoreHorizontal size={28} color="white" />
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="black" />

//       <FlatList
//         data={shortsData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         pagingEnabled
//         snapToInterval={SCREEN_HEIGHT}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         showsVerticalScrollIndicator={false}
//         bounces={false}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={viewabilityConfig}
//         initialNumToRender={2}
//         maxToRenderPerBatch={3}
//         windowSize={3}
//         removeClippedSubviews={true} // performance on Android
//       />

//       <Toast />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   videoContainer: {
//     height: SCREEN_HEIGHT,
//     width: '100%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.15)',
//   },
//   bottomInfo: {
//     position: 'absolute',
//     bottom: 110, // leave space for action buttons
//     left: 16,
//     zIndex: 10,
//   },
//   title: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '700',
//     textShadowColor: 'rgba(0,0,0,0.8)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//   },
//   views: {
//     color: 'rgba(255,255,255,0.85)',
//     fontSize: 16,
//     marginTop: 4,
//   },
//   audioRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//     gap: 6,
//   },
//   audioText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 14,
//   },
//   rightActions: {
//     position: 'absolute',
//     right: 16,
//     bottom: 140,
//     alignItems: 'center',
//     gap: 28,
//     zIndex: 10,
//   },
//   actionBtn: {
//     alignItems: 'center',
//   },
//   actionCount: {
//     color: 'white',
//     fontSize: 13,
//     marginTop: 4,
//     textShadowColor: 'rgba(0,0,0,0.9)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
// });


import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
// import Video from 'react-native-video';
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Music2,
} from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import { VideoRef } from 'react-native-video';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const shortsData = [
  {
    id: 's1',
    title: 'Amazing Nature Moments',
    views: '2.6M views',
    likes: '145K',
    comments: '3.2K',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 's2',
    title: 'Cute Cats Compilation',
    views: '4.2M views',
    likes: '220K',
    comments: '8.5K',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
];

export default function UsersScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked]               = useState({});
  const [muted, setMuted]               = useState(true);

  // ✅ Fix 1: Keep a ref so the viewability callback never goes stale
  const currentIndexRef = useRef(0);

  // ✅ Fix 2: Stable viewability config ref
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  }).current;

  // ✅ Fix 3: Callback uses ref → no stale-closure re-renders needed
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = shortsData.findIndex(
        (item) => item.id === viewableItems[0].item.id
      );
      if (newIndex !== -1 && newIndex !== currentIndexRef.current) {
        currentIndexRef.current = newIndex;
        setCurrentIndex(newIndex);
      }
    }
  }, []); // ✅ empty deps — safe because we read from ref, not state

  // ✅ Fix 4: Stable ref wrapper required by RN to avoid "cannot change" warning
  const onViewableItemsChangedRef = useRef(onViewableItemsChanged);

  useEffect(() => {
    const timer = setTimeout(() => {
      Toast.show({
        type: 'info',
        text1: '👀 Watch more reels → swipe up',
        position: 'bottom',
        visibilityTime: 2800,
        bottomOffset: 100,
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    const isActive = index === currentIndex;

    return (
      <View style={styles.videoContainer}>
        <VideoRef
          source={{ uri: item.videoUrl }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          repeat
          paused={!isActive}
          muted={muted}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          onError={(e) => console.log('Video error:', e)}
        />

        <View style={styles.overlay} />

        {/* ✅ Fix 5: added paddingRight so text doesn't run under action buttons */}
        <View style={styles.bottomInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.views}>{item.views}</Text>
          <View style={styles.audioRow}>
            <Music2 size={16} color="white" />
            <Text style={styles.audioText}>Original Audio</Text>
          </View>
        </View>

        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              setLiked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
            }
          >
            <Heart
              size={32}
              color={liked[item.id] ? '#ff0048' : 'white'}
              fill={liked[item.id] ? '#ff0048' : 'transparent'}
            />
            <Text style={styles.actionCount}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <MessageCircle size={32} color="white" />
            <Text style={styles.actionCount}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Share2 size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setMuted((prev) => !prev)}
          >
            {muted ? (
              <VolumeX size={32} color="white" />
            ) : (
              <Volume2 size={32} color="white" />
            )}
          </TouchableOpacity>

          {/* ✅ Fix 6: MoreHorizontal wrapped in TouchableOpacity */}
          <TouchableOpacity style={styles.actionBtn}>
            <MoreHorizontal size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [currentIndex, liked, muted]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <FlatList
        data={shortsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        bounces={false}
        // ✅ Fix 7: pass the ref, not the function directly
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={3}
        removeClippedSubviews
      />

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 110,
    left: 16,
    right: 90,   // ✅ prevents text overlapping the right action buttons
    zIndex: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  views: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    marginTop: 4,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  audioText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  rightActions: {
    position: 'absolute',
    right: 16,
    bottom: 140,
    alignItems: 'center',
    gap: 28,
    zIndex: 10,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionCount: {
    color: 'white',
    fontSize: 13,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});