import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  RefreshControl,
  Text // Added Text import
} from 'react-native';
import { useApplication } from '../../context/ApplicationContext'; 
import { PetCard } from '../../components/PetCard';
import { FloatingActionButton } from '../../components/buttons/FloatingActionButton';
import { AddPetModal } from '../admin/AddPetModal';
import { theme } from '../../constants/colors';

interface PetManagementScreenProps {
  navigation: {
    navigate: (screen: string, params?: { pet: any }) => void;
  };
}

export const PetManagementScreen: React.FC<PetManagementScreenProps> = ({ navigation }) => {
  const { pets, deletePet, refreshData } = useApplication();
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PetCard 
            pet={item} 
            adminMode
            onDelete={() => deletePet(item.id)}
            onPress={() => navigation.navigate('AddPet', { pet: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No pets found</Text>
          </View>
        }
      />

      <FloatingActionButton 
        icon="add"
        onPress={() => setShowAddModal(true)}
        position="relative"
        style={styles.fab}
      />

      <AddPetModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: theme.textLight,
  },
  fab: {
    margin: 16,
    alignSelf: 'flex-end',
  },
});