import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useApplication } from '../../context/ApplicationContext';
import { theme } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Application } from '../../types';

export const ApplicationReviewScreen = () => {
  const { applications, updateApplicationStatus, refreshData } = useApplication();
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [refreshing, setRefreshing] = useState(false);

  const filteredApps = applications.filter(app => app.status === filter);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${status} this application?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: async () => {
            try {
              await updateApplicationStatus(id, status);
            } catch (error) {
              Alert.alert('Error', 'Failed to update application');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.activeFilterText]}>Pending</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {applications.filter(a => a.status === 'pending').length}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'approved' && styles.activeFilter]}
          onPress={() => setFilter('approved')}
        >
          <Text style={[styles.filterText, filter === 'approved' && styles.activeFilterText]}>Approved</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'rejected' && styles.activeFilter]}
          onPress={() => setFilter('rejected')}
        >
          <Text style={[styles.filterText, filter === 'rejected' && styles.activeFilterText]}>Rejected</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredApps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.petName}>{item.petName}</Text>
              <Text style={styles.applicantName}>{item.applicantName}</Text>
            </View>
            
            <View style={styles.details}>
              <View style={styles.detailRow}>
                <Ionicons name="mail" size={16} color={theme.textLight} />
                <Text style={styles.detailText}>{item.applicantEmail}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="call" size={16} color={theme.textLight} />
                <Text style={styles.detailText}>{item.applicantPhone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={16} color={theme.textLight} />
                <Text style={styles.detailText}>
                  Applied: {new Date(item.applicationDate).toLocaleDateString()}
                </Text>
              </View>
            </View>

            {item.status === 'pending' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => handleStatusChange(item.id, 'approved')}
                >
                  <Ionicons name="checkmark" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => handleStatusChange(item.id, 'rejected')}
                >
                  <Ionicons name="close" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.status === 'approved' && (
              <View style={styles.statusBadge}>
                <Text style={styles.approvedText}>APPROVED</Text>
              </View>
            )}

            {item.status === 'rejected' && (
              <View style={[styles.statusBadge, styles.rejectedBadge]}>
                <Text style={styles.rejectedText}>REJECTED</Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text" size={50} color={theme.textLight} />
            <Text style={styles.emptyText}>No {filter} applications</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: theme.cardBackground,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeFilter: {
    backgroundColor: theme.primary,
  },
  filterText: {
    color: theme.text,
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'white',
  },
  badge: {
    backgroundColor: theme.danger,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  applicantName: {
    fontSize: 16,
    color: theme.textLight,
  },
  details: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 8,
    color: theme.text,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: theme.success,
  },
  rejectButton: {
    backgroundColor: theme.danger,
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: theme.success,
  },
  rejectedBadge: {
    backgroundColor: theme.danger,
  },
  approvedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  rejectedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: theme.textLight,
    marginTop: 15,
  },
});