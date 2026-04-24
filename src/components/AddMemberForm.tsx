import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { RELATION_TYPES } from '../data/mockData';
import { X, UserPlus } from 'lucide-react';
import './MemberPopup.css';

interface AddMemberFormProps {
  parentId?: string;
  onClose: () => void;
}

export default function AddMemberForm({ parentId, onClose }: AddMemberFormProps) {
  const { members, addMember } = useStore();
  const parent = parentId ? members.find(m => m.id === parentId) : null;

  // Auto-suggest a relation based on parent context
  const suggestRelation = (): string => {
    if (!parent) return '';
    const gen = parent.generation;
    const rel = parent.relation?.toLowerCase() || '';
    // Gen 2+ parent (grandparent tier) → suggest Uncle/Aunt
    if (gen >= 2) return 'Uncle';
    // Gen 1 parent who is father/mother → suggest Sibling
    if (gen === 1 && (rel === 'father' || rel === 'mother')) return 'Sibling';
    // Gen 1 parent (uncle/aunt) → suggest Cousin
    if (gen === 1) return 'Cousin';
    // Gen 0 parent → suggest Son/Daughter
    return 'Son';
  };

  const [form, setForm] = useState({
    name: '',
    relation: suggestRelation(),
    customRelation: '',
    city: parent?.city || '',
    phone: '',
    profession: '',
    branch: parent?.branch || 'Paternal',
  });

  const isCustom = form.relation === '__custom__';
  const effectiveRelation = isCustom ? form.customRelation : form.relation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !effectiveRelation.trim()) return;

    const newMember = {
      name: form.name.trim(),
      relation: effectiveRelation.trim(),
      city: form.city.trim(),
      phone: form.phone.trim(),
      profession: form.profession.trim(),
      skills: [] as string[],
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      branch: form.branch,
      generation: parent ? parent.generation - 1 : 0,
    };

    addMember(newMember, parentId);
    onClose();
  };

  return (
    <div className="popup-overlay animate-fade-in" onClick={onClose}>
      <div className="popup-card add-member-card" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="popup-header" style={{marginBottom: 24}}>
          <div className="add-member-icon-wrapper">
            <UserPlus size={36} />
          </div>
          <h2 style={{fontSize: '1.5rem', color: 'var(--text-dark)', marginTop: 16}}>
            {parent ? `Add child of ${parent.name}` : 'Add Family Member'}
          </h2>
          {parent && (
            <p className="relation-text" style={{fontSize: '0.95rem'}}>
              Branch: {parent.branch} · Generation {parent.generation - 1}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-field">
            <label className="field-label">Name *</label>
            <input
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              placeholder="Full name"
              className="popup-input"
              required
            />
          </div>

          <div className="form-field">
            <label className="field-label">Relation *</label>
            <select
              value={form.relation}
              onChange={e => setForm({...form, relation: e.target.value})}
              className="popup-input"
              required
            >
              <option value="" disabled>Select relation...</option>
              {RELATION_TYPES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
              <option value="__custom__">Other (type your own)</option>
            </select>
            {isCustom && (
              <input
                value={form.customRelation}
                onChange={e => setForm({...form, customRelation: e.target.value})}
                placeholder="Type custom relation..."
                className="popup-input"
                style={{marginTop: 8}}
                required
                autoFocus
              />
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="field-label">City</label>
              <input
                value={form.city}
                onChange={e => setForm({...form, city: e.target.value})}
                placeholder="City"
                className="popup-input"
              />
            </div>
            <div className="form-field">
              <label className="field-label">Phone</label>
              <input
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="+91 ..."
                className="popup-input"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="field-label">Profession</label>
            <input
              value={form.profession}
              onChange={e => setForm({...form, profession: e.target.value})}
              placeholder="Profession"
              className="popup-input"
            />
          </div>

          <div className="form-field">
            <label className="field-label">Branch</label>
            <select
              value={form.branch}
              onChange={e => setForm({...form, branch: e.target.value})}
              className="popup-input"
            >
              <option value="Paternal">Paternal</option>
              <option value="Maternal">Maternal</option>
            </select>
          </div>

          <button type="submit" className="action-btn save-btn" style={{marginTop: 8}}>
            <UserPlus size={18} /> Add Member
          </button>
        </form>
      </div>
    </div>
  );
}
