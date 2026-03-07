import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { CONTACT } from '../src/constants/cabins';
import { Ionicons } from '@expo/vector-icons';

const BENEFITS = [
  'Seasonal specials',
  'Last-minute cabin openings',
  'Giveaways',
  'Retreat announcements',
];

export default function NewsletterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!firstName.trim() || !email.trim()) {
      Alert.alert('Missing Information', 'Please enter your name and email.');
      return;
    }
    // Open Mailchimp signup with pre-filled data
    Linking.openURL(CONTACT.mailchimpUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Ionicons name="mail" size={48} color={COLORS.primary} />
            <Text style={styles.headline}>Unlock Cabin Deals</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.description}>Join our Pine Post newsletter for:</Text>

            <View style={styles.benefitsList}>
              {BENEFITS.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Ionicons name="leaf" size={18} color={COLORS.primary} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Your first name"
                  placeholderTextColor={COLORS.lightGray}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  placeholderTextColor={COLORS.lightGray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubscribe}
                activeOpacity={0.8}
              >
                <Ionicons name="paper-plane" size={20} color={COLORS.white} />
                <Text style={styles.buttonText}>Join the Pine Post</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.privacy}>
              We respect your inbox. Unsubscribe anytime.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  headline: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginTop: SPACING.md,
  },
  card: {
    ...CARD_STYLE,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  benefitsList: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    paddingLeft: SPACING.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  benefitText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  form: {
    gap: SPACING.md,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  privacy: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
