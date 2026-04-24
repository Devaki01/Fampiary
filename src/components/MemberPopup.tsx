import React, { useState } from 'react';
import { useStore, getParents, getChildren } from '../store/useStore';
import { X, Edit2, Save, Tag, Phone, UserPlus, Trash2, Users, ArrowUp, ArrowDown } from 'lucide-react';
import './MemberPopup.css';

interface MemberPopupProps {
  memberId: string;
  onClose: () => void;
  onAddChild?: (parentId: string) => void;
  onRequestRemove?: (memberId: string) => void;
}

export default function MemberPopup({ memberId, onClose, onAddChild, onRequestRemove }: MemberPopupProps) {
  const { members, currentUser, updateMember, addTag } = useStore();
  const member = members.find(m => m.id === memberId);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: member?.name || '',
    relation: member?.relation || '',
    city: member?.city || '',
    phone: member?.phone || '',
    profession: member?.profession || '',
    branch: member?.branch || '',
  });
  
  const [newTag, setNewTag] = useState('');

  if (!member || !currentUser) return null;

  const isAdmin = currentUser.isAdmin;
  const isSelf = currentUser.id === memberId;
  const userTags = member.userTags?.[currentUser.id] || [];

  // Relation lookups
  const parents = getParents(members, memberId);
  const children = getChildren(members, memberId);

  const handleSave = () => {
    updateMember(memberId, editForm);
    setIsEditing(false);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      addTag(memberId, newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="popup-overlay animate-fade-in" onClick={onClose}>
      <div className="popup-card glass" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="popup-header">
          <img src={member.avatar} alt={member.name} className="popup-avatar" />
          
          {isEditing ? (
            <div className="edit-form">
              <input 
                value={editForm.name} 
                onChange={e => setEditForm({...editForm, name: e.target.value})} 
                placeholder="Name"
                className="edit-input popup-input"
              />
              <input 
                value={editForm.relation} 
                onChange={e => setEditForm({...editForm, relation: e.target.value})} 
                placeholder="Relation"
                className="edit-input popup-input"
              />
              <input 
                value={editForm.city} 
                onChange={e => setEditForm({...editForm, city: e.target.value})} 
                placeholder="City"
                className="edit-input popup-input"
              />
              <input 
                value={editForm.profession} 
                onChange={e => setEditForm({...editForm, profession: e.target.value})} 
                placeholder="Profession"
                className="edit-input popup-input"
              />
              <input 
                value={editForm.phone} 
                onChange={e => setEditForm({...editForm, phone: e.target.value})} 
                placeholder="Phone"
                className="edit-input popup-input"
              />
              <input 
                value={editForm.branch} 
                onChange={e => setEditForm({...editForm, branch: e.target.value})} 
                placeholder="Branch"
                className="edit-input popup-input"
              />
            </div>
          ) : (
            <div className="popup-info">
              <h2>{member.name}</h2>
              <p className="relation-text">{member.relation}</p>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">City</span>
                  <span className="info-value">{member.city}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><Phone size={14} style={{marginRight: 4, verticalAlign: 'middle'}} />Phone</span>
                  <span className="info-value">{member.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Profession</span>
                  <span className="info-value">{member.profession}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Branch</span>
                  <span className="info-value">{member.branch}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Relations Section */}
        {(parents.length > 0 || children.length > 0) && (
          <div className="relations-section">
            <h3><Users size={16} /> Relations</h3>
            {parents.length > 0 && (
              <div className="relation-group">
                <span className="relation-group-label"><ArrowUp size={12} /> Parent{parents.length > 1 ? 's' : ''}</span>
                <div className="relation-chips">
                  {parents.map(p => (
                    <span key={p.id} className="relation-chip">
                      <img src={p.avatar} alt={p.name} className="relation-chip-avatar" />
                      <span>{p.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {children.length > 0 && (
              <div className="relation-group">
                <span className="relation-group-label"><ArrowDown size={12} /> Children</span>
                <div className="relation-chips">
                  {children.map(c => (
                    <span key={c.id} className="relation-chip">
                      <img src={c.avatar} alt={c.name} className="relation-chip-avatar" />
                      <span>{c.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Admin Actions */}
        {isAdmin && (
          <div className="admin-actions">
            {isEditing ? (
              <button className="action-btn save-btn" onClick={handleSave}>
                <Save size={18} /> Save Changes
              </button>
            ) : (
              <div className="admin-actions-grid">
                <button className="action-btn edit-btn" onClick={() => setIsEditing(true)}>
                  <Edit2 size={18} /> Edit Profile
                </button>
                {onAddChild && (
                  <button className="action-btn add-child-btn" onClick={() => onAddChild(memberId)}>
                    <UserPlus size={18} /> Add Child
                  </button>
                )}
                {onRequestRemove && !isSelf && (
                  <button className="action-btn remove-btn" onClick={() => onRequestRemove(memberId)}>
                    <Trash2 size={18} /> Remove
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div className="tags-section">
          <h3><Tag size={16} /> Personal Tags</h3>
          <p className="tags-desc">Only visible to you</p>
          
          <div className="tags-list">
            {userTags.map((tag, idx) => (
              <span key={idx} className="tag-pill">{tag}</span>
            ))}
            {userTags.length === 0 && <span className="no-tags">No tags yet.</span>}
          </div>

          <form onSubmit={handleAddTag} className="add-tag-form">
            <input
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              className="tag-input"
            />
            <button type="submit" className="add-tag-btn">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
