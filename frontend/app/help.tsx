import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { CONTACT } from '../src/constants/cabins';
import { useCabin } from '../src/context/CabinContext';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const router = useRouter();
  const { selectedCabin } = useCabin();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [cabin, setCabin] = useState(selectedCabin?.name || '');
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callHost = () => {
    Linking.openURL(`tel:${CONTACT.phone}`);
  };

  const textHost = () => {
    Linking.openURL(`sms:${CONTACT.phone}`);
  };

  const submitMaintenanceIssue = async () => {
    if (!name.trim() || !cabin.trim() || !issue.trim()) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL || 'https://cabin-portal-app.preview.emergentagent.com';
      
      const response = await fetch(`${backendUrl}/api/maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          cabin: cabin.trim(),
          issue: issue.trim(),
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Issue Reported',
          'Thank you! We have received your maintenance request and will address it as soon as possible.',
          [{ text: 'OK', onPress: () => {
            setShowForm(false);
            setName('');
            setIssue('');
          }}]
        );
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      Alert.alert(
        'Submission Failed',
        'Please try again or contact us directly by phone.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
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
            <Ionicons name="help-buoy" size={48} color={COLORS.primary} />
            <Text style={styles.headline}>Need Assistance?</Text>
            <Text style={styles.subtext}>We're here to help make your stay perfect.</Text>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.sectionTitle}>Contact Host</Text>
            
            <TouchableOpacity
              style={styles.contactButton}
              onPress={callHost}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="call" size={24} color={COLORS.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Call Host</Text>
                <Text style={styles.contactValue}>{CONTACT.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={COLORS.lightGray} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={textHost}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: COLORS.secondary }]}>
                <Ionicons name="chatbubble" size={24} color={COLORS.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Text Host</Text>
                <Text style={styles.contactValue}>{CONTACT.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.maintenanceHeader}
              onPress={() => setShowForm(!showForm)}
            >
              <View style={styles.maintenanceTitle}>
                <Ionicons name="construct" size={24} color={COLORS.secondary} />
                <Text style={styles.sectionTitle}>Report Maintenance Issue</Text>
              </View>
              <Ionicons
                name={showForm ? 'chevron-up' : 'chevron-down'}
                size={22}
                color={COLORS.text}
              />
            </TouchableOpacity>

            {showForm && (
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Your Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={COLORS.lightGray}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Cabin</Text>
                  <TextInput
                    style={styles.input}
                    value={cabin}
                    onChangeText={setCabin}
                    placeholder="Select cabin"
                    placeholderTextColor={COLORS.lightGray}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Issue Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={issue}
                    onChangeText={setIssue}
                    placeholder="Describe the issue..."
                    placeholderTextColor={COLORS.lightGray}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity
                  style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                  onPress={submitMaintenanceIssue}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <>
                      <Ionicons name="send" size={20} color={COLORS.white} />
                      <Text style={styles.submitButtonText}>Submit Issue</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.emergencyNote}>
            <Ionicons name="information-circle" size={18} color={COLORS.text} />
            <Text style={styles.emergencyText}>
              For emergencies, please call 911 first, then contact us.
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
  subtext: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  contactCard: {
    ...CARD_STYLE,
    marginBottom: SPACING.md,
  },
  card: {
    ...CARD_STYLE,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  contactLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
  },
  contactValue: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
    marginTop: 2,
  },
  maintenanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  maintenanceTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  form: {
    marginTop: SPACING.md,
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
  textArea: {
    minHeight: 100,
    paddingTop: SPACING.md,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 12,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  emergencyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    opacity: 0.6,
  },
  emergencyText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
});
