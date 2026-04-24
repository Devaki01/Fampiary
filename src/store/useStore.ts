import { create } from 'zustand';
import { MOCK_MEMBERS, MOCK_SIGNALS, DATA_VERSION, Member, SwarmSignal } from '../data/mockData';

type AppState = {
  currentUser: Member | null;
  members: Member[];
  login: (memberId: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<Member>) => void;
  updateMember: (memberId: string, updates: Partial<Member>) => void;
  addMember: (member: Omit<Member, 'id'>, parentId?: string) => void;
  removeMember: (memberId: string) => void;
  addTag: (memberId: string, tag: string) => void;
  activeSignals: SwarmSignal[];
  addSignal: (signal: Omit<SwarmSignal, 'id' | 'timestamp'>) => void;
  privacyMode: boolean;
  togglePrivacyMode: () => void;
};

const loadMembers = (): Member[] => {
  try {
    const storedVersion = localStorage.getItem('fampiary_data_version');
    const data = localStorage.getItem('fampiary_members');
    if (data && storedVersion && parseInt(storedVersion) === DATA_VERSION) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse local storage members', e);
  }
  // If no data, invalid, or version mismatch — reset with fresh mock data
  localStorage.setItem('fampiary_members', JSON.stringify(MOCK_MEMBERS));
  localStorage.setItem('fampiary_data_version', String(DATA_VERSION));
  return MOCK_MEMBERS;
};

const saveMembers = (members: Member[]) => {
  localStorage.setItem('fampiary_members', JSON.stringify(members));
};

// --- Helper selectors (can be used outside the store) ---

/** Find all parents of a given member (members whose children array includes this id) */
export const getParents = (members: Member[], memberId: string): Member[] => {
  return members.filter(m => m.children?.includes(memberId));
};

/** Find siblings (other children of the same parents, excluding self) */
export const getSiblings = (members: Member[], memberId: string): Member[] => {
  const parents = getParents(members, memberId);
  const siblingIds = new Set<string>();
  parents.forEach(p => {
    (p.children || []).forEach(cId => {
      if (cId !== memberId) siblingIds.add(cId);
    });
  });
  return members.filter(m => siblingIds.has(m.id));
};

/** Get direct children as Member objects */
export const getChildren = (members: Member[], memberId: string): Member[] => {
  const member = members.find(m => m.id === memberId);
  if (!member?.children) return [];
  return member.children
    .map(cId => members.find(m => m.id === cId))
    .filter((m): m is Member => !!m);
};

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  members: loadMembers(),
  login: (memberId: string) => {
    const user = get().members.find((m) => m.id === memberId);
    if (user) {
      set({ currentUser: user });
    }
  },
  logout: () => set({ currentUser: null }),
  updateProfile: (updates) => {
    const { currentUser, members } = get();
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    const updatedMembers = members.map(m => m.id === currentUser.id ? updatedUser : m);
    saveMembers(updatedMembers);
    set({ currentUser: updatedUser, members: updatedMembers });
  },
  updateMember: (memberId: string, updates: Partial<Member>) => {
    const { members, currentUser } = get();
    const updatedMembers = members.map(m => m.id === memberId ? { ...m, ...updates } : m);
    saveMembers(updatedMembers);
    set({ 
      members: updatedMembers,
      currentUser: currentUser?.id === memberId ? { ...currentUser, ...updates } : currentUser 
    });
  },
  addMember: (memberData: Omit<Member, 'id'>, parentId?: string) => {
    const { members, currentUser } = get();
    const newId = `m${Date.now()}`;
    let newMember: Member = { ...memberData, id: newId };
    
    let updatedMembers = [...members];
    
    // Dynamic generation shift: if the new member's generation is below 0,
    // shift ALL existing members up so the new child becomes Gen 0.
    // This keeps Gen 0 as always the youngest generation in the tree.
    if (newMember.generation < 0) {
      const shift = Math.abs(newMember.generation);
      updatedMembers = updatedMembers.map(m => ({
        ...m,
        generation: m.generation + shift,
      }));
      newMember = { ...newMember, generation: 0 };
    }
    
    updatedMembers.push(newMember);
    
    // If a parentId is provided, add newId to the parent's children array
    if (parentId) {
      updatedMembers = updatedMembers.map(m => {
        if (m.id === parentId) {
          return { ...m, children: [...(m.children || []), newId] };
        }
        return m;
      });
    }
    
    saveMembers(updatedMembers);
    // Update currentUser reference if their generation shifted
    const updatedCurrentUser = currentUser
      ? updatedMembers.find(m => m.id === currentUser.id) || null
      : null;
    set({ members: updatedMembers, currentUser: updatedCurrentUser });
  },
  removeMember: (memberId: string) => {
    const { members, currentUser } = get();
    
    const member = members.find(m => m.id === memberId);
    const childrenOfRemoved = member?.children || [];
    
    let updatedMembers = members
      // Remove the member itself
      .filter(m => m.id !== memberId)
      // Update ALL parents: remove the deleted child, and re-parent grandchildren
      .map(m => {
        if (m.children?.includes(memberId)) {
          const newChildren = (m.children || [])
            .filter(cId => cId !== memberId)
            .concat(childrenOfRemoved);
          // Deduplicate (in case grandparent already had some of these children)
          return { ...m, children: [...new Set(newChildren)] };
        }
        return m;
      });
    
    saveMembers(updatedMembers);
    set({ 
      members: updatedMembers,
      currentUser: currentUser?.id === memberId ? null : currentUser
    });
  },
  addTag: (memberId: string, tag: string) => {
    const { members, currentUser } = get();
    if (!currentUser) return;
    
    const updatedMembers = members.map(m => {
      if (m.id === memberId) {
        const userTags = m.userTags || {};
        const currentUserTags = userTags[currentUser.id] || [];
        if (!currentUserTags.includes(tag)) {
          return {
            ...m,
            userTags: {
              ...userTags,
              [currentUser.id]: [...currentUserTags, tag]
            }
          };
        }
      }
      return m;
    });
    saveMembers(updatedMembers);
    set({ members: updatedMembers });
  },
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

