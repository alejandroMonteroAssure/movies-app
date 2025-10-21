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
import { useTheme } from '../../context/ThemeContext';

const ProfileScreen: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const backgroundColor = isDark ? '#000' : '#fff';
  const textColor = isDark ? '#fff' : '#000';
  const secondaryText = isDark ? '#aaa' : '#555';

  const user: User = {
    name: 'William Barra',
    email: 'William.Barra@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <GestureHandlerRootView style={[styles.root, { backgroundColor }]}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          style={{ backgroundColor }}
        >
          <View style={styles.header}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <CustomText
              variant="subtitle"
              style={[styles.name, { color: textColor }]}
            >
              {user.name}
            </CustomText>
            <CustomText
              variant="body"
              style={[styles.email, { color: secondaryText }]}
            >
              {user.email}
            </CustomText>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statNumber,
                  { color: isDark ? '#f0c14b' : '#333' },
                ]}
              >
                {wishlist.length}
              </Text>
              <Text style={[styles.statLabel, { color: secondaryText }]}>
                In Wishlist
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statNumber,
                  { color: isDark ? '#f0c14b' : '#333' },
                ]}
              >
                24
              </Text>
              <Text style={[styles.statLabel, { color: secondaryText }]}>
                Watched
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statNumber,
                  { color: isDark ? '#f0c14b' : '#333' },
                ]}
              >
                5
              </Text>
              <Text style={[styles.statLabel, { color: secondaryText }]}>
                Reviews
              </Text>
            </View>
          </View>

          <CustomText
            variant="subtitle"
            style={[styles.sectionTitle, { color: textColor }]}
          >
            Your Wishlist
          </CustomText>

          {wishlist.length === 0 ? (
            <CustomText
              variant="body"
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: secondaryText,
              }}
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
            <Button
              title="Log Out"
              onPress={() => Alert.alert('Logged out')}
              variant="red"
            />
            <Button
              title={`Toggle ${isDark ? 'Light' : 'Dark'} Mode`}
              onPress={toggleTheme}
              variant="secondary"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;
