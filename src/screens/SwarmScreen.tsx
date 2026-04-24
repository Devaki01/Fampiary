import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Radio, Send, MapPin, Clock } from 'lucide-react';
import './SwarmScreen.css';

export default function SwarmScreen() {
  const currentUser = useStore((state) => state.currentUser);
  const activeSignals = useStore((state) => state.activeSignals);
  const addSignal = useStore((state) => state.addSignal);

  const [message, setMessage] = useState('');

  if (!currentUser) return null;

  const handleBroadcast = () => {
    if (!message.trim()) return;

    addSignal({
      memberId: currentUser.id,
      message,
      city: currentUser.city,
      active: true,
    });
    setMessage('');
  };

  return (
    <div className="swarm-screen animate-fade-in">
      <header className="screen-header" style={{position: 'relative'}}>
        <h2>Swarm Signals</h2>
        <p>Location-based family alerts</p>
        <div className="swarm-location-badge">
          <MapPin size={16} />
          <span>{currentUser.city}</span>
        </div>
      </header>

      <div className="broadcast-card glass">
        <div className="broadcast-header">
          <Radio className="broadcast-icon" />
          <h3>Broadcast a Signal</h3>
        </div>
        <p className="broadcast-subtitle">Let family know you're in {currentUser.city} or nearby!</p>
        
        <div className="broadcast-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="E.g., Visiting Pune for 2 days!"
            className="broadcast-input"
            onKeyDown={(e) => e.key === 'Enter' && handleBroadcast()}
          />
          <button 
            className="broadcast-button"
            onClick={handleBroadcast}
            disabled={!message.trim()}
          >
            <Send className="send-icon" />
            <span>Send</span>
          </button>
        </div>
      </div>

      <div className="signals-list">
        <h3 className="section-title">Active Signals</h3>
        {activeSignals.map((signal) => (
          <div key={signal.id} className="signal-card glass">
            <div className="signal-header">
              <span className="signal-city">
                <MapPin className="signal-icon" />
                {signal.city}
              </span>
              <span className="signal-time">
                <Clock className="signal-icon" />
                {signal.timestamp}
              </span>
            </div>
            <p className="signal-message">{signal.message}</p>
          </div>
        ))}
        {activeSignals.length === 0 && (
          <div className="no-signals">
            <p>No active signals in your network.</p>
          </div>
        )}
      </div>
    </div>
  );
}
