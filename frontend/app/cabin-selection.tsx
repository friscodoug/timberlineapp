import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { CABINS, Cabin } from '../src/constants/cabins';
import { useCabin } from '../src/context/CabinContext';
import { Ionicons } from '@expo/vector-icons';

export default function CabinSelectionScreen() {
  const router = useRouter();
  const { selectCabin } = useCabin();
  const [showPhotos, setShowPhotos] = useState(false);

  const handleSelectCabin = async (cabin: Cabin) => {
    await selectCabin(cabin);
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.headline}>Select Your Cabin</Text>
        <Text style={styles.subtext}>Tap your cabin to continue</Text>

        <View style={styles.cabinGrid}>
          {CABINS.map((cabin) => (
            <TouchableOpacity
              key={cabin.id}
              style={styles.cabinCard}
              onPress={() => handleSelectCabin(cabin)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: cabin.image }} style={styles.cabinImage} />
              <View style={styles.cabinOverlay}>
                <Text style={styles.cabinName}>{cabin.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.helpCard}>
          <Ionicons name="help-circle-outline" size={24} color={COLORS.secondary} />
          <Text style={styles.helpTitle}>Not sure which cabin you're in?</Text>
          <Text style={styles.helpText}>
            Check the name on your welcome sign or your door code message.
          </Text>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={() => setShowPhotos(true)}
          >
            <Ionicons name="images-outline" size={20} color={COLORS.white} />
            <Text style={styles.photoButtonText}>Show Cabin Photos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showPhotos} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Our Cabins</Text>
            <TouchableOpacity onPress={() => setShowPhotos(false)}>
              <Ionicons name="close-circle" size={32} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {CABINS.map((cabin) => (
              <View key={cabin.id} style={styles.modalCabinCard}>
                <Image source={{ uri: cabin.image }} style={styles.modalCabinImage} />
                <Text style={styles.modalCabinName}>{cabin.name}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  headline: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  subtext: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  cabinGrid: {
    gap: SPACING.md,
  },
  cabinCard: {
    ...CARD_STYLE,
    padding: 0,
    overflow: 'hidden',
    height: 180,
  },
  cabinImage: {
    width: '100%',
    height: '100%',
  },
  cabinOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(47, 79, 62, 0.9)',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  cabinName: {
    color: COLORS.white,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    textAlign: 'center',
  },
  helpCard: {
    ...CARD_STYLE,
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  helpText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: SPACING.md,
  },
  photoButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  photoButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  modalContent: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  modalCabinCard: {
    ...CARD_STYLE,
    padding: 0,
    overflow: 'hidden',
  },
  modalCabinImage: {
    width: '100%',
    height: 200,
  },
  modalCabinName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    padding: SPACING.md,
    textAlign: 'center',
  },
});
