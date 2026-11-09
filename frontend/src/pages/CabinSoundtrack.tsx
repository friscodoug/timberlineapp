import { useState } from 'react';
import { Music, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import './CabinSoundtrack.css';

type Playlist = { id: string; title: string; vibe: string; emoji: string; tag?: string };

// Spotify playlists on Doug's account (all public). To add or swap one,
// change this list. The id is the part after /playlist/ in the Spotify link.
const PLAYLISTS: Playlist[] = [
  { id: '158s14LT72soalsaeHrOC2', title: "Doug's Favorites", vibe: "Your host's most-played songs, plus a few mellow picks", emoji: '🎸', tag: 'From your host' },
  { id: '2z8ElgJ96QekvROl4xL9Yc', title: 'Campfire Mellow', vibe: 'Acoustic and unplugged for a quiet night by the fire', emoji: '🔥' },
  { id: '12OVlmsVMLe5PGWxCcVkPS', title: 'Campfire Country', vibe: 'Country singalongs for around the fire pit', emoji: '🤠' },
  { id: '0SoebiGmbbLRR1rv3RKIIg', title: 'Red Dirt Roads', vibe: 'Oklahoma and Texas red dirt country', emoji: '🛻' },
  { id: '6iltGyKZJXzPVPYYIvKW09', title: 'Front Porch Folk', vibe: 'Acoustic folk for morning coffee on the deck', emoji: '☕' },
  { id: '7oefNEyjIJTjkDjWbwYKVX', title: 'Bluegrass Breakdown', vibe: 'Banjo and fiddle for cooking and card games', emoji: '🪕' },
  { id: '1RvfJvGsGyG0bsceADGZgy', title: 'Hot Tub Classic Rock', vibe: '70s and 80s rock under the stars', emoji: '♨️' },
  { id: '2ufjix45kDhoeQPzoMPOUo', title: 'Yacht Rock', vibe: 'Smooth soft rock to kick back to', emoji: '⛵' },
  { id: '7sL8QoTd6H9B393rTWGj7R', title: '80s Hits', vibe: 'Big 80s singalongs', emoji: '📼' },
  { id: '5jZEZGSZ40dnQFJKTEf21P', title: 'Throwback Road Trip', vibe: '90s and 2000s hits for the drive and game night', emoji: '🚗' },
  { id: '1Z91SkkTKf1TRoFkUvpMv1', title: 'Family Cabin Jams', vibe: 'Clean, kid-friendly singalongs', emoji: '🎈' },
  { id: '6hePB2D8s1NdsZpJbiHSi3', title: 'Fireside Jazz', vibe: 'Mellow jazz for dinner and wine', emoji: '🍷' },
  { id: '5X5VOj6HMsr8uYz49PSMNC', title: 'Slow Jams Date Night', vibe: 'Soul and R&B for two', emoji: '❤️' },
  { id: '5uGHt0BEIImbThcTLkJNa5', title: 'Rainy Day Lo-Fi', vibe: 'Chill beats for reading, napping or working', emoji: '🌧️' },
  { id: '4oVQ8v2lmfW9B6z3W29ocu', title: 'Piano for Sleep', vibe: 'Calm solo piano to drift off to', emoji: '🌙' },
];

export default function CabinSoundtrack() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="page-container">
      <BackButton />

      <div className="st-header">
        <div className="st-header-icon">
          <Music size={36} color="white" />
        </div>
        <h1 className="st-title">Cabin Soundtrack</h1>
        <p className="st-intro">
          Playlists for every moment of your stay. Tap one to play it here, or open it in the Spotify app.
        </p>
      </div>

      <div className="st-list">
        {PLAYLISTS.map((p) => {
          const isOpen = openId === p.id;
          return (
            <Card key={p.id} className={'st-card' + (isOpen ? ' st-open' : '')}>
              <button
                type="button"
                className="st-row"
                onClick={() => setOpenId(isOpen ? null : p.id)}
                aria-expanded={isOpen}
              >
                <span className="st-emoji" aria-hidden="true">{p.emoji}</span>
                <span className="st-text">
                  {p.tag && <span className="st-tag">{p.tag}</span>}
                  <span className="st-name">{p.title}</span>
                  <span className="st-vibe">{p.vibe}</span>
                </span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isOpen && (
                <div className="st-player">
                  <iframe
                    title={p.title + ' on Spotify'}
                    src={'https://open.spotify.com/embed/playlist/' + p.id + '?utm_source=generator'}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                  <a
                    className="st-open-btn"
                    href={'https://open.spotify.com/playlist/' + p.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} />
                    <span>Open in Spotify</span>
                  </a>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <p className="st-note">
        Spotify members hear full songs. Without a Spotify login, the player plays short previews.
      </p>
    </div>
  );
}
