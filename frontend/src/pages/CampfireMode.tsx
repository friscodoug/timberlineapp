import React, { useState, useRef } from 'react';
import { Flame, Users, BookOpen, ChevronDown, ChevronUp, X, Play, Pause, Square, Volume2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS } from '../styles/theme';
import { CAMPFIRE_GAMES, CAMPFIRE_STORIES, Game, Story } from '../data/campfire';
import './CampfireMode.css';

type TabType = 'games' | 'stories';
type StoryCategory = 'family' | 'scary' | 'local';

export default function CampfireMode() {
  const [activeTab, setActiveTab] = useState<TabType>('games');
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [storyCategory, setStoryCategory] = useState<StoryCategory>('family');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
  // Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load voices
  React.useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        // Prefer English voices
        const englishVoice = availableVoices.find(v => v.lang.startsWith('en'));
        setSelectedVoice(englishVoice?.name || availableVoices[0].name);
      }
    };
    
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const handleListen = () => {
    if (!selectedStory) return;
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(selectedStory.content);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const closeStoryModal = () => {
    handleStop();
    setSelectedStory(null);
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
        <Flame size={48} color="#C25E2D" />
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
                  <ChevronUp size={24} color={COLORS.primary} />
                ) : (
                  <ChevronDown size={24} color={COLORS.lightGray} />
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
                <X size={28} color={COLORS.text} />
              </button>
              <span>{getCategoryLabel(selectedStory.category)}</span>
              <div style={{ width: 28 }}></div>
            </div>
            
            <div className="story-modal-body">
              <h2 className="story-modal-title">{selectedStory.title}</h2>
              
              {/* Audio Controls */}
              <div className="audio-controls">
                <div className="audio-buttons">
                  {!isSpeaking ? (
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
                  {isSpeaking && (
                    <button className="audio-btn stop" onClick={handleStop}>
                      <Square size={18} />
                      <span>Stop</span>
                    </button>
                  )}
                </div>
                
                {voices.length > 0 && (
                  <div className="voice-picker">
                    <Volume2 size={16} color={COLORS.lightGray} />
                    <select 
                      value={selectedVoice} 
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="voice-select"
                    >
                      {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name}
                        </option>
                      ))}
                    </select>
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
