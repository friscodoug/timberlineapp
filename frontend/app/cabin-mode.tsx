import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SPACING, CARD_STYLE } from '../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface SoundOption {
  id: string;
  name: string;
  icon: IconName;
}

const NATURE_SOUNDS: SoundOption[] = [
  { id: 'rain', name: 'Rain', icon: 'rainy-outline' },
  { id: 'forest', name: 'Forest', icon: 'leaf-outline' },
  { id: 'creek', name: 'Creek', icon: 'water-outline' },
];

const JOURNAL_PROMPTS = [
  'What slowed you down today?',
  'What do you want to remember from this trip?',
  'What was the highlight of today?',
  'What sounds did you notice in nature today?',
  'Describe a moment of peace you experienced.',
  'What are you grateful for right now?',
  'What would you tell your busy self back home?',
  'What surprised you about disconnecting?',
  'Write about something beautiful you saw today.',
  'How does your body feel when you slow down?',
  'What conversation will you remember from this trip?',
  'If these woods could talk, what would they say?',
];

interface TimerOption {
  label: string;
  minutes: number;
}

const TIMER_OPTIONS: TimerOption[] = [
  { label: '30 min', minutes: 30 },
  { label: '1 hour', minutes: 60 },
  { label: '2 hours', minutes: 120 },
  { label: '4 hours', minutes: 240 },
];

interface Activity {
  name: string;
  icon: IconName;
}

interface ActivityCategory {
  duration: string;
  minutes: number;
  activities: Activity[];
}

const FUN_ACTIVITIES: ActivityCategory[] = [
  {
    duration: '30 Minutes',
    minutes: 30,
    activities: [
      { name: 'Watch the sunset/sunrise', icon: 'sunny-outline' },
      { name: 'Make a cup of coffee or tea', icon: 'cafe-outline' },
      { name: 'Write in your journal', icon: 'create-outline' },
      { name: 'Do some stretching', icon: 'body-outline' },
      { name: 'Listen to the birds', icon: 'musical-notes-outline' },
    ],
  },
  {
    duration: '1 Hour',
    minutes: 60,
    activities: [
      { name: 'Take a nature walk', icon: 'walk-outline' },
      { name: 'Sit by the fire pit', icon: 'flame-outline' },
      { name: 'Read a book on the porch', icon: 'book-outline' },
      { name: 'Play a card or board game', icon: 'dice-outline' },
      { name: 'Stargaze at night', icon: 'star-outline' },
    ],
  },
  {
    duration: '2 Hours',
    minutes: 120,
    activities: [
      { name: 'Explore a nearby hiking trail', icon: 'trail-sign-outline' },
      { name: 'Have a picnic outdoors', icon: 'basket-outline' },
      { name: 'Soak in the hot tub', icon: 'water-outline' },
      { name: 'Cook a meal together', icon: 'restaurant-outline' },
      { name: 'Photography walk', icon: 'camera-outline' },
    ],
  },
  {
    duration: '4 Hours',
    minutes: 240,
    activities: [
      { name: 'Visit Beavers Bend State Park', icon: 'leaf-outline' },
      { name: 'Kayak or paddleboard the lake', icon: 'boat-outline' },
      { name: 'Drive the Talimena Scenic Byway', icon: 'car-outline' },
      { name: 'Visit local shops in Hochatown', icon: 'storefront-outline' },
      { name: 'Fishing at Broken Bow Lake', icon: 'fish-outline' },
    ],
  },
];

interface JournalEntry {
  id: string;
  prompt: string;
  title: string;
  content: string;
  date: string;
}

const JOURNAL_STORAGE_KEY = 'cabin_journal_entries';

export default function CabinModeScreen() {
  const router = useRouter();
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadJournalEntries();
    return () => {
      // Cleanup audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerMinutes(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const loadJournalEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
      if (saved) {
        setJournalEntries(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading journal:', error);
    }
  };

  const saveJournalEntry = async () => {
    if (!journalContent.trim()) return;
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      prompt: JOURNAL_PROMPTS[currentPrompt],
      title: journalTitle.trim() || 'Untitled',
      content: journalContent.trim(),
      date: new Date().toLocaleDateString(),
    };
    
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    
    try {
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving journal:', error);
    }
    
    setJournalTitle('');
    setJournalContent('');
    setShowJournalModal(false);
  };

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      // Turn off sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActiveSound(null);
    } else {
      // Stop any currently playing sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // For web, use HTML5 Audio
      if (Platform.OS === 'web') {
        try {
          const audio = new Audio('https://soundbible.com/mp3/rainforest_ambience-GlorySunz-1938133500.mp3');
          audio.loop = true;
          audio.volume = 0.6;
          audio.play().catch((e) => {
            console.log('Audio autoplay blocked:', e);
            Alert.alert(
              'Sound Playback',
              'Tap again to start the nature sounds. Some browsers require user interaction first.',
              [{ text: 'OK' }]
            );
          });
          audioRef.current = audio;
          setActiveSound(soundId);
        } catch (error) {
          console.error('Audio error:', error);
          setActiveSound(soundId); // Still show visual feedback
        }
      } else {
        // For native, just show visual state
        // Note: Native audio would require expo-audio setup
        setActiveSound(soundId);
      }
    }
  };

  const startTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setTimeLeft(minutes * 60);
  };

  const stopTimer = () => {
    setTimerMinutes(null);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % JOURNAL_PROMPTS.length);
  };

  const openJournalEntry = () => {
    setJournalTitle('');
    setJournalContent('');
    setShowJournalModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="leaf" size={48} color={COLORS.primary} />
          <Text style={styles.headline}>Cabin Mode</Text>
          <Text style={styles.subtext}>Take a break from the noise and enjoy the woods.</Text>
        </View>

        {/* Nature Sounds */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Nature Sounds</Text>
          <Text style={styles.soundNote}>Tap to play ambient nature sounds</Text>
          <View style={styles.soundGrid}>
            {NATURE_SOUNDS.map((sound) => (
              <TouchableOpacity
                key={sound.id}
                style={[
                  styles.soundButton,
                  activeSound === sound.id && styles.soundButtonActive,
                ]}
                onPress={() => toggleSound(sound.id)}
              >
                <Ionicons
                  name={sound.icon}
                  size={28}
                  color={activeSound === sound.id ? COLORS.white : COLORS.primary}
                />
                <Text
                  style={[
                    styles.soundText,
                    activeSound === sound.id && styles.soundTextActive,
                  ]}
                >
                  {sound.name}
                </Text>
                {activeSound === sound.id && (
                  <View style={styles.playingIndicator}>
                    <Ionicons name="musical-notes" size={14} color={COLORS.white} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Journal Prompts */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Journal Prompts</Text>
          <View style={styles.promptContainer}>
            <Ionicons name="create-outline" size={24} color={COLORS.secondary} />
            <Text style={styles.promptText}>{JOURNAL_PROMPTS[currentPrompt]}</Text>
          </View>
          <View style={styles.journalButtons}>
            <TouchableOpacity style={styles.writeButton} onPress={openJournalEntry}>
              <Ionicons name="pencil" size={18} color={COLORS.white} />
              <Text style={styles.writeButtonText}>Write Entry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={nextPrompt}>
              <Text style={styles.nextButtonText}>Next Prompt</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {journalEntries.length > 0 && (
            <Text style={styles.entryCount}>
              {journalEntries.length} journal {journalEntries.length === 1 ? 'entry' : 'entries'} saved
            </Text>
          )}
        </View>

        {/* Digital Detox Timer */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Digital Detox Timer</Text>
          {timerMinutes ? (
            <View style={styles.timerActive}>
              <Text style={styles.timerDisplay}>{formatTime(timeLeft)}</Text>
              <Text style={styles.timerLabel}>Unplug and reconnect with nature</Text>
              <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
                <Ionicons name="stop" size={18} color={COLORS.white} />
                <Text style={styles.stopButtonText}>End Session</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.timerGrid}>
              {TIMER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.minutes}
                  style={styles.timerOption}
                  onPress={() => startTimer(option.minutes)}
                >
                  <Text style={styles.timerOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Fun Things To Do */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fun Things To Do Without Technology</Text>
          <Text style={styles.activitiesSubtext}>Activities organized by time</Text>
          
          {FUN_ACTIVITIES.map((category, index) => (
            <View key={category.duration} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => setExpandedCategory(expandedCategory === index ? null : index)}
              >
                <View style={styles.categoryTitleRow}>
                  <Ionicons name="time-outline" size={20} color={COLORS.secondary} />
                  <Text style={styles.categoryTitle}>{category.duration}</Text>
                </View>
                <Ionicons
                  name={expandedCategory === index ? 'chevron-up' : 'chevron-down'}
                  size={22}
                  color={COLORS.text}
                />
              </TouchableOpacity>
              
              {expandedCategory === index && (
                <View style={styles.activityList}>
                  {category.activities.map((activity, actIndex) => (
                    <View key={actIndex} style={styles.activityItem}>
                      <Ionicons name={activity.icon} size={20} color={COLORS.primary} />
                      <Text style={styles.activityText}>{activity.name}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Journal Entry Modal */}
      <Modal visible={showJournalModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalKeyboard}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowJournalModal(false)}>
                <Ionicons name="close" size={28} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Journal Entry</Text>
              <TouchableOpacity onPress={saveJournalEntry}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.promptBox}>
                <Ionicons name="bulb-outline" size={18} color={COLORS.secondary} />
                <Text style={styles.modalPrompt}>{JOURNAL_PROMPTS[currentPrompt]}</Text>
              </View>
              
              <TextInput
                style={styles.titleInput}
                placeholder="Entry title (optional)"
                placeholderTextColor={COLORS.lightGray}
                value={journalTitle}
                onChangeText={setJournalTitle}
              />
              
              <TextInput
                style={styles.contentInput}
                placeholder="Write your thoughts..."
                placeholderTextColor={COLORS.lightGray}
                value={journalContent}
                onChangeText={setJournalContent}
                multiline
                textAlignVertical="top"
              />
              
              <View style={styles.privacyNote}>
                <Ionicons name="lock-closed-outline" size={16} color={COLORS.text} />
                <Text style={styles.privacyText}>
                  Your journal entries are stored only on this device and are completely private.
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
    paddingBottom: SPACING.xl * 2,
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
  card: {
    ...CARD_STYLE,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  soundNote: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.6,
    marginBottom: SPACING.md,
  },
  soundGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  soundButton: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  soundButtonActive: {
    backgroundColor: COLORS.primary,
  },
  soundText: {
    marginTop: SPACING.xs,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.primary,
  },
  soundTextActive: {
    color: COLORS.white,
  },
  playingIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  promptContainer: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    gap: SPACING.md,
  },
  promptText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.text,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 26,
  },
  journalButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  writeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  writeButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  nextButtonText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
  entryCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  timerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  timerOption: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  timerOptionText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.primary,
  },
  timerActive: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  timerLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
  },
  stopButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  activitiesSubtext: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: SPACING.md,
  },
  categoryContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  categoryTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
  },
  activityList: {
    marginTop: SPACING.sm,
    gap: SPACING.sm,
    paddingLeft: SPACING.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  activityText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalKeyboard: {
    flex: 1,
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
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
  },
  saveButton: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.primary,
  },
  modalContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  promptBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
  },
  modalPrompt: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.secondary,
    fontStyle: 'italic',
  },
  titleInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  contentInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    minHeight: 200,
    marginBottom: SPACING.lg,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: 8,
  },
  privacyText: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
  },
});
