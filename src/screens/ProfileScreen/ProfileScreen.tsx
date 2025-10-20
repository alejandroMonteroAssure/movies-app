import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useWishlist } from '../../context/WishlistContext';
import { User } from '../../services/domain/User';
import { Button } from '../../components/atoms/Button/Button';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { styles } from './ProfileScreen.style';
import MovieItem from '../../components/molecules/movieItem/MovieItem';

const ProfileScreen: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();

  const user: User = {
    name: 'William Barra',
    email: 'William.Barra@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <CustomText variant="subtitle" style={styles.name}>
              {user.name}
            </CustomText>
            <CustomText variant="body" style={styles.email}>
              {user.email}
            </CustomText>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{wishlist.length}</Text>
              <Text style={styles.statLabel}>In Wishlist</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Watched</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
          <CustomText variant="subtitle" style={styles.sectionTitle}>
            Your Wishlist
          </CustomText>
          {wishlist.length === 0 ? (
            <CustomText
              variant="body"
              style={{ textAlign: 'center', marginTop: 20 }}
            >
              is empty.
            </CustomText>
          ) : (
            <FlatList
              data={wishlist}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <MovieItem item={item} />}
              contentContainerStyle={styles.listContent}
            />
          )}

          <View style={styles.actions}>
            <Button
              title="Clear Wishlist"
              onPress={clearWishlist}
              variant="primary"
            />

            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={() => Alert.alert('Logged out')}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;
