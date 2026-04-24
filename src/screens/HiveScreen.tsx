import React, { useMemo } from 'react';
import { Member } from '../data/mockData';
import { useStore } from '../store/useStore';
import MemberPopup from '../components/MemberPopup';
import { MapPin } from 'lucide-react';
import './HiveScreen.css';

export default function HiveScreen() {
  const { currentUser, members } = useStore();
  const [selectedMemberId, setSelectedMemberId] = React.useState<string | null>(null);

  // Group members by branch
  const maternalBranch = useMemo(() => members.filter(m => m.branch === 'Maternal'), [members]);
  const paternalBranch = useMemo(() => members.filter(m => m.branch === 'Paternal'), [members]);

  const renderHexagon = (member: Member) => (
    <div key={member.id} className="hexagon-wrapper animate-fade-in" onClick={() => setSelectedMemberId(member.id)}>
      <div className="hexagon glass">
        <img src={member.avatar} alt={member.name} className="hexagon-img" />
        <div className="hexagon-overlay">
          <span className="member-name">{member.name}</span>
          <span className="member-relation">{member.relation}</span>
          {member.isLocal && (
            <div className="local-badge" title="Nearby">
              <MapPin className="badge-icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="hive-screen">
      <header className="screen-header animate-fade-in">
        <h2>Family Hive</h2>
        <p>Explore your connections from {currentUser?.city || 'your city'}</p>
      </header>

      <div className="hive-container">
        <div className="branch-section">
          <h3 className="branch-title">Paternal Branch</h3>
          <div className="honeycomb">
            {paternalBranch.map(renderHexagon)}
          </div>
        </div>

        <div className="branch-section">
          <h3 className="branch-title">Maternal Branch</h3>
          <div className="honeycomb">
            {maternalBranch.map(renderHexagon)}
          </div>
        </div>
      </div>
      {selectedMemberId && (
        <MemberPopup memberId={selectedMemberId} onClose={() => setSelectedMemberId(null)} />
      )}
    </div>
  );
}
