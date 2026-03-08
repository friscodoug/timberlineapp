import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { CONTACT } from '../src/constants/cabins';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const router = useRouter();

  const callHost = () => {
    Linking.openURL(`tel:${CONTACT.phone}`);
  };

  const textHost = () => {
    Linking.openURL(`sms:${CONTACT.phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.sectionTitle}>Contact Your Host</Text>
          
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
            style={[styles.contactButton, styles.lastButton]}
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

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={COLORS.secondary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Response Times</Text>
            <Text style={styles.infoText}>
              We typically respond within 30 minutes during daytime hours. For urgent matters, please call directly.
            </Text>
          </View>
        </View>

        <View style={styles.emergencyCard}>
          <Ionicons name="warning" size={24} color={COLORS.error} />
          <Text style={styles.emergencyText}>
            For emergencies, please call 911 first, then contact us.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    textAlign: 'center',
  },
  contactCard: {
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
  lastButton: {
    borderBottomWidth: 0,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  contactLabel: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
  },
  contactValue: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    opacity: 0.7,
    marginTop: 2,
  },
  infoCard: {
    ...CARD_STYLE,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
    lineHeight: 20,
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: '#FEF2F2',
    padding: SPACING.md,
    borderRadius: 12,
  },
  emergencyText: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.error,
    fontWeight: FONTS.weights.medium,
  },
});
