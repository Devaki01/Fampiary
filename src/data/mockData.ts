export type Member = {
  id: string;
  name: string;
  relation: string; // e.g. "Cousin", "Mausi"
  city: string;
  profession: string;
  skills: string[];
  avatar: string;
  branch: string; // e.g. "Maternal", "Paternal"
  generation: number; // 1 = Grandparents, 2 = Parents/Aunts/Uncles, 3 = Cousins/Siblings
  children?: string[]; // IDs of children
  isLocal?: boolean;
};

export const MOCK_MEMBERS: Member[] = [
  // Generation 1
  { id: '1', name: 'Ramesh Sharma', relation: 'Grandfather', city: 'Delhi', profession: 'Retired Teacher', skills: ['History', 'Gardening'], avatar: 'https://i.pravatar.cc/150?u=1', branch: 'Paternal', generation: 1, children: ['3', '4'] },
  { id: '2', name: 'Sita Sharma', relation: 'Grandmother', city: 'Delhi', profession: 'Homemaker', skills: ['Cooking', 'Knitting'], avatar: 'https://i.pravatar.cc/150?u=2', branch: 'Paternal', generation: 1, children: ['3', '4'] },
  
  // Generation 2 - Paternal
  { id: '3', name: 'Anil Sharma', relation: 'Father', city: 'Pune', profession: 'Engineer', skills: ['Management', 'Math'], avatar: 'https://i.pravatar.cc/150?u=3', branch: 'Paternal', generation: 2, children: ['7', '8'], isLocal: true },
  { id: '4', name: 'Sunita Verma', relation: 'Bua', city: 'Bengaluru', profession: 'Doctor', skills: ['Medicine', 'Piano'], avatar: 'https://i.pravatar.cc/150?u=4', branch: 'Paternal', generation: 2, children: ['9'] },

  // Generation 2 - Maternal
  { id: '5', name: 'Rajesh Gupta', relation: 'Mama', city: 'Hyderabad', profession: 'Business Owner', skills: ['Sales', 'Finance'], avatar: 'https://i.pravatar.cc/150?u=5', branch: 'Maternal', generation: 2, children: ['10', '11'] },
  { id: '6', name: 'Kavita Gupta', relation: 'Mausi', city: 'Pune', profession: 'Architect', skills: ['Design', 'Art'], avatar: 'https://i.pravatar.cc/150?u=6', branch: 'Maternal', generation: 2, children: ['12'], isLocal: true },

  // Generation 3 - Me & Siblings (Paternal side)
  { id: '7', name: 'You (Rahul)', relation: 'Self', city: 'Pune', profession: 'Software Engineer', skills: ['React Native', 'TypeScript'], avatar: 'https://i.pravatar.cc/150?u=7', branch: 'Paternal', generation: 3, isLocal: true },
  { id: '8', name: 'Neha Sharma', relation: 'Sister', city: 'Mumbai', profession: 'Marketing Manager', skills: ['SEO', 'Content'], avatar: 'https://i.pravatar.cc/150?u=8', branch: 'Paternal', generation: 3 },
  
  // Generation 3 - Cousins (Paternal)
  { id: '9', name: 'Rohan Verma', relation: 'Cousin', city: 'Bengaluru', profession: 'Data Scientist', skills: ['Python', 'ML'], avatar: 'https://i.pravatar.cc/150?u=9', branch: 'Paternal', generation: 3 },

  // Generation 3 - Cousins (Maternal)
  { id: '10', name: 'Priya Gupta', relation: 'Cousin', city: 'Hyderabad', profession: 'UI/UX Designer', skills: ['Figma', 'User Research'], avatar: 'https://i.pravatar.cc/150?u=10', branch: 'Maternal', generation: 3 },
  { id: '11', name: 'Amit Gupta', relation: 'Cousin', city: 'Chennai', profession: 'Chef', skills: ['Culinary Arts'], avatar: 'https://i.pravatar.cc/150?u=11', branch: 'Maternal', generation: 3 },
  { id: '12', name: 'Sneha Joshi', relation: 'Cousin', city: 'Pune', profession: 'Lawyer', skills: ['Corporate Law'], avatar: 'https://i.pravatar.cc/150?u=12', branch: 'Maternal', generation: 3, isLocal: true },
  
  // A few more extended for volume...
  { id: '13', name: 'Vikram Singh', relation: 'Second Cousin', city: 'Delhi', profession: 'Accountant', skills: ['Tax', 'Excel'], avatar: 'https://i.pravatar.cc/150?u=13', branch: 'Maternal', generation: 3 },
  { id: '14', name: 'Anjali Desai', relation: 'Distant Aunt', city: 'Bengaluru', profession: 'Professor', skills: ['Teaching', 'Research'], avatar: 'https://i.pravatar.cc/150?u=14', branch: 'Paternal', generation: 2 },
];

export type SwarmSignal = {
  id: string;
  memberId: string;
  message: string;
  city: string;
  timestamp: string;
  active: boolean;
};

export const MOCK_SIGNALS: SwarmSignal[] = [
  {
    id: 's1',
    memberId: '9', // Rohan Verma
    message: 'Visiting Pune for 3 days! Let\'s catch up over coffee.',
    city: 'Pune',
    timestamp: '2 hours ago',
    active: true,
  },
  {
    id: 's2',
    memberId: '5', // Rajesh Gupta
    message: 'In Mumbai for a quick conference until tomorrow.',
    city: 'Mumbai',
    timestamp: '1 day ago',
    active: true,
  }
];

export const BRANCHES = ['Paternal', 'Maternal'];
export const CITIES = Array.from(new Set(MOCK_MEMBERS.map(m => m.city)));
export const PROFESSIONS = Array.from(new Set(MOCK_MEMBERS.map(m => m.profession)));
