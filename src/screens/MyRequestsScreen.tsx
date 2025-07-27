import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Appointment, HelpRequest } from '../types';

const MyRequestsScreen: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'help'>('appointments');

  useEffect(() => {
    loadRequests();
  }, [user]);

  const loadRequests = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Load appointments
      const appointmentsQuery = await firestore()
        .collection('appointments')
        .where('userId', '==', user.id)
        .orderBy('createdAt', 'desc')
        .get();

      const appointmentsData = appointmentsQuery.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Appointment[];

      // Load help requests
      const helpRequestsQuery = await firestore()
        .collection('helpRequests')
        .where('userId', '==', user.id)
        .orderBy('createdAt', 'desc')
        .get();

      const helpRequestsData = helpRequestsQuery.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as HelpRequest[];

      setAppointments(appointmentsData);
      setHelpRequests(helpRequestsData);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRequests();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const renderAppointment = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <Text style={styles.requestTitle}>Appointment Request</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
          <Text style={styles.statusText}>{getStatusText(appointment.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.requestDetail}>
        <Text style={styles.label}>Reason: </Text>
        {appointment.reason}
      </Text>
      
      <Text style={styles.requestDetail}>
        <Text style={styles.label}>Preferred Date: </Text>
        {appointment.preferredDate}
      </Text>
      
      <Text style={styles.requestDetail}>
        <Text style={styles.label}>Preferred Time: </Text>
        {appointment.preferredTime}
      </Text>
      
      <Text style={styles.requestDetail}>
        <Text style={styles.label}>Submitted: </Text>
        {formatDate(appointment.createdAt)}
      </Text>
    </View>
  );

  const renderHelpRequest = (helpRequest: HelpRequest) => (
    <View key={helpRequest.id} style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <Text style={styles.requestTitle}>Help Request</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(helpRequest.status) }]}>
          <Text style={styles.statusText}>{getStatusText(helpRequest.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.requestDetail}>
        <Text style={styles.label}>Type: </Text>
        {helpRequest.type.charAt(0).toUpperCase() + helpRequest.type.slice(1)}
      </Text>
      
      <Text style={styles.requestDetail}>
        <Text style={styles.label}>Description: </Text>
        {helpRequest.description}
      </Text>
      
      <Text style={styles.requestDetail}>
        <Text style={styles.label}>Submitted: </Text>
        {formatDate(helpRequest.createdAt)}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Requests</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'appointments' && styles.activeTab]}
          onPress={() => setActiveTab('appointments')}
        >
          <Text style={[styles.tabText, activeTab === 'appointments' && styles.activeTabText]}>
            Appointments ({appointments.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'help' && styles.activeTab]}
          onPress={() => setActiveTab('help')}
        >
          <Text style={[styles.tabText, activeTab === 'help' && styles.activeTabText]}>
            Help Requests ({helpRequests.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'appointments' ? (
          appointments.length > 0 ? (
            appointments.map(renderAppointment)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No appointment requests yet</Text>
            </View>
          )
        ) : (
          helpRequests.length > 0 ? (
            helpRequests.map(renderHelpRequest)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No help requests yet</Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  requestDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default MyRequestsScreen; 