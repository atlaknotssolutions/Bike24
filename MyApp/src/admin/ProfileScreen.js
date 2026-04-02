import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const API_BASE = 'https://bitzo-server-1.onrender.com/api';
const BACKEND_URL = 'https://bitzo-server-1.onrender.com';

const STATIC_CATEGORIES = [
  { _id: '1', name: 'Gaming' },
  { _id: '2', name: 'Education' },
  { _id: '3', name: 'Entertainment' },
  { _id: '4', name: 'Music' },
  { _id: '5', name: 'Technology' },
  { _id: '6', name: 'Sports' },
  { _id: '7', name: 'Cooking' },
  { _id: '8', name: 'Travel' },
];

const getToken = () => {
  // Your current token (change if expired)
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWI2ZjlkYmI3YjJjMTI5ZjM5MTI1MzciLCJpYXQiOjE3NzM3MzI4NDQsImV4cCI6MTc3NDMzNzY0NH0.vP1HF1uOwtJdqw-FAXcbVmm2VVVlAsQ3_oFKgTGiin0';
};

export default function ChannelPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { handle: urlHandle } = route.params || {};

  const [channels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [channel, setChannel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('Videos');
  const [loading, setLoading] = useState(true);

  // Create channel modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: '',
    channelDescription: '',
    category: '',
    channelImageUri: null,
    channelBannerUri: null,
    contactemail: '',
  });
  const [createError, setCreateError] = useState('');

  // Upload video modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedUploadChannelId, setSelectedUploadChannelId] = useState('');
  const [videoUri, setVideoUri] = useState(null);
  const [thumbnailUri, setThumbnailUri] = useState(null);
  const [videoname, setVideoname] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoCategory, setVideoCategory] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Video player
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/category`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCategories(Array.isArray(data) && data.length > 0 ? data : STATIC_CATEGORIES);
      } catch {
        setCategories(STATIC_CATEGORIES);
      }
    };
    fetchCategories();
  }, []);

  // Fetch user's channels
  useEffect(() => {
    const fetchUserChannels = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        Alert.alert('Login Required', 'Please login first.');
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/uservideo/channels`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `Status: ${res.status}`);
        }

        const data = await res.json();
        const userChannels = data.channels || [];
        setChannels(userChannels);

        let initialId = null;
        if (urlHandle) {
          const matched = userChannels.find(
            (ch) => ch.name?.replace(/\s+/g, '').toLowerCase() === urlHandle.toLowerCase()
          );
          if (matched) initialId = matched._id;
        }
        if (!initialId && userChannels.length > 0) {
          initialId = userChannels[0]._id;
        }
        setSelectedChannelId(initialId);
      } catch (err) {
        console.error('Fetch channels failed:', err);
        Alert.alert('Error', err.message || 'Failed to load channels');
      } finally {
        setLoading(false);
      }
    };

    fetchUserChannels();
  }, [urlHandle]);

  // Fetch selected channel + videos
  useEffect(() => {
    if (!selectedChannelId) return;

    const fetchChannelVideos = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const selected = channels.find((c) => c._id === selectedChannelId);
        if (!selected) return;

        const res = await fetch(
          `${API_BASE}/uservideo/channel/${selectedChannelId}/videos`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        let videos = [];
        if (res.ok) {
          const data = await res.json();
          videos = data.videos || [];
        }

        setChannel({
          ...selected,
          handle: `@${selected.name?.replace(/\s+/g, '') || selected._id}`,
          avatar: selected.channelImage || 'https://i.pravatar.cc/150',
          banner: selected.channelBanner || 'https://picsum.photos/800/300',
          description: selected.channeldescription || 'No description available',
          videos,
        });
      } catch (err) {
        console.error('Videos fetch error:', err);
      }
    };

    fetchChannelVideos();
  }, [selectedChannelId, channels]);

  // Image & Video Picker
  const pickImage = async (setUri) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setUri(result.assets[0].uri);
  };

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to videos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) setVideoUri(result.assets[0].uri);
  };

  // Create Channel Handler
  const handleCreateChannel = async () => {
    const token = getToken();
    if (!token) return Alert.alert('Error', 'Please login first.');

    if (!newChannel.name.trim()) return setCreateError('Channel name is required');

    if (!newChannel.category) return setCreateError('Please select a category');

    try {
      const formData = new FormData();
      formData.append('name', newChannel.name.trim());
      formData.append('channeldescription', newChannel.channelDescription || '');
      formData.append('category', newChannel.category);
      formData.append('contactemail', newChannel.contactemail || '');

      if (newChannel.channelImageUri) {
        const filename = newChannel.channelImageUri.split('/').pop();
        formData.append('channelImage', {
          uri: newChannel.channelImageUri,
          name: filename,
          type: 'image/jpeg',
        });
      }

      if (newChannel.channelBannerUri) {
        const filename = newChannel.channelBannerUri.split('/').pop();
        formData.append('channelBanner', {
          uri: newChannel.channelBannerUri,
          name: filename,
          type: 'image/jpeg',
        });
      }

      const response = await fetch(`${API_BASE}/uservideo/createchannel`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create channel');
      }

      // Refresh channels list
      const channelsRes = await fetch(`${API_BASE}/uservideo/channels`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (channelsRes.ok) {
        const data = await channelsRes.json();
        setChannels(data.channels || []);
        setSelectedChannelId(result.channel?._id || selectedChannelId);
      }

      setShowCreateModal(false);
      setNewChannel({
        name: '',
        channelDescription: '',
        category: '',
        channelImageUri: null,
        channelBannerUri: null,
        contactemail: '',
      });

      Alert.alert('Success', 'Channel created successfully!');
    } catch (error) {
      console.error(error);
      setCreateError(error.message || 'Failed to create channel.');
    }
  };

  // Upload Video Handler
  const handleUploadVideo = async () => {
    const token = getToken();
    if (!token) return setUploadError('Please login first.');

    if (!selectedUploadChannelId) return setUploadError('Please select a channel');
    if (!videoUri) return setUploadError('Please select a video file');
    if (!videoname.trim()) return setUploadError('Please enter a video name');
    if (!videoCategory) return setUploadError('Please select a video category');
    if (!agreeTerms) return setUploadError('Please agree to the terms');

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('name', videoname.trim());
      formData.append('description', videoDescription || '');
      formData.append('category', videoCategory);
      formData.append('video', {
        uri: videoUri,
        name: videoUri.split('/').pop() || 'video.mp4',
        type: 'video/mp4',
      });

      if (thumbnailUri) {
        formData.append('thumbnail', {
          uri: thumbnailUri,
          name: thumbnailUri.split('/').pop() || 'thumbnail.jpg',
          type: 'image/jpeg',
        });
      }

      const response = await fetch(
        `${API_BASE}/uservideo/upload/${selectedUploadChannelId}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to upload video');
      }

      Alert.alert('Success', 'Video uploaded successfully!');

      // Refresh current channel videos
      const videosRes = await fetch(
        `${API_BASE}/uservideo/channel/${selectedChannelId}/videos`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (videosRes.ok) {
        const data = await videosRes.json();
        setChannel((prev) => ({
          ...prev,
          videos: data.videos || [],
        }));
      }

      setShowUploadModal(false);
      setVideoUri(null);
      setThumbnailUri(null);
      setVideoname('');
      setVideoDescription('');
      setVideoCategory('');
      setAgreeTerms(false);
      setSelectedUploadChannelId('');
    } catch (error) {
      setUploadError(error.message || 'Failed to upload video.');
    } finally {
      setUploading(false);
    }
  };

  const handlePlayVideo = (video) => {
    setCurrentVideo(video);
    setShowVideoPlayer(true);
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#aaa', marginTop: 16 }}>Loading channels...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (channels.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <Text style={{ color: '#fff', fontSize: 20, marginBottom: 24 }}>No channels found</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowCreateModal(true)}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Create Channel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!channel) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.center}>
          <Text style={{ color: '#aaa', fontSize: 18 }}>Channel not found</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Banner + Profile */}
        <View>
          <Image source={{ uri: channel.banner }} style={styles.banner} />

          <View style={styles.profileRow}>
            <Image source={{ uri: channel.avatar }} style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.channelName}>{channel.name}</Text>
              <Text style={styles.channelMeta}>
                {channel.handle} • {channel.subscribers || 0} subscribers • {channel.category?.name || 'Uncategorized'}
              </Text>
              <Text style={styles.description}>{channel.description}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="pencil" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Customize channel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#10b981' }]}
              onPress={() => setShowUploadModal(true)}
            >
              <Icon name="video-plus" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Upload video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#2563eb' }]}
              onPress={() => setShowCreateModal(true)}
            >
              <Icon name="plus" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Create channel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {['Videos', 'Playlists', 'Posts'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabItem, activeTab === tab && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && { color: '#fff' }]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Channel Switch Dropdown */}
        {channels.length > 0 && (
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Switch channel</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedChannelId}
                onValueChange={(value) => setSelectedChannelId(value)}
                style={styles.picker}
                dropdownIconColor="#fff"
                mode="dropdown"
              >
                {channels.map((ch) => (
                  <Picker.Item
                    key={ch._id}
                    label={`${ch.name || 'Channel'} (@${ch.name?.replace(/\s+/g, '') || ch._id})`}
                    value={ch._id}
                    color="#fff"
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}

        {/* Videos Grid */}
        {activeTab === 'Videos' && (
          <FlatList
            data={channel.videos || []}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={{ padding: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.videoCard}
                onPress={() => handlePlayVideo(item)}
              >
                <Image
                  source={{ uri: `${BACKEND_URL}/${item.thumbnail}` }}
                  style={styles.thumbnail}
                />
                <Text numberOfLines={2} style={styles.videoTitle}>
                  {item.title || 'Untitled Video'}
                </Text>
                <Text style={styles.videoMeta}>
                  {item.views?.toLocaleString() || 0} views • {new Date(item.createdAt).toLocaleDateString() || 'recent'}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No videos yet</Text>}
          />
        )}

        {/* Video Player Modal */}
        <Modal visible={showVideoPlayer} animationType="slide" onRequestClose={() => setShowVideoPlayer(false)}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={styles.playerHeader}>
              <Text style={styles.playerTitle}>
                {currentVideo?.title || currentVideo?.name || 'Video'}
              </Text>
              <TouchableOpacity onPress={() => setShowVideoPlayer(false)}>
                <Icon name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {currentVideo && (
              <VideoView
                player={useVideoPlayer(
                  { source: { uri: `${BACKEND_URL}/${currentVideo.videoUrl}` } },
                  (player) => player.play()
                )}
                style={{ width: '100%', height: width * 0.5625 }}
                allowsFullscreen
                allowsPictureInPicture
              />
            )}

            <View style={styles.videoInfo}>
              <Text style={{ color: '#ccc' }}>
                {currentVideo?.views?.toLocaleString() || 0} views •{' '}
                {new Date(currentVideo?.createdAt).toLocaleDateString()}
              </Text>
              {currentVideo?.description && (
                <Text style={{ color: '#ddd', marginTop: 12 }}>
                  {currentVideo.description}
                </Text>
              )}
            </View>
          </SafeAreaView>
        </Modal>

        {/* Create Channel Modal */}
        <Modal visible={showCreateModal} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
            <ScrollView style={{ padding: 20 }}>
              <Text style={styles.modalTitle}>Create a new channel</Text>

              {createError ? <Text style={styles.errorText}>{createError}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Channel name *"
                placeholderTextColor="#888"
                value={newChannel.name}
                onChangeText={(t) => setNewChannel({ ...newChannel, name: t })}
              />

              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                placeholder="Channel description (optional)"
                placeholderTextColor="#888"
                multiline
                value={newChannel.channelDescription}
                onChangeText={(t) => setNewChannel({ ...newChannel, channelDescription: t })}
              />

              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Category *</Text>
                <Picker
                  selectedValue={newChannel.category}
                  onValueChange={(v) => setNewChannel({ ...newChannel, category: v })}
                  style={styles.picker}
                >
                  <Picker.Item label="Select category" value="" />
                  {categories.map((cat) => (
                    <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickImage((uri) => setNewChannel({ ...newChannel, channelImageUri: uri }))}
              >
                <Text style={{ color: newChannel.channelImageUri ? '#10b981' : '#aaa' }}>
                  {newChannel.channelImageUri ? 'Avatar selected' : 'Upload channel avatar'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickImage((uri) => setNewChannel({ ...newChannel, channelBannerUri: uri }))}
              >
                <Text style={{ color: newChannel.channelBannerUri ? '#10b981' : '#aaa' }}>
                  {newChannel.channelBannerUri ? 'Banner selected' : 'Upload channel banner'}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Contact email (optional)"
                placeholderTextColor="#888"
                value={newChannel.contactemail}
                onChangeText={(t) => setNewChannel({ ...newChannel, contactemail: t })}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowCreateModal(false)}>
                  <Text style={{ color: '#fff' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitBtn} onPress={handleCreateChannel}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Create Channel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>

        {/* Upload Video Modal */}
        <Modal visible={showUploadModal} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
            <ScrollView style={{ padding: 20 }}>
              <Text style={styles.modalTitle}>Upload Video</Text>

              {uploadError ? <Text style={styles.errorText}>{uploadError}</Text> : null}

              <TouchableOpacity style={styles.uploadButton} onPress={pickVideo}>
                <Text style={{ color: videoUri ? '#10b981' : '#aaa' }}>
                  {videoUri ? 'Video selected' : 'Select video *'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => pickImage(setThumbnailUri)}
              >
                <Text style={{ color: thumbnailUri ? '#10b981' : '#aaa' }}>
                  {thumbnailUri ? 'Thumbnail selected' : 'Select thumbnail (optional)'}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Video title *"
                placeholderTextColor="#888"
                value={videoname}
                onChangeText={setVideoname}
              />

              <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Category *</Text>
                <Picker
                  selectedValue={videoCategory}
                  onValueChange={(v) => setVideoCategory(v)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select category" value="" />
                  {categories.map((cat) => (
                    <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
                  ))}
                </Picker>
              </View>

              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                placeholder="Description (optional)"
                placeholderTextColor="#888"
                multiline
                value={videoDescription}
                onChangeText={setVideoDescription}
              />

              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                <Switch value={agreeTerms} onValueChange={setAgreeTerms} trackColor={{ true: '#10b981' }} />
                <Text style={{ color: '#ccc', marginLeft: 12, flex: 1 }}>
                  I agree to the Terms of Service and confirm I own/have rights to this content.
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowUploadModal(false)}>
                  <Text style={{ color: '#fff' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitBtn, uploading && { opacity: 0.6 }]}
                  onPress={handleUploadVideo}
                  disabled={uploading}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {uploading ? 'Uploading...' : 'Upload Video'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  banner: { width: '100%', height: 180, resizeMode: 'cover' },
  profileRow: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#0f0f0f' },
  channelName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  channelMeta: { color: '#aaa', fontSize: 14 },
  description: { color: '#ccc', marginTop: 6, fontSize: 14 },
  actionButtons: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, flexWrap: 'wrap' },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    gap: 8,
  },
  actionBtnText: { color: '#fff', fontWeight: '600' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#333' },
  tabItem: { paddingVertical: 14, paddingHorizontal: 20 },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#fff' },
  tabText: { color: '#aaa', fontWeight: '600', fontSize: 16 },
  dropdownContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  dropdownLabel: { color: '#aaa', fontSize: 13, marginBottom: 6 },
  pickerWrapper: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  picker: { color: '#fff', height: Platform.OS === 'ios' ? 140 : 50 },
  videoCard: { flex: 1, margin: 4, maxWidth: (width - 24) / 2 },
  thumbnail: { width: '100%', aspectRatio: 16/9, borderRadius: 12 },
  videoTitle: { color: '#fff', marginTop: 8, fontSize: 14, lineHeight: 18 },
  videoMeta: { color: '#aaa', fontSize: 12, marginTop: 4 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 40, fontSize: 16 },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  errorText: { color: '#ff6b6b', marginBottom: 16 },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  uploadButton: {
    backgroundColor: '#1a1a1a',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 6,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 24,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#444',
    borderRadius: 999,
  },
  submitBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2563eb',
    borderRadius: 999,
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
});