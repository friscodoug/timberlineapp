import React, { useState, useEffect, useRef } from 'react';
import { Leaf, CloudRain, Trees, Waves, Pencil, ArrowRight, Clock, Sun, Coffee, PersonStanding, Music, Footprints, Flame, BookOpen, Dices, Star, Map, UtensilsCrossed, Droplets, Camera, Car, Store, Fish, Bell, Square, Lock, X, Lightbulb, Play, Timer, ChevronRight, Trash2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS, IMAGES } from '../config/brand.config';
import './CabinMode.css';

// Different audio URLs for each nature sound
const SOUND_URLS: { [key: string]: string } = {
  rain: 'https://cdn.pixabay.com/audio/2022/05/13/audio_257112ce99.mp3',
  forest: 'https://cdn.pixabay.com/audio/2022/03/10/audio_4dedf5bf94.mp3',
  creek: 'https://bigsoundbank.com/UPLOAD/mp3/0949.mp3',
};

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

const JOURNAL_TIMER_OPTIONS = [
  { label: '5 min', minutes: 5 },
  { label: '10 min', minutes: 10 },
  { label: '15 min', minutes: 15 },
  { label: '20 min', minutes: 20 },
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
  const [showEntriesModal, setShowEntriesModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  // Journal timer states
  const [selectedJournalTime, setSelectedJournalTime] = useState<number | null>(null);
  const [journalTimeLeft, setJournalTimeLeft] = useState<number>(0);
  const [journalTimerActive, setJournalTimerActive] = useState(false);
  // Detox session fullscreen
  const [showDetoxSession, setShowDetoxSession] = useState(false);
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

  // Digital Detox Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Journal Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (journalTimerActive && journalTimeLeft > 0) {
      interval = setInterval(() => {
        setJournalTimeLeft((prev) => {
          if (prev <= 1) {
            playAlarm();
            setJournalTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [journalTimerActive, journalTimeLeft]);

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.play().catch(console.error);
    }
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
    setJournalTimerActive(false);
    setJournalTimeLeft(0);
    setSelectedJournalTime(null);
  };

  const deleteJournalEntry = (entryId: string) => {
    const updated = journalEntries.filter(e => e.id !== entryId);
    setJournalEntries(updated);
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
    setSelectedEntry(null);
  };

  const closeJournalModal = () => {
    setShowJournalModal(false);
    setJournalTimerActive(false);
    setJournalTimeLeft(0);
    setSelectedJournalTime(null);
    setJournalTitle('');
    setJournalContent('');
  };

  const startJournalTimer = () => {
    if (selectedJournalTime) {
      setJournalTimeLeft(selectedJournalTime * 60);
      setJournalTimerActive(true);
    }
  };

  const startDetoxSession = (minutes: number) => {
    setTimerMinutes(minutes);
    setTimeLeft(minutes * 60);
    setShowDetoxSession(true);
  };

  const endDetoxSession = () => {
    setShowDetoxSession(false);
    setTimerMinutes(null);
    setTimeLeft(0);
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
      const soundUrl = SOUND_URLS[soundId] || SOUND_URLS.rain;
      const audio = new Audio(soundUrl);
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

  // Fullscreen Detox Session
  if (showDetoxSession) {
    return (
      <div className="detox-session-screen">
        <div className="detox-content">
          <Leaf size={64} color="white" className="detox-icon" />
          <h1 className="detox-title">Digital Detox</h1>
          <p className="detox-message">
            You have made the smart choice to disconnect and just enjoy your time in nature.
          </p>
          
          <div className="detox-timer-container">
            <p className="detox-timer">{formatTime(timeLeft)}</p>
            <p className="detox-timer-label">Time remaining</p>
          </div>

          <div className="detox-alarm-notice">
            <Bell size={18} color="rgba(255,255,255,0.8)" />
            <span>An alarm will sound when the session is complete</span>
          </div>

          <button className="end-session-btn" onClick={endDetoxSession}>
            <Square size={20} />
            <span>End Session</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <img src={IMAGES.cabinModeLogo} alt="Cabin Mode" className="cabin-mode-page-logo" />
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
          <button className="view-entries-btn" onClick={() => setShowEntriesModal(true)}>
            <BookOpen size={18} color={COLORS.primary} />
            <span>View {journalEntries.length} Journal {journalEntries.length === 1 ? 'Entry' : 'Entries'}</span>
            <ChevronRight size={18} color={COLORS.lightGray} />
          </button>
        )}
      </Card>

      {/* Digital Detox Timer */}
      <Card className="section-card">
        <h2 className="section-title">Digital Detox Timer</h2>
        <p className="section-note">Choose a duration and disconnect</p>
        <div className="timer-grid">
          {TIMER_OPTIONS.map((option) => (
            <button
              key={option.minutes}
              className="timer-option"
              onClick={() => startDetoxSession(option.minutes)}
            >
              {option.label}
            </button>
          ))}
        </div>
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
        <div className="modal-overlay" onClick={closeJournalModal}>
          <div className="journal-modal" onClick={e => e.stopPropagation()}>
            <div className="journal-modal-header">
              <button onClick={closeJournalModal}><X size={28} color={COLORS.text} /></button>
              <span>Journal Entry</span>
              <button className="save-btn" onClick={saveJournalEntry}>Save</button>
            </div>
            <div className="journal-modal-body">
              {/* Timer display when active */}
              {journalTimerActive && (
                <div className="journal-timer-display">
                  <Timer size={20} color={COLORS.secondary} />
                  <span className="journal-timer-countdown">{formatTime(journalTimeLeft)}</span>
                </div>
              )}
              
              {/* Timer selection - show only if not started */}
              {!journalTimerActive && (
                <div className="journal-timer-section">
                  <p className="timer-label-small">Set a writing timer (optional)</p>
                  <div className="journal-timer-options">
                    {JOURNAL_TIMER_OPTIONS.map((option) => (
                      <button
                        key={option.minutes}
                        className={`journal-timer-btn ${selectedJournalTime === option.minutes ? 'selected' : ''}`}
                        onClick={() => setSelectedJournalTime(option.minutes)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {selectedJournalTime && (
                    <button className="start-timer-btn" onClick={startJournalTimer}>
                      <Play size={16} />
                      <span>Start Timer</span>
                    </button>
                  )}
                </div>
              )}

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

      {/* View Entries Modal */}
      {showEntriesModal && (
        <div className="modal-overlay" onClick={() => { setShowEntriesModal(false); setSelectedEntry(null); }}>
          <div className="entries-modal" onClick={e => e.stopPropagation()}>
            <div className="journal-modal-header">
              <button onClick={() => { setShowEntriesModal(false); setSelectedEntry(null); }}><X size={28} color={COLORS.text} /></button>
              <span>{selectedEntry ? 'Journal Entry' : 'Your Journal'}</span>
              <div style={{ width: 60 }}></div>
            </div>
            <div className="entries-modal-body">
              {selectedEntry ? (
                <div className="entry-detail">
                  <div className="entry-detail-header">
                    <button className="back-to-list" onClick={() => setSelectedEntry(null)}>
                      <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
                      <span>Back</span>
                    </button>
                    <button className="delete-entry-btn" onClick={() => deleteJournalEntry(selectedEntry.id)}>
                      <Trash2 size={18} color="#E74C3C" />
                    </button>
                  </div>
                  <h3 className="entry-detail-title">{selectedEntry.title}</h3>
                  <p className="entry-detail-date">{selectedEntry.date}</p>
                  <div className="entry-detail-prompt">
                    <Lightbulb size={16} color={COLORS.secondary} />
                    <p>{selectedEntry.prompt}</p>
                  </div>
                  <p className="entry-detail-content">{selectedEntry.content}</p>
                </div>
              ) : (
                <div className="entries-list">
                  {journalEntries.length === 0 ? (
                    <p className="no-entries">No journal entries yet. Start writing!</p>
                  ) : (
                    journalEntries.map((entry) => (
                      <button key={entry.id} className="entry-item" onClick={() => setSelectedEntry(entry)}>
                        <div className="entry-info">
                          <h4 className="entry-title">{entry.title}</h4>
                          <p className="entry-date">{entry.date}</p>
                          <p className="entry-preview">{entry.content.substring(0, 60)}...</p>
                        </div>
                        <ChevronRight size={20} color={COLORS.lightGray} />
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
