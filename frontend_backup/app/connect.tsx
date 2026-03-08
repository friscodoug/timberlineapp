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

export default function ConnectScreen() {
  const router = useRouter();

  const openInstagram = () => {
    Linking.openURL(CONTACT.instagram);
  };

  const openFacebook = () => {
    Linking.openURL(CONTACT.facebook);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="camera" size={48} color={COLORS.primary} />
          <Text style={styles.headline}>Share Your Stay</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.description}>
            Tag your stay and follow us for updates.
          </Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[styles.socialButton, styles.instagramButton]}
              onPress={openInstagram}
              activeOpacity={0.8}
            >
              <Ionicons name="logo-instagram" size={28} color={COLORS.white} />
              <Text style={styles.socialButtonText}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={openFacebook}
              activeOpacity={0.8}
            >
              <Ionicons name="logo-facebook" size={28} color={COLORS.white} />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagBox}>
            <Ionicons name="at" size={24} color={COLORS.secondary} />
            <Text style={styles.tagText}>Tag your stay</Text>
            <Text style={styles.handleText}>@HibernationHollowCabins</Text>
          </View>

          <View style={styles.hashtagContainer}>
            <Text style={styles.hashtagTitle}>Popular Hashtags</Text>
            <View style={styles.hashtags}>
              <Text style={styles.hashtag}>#HibernationHollow</Text>
              <Text style={styles.hashtag}>#BrokenBowCabins</Text>
              <Text style={styles.hashtag}>#HochatownOK</Text>
            </View>
          </View>
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
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  socialButtons: {
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: 12,
  },
  instagramButton: {
    backgroundColor: '#E1306C',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  socialButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  tagBox: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  tagText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  handleText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  hashtagContainer: {
    alignItems: 'center',
  },
  hashtagTitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: SPACING.sm,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  hashtag: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.secondary,
    fontWeight: FONTS.weights.medium,
  },
});
