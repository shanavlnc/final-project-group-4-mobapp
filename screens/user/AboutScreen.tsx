import React from 'react';
import { View, ScrollView, StyleSheet, Text, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import shelterInfo from '../../constants/shelterInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AboutScreen = () => {
  const handlePress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="paw" size={40} color="#FF6B6B" />
        <Text style={styles.title}>{shelterInfo.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={24} color="#FF6B6B" />
          <Text style={styles.infoText}>{shelterInfo.address}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="call" size={24} color="#FF6B6B" />
          <TouchableOpacity onPress={() => handlePress(`tel:${shelterInfo.phone}`)}>
            <Text style={[styles.infoText, styles.link]}>{shelterInfo.phone}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="mail" size={24} color="#FF6B6B" />
          <TouchableOpacity onPress={() => handlePress(`mailto:${shelterInfo.email}`)}>
            <Text style={[styles.infoText, styles.link]}>{shelterInfo.email}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time" size={24} color="#FF6B6B" />
          <Text style={styles.infoText}>{shelterInfo.hours}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.aboutText}>{shelterInfo.about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {shelterInfo.faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: {faq.question}</Text>
            <Text style={styles.faqAnswer}>A: {faq.answer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.socialLinks}>
        <TouchableOpacity onPress={() => handlePress('https://facebook.com')}>
          <Ionicons name="logo-facebook" size={32} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('https://instagram.com')}>
          <Ionicons name="logo-instagram" size={32} color="#E1306C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('https://twitter.com')}>
          <Ionicons name="logo-twitter" size={32} color="#1DA1F2" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF6B6B',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  faqAnswer: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    gap: 20,
  },
});

export default AboutScreen;