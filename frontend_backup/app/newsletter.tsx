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

const BENEFITS = [
  'Seasonal specials',
  'Last-minute cabin openings',
  'Giveaways',
  'Retreat announcements',
];

export default function NewsletterScreen() {
  const router = useRouter();

  const handleSubscribe = () => {
    Linking.openURL(CONTACT.mailchimpUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
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

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubscribe}
            activeOpacity={0.8}
          >
            <Ionicons name="paper-plane" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Join the Pine Post</Text>
          </TouchableOpacity>

          <Text style={styles.privacy}>
            We respect your inbox. Unsubscribe anytime.
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
    marginBottom: SPACING.xl,
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
  privacy: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
