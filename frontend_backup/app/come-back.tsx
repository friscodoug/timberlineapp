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

export default function ComeBackScreen() {
  const router = useRouter();

  const openBooking = () => {
    Linking.openURL(CONTACT.website);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="heart" size={48} color={COLORS.secondary} />
          <Text style={styles.headline}>Love your stay?</Text>
          <Text style={styles.subheadline}>Come back to the Hollow.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.description}>
            Returning guests receive exclusive discounts when booking direct.
          </Text>

          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Your Discount Code</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>HOLLOW10</Text>
            </View>
            <Text style={styles.codeHint}>Use at checkout for 10% off</Text>
          </View>

          <View style={styles.benefits}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
              <Text style={styles.benefitText}>Best price guarantee</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
              <Text style={styles.benefitText}>No booking fees</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
              <Text style={styles.benefitText}>Direct host communication</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={openBooking} activeOpacity={0.8}>
            <Ionicons name="calendar-outline" size={22} color={COLORS.white} />
            <Text style={styles.buttonText}>Book Your Next Stay</Text>
          </TouchableOpacity>
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
  subheadline: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.secondary,
    marginTop: SPACING.xs,
  },
  card: {
    ...CARD_STYLE,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  codeContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  codeLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: SPACING.sm,
  },
  codeBox: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  codeText: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    letterSpacing: 4,
  },
  codeHint: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    marginTop: SPACING.sm,
    opacity: 0.7,
  },
  benefits: {
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  benefitText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
});
