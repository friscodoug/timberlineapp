import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { LOGO_URL } from '../src/constants/cabins';
import { useCabin } from '../src/context/CabinContext';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  const { selectedCabin, isLoading } = useCabin();

  useEffect(() => {
    if (!isLoading && selectedCabin) {
      router.replace('/dashboard');
    }
  }, [isLoading, selectedCabin]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Ionicons name="leaf" size={40} color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: LOGO_URL }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.headline}>Welcome to Hibernation Hollow Cabins</Text>
          <Ionicons name="paw" size={32} color={COLORS.secondary} style={styles.bearIcon} />
          
          <Text style={styles.subtext}>Your guide to the Hollow.</Text>
          
          <Text style={styles.instruction}>
            Select your cabin to unlock your guest portal.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/cabin-selection')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Ionicons name="leaf" size={16} color={COLORS.primary} />
          <Text style={styles.footerText}>Broken Bow / Hochatown, Oklahoma</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    width: 180,
    height: 180,
  },
  card: {
    ...CARD_STYLE,
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  headline: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  bearIcon: {
    marginVertical: SPACING.md,
  },
  subtext: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
    fontWeight: FONTS.weights.medium,
  },
  instruction: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  footerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
  },
});
