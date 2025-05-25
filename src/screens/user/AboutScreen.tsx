import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export const AboutScreen = ({ navigation }) => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={styles.title}>About Our Shelter</Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          We are dedicated to rescuing abandoned and abused animals, providing them with medical care,
          rehabilitation, and finding them loving forever homes through responsible adoption practices.
        </Text>

        <Text style={styles.sectionTitle}>Adoption Process</Text>
        <Text style={styles.listItem}>1. Browse available pets</Text>
        <Text style={styles.listItem}>2. Submit an application</Text>
        <Text style={styles.listItem}>3. Meet with an adoption counselor</Text>
        <Text style={styles.listItem}>4. Home visit (if required)</Text>
        <Text style={styles.listItem}>5. Finalize adoption</Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <TouchableOpacity onPress={() => openLink('mailto:contact@petshelter.org')}>
          <Text style={styles.link}>Email: contact@petshelter.org</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('tel:+15551234567')}>
          <Text style={styles.link}>Phone: (555) 123-4567</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://maps.google.com/?q=123+Pet+Shelter+St')}>
          <Text style={styles.link}>Address: 123 Pet Shelter St</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.text,
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 5,
    marginLeft: 15,
  },
  link: {
    fontSize: 16,
    color: theme.info,
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  footer: {
    fontSize: 14,
    color: theme.textLight,
    marginTop: 30,
    textAlign: 'center',
  },
});