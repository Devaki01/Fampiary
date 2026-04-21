import { create } from 'zustand';
import { MOCK_MEMBERS, MOCK_SIGNALS, Member, SwarmSignal } from '../data/mockData';

type AppState = {
  currentUser: Member;
  updateProfile: (updates: Partial<Member>) => void;
  activeSignals: SwarmSignal[];
  addSignal: (signal: Omit<SwarmSignal, 'id' | 'timestamp'>) => void;
  privacyMode: boolean;
  togglePrivacyMode: () => void;
};

// Start with the 'Self' user
const initialUser = MOCK_MEMBERS.find(m => m.id === '7') as Member;

export const useStore = create<AppState>((set) => ({
  currentUser: initialUser,
  updateProfile: (updates) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...updates },
    })),
  activeSignals: MOCK_SIGNALS,
  addSignal: (signal) =>
    set((state) => ({
      activeSignals: [
        {
          ...signal,
          id: `s${Date.now()}`,
          timestamp: 'Just now',
        },
        ...state.activeSignals,
      ],
    })),
  privacyMode: false,
  togglePrivacyMode: () => set((state) => ({ privacyMode: !state.privacyMode })),
}));
