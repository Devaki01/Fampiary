import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, MapPin, Briefcase, Lock, Save, Edit2, LogOut } from 'lucide-react';
import './ProfileScreen.css';

export default function ProfileScreen() {
  const { currentUser, updateProfile, privacyMode, togglePrivacyMode, logout } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    city: currentUser?.city || '',
    profession: currentUser?.profession || '',
  });

  if (!currentUser) return null;

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="profile-screen animate-fade-in">
      <header className="screen-header">
        <h2>My Profile</h2>
        <p>Manage your identity</p>
      </header>

      <div className="profile-card glass">
        <div className="profile-header-section">
          <img src={currentUser.avatar} alt="Profile" className="profile-avatar-large" />
          {isEditing ? (
            <input 
              type="text" 
              className="edit-input name-input"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
            />
          ) : (
            <h3>{currentUser.name}</h3>
          )}
          <span className="branch-badge">{currentUser.branch} Branch • Generation {currentUser.generation}</span>
        </div>

        <div className="profile-details-section">
          <div className="detail-row">
            <MapPin className="row-icon" />
            <div className="row-content">
              <label>City</label>
              {isEditing ? (
                <input 
                  type="text" 
                  className="edit-input"
                  value={editForm.city}
                  onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                />
              ) : (
                <span>{currentUser.city}</span>
              )}
            </div>
          </div>

          <div className="detail-row">
            <Briefcase className="row-icon" />
            <div className="row-content">
              <label>Profession</label>
              {isEditing ? (
                <input 
                  type="text" 
                  className="edit-input"
                  value={editForm.profession}
                  onChange={(e) => setEditForm({...editForm, profession: e.target.value})}
                />
              ) : (
                <span>{currentUser.profession}</span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <button className="action-button save-button" onClick={handleSave}>
              <Save className="button-icon" />
              Save Changes
            </button>
          ) : (
            <button className="action-button edit-button" onClick={() => setIsEditing(true)}>
              <Edit2 className="button-icon" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="privacy-card glass">
        <div className="privacy-info">
          <div className="privacy-header">
            <Lock className="privacy-icon" />
            <h3>Privacy Mode</h3>
          </div>
          <p>When enabled, only close family can see your exact location signals.</p>
        </div>
        <button 
          className={`toggle-button ${privacyMode ? 'active' : ''}`}
          onClick={togglePrivacyMode}
        >
          <div className="toggle-thumb" />
        </button>
      </div>
      <div className="logout-section">
        <button className="action-button logout-button" onClick={logout}>
          <LogOut className="button-icon" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
