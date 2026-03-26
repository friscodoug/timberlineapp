import React from 'react';
import { Camera, Instagram, Facebook, AtSign } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS } from '../styles/theme';
import { CONTACT } from '../data/cabins';
import './Connect.css';

export default function Connect() {
  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Camera size={48} color={COLORS.primary} />
        <h1 className="page-title center">Share Your Stay</h1>
      </div>

      <Card>
        <p className="description">
          Tag your stay and follow us for updates.
        </p>

        <div className="social-buttons">
          <button
            className="social-btn instagram"
            onClick={() => window.open(CONTACT.instagram, '_blank')}
          >
            <Instagram size={28} color="white" />
            <span>Instagram</span>
          </button>

          <button
            className="social-btn facebook"
            onClick={() => window.open(CONTACT.facebook, '_blank')}
          >
            <Facebook size={28} color="white" />
            <span>Facebook</span>
          </button>
        </div>

        <div className="tag-box">
          <AtSign size={24} color={COLORS.secondary} />
          <p className="tag-text">Tag your stay</p>
          <p className="handle-text">@PineAcresGlamping</p>
        </div>

        <div className="hashtag-container">
          <p className="hashtag-title">Popular Hashtags</p>
          <div className="hashtags">
            <span>#PineAcresGlamping</span>
            <span>#BrokenBowGlamping</span>
            <span>#GlampingOklahoma</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
