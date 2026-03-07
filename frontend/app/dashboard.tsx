import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { useCabin } from '../src/context/CabinContext';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  route: string;
  color: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', title: 'Digital Guidebook', subtitle: 'Everything you need to know in one place', icon: 'book-outline', route: '/guidebook', color: COLORS.primary },
  { id: '2', title: 'Cabin Mode', subtitle: 'Disconnect from technology and enjoy nature', icon: 'leaf-outline', route: '/cabin-mode', color: '#4A7C59' },
  { id: '3', title: 'Come Back & Save', subtitle: 'Who doesn\'t LOVE discounts?', icon: 'gift-outline', route: '/come-back', color: '#8B6A4E' },
  { id: '4', title: 'Join the Pine Post', subtitle: 'Our monthly newsletter', icon: 'mail-outline', route: '/newsletter', color: '#5B8A72' },
  { id: '5', title: 'Connect With Us', subtitle: 'Follow us on social media', icon: 'share-social-outline', route: '/connect', color: '#6B8E7A' },
  { id: '6', title: 'Need Help', subtitle: 'We\'re here for you', icon: 'help-circle-outline', route: '/help', color: '#7A6B5B' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { selectedCabin, clearCabin } = useCabin();

  const handleChangeCabin = async () => {
    await clearCabin();
    router.replace('/');
  };

  if (!selectedCabin) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.cabinName}>{selectedCabin.name}</Text>
          <TouchableOpacity style={styles.changeButton} onPress={handleChangeCabin}>
            <Ionicons name="swap-horizontal" size={16} color={COLORS.primary} />
            <Text style={styles.changeText}>Change cabin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bannerCard}>
          <Image source={{ uri: selectedCabin.image }} style={styles.bannerImage} />
        </View>

        <View style={styles.menuGrid}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={28} color={COLORS.white} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.lightGray} />
            </TouchableOpacity>
          ))}
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
  header: {
    marginBottom: SPACING.md,
  },
  welcomeText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    opacity: 0.7,
  },
  cabinName: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  changeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
  },
  bannerCard: {
    ...CARD_STYLE,
    padding: 0,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  bannerImage: {
    width: '100%',
    height: 180,
  },
  menuGrid: {
    gap: SPACING.md,
  },
  menuItem: {
    ...CARD_STYLE,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
  },
  menuSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.6,
    marginTop: 2,
  },
});
