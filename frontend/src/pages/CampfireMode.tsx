import React, { useState, useRef, useEffect } from 'react';
import { Flame, Users, BookOpen, ChevronDown, ChevronUp, X, Play, Pause, Square } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS } from '../config/brand.config';
import { CAMPFIRE_GAMES, CAMPFIRE_STORIES, Game, Story } from '../data/campfire';
import './CampfireMode.css';

type TabType = 'games' | 'stories';
type StoryCategory = 'family' | 'scary' | 'local';

// Map story IDs to audio file paths
const AUDIO_FILES: Record<string, string> = {
  'f1': '/audio/f1.mp3',
  'f2': '/audio/f2.mp3',
  'f3': '/audio/f3.mp3',
  's1': '/audio/s1.mp3',
  's2': '/audio/s2.mp3',
  's3': '/audio/s3.mp3',
  'l1': '/audio/l1.mp3',
  'l2': '/audio/l2.mp3',
  'l3': '/audio/l3.mp3',
};

export default function CampfireMode() {
  const [activeTab, setActiveTab] = useState<TabType>('games');
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [storyCategory, setStoryCategory] = useState<StoryCategory>('family');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleListen = () => {
    if (!selectedStory) return;
    
    const audioUrl = AUDIO_FILES[selectedStory.id];
    if (!audioUrl) {
      console.error('No audio file for story:', selectedStory.id);
      return;
    }

    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Create new audio element
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    });

    audio.play().then(() => {
      setIsPlaying(true);
      setIsPaused(false);
    }).catch(err => {
      console.error('Failed to play audio:', err);
    });
  };

  const handlePause = () => {
    if (audioRef.current && isPlaying && !isPaused) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (audioRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  };

  const closeStoryModal = () => {
    handleStop();
    setSelectedStory(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredStories = CAMPFIRE_STORIES.filter(s => s.category === storyCategory);

  const getCategoryLabel = (cat: StoryCategory) => {
    switch (cat) {
      case 'family': return 'Family-Friendly';
      case 'scary': return 'Scary';
      case 'local': return 'Local Folklore';
    }
  };

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Flame size={48} color={COLORS.campfireOrange} />
        <h1 className="page-title center">Campfire Mode</h1>
        <p className="header-subtext">Games and stories for the whole family</p>
      </div>

      {/* Tab Toggle */}
      <div className="tab-toggle">
        <button 
          className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <Users size={20} />
          <span>Family Games</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          <BookOpen size={20} />
          <span>Stories</span>
        </button>
      </div>

      {/* Games Tab */}
      {activeTab === 'games' && (
        <div className="games-list">
          {CAMPFIRE_GAMES.map((game) => (
            <Card key={game.id} className="game-card">
              <button 
                className="game-header"
                onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
              >
                <div className="game-info">
                  <h3 className="game-name">{game.name}</h3>
                  <span className="game-players">{game.players}</span>
                </div>
                {expandedGame === game.id ? (
                  <ChevronUp size={24} color={COLORS.secondary} />
                ) : (
                  <ChevronDown size={24} color={COLORS.textLight} />
                )}
              </button>
              
              {expandedGame === game.id && (
                <div className="game-details">
                  <p className="game-overview">{game.overview}</p>
                  <div className="game-instructions">
                    <h4>How to Play:</h4>
                    <ol>
                      {game.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Stories Tab */}
      {activeTab === 'stories' && (
        <div className="stories-section">
          {/* Category Tabs */}
          <div className="category-tabs">
            {(['family', 'scary', 'local'] as StoryCategory[]).map((cat) => (
              <button
                key={cat}
                className={`category-tab ${storyCategory === cat ? 'active' : ''}`}
                onClick={() => setStoryCategory(cat)}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Stories List */}
          <div className="stories-list">
            {filteredStories.map((story) => (
              <Card 
                key={story.id} 
                className="story-card"
                onClick={() => setSelectedStory(story)}
              >
                <h3 className="story-title">{story.title}</h3>
                <p className="story-preview">{story.preview}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Story Modal */}
      {selectedStory && (
        <div className="modal-overlay" onClick={closeStoryModal}>
          <div className="story-modal" onClick={e => e.stopPropagation()}>
            <div className="story-modal-header">
              <button onClick={closeStoryModal}>
                <X size={28} color={COLORS.primary} />
              </button>
              <span>{getCategoryLabel(selectedStory.category)}</span>
              <div style={{ width: 28 }}></div>
            </div>
            
            <div className="story-modal-body">
              <h2 className="story-modal-title">{selectedStory.title}</h2>
              
              {/* Audio Controls */}
              <div className="audio-controls">
                <div className="audio-buttons">
                  {!isPlaying ? (
                    <button className="audio-btn listen" onClick={handleListen}>
                      <Play size={18} />
                      <span>Listen</span>
                    </button>
                  ) : isPaused ? (
                    <button className="audio-btn resume" onClick={handleResume}>
                      <Play size={18} />
                      <span>Resume</span>
                    </button>
                  ) : (
                    <button className="audio-btn pause" onClick={handlePause}>
                      <Pause size={18} />
                      <span>Pause</span>
                    </button>
                  )}
                  {isPlaying && (
                    <button className="audio-btn stop" onClick={handleStop}>
                      <Square size={18} />
                      <span>Stop</span>
                    </button>
                  )}
                </div>
                
                {/* Progress bar */}
                {isPlaying && (
                  <div className="audio-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                      />
                    </div>
                    <div className="time-display">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="story-content">
                {selectedStory.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
