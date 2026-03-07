import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
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
];

const TIMER_OPTIONS = [5, 10, 15, 30];

export default function CabinModeScreen() {
  const router = useRouter();
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
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

  const toggleSound = async (soundId: string) => {
    try {
      if (activeSound === soundId) {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }
        setActiveSound(null);
      } else {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
        }
        // In a real app, we'd load actual sound files here
        // For now, we just track the state
        setActiveSound(soundId);
      }
    } catch (error) {
      console.error('Sound error:', error);
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % JOURNAL_PROMPTS.length);
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
          <TouchableOpacity style={styles.nextButton} onPress={nextPrompt}>
            <Text style={styles.nextButtonText}>Next Prompt</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
          </TouchableOpacity>
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
              {TIMER_OPTIONS.map((minutes) => (
                <TouchableOpacity
                  key={minutes}
                  style={styles.timerOption}
                  onPress={() => startTimer(minutes)}
                >
                  <Text style={styles.timerOptionText}>{minutes}</Text>
                  <Text style={styles.timerOptionLabel}>min</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  nextButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
  timerGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  timerOption: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  timerOptionText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  timerOptionLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    opacity: 0.7,
  },
  timerActive: {
    alignItems: 'center',
    padding: SPACING.lg,
  },
  timerDisplay: {
    fontSize: 56,
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
});
