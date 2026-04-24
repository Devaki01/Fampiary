import React, { useState, useMemo } from 'react';
import { CITIES, PROFESSIONS } from '../data/mockData';
import { useStore } from '../store/useStore';
import MemberPopup from '../components/MemberPopup';
import { Search, Filter, MapPin, Briefcase, ChevronDown } from 'lucide-react';
import './SearchScreen.css';

export default function SearchScreen() {
  const members = useStore((state) => state.members);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.relation.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = selectedCity ? member.city === selectedCity : true;
      const matchesProfession = selectedProfession ? member.profession === selectedProfession : true;

      return matchesSearch && matchesCity && matchesProfession;
    });
  }, [searchQuery, selectedCity, selectedProfession]);

  return (
    <div className="search-screen animate-fade-in">
      <header className="screen-header">
        <h2>Directory</h2>
        <p>Find family members</p>
      </header>

      <div className="search-container glass">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or relation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="filter-icon" />
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>City</label>
              <div className="select-wrapper">
                <select 
                  value={selectedCity || ''} 
                  onChange={(e) => setSelectedCity(e.target.value || null)}
                >
                  <option value="">All Cities</option>
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>
            <div className="filter-group">
              <label>Profession</label>
              <div className="select-wrapper">
                <select 
                  value={selectedProfession || ''} 
                  onChange={(e) => setSelectedProfession(e.target.value || null)}
                >
                  <option value="">All Professions</option>
                  {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown className="select-icon" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="results-list">
        {filteredMembers.map(member => (
          <div key={member.id} className="member-card glass" onClick={() => setSelectedMemberId(member.id)} style={{cursor: 'pointer'}}>
            <img src={member.avatar} alt={member.name} className="member-avatar" />
            <div className="member-info">
              <div className="member-header">
                <h3>{member.name}</h3>
                <span className="member-relation-badge">{member.relation}</span>
              </div>
              
              <div className="member-details">
                <div className="detail-item">
                  <MapPin className="detail-icon" />
                  <span>{member.city}</span>
                </div>
                <div className="detail-item">
                  <Briefcase className="detail-icon" />
                  <span>{member.profession}</span>
                </div>
              </div>

              <div className="member-skills">
                {member.skills.map(skill => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filteredMembers.length === 0 && (
          <div className="no-results">
            <p>No family members found matching your criteria.</p>
          </div>
        )}
      </div>
      {selectedMemberId && (
        <MemberPopup memberId={selectedMemberId} onClose={() => setSelectedMemberId(null)} />
      )}
    </div>
  );
}
