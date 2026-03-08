import React, { useState, useEffect, useRef } from 'react';
import { Leaf, CloudRain, Trees, Waves, Pencil, ArrowRight, Clock, Sun, Coffee, PersonStanding, Music, Footprints, Flame, BookOpen, Dices, Star, Map, UtensilsCrossed, Droplets, Camera, Car, Store, Fish, Bell, Square, Lock, X, Lightbulb } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS } from '../styles/theme';
import './CabinMode.css';

const NATURE_SOUNDS = [
  { id: 'rain', name: 'Rain', icon: CloudRain },
  { id: 'forest', name: 'Forest', icon: Trees },
  { id: 'creek', name: 'Creek', icon: Waves },
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

const TIMER_OPTIONS = [
  { label: '30 min', minutes: 30 },
  { label: '1 hour', minutes: 60 },
  { label: '2 hours', minutes: 120 },
  { label: '4 hours', minutes: 240 },
];

const FUN_ACTIVITIES = [
  {
    duration: '30 Minutes',
    activities: [
      { name: 'Watch the sunset/sunrise', icon: Sun },
      { name: 'Make a cup of coffee or tea', icon: Coffee },
      { name: 'Write in your journal', icon: Pencil },
      { name: 'Do some stretching', icon: PersonStanding },
      { name: 'Listen to the birds', icon: Music },
    ],
  },
  {
    duration: '1 Hour',
    activities: [
      { name: 'Take a nature walk', icon: Footprints },
      { name: 'Sit by the fire pit', icon: Flame },
      { name: 'Read a book on the porch', icon: BookOpen },
      { name: 'Play a card or board game', icon: Dices },
      { name: 'Stargaze at night', icon: Star },
    ],
  },
  {
    duration: '2 Hours',
    activities: [
      { name: 'Explore a nearby hiking trail', icon: Map },
      { name: 'Have a picnic outdoors', icon: UtensilsCrossed },
      { name: 'Soak in the hot tub', icon: Droplets },
      { name: 'Cook a meal together', icon: UtensilsCrossed },
      { name: 'Photography walk', icon: Camera },
    ],
  },
  {
    duration: '4 Hours',
    activities: [
      { name: 'Visit Beavers Bend State Park', icon: Trees },
      { name: 'Kayak or paddleboard the lake', icon: Waves },
      { name: 'Drive the Talimena Scenic Byway', icon: Car },
      { name: 'Visit local shops in Hochatown', icon: Store },
      { name: 'Fishing at Broken Bow Lake', icon: Fish },
    ],
  },
];

const JOURNAL_STORAGE_KEY = 'cabin_journal_entries';
const ALARM_SOUND_URL = 'https://soundbible.com/mp3/Ship_Bell-Mike_Koenig-1911209136.mp3';

export default function CabinMode() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadJournalEntries();
    alarmRef.current = new Audio(ALARM_SOUND_URL);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playAlarm();
            setTimerMinutes(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.play().catch(console.error);
    }
    alert('Session Complete! Your digital detox session has ended. How do you feel?');
  };

  const loadJournalEntries = () => {
    try {
      const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (saved) {
        setJournalEntries(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading journal:', error);
    }
  };

  const saveJournalEntry = () => {
    if (!journalContent.trim()) return;
    
    const newEntry = {
      id: Date.now().toString(),
      prompt: JOURNAL_PROMPTS[currentPrompt],
      title: journalTitle.trim() || 'Untitled',
      content: journalContent.trim(),
      date: new Date().toLocaleDateString(),
    };
    
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
    
    setJournalTitle('');
    setJournalContent('');
    setShowJournalModal(false);
  };

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActiveSound(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio('https://soundbible.com/mp3/rainforest_ambience-GlorySunz-1938133500.mp3');
      audio.loop = true;
      audio.volume = 0.6;
      audio.play().catch(() => {
        alert('Tap again to start the nature sounds.');
      });
      audioRef.current = audio;
      setActiveSound(soundId);
    }
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

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Leaf size={48} color={COLORS.primary} />
        <h1 className="page-title center">Cabin Mode</h1>
        <p className="header-subtext">Take a break from the noise and enjoy the woods.</p>
      </div>

      {/* Nature Sounds */}
      <Card className="section-card">
        <h2 className="section-title">Nature Sounds</h2>
        <p className="section-note">Tap to play ambient nature sounds</p>
        <div className="sound-grid">
          {NATURE_SOUNDS.map((sound) => (
            <button
              key={sound.id}
              className={`sound-btn ${activeSound === sound.id ? 'active' : ''}`}
              onClick={() => toggleSound(sound.id)}
            >
              <sound.icon size={28} color={activeSound === sound.id ? 'white' : COLORS.primary} />
              <span>{sound.name}</span>
              {activeSound === sound.id && <Music size={14} className="playing-icon" />}
            </button>
          ))}
        </div>
      </Card>

      {/* Journal Prompts */}
      <Card className="section-card">
        <h2 className="section-title">Journal Prompts</h2>
        <div className="prompt-container">
          <Pencil size={24} color={COLORS.secondary} />
          <p className="prompt-text">{JOURNAL_PROMPTS[currentPrompt]}</p>
        </div>
        <div className="journal-buttons">
          <button className="write-btn" onClick={() => setShowJournalModal(true)}>
            <Pencil size={18} />
            <span>Write Entry</span>
          </button>
          <button className="next-btn" onClick={() => setCurrentPrompt((p) => (p + 1) % JOURNAL_PROMPTS.length)}>
            <span>Next Prompt</span>
            <ArrowRight size={18} color={COLORS.primary} />
          </button>
        </div>
        {journalEntries.length > 0 && (
          <p className="entry-count">{journalEntries.length} journal {journalEntries.length === 1 ? 'entry' : 'entries'} saved</p>
        )}
      </Card>

      {/* Digital Detox Timer */}
      <Card className="section-card">
        <h2 className="section-title">Digital Detox Timer</h2>
        {timerMinutes ? (
          <div className="timer-active">
            <p className="timer-display">{formatTime(timeLeft)}</p>
            <p className="timer-label">Unplug and reconnect with nature</p>
            <div className="alarm-notice">
              <Bell size={16} color={COLORS.secondary} />
              <span>An alarm will sound when the session is complete</span>
            </div>
            <button className="stop-btn" onClick={() => { setTimerMinutes(null); setTimeLeft(0); }}>
              <Square size={18} />
              <span>End Session</span>
            </button>
          </div>
        ) : (
          <div className="timer-grid">
            {TIMER_OPTIONS.map((option) => (
              <button
                key={option.minutes}
                className="timer-option"
                onClick={() => { setTimerMinutes(option.minutes); setTimeLeft(option.minutes * 60); }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Fun Things To Do */}
      <Card className="section-card">
        <h2 className="section-title">Fun Things To Do Without Technology</h2>
        <p className="section-note">Activities organized by time</p>
        {FUN_ACTIVITIES.map((category, index) => (
          <div key={category.duration} className="category-container">
            <button
              className="category-header"
              onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
            >
              <div className="category-title-row">
                <Clock size={20} color={COLORS.secondary} />
                <span>{category.duration}</span>
              </div>
              <span className="expand-icon">{expandedCategory === index ? '−' : '+'}</span>
            </button>
            {expandedCategory === index && (
              <div className="activity-list">
                {category.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="activity-item">
                    <activity.icon size={20} color={COLORS.primary} />
                    <span>{activity.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </Card>

      {/* Journal Modal */}
      {showJournalModal && (
        <div className="modal-overlay" onClick={() => setShowJournalModal(false)}>
          <div className="journal-modal" onClick={e => e.stopPropagation()}>
            <div className="journal-modal-header">
              <button onClick={() => setShowJournalModal(false)}><X size={28} color={COLORS.text} /></button>
              <span>Journal Entry</span>
              <button className="save-btn" onClick={saveJournalEntry}>Save</button>
            </div>
            <div className="journal-modal-body">
              <div className="prompt-box">
                <Lightbulb size={18} color={COLORS.secondary} />
                <p>{JOURNAL_PROMPTS[currentPrompt]}</p>
              </div>
              <input
                type="text"
                className="title-input"
                placeholder="Entry title (optional)"
                value={journalTitle}
                onChange={e => setJournalTitle(e.target.value)}
              />
              <textarea
                className="content-input"
                placeholder="Write your thoughts..."
                value={journalContent}
                onChange={e => setJournalContent(e.target.value)}
              />
              <div className="privacy-note">
                <Lock size={16} color={COLORS.text} />
                <p>Your journal entries are stored only on this device and are completely private.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
