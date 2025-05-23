import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Pet } from '../types/types';
import PetCard from './PetCard';
import { Ionicons } from '@expo/vector-icons';

interface SwipeableCardsProps {
  pets: Pet[];
  onSwipeLeft: (pet: Pet) => void;
  onSwipeRight: (pet: Pet) => void;
  onPressDetails: (pet: Pet) => void;
}

const { width } = Dimensions.get('window');

const SwipeableCards: React.FC<SwipeableCardsProps> = ({
  pets,
  onSwipeLeft,
  onSwipeRight,
  onPressDetails,
}) => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        data={pets}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <PetCard pet={item} onPressDetails={() => onPressDetails(item)} />
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => onSwipeLeft(item)}
              >
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.acceptButton]}
                onPress={() => onSwipeRight(item)}
              >
                <Ionicons name="heart" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        showPagination
        paginationDefaultColor="#e0e0e0"
        paginationActiveColor="#FF6B6B"
        paginationStyleItem={styles.paginationDot}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  slide: {
    width: width - 40,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  rejectButton: {
    backgroundColor: '#FF5252',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SwipeableCards;