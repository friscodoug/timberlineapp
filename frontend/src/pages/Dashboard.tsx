import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Leaf, Gift, Mail, Share2, HelpCircle, ChevronRight, RefreshCw, CloudSun, Building2, Flame } from 'lucide-react';
import Card from '../components/Card';
import { COLORS } from '../styles/theme';
import { useCabin } from '../context/CabinContext';
import { CABIN_MODE_LOGO_URL } from '../data/cabins';
import './Dashboard.css';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon?: React.ComponentType<{ size: number; color: string }>;
  imageIcon?: string;
  route: string;
  color: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', title: 'Digital Guidebook', subtitle: 'Everything you need to know in one place', icon: Book, route: '/guidebook', color: COLORS.primary },
  { id: '2', title: 'Weather', subtitle: '5-day forecast for Hochatown', icon: CloudSun, route: '/weather', color: '#5A9BD5' },
  { id: '3', title: 'Cabin Mode', subtitle: 'Disconnect from technology and enjoy nature', imageIcon: CABIN_MODE_LOGO_URL, route: '/cabin-mode', color: '#4A7C59' },
  { id: '4', title: 'Campfire Mode', subtitle: 'Games and stories for the whole family', icon: Flame, route: '/campfire-mode', color: '#C25E2D' },
  { id: '5', title: 'Come Back & Save', subtitle: "Who doesn't LOVE discounts?", icon: Gift, route: '/come-back', color: '#8B6A4E' },
  { id: '6', title: 'Our Other Properties', subtitle: 'Explore more unique stays', icon: Building2, route: '/other-properties', color: '#6B5B95' },
  { id: '7', title: 'Join the Pine Post', subtitle: 'Our monthly newsletter', icon: Mail, route: '/newsletter', color: '#5B8A72' },
  { id: '8', title: 'Connect With Us', subtitle: 'Follow us on social media', icon: Share2, route: '/connect', color: '#6B8E7A' },
  { id: '9', title: 'Need Help', subtitle: "We're here for you", icon: HelpCircle, route: '/help', color: '#7A6B5B' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { selectedCabin, clearCabin } = useCabin();

  const handleChangeCabin = () => {
    clearCabin();
    navigate('/');
  };

  if (!selectedCabin) {
    navigate('/');
    return null;
  }

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <p className="welcome-text">Welcome to</p>
        <h1 className="cabin-name-title">{selectedCabin.name}</h1>
        <button className="change-btn" onClick={handleChangeCabin}>
          <RefreshCw size={16} color={COLORS.primary} />
          <span>Change cabin</span>
        </button>
      </div>

      <Card className="banner-card">
        <img src={selectedCabin.image} alt={selectedCabin.name} className="banner-image" />
      </Card>

      <div className="menu-grid">
        {MENU_ITEMS.map((item) => (
          <Card key={item.id} className="menu-item" onClick={() => navigate(item.route)}>
            <div className="icon-container" style={{ backgroundColor: item.imageIcon ? 'transparent' : item.color }}>
              {item.imageIcon ? (
                <img src={item.imageIcon} alt={item.title} className="menu-image-icon" />
              ) : item.icon ? (
                <item.icon size={28} color="white" />
              ) : null}
            </div>
            <div className="menu-text">
              <span className="menu-title">{item.title}</span>
              <span className="menu-subtitle">{item.subtitle}</span>
            </div>
            <ChevronRight size={20} color={COLORS.lightGray} />
          </Card>
        ))}
      </div>
    </div>
  );
}
