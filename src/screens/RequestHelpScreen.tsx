import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../context/AuthContext';

const RequestHelpScreen: React.FC = () => {
  const { user } = useAuth();
  const [helpType, setHelpType] = useState<'food' | 'health' | 'education' | 'other'>('food');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const helpTypes = [
    { key: 'food', label: 'Food Assistance' },
    { key: 'health', label: 'Health Care' },
    { key: 'education', label: 'Education Support' },
    { key: 'other', label: 'Other' },
  ];

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please describe your request for help');
      return;
    }

    setIsSubmitting(true);
    try {
      await firestore().collection('helpRequests').add({
        userId: user?.id,
        name: user?.name,
        phone: user?.phone,
        type: helpType,
        description: description.trim(),
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert(
        'Success',
        'Your help request has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setDescription('');
              setHelpType('food');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit help request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Request Help</Text>
        
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={user?.name}
              editable={false}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={user?.phone}
              editable={false}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Type of Help</Text>
            <View style={styles.helpTypeContainer}>
              {helpTypes.map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.helpTypeButton,
                    helpType === type.key && styles.selectedHelpType,
                  ]}
                  onPress={() => setHelpType(type.key as any)}
                >
                  <Text
                    style={[
                      styles.helpTypeText,
                      helpType === type.key && styles.selectedHelpTypeText,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Please describe your request for help in detail"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Request</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#f8f8f8',
    color: '#666',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  helpTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  helpTypeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
    minWidth: '45%',
  },
  selectedHelpType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  helpTypeText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectedHelpTypeText: {
    color: 'white',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RequestHelpScreen; 