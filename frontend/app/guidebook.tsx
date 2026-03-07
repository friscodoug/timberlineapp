import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { useCabin } from '../src/context/CabinContext';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const GUIDE_ITEMS: { icon: IconName; text: string }[] = [
  { icon: 'wifi-outline', text: 'WiFi information' },
  { icon: 'water-outline', text: 'Hot tub instructions' },
  { icon: 'flame-outline', text: 'Fire pit instructions' },
  { icon: 'tv-outline', text: 'TV instructions' },
  { icon: 'exit-outline', text: 'Checkout steps' },
  { icon: 'home-outline', text: 'Property information' },
  { icon: 'restaurant-outline', text: 'Restaurants in Hochatown' },
  { icon: 'trail-sign-outline', text: 'Local activities and hiking' },
  { icon: 'beer-outline', text: 'Breweries and coffee shops' },
];

export default function GuidebookScreen() {
  const router = useRouter();
  const { selectedCabin } = useCabin();

  const openGuidebook = async () => {
    if (selectedCabin?.guidebookUrl) {
      await WebBrowser.openBrowserAsync(selectedCabin.guidebookUrl);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="book" size={48} color={COLORS.primary} />
          <Text style={styles.headline}>Your Complete Cabin Guide</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.description}>
            Everything you need for a perfect stay is inside our digital guidebook.
          </Text>

          <Text style={styles.insideText}>Inside you'll find:</Text>

          <View style={styles.itemList}>
            {GUIDE_ITEMS.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name={item.icon} size={22} color={COLORS.secondary} />
                <Text style={styles.itemText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={openGuidebook} activeOpacity={0.8}>
            <Ionicons name="open-outline" size={22} color={COLORS.white} />
            <Text style={styles.buttonText}>Open the Digital Guidebook</Text>
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
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  card: {
    ...CARD_STYLE,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  insideText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  itemList: {
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  itemText: {
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
