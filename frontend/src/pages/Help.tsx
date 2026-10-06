import React from 'react';
import { LifeBuoy, Phone, MessageCircle, ChevronRight, Info, AlertTriangle } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS, CONTACT } from '../config/brand.config';
import './Help.css';

export default function Help() {
  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <LifeBuoy size={48} color={COLORS.primary} />
        <h1 className="page-title center">Need Assistance?</h1>
        <p className="header-subtext">We're here to help make your stay perfect.</p>
      </div>

      <Card className="contact-card">
        <div className="section-header">
          <h2 className="section-title">Contact Your Host</h2>
          <span className="host-name">{CONTACT.hostName}</span>
        </div>
        
        <a href={`tel:${CONTACT.phone}`} className="contact-btn">
          <div className="icon-circle primary">
            <Phone size={24} color="white" />
          </div>
          <div className="contact-info">
            <span className="contact-label">Call Host</span>
            <span className="contact-value">{CONTACT.phone}</span>
          </div>
          <ChevronRight size={22} color={COLORS.lightGray} />
        </a>

        <a href={`sms:${CONTACT.phone}`} className="contact-btn last">
          <div className="icon-circle secondary">
            <MessageCircle size={24} color="white" />
          </div>
          <div className="contact-info">
            <span className="contact-label">Text Host</span>
            <span className="contact-value">{CONTACT.phone}</span>
          </div>
          <ChevronRight size={22} color={COLORS.lightGray} />
        </a>
      </Card>

      <Card className="info-card">
        <Info size={24} color={COLORS.secondary} />
        <div className="info-content">
          <h3 className="info-title">Response Times</h3>
          <p className="info-text">
            We typically respond within 30 minutes during daytime hours. For urgent matters, please call directly.
          </p>
        </div>
      </Card>

      <div className="emergency-card">
        <AlertTriangle size={24} color={COLORS.error} />
        <p>For emergencies, please call 911 first, then contact us.</p>
      </div>
    </div>
  );
}
