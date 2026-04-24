export type Member = {
  id: string;
  name: string;
  relation: string; // e.g. "Cousin", "Mausi"
  city: string;
  phone: string;
  profession: string;
  skills: string[];
  avatar: string;
  branch: string; // e.g. "Maternal", "Paternal"
  generation: number; // 0 = Self/Cousins, 1 = Parents/Aunts/Uncles, 2 = Grandparents, ...
  children?: string[]; // IDs of children
  isLocal?: boolean;
  isAdmin?: boolean;
  userTags?: Record<string, string[]>;
};

// Bump this version whenever MOCK_MEMBERS structure changes to force localStorage refresh
export const DATA_VERSION = 6;

export const MOCK_MEMBERS: Member[] = [
  // ── Generation 3 — Great-grandparents (Paternal) ───────────────────────────
  { id: 'g1', name: 'Hariram Sharma', relation: 'Great-grandfather', city: 'Agra', phone: '+91 98100 00001', profession: 'Retired Farmer', skills: ['Agriculture', 'Vedic Chanting'], avatar: 'https://i.pravatar.cc/150?u=g1', branch: 'Paternal', generation: 3, children: ['1', 'g3'] },
  { id: 'g2', name: 'Savitri Sharma', relation: 'Great-grandmother', city: 'Agra', phone: '+91 98100 00002', profession: 'Homemaker', skills: ['Weaving', 'Storytelling'], avatar: 'https://i.pravatar.cc/150?u=g2', branch: 'Paternal', generation: 3, children: ['1', 'g3'] },
  { id: 'g3', name: 'Mohan Sharma', relation: 'Great-uncle', city: 'Agra', phone: '+91 98100 00003', profession: 'Retired Postman', skills: ['Cycling', 'Stamp Collecting'], avatar: 'https://i.pravatar.cc/150?u=g3', branch: 'Paternal', generation: 2, children: ['g4', 'g5'] },
  { id: 'g4', name: 'Suresh Sharma', relation: 'Second Uncle', city: 'Mathura', phone: '+91 98100 00004', profession: 'Shopkeeper', skills: ['Sales', 'Accounting'], avatar: 'https://i.pravatar.cc/150?u=g4', branch: 'Paternal', generation: 1, children: ['g6', 'g7'] },
  { id: 'g5', name: 'Geeta Sharma', relation: 'Second Aunt', city: 'Mathura', phone: '+91 98100 00005', profession: 'Tailor', skills: ['Stitching', 'Embroidery'], avatar: 'https://i.pravatar.cc/150?u=g5', branch: 'Paternal', generation: 1, children: ['g8'] },
  { id: 'g6', name: 'Deepak Sharma', relation: 'Second Cousin', city: 'Mathura', phone: '+91 98100 00006', profession: 'Bank Clerk', skills: ['Finance', 'Tally'], avatar: 'https://i.pravatar.cc/150?u=g6', branch: 'Paternal', generation: 0, children: ['g9', 'g10'] },
  { id: 'g7', name: 'Pooja Sharma', relation: 'Second Cousin', city: 'Jaipur', phone: '+91 98100 00007', profession: 'Nurse', skills: ['Patient Care', 'First Aid'], avatar: 'https://i.pravatar.cc/150?u=g7', branch: 'Paternal', generation: 0 },
  { id: 'g8', name: 'Manish Trivedi', relation: 'Second Cousin', city: 'Mathura', phone: '+91 98100 00008', profession: 'Civil Engineer', skills: ['AutoCAD', 'Project Management'], avatar: 'https://i.pravatar.cc/150?u=g8', branch: 'Paternal', generation: 0 },
  { id: 'g9', name: 'Tanvi Sharma', relation: 'Third Cousin', city: 'Mathura', phone: '+91 98100 00009', profession: 'School Teacher', skills: ['Education', 'Hindi Literature'], avatar: 'https://i.pravatar.cc/150?u=g9', branch: 'Paternal', generation: -1 },
  { id: 'g10', name: 'Arjun Sharma', relation: 'Third Cousin', city: 'Noida', phone: '+91 98100 00010', profession: 'Software Developer', skills: ['Java', 'Spring Boot'], avatar: 'https://i.pravatar.cc/150?u=g10', branch: 'Paternal', generation: -1 },

  // ── Generation 3 — Great-grandparents (Maternal) ──────────────────────────
  { id: 'g11', name: 'Jagdish Gupta', relation: 'Great-grandfather', city: 'Lucknow', phone: '+91 98100 00011', profession: 'Retired Merchant', skills: ['Business', 'Urdu Poetry'], avatar: 'https://i.pravatar.cc/150?u=g11', branch: 'Maternal', generation: 3, children: ['g13', 'g14'] },
  { id: 'g12', name: 'Kamla Gupta', relation: 'Great-grandmother', city: 'Lucknow', phone: '+91 98100 00012', profession: 'Homemaker', skills: ['Cooking', 'Rangoli'], avatar: 'https://i.pravatar.cc/150?u=g12', branch: 'Maternal', generation: 3, children: ['g13', 'g14'] },
  { id: 'g13', name: 'Pramod Gupta', relation: 'Great-uncle', city: 'Lucknow', phone: '+91 98100 00013', profession: 'Retired Banker', skills: ['Accounting', 'Cricket'], avatar: 'https://i.pravatar.cc/150?u=g13', branch: 'Maternal', generation: 2, children: ['g15', 'g16', 'g17'] },
  { id: 'g14', name: 'Sharda Gupta', relation: 'Great-aunt', city: 'Varanasi', phone: '+91 98100 00014', profession: 'Retired Teacher', skills: ['Sanskrit', 'Classical Music'], avatar: 'https://i.pravatar.cc/150?u=g14', branch: 'Maternal', generation: 2, children: ['g18'] },
  { id: 'g15', name: 'Ramakant Gupta', relation: 'Second Uncle', city: 'Lucknow', phone: '+91 98100 00015', profession: 'Chartered Accountant', skills: ['Taxation', 'Audit'], avatar: 'https://i.pravatar.cc/150?u=g15', branch: 'Maternal', generation: 1, children: ['g19', 'g20'] },
  { id: 'g16', name: 'Savita Mishra', relation: 'Second Aunt', city: 'Kanpur', phone: '+91 98100 00016', profession: 'Pharmacist', skills: ['Chemistry', 'Patient Counseling'], avatar: 'https://i.pravatar.cc/150?u=g16', branch: 'Maternal', generation: 1, children: ['g21'] },
  { id: 'g17', name: 'Hemant Gupta', relation: 'Second Uncle', city: 'Agra', phone: '+91 98100 00017', profession: 'Jeweler', skills: ['Goldsmithing', 'Gemology'], avatar: 'https://i.pravatar.cc/150?u=g17', branch: 'Maternal', generation: 1, children: ['g22', 'g23'] },
  { id: 'g18', name: 'Dinesh Srivastava', relation: 'Second Uncle', city: 'Varanasi', phone: '+91 98100 00018', profession: 'Silk Weaver', skills: ['Banarasi Weaving', 'Dyeing'], avatar: 'https://i.pravatar.cc/150?u=g18', branch: 'Maternal', generation: 1, children: ['g24'] },
  { id: 'g19', name: 'Nisha Gupta', relation: 'Second Cousin', city: 'Lucknow', phone: '+91 98100 00019', profession: 'IAS Officer', skills: ['Administration', 'Public Policy'], avatar: 'https://i.pravatar.cc/150?u=g19', branch: 'Maternal', generation: 0 },
  { id: 'g20', name: 'Gaurav Gupta', relation: 'Second Cousin', city: 'Delhi', phone: '+91 98100 00020', profession: 'Journalist', skills: ['Writing', 'Photography'], avatar: 'https://i.pravatar.cc/150?u=g20', branch: 'Maternal', generation: 0 },
  { id: 'g21', name: 'Kriti Mishra', relation: 'Second Cousin', city: 'Kanpur', phone: '+91 98100 00021', profession: 'Physiotherapist', skills: ['Rehabilitation', 'Sports Medicine'], avatar: 'https://i.pravatar.cc/150?u=g21', branch: 'Maternal', generation: 0 },
  { id: 'g22', name: 'Harsh Gupta', relation: 'Second Cousin', city: 'Agra', phone: '+91 98100 00022', profession: 'Fashion Designer', skills: ['Illustration', 'Fabric Design'], avatar: 'https://i.pravatar.cc/150?u=g22', branch: 'Maternal', generation: 0 },
  { id: 'g23', name: 'Divya Gupta', relation: 'Second Cousin', city: 'Mumbai', phone: '+91 98100 00023', profession: 'Film Director', skills: ['Screenwriting', 'Cinematography'], avatar: 'https://i.pravatar.cc/150?u=g23', branch: 'Maternal', generation: 0 },
  { id: 'g24', name: 'Kabir Srivastava', relation: 'Second Cousin', city: 'Varanasi', phone: '+91 98100 00024', profession: 'Tabla Player', skills: ['Classical Music', 'Teaching'], avatar: 'https://i.pravatar.cc/150?u=g24', branch: 'Maternal', generation: 0 },

  // ── Generation 2 — Grandparents (original, updated with more children) ─────
  { id: '1', name: 'Ramesh Sharma', relation: 'Grandfather', city: 'Delhi', phone: '+91 98100 12345', profession: 'Retired Teacher', skills: ['History', 'Gardening'], avatar: 'https://i.pravatar.cc/150?u=1', branch: 'Paternal', generation: 2, children: ['3', '4', 'p1', 'p2'] },
  { id: '2', name: 'Sita Sharma', relation: 'Grandmother', city: 'Delhi', phone: '+91 98100 12346', profession: 'Homemaker', skills: ['Cooking', 'Knitting'], avatar: 'https://i.pravatar.cc/150?u=2', branch: 'Paternal', generation: 2, children: ['3', '4', 'p1', 'p2'] },

  // ── Generation 2 — Maternal Grandparents ─────────────────────────────────
  { id: 'mg1', name: 'Vishwanath Gupta', relation: 'Nana', city: 'Allahabad', phone: '+91 98100 22201', profession: 'Retired Lawyer', skills: ['Law', 'Chess'], avatar: 'https://i.pravatar.cc/150?u=mg1', branch: 'Maternal', generation: 2, children: ['5', '6', 'mg3', 'mg4', 'mom'] },
  { id: 'mg2', name: 'Pushpa Gupta', relation: 'Nani', city: 'Allahabad', phone: '+91 98100 22202', profession: 'Homemaker', skills: ['Cooking', 'Bhajans'], avatar: 'https://i.pravatar.cc/150?u=mg2', branch: 'Maternal', generation: 2, children: ['5', '6', 'mg3', 'mg4', 'mom'] },
  { id: 'mg3', name: 'Suresh Gupta', relation: 'Mama', city: 'Delhi', phone: '+91 98100 22203', profession: 'Textile Businessman', skills: ['Trade', 'Negotiation'], avatar: 'https://i.pravatar.cc/150?u=mg3', branch: 'Maternal', generation: 1, children: ['mg5', 'mg6'] },
  { id: 'mg4', name: 'Lata Tiwari', relation: 'Mausi', city: 'Bhopal', phone: '+91 98100 22204', profession: 'Gynaecologist', skills: ['Surgery', 'Obstetrics'], avatar: 'https://i.pravatar.cc/150?u=mg4', branch: 'Maternal', generation: 1, children: ['mg7', 'mg8'] },
  { id: 'mg5', name: 'Kunal Gupta', relation: 'Cousin', city: 'Delhi', phone: '+91 98100 22205', profession: 'Investment Banker', skills: ['Finance', 'Excel'], avatar: 'https://i.pravatar.cc/150?u=mg5', branch: 'Maternal', generation: 0 },
  { id: 'mg6', name: 'Ritu Gupta', relation: 'Cousin', city: 'Gurugram', phone: '+91 98100 22206', profession: 'HR Manager', skills: ['Recruitment', 'Training'], avatar: 'https://i.pravatar.cc/150?u=mg6', branch: 'Maternal', generation: 0 },
  { id: 'mg7', name: 'Siddharth Tiwari', relation: 'Cousin', city: 'Bhopal', phone: '+91 98100 22207', profession: 'Dentist', skills: ['Oral Surgery', 'Orthodontics'], avatar: 'https://i.pravatar.cc/150?u=mg7', branch: 'Maternal', generation: 0 },
  { id: 'mg8', name: 'Ankita Tiwari', relation: 'Cousin', city: 'Indore', phone: '+91 98100 22208', profession: 'Graphic Designer', skills: ['Illustrator', 'Branding'], avatar: 'https://i.pravatar.cc/150?u=mg8', branch: 'Maternal', generation: 0 },

  // ── Generation 1 — More Paternal Uncles/Aunts ─────────────────────────────
  { id: 'p1', name: 'Rakesh Sharma', relation: 'Chacha', city: 'Jaipur', phone: '+91 99220 11001', profession: 'Hotel Manager', skills: ['Hospitality', 'Management'], avatar: 'https://i.pravatar.cc/150?u=p1', branch: 'Paternal', generation: 1, children: ['p5', 'p6', 'p7'] },
  { id: 'p2', name: 'Meena Sharma', relation: 'Chachi', city: 'Jaipur', phone: '+91 99220 11002', profession: 'Beautician', skills: ['Makeup', 'Skincare'], avatar: 'https://i.pravatar.cc/150?u=p2', branch: 'Paternal', generation: 1, children: ['p5', 'p6', 'p7'] },
  { id: 'p3', name: 'Dinesh Sharma', relation: 'Tau', city: 'Delhi', phone: '+91 99220 11003', profession: 'Army Officer (Retd.)', skills: ['Leadership', 'Fitness'], avatar: 'https://i.pravatar.cc/150?u=p3', branch: 'Paternal', generation: 1, children: ['p8', 'p9'] },
  { id: 'p4', name: 'Sarla Sharma', relation: 'Tai', city: 'Delhi', phone: '+91 99220 11004', profession: 'School Principal', skills: ['Education', 'Administration'], avatar: 'https://i.pravatar.cc/150?u=p4', branch: 'Paternal', generation: 1, children: ['p8', 'p9'] },

  // ── Generation 0 — Paternal Cousins (children of p1/p2, p3/p4) ───────────
  { id: 'p5', name: 'Kartik Sharma', relation: 'Cousin', city: 'Jaipur', phone: '+91 99220 55001', profession: 'Chef', skills: ['French Cuisine', 'Pastry'], avatar: 'https://i.pravatar.cc/150?u=p5', branch: 'Paternal', generation: 0 },
  { id: 'p6', name: 'Nandini Sharma', relation: 'Cousin', city: 'Udaipur', phone: '+91 99220 55002', profession: 'Travel Blogger', skills: ['Photography', 'Content Writing'], avatar: 'https://i.pravatar.cc/150?u=p6', branch: 'Paternal', generation: 0 },
  { id: 'p7', name: 'Yash Sharma', relation: 'Cousin', city: 'Jaipur', phone: '+91 99220 55003', profession: 'Mechanical Engineer', skills: ['CAD', 'Manufacturing'], avatar: 'https://i.pravatar.cc/150?u=p7', branch: 'Paternal', generation: 0 },
  { id: 'p8', name: 'Varun Sharma', relation: 'Cousin', city: 'Delhi', phone: '+91 99220 55004', profession: 'Air Force Pilot', skills: ['Aviation', 'Navigation'], avatar: 'https://i.pravatar.cc/150?u=p8', branch: 'Paternal', generation: 0 },
  { id: 'p9', name: 'Ishita Sharma', relation: 'Cousin', city: 'Chandigarh', phone: '+91 99220 55005', profession: 'Psychologist', skills: ['Counseling', 'CBT'], avatar: 'https://i.pravatar.cc/150?u=p9', branch: 'Paternal', generation: 0 },

  // ── Generation -1 — Children of cousins (Paternal) ───────────────────────
  { id: 'c1', name: 'Aarav Sharma', relation: 'Third Cousin', city: 'Jaipur', phone: '+91 99220 66001', profession: 'Student', skills: ['Cricket', 'Coding'], avatar: 'https://i.pravatar.cc/150?u=c1', branch: 'Paternal', generation: -1 },
  { id: 'c2', name: 'Ananya Sharma', relation: 'Third Cousin', city: 'Jaipur', phone: '+91 99220 66002', profession: 'Student', skills: ['Dance', 'Art'], avatar: 'https://i.pravatar.cc/150?u=c2', branch: 'Paternal', generation: -1 },
  { id: 'c3', name: 'Vivaan Sharma', relation: 'Third Cousin', city: 'Delhi', phone: '+91 99220 66003', profession: 'Student', skills: ['Football', 'Chess'], avatar: 'https://i.pravatar.cc/150?u=c3', branch: 'Paternal', generation: -1 },

  // ── Generation 1 — Parents (Mother = Maternal bridge, Father = Paternal) ────
  // Mother connects the two family trees: she is Maternal branch and shares children ['7','8'] with Father.
  { id: 'mom', name: 'Sunita Gupta', relation: 'Mother', city: 'Pune', phone: '+91 99220 33446', profession: 'Teacher', skills: ['Education', 'Music'], avatar: 'https://i.pravatar.cc/150?u=mom', branch: 'Maternal', generation: 1, children: ['7', '8'], isLocal: true },
  { id: '3', name: 'Anil Sharma', relation: 'Father', city: 'Pune', phone: '+91 99220 33445', profession: 'Engineer', skills: ['Management', 'Math'], avatar: 'https://i.pravatar.cc/150?u=3', branch: 'Paternal', generation: 1, children: ['7', '8'], isLocal: true },
  { id: '4', name: 'Sunita Verma', relation: 'Bua', city: 'Bengaluru', phone: '+91 98450 67890', profession: 'Doctor', skills: ['Medicine', 'Piano'], avatar: 'https://i.pravatar.cc/150?u=4', branch: 'Paternal', generation: 1, children: ['9'] },

  // ── Generation 1 — Maternal original ─────────────────────────────────────
  { id: '5', name: 'Rajesh Gupta', relation: 'Mama', city: 'Hyderabad', phone: '+91 90000 55566', profession: 'Business Owner', skills: ['Sales', 'Finance'], avatar: 'https://i.pravatar.cc/150?u=5', branch: 'Maternal', generation: 1, children: ['10', '11'] },
  { id: '6', name: 'Kavita Gupta', relation: 'Mausi', city: 'Pune', phone: '+91 99220 77788', profession: 'Architect', skills: ['Design', 'Art'], avatar: 'https://i.pravatar.cc/150?u=6', branch: 'Maternal', generation: 1, children: ['12'], isLocal: true },

  // ── Generation 0 — Self + Siblings + Original Cousins ─────────────────────
  { id: '7', name: 'Rahul Sharma', relation: 'Self', city: 'Pune', phone: '+91 88050 11223', profession: 'Software Engineer', skills: ['React Native', 'TypeScript'], avatar: 'https://i.pravatar.cc/150?u=7', branch: 'Paternal', generation: 0, isLocal: true, isAdmin: true },
  { id: '8', name: 'Neha Sharma', relation: 'Sister', city: 'Mumbai', phone: '+91 88050 44556', profession: 'Marketing Manager', skills: ['SEO', 'Content'], avatar: 'https://i.pravatar.cc/150?u=8', branch: 'Paternal', generation: 0 },
  { id: '9', name: 'Rohan Verma', relation: 'Cousin', city: 'Bengaluru', phone: '+91 70220 99001', profession: 'Data Scientist', skills: ['Python', 'ML'], avatar: 'https://i.pravatar.cc/150?u=9', branch: 'Paternal', generation: 0 },
  { id: '10', name: 'Priya Gupta', relation: 'Cousin', city: 'Hyderabad', phone: '+91 90000 22334', profession: 'UI/UX Designer', skills: ['Figma', 'User Research'], avatar: 'https://i.pravatar.cc/150?u=10', branch: 'Maternal', generation: 0 },
  { id: '11', name: 'Amit Gupta', relation: 'Cousin', city: 'Chennai', phone: '+91 90000 55667', profession: 'Chef', skills: ['Culinary Arts'], avatar: 'https://i.pravatar.cc/150?u=11', branch: 'Maternal', generation: 0 },
  { id: '12', name: 'Sneha Joshi', relation: 'Cousin', city: 'Pune', phone: '+91 99220 88899', profession: 'Lawyer', skills: ['Corporate Law'], avatar: 'https://i.pravatar.cc/150?u=12', branch: 'Maternal', generation: 0, isLocal: true },
  { id: '13', name: 'Vikram Singh', relation: 'Second Cousin', city: 'Delhi', phone: '+91 98100 33221', profession: 'Accountant', skills: ['Tax', 'Excel'], avatar: 'https://i.pravatar.cc/150?u=13', branch: 'Maternal', generation: 0 },
  { id: '14', name: 'Anjali Desai', relation: 'Distant Aunt', city: 'Bengaluru', phone: '+91 98450 44332', profession: 'Professor', skills: ['Teaching', 'Research'], avatar: 'https://i.pravatar.cc/150?u=14', branch: 'Paternal', generation: 1 },

  // ── Paternal branch — Extended family Cluster A ───────────────────────────
  { id: 'pa1', name: 'Bharat Sharma', relation: 'Distant Uncle', city: 'Nagpur', phone: '+91 99100 10001', profession: 'Politician', skills: ['Public Speaking', 'Networking'], avatar: 'https://i.pravatar.cc/150?u=pa1', branch: 'Paternal', generation: 1, children: ['pa4', 'pa5'] },
  { id: 'pa2', name: 'Sudha Sharma', relation: 'Distant Aunt', city: 'Nagpur', phone: '+91 99100 10002', profession: 'Social Worker', skills: ['NGO Management', 'Fundraising'], avatar: 'https://i.pravatar.cc/150?u=pa2', branch: 'Paternal', generation: 1, children: ['pa4', 'pa5'] },
  { id: 'pa3', name: 'Girish Sharma', relation: 'Distant Uncle', city: 'Nashik', phone: '+91 99100 10003', profession: 'Winemaker', skills: ['Viticulture', 'Fermentation'], avatar: 'https://i.pravatar.cc/150?u=pa3', branch: 'Paternal', generation: 1, children: ['pa6', 'pa7'] },
  { id: 'pa4', name: 'Sahil Sharma', relation: 'Distant Cousin', city: 'Nagpur', phone: '+91 99100 10004', profession: 'Entrepreneur', skills: ['Startup', 'Fundraising'], avatar: 'https://i.pravatar.cc/150?u=pa4', branch: 'Paternal', generation: 0 },
  { id: 'pa5', name: 'Roshni Sharma', relation: 'Distant Cousin', city: 'Pune', phone: '+91 99100 10005', profession: 'Nutritionist', skills: ['Diet Planning', 'Wellness'], avatar: 'https://i.pravatar.cc/150?u=pa5', branch: 'Paternal', generation: 0 },
  { id: 'pa6', name: 'Tejas Sharma', relation: 'Distant Cousin', city: 'Nashik', phone: '+91 99100 10006', profession: 'Sommelier', skills: ['Wine Pairing', 'Tasting'], avatar: 'https://i.pravatar.cc/150?u=pa6', branch: 'Paternal', generation: 0 },
  { id: 'pa7', name: 'Shruti Sharma', relation: 'Distant Cousin', city: 'Mumbai', phone: '+91 99100 10007', profession: 'Event Planner', skills: ['Coordination', 'Budgeting'], avatar: 'https://i.pravatar.cc/150?u=pa7', branch: 'Paternal', generation: 0 },

  // ── Paternal branch — Extended family Cluster B ───────────────────────────
  { id: 'pb1', name: 'Naresh Sharma', relation: 'Distant Uncle', city: 'Kolkata', phone: '+91 99100 20001', profession: 'Import-Export', skills: ['Logistics', 'Negotiation'], avatar: 'https://i.pravatar.cc/150?u=pb1', branch: 'Paternal', generation: 1, children: ['pb3', 'pb4', 'pb5'] },
  { id: 'pb2', name: 'Rekha Sharma', relation: 'Distant Aunt', city: 'Kolkata', phone: '+91 99100 20002', profession: 'Interior Designer', skills: ['Decor', '3D Rendering'], avatar: 'https://i.pravatar.cc/150?u=pb2', branch: 'Paternal', generation: 1, children: ['pb3', 'pb4', 'pb5'] },
  { id: 'pb3', name: 'Akash Sharma', relation: 'Distant Cousin', city: 'Kolkata', phone: '+91 99100 20003', profession: 'Stock Broker', skills: ['Trading', 'Financial Analysis'], avatar: 'https://i.pravatar.cc/150?u=pb3', branch: 'Paternal', generation: 0 },
  { id: 'pb4', name: 'Pallavi Sharma', relation: 'Distant Cousin', city: 'Siliguri', phone: '+91 99100 20004', profession: 'Tea Taster', skills: ['Tea Blending', 'Quality Control'], avatar: 'https://i.pravatar.cc/150?u=pb4', branch: 'Paternal', generation: 0 },
  { id: 'pb5', name: 'Ritesh Sharma', relation: 'Distant Cousin', city: 'Howrah', phone: '+91 99100 20005', profession: 'Marine Engineer', skills: ['Ship Design', 'Hydraulics'], avatar: 'https://i.pravatar.cc/150?u=pb5', branch: 'Paternal', generation: 0 },

  // ── Paternal branch — Extended family Cluster C ───────────────────────────
  { id: 'pc1', name: 'Prakash Sharma', relation: 'Distant Uncle', city: 'Ahmedabad', phone: '+91 99100 30001', profession: 'Diamond Merchant', skills: ['Gemology', 'Export'], avatar: 'https://i.pravatar.cc/150?u=pc1', branch: 'Paternal', generation: 1, children: ['pc3', 'pc4'] },
  { id: 'pc2', name: 'Hema Sharma', relation: 'Distant Aunt', city: 'Ahmedabad', phone: '+91 99100 30002', profession: 'Kathak Dancer', skills: ['Classical Dance', 'Choreography'], avatar: 'https://i.pravatar.cc/150?u=pc2', branch: 'Paternal', generation: 1, children: ['pc3', 'pc4'] },
  { id: 'pc3', name: 'Dev Sharma', relation: 'Distant Cousin', city: 'Surat', phone: '+91 99100 30003', profession: 'Textile Engineer', skills: ['Fabric Tech', 'Export'], avatar: 'https://i.pravatar.cc/150?u=pc3', branch: 'Paternal', generation: 0 },
  { id: 'pc4', name: 'Mahi Sharma', relation: 'Distant Cousin', city: 'Ahmedabad', phone: '+91 99100 30004', profession: 'Yoga Instructor', skills: ['Hatha Yoga', 'Meditation'], avatar: 'https://i.pravatar.cc/150?u=pc4', branch: 'Paternal', generation: 0 },

  // ── Paternal branch — Extended family Cluster D ───────────────────────────
  { id: 'pd1', name: 'Santosh Sharma', relation: 'Distant Uncle', city: 'Bhopal', phone: '+91 99100 40001', profession: 'Ayurvedic Doctor', skills: ['Ayurveda', 'Panchakarma'], avatar: 'https://i.pravatar.cc/150?u=pd1', branch: 'Paternal', generation: 1, children: ['pd3', 'pd4', 'pd5'] },
  { id: 'pd2', name: 'Uma Sharma', relation: 'Distant Aunt', city: 'Bhopal', phone: '+91 99100 40002', profession: 'Homemaker', skills: ['Cooking', 'Gardening'], avatar: 'https://i.pravatar.cc/150?u=pd2', branch: 'Paternal', generation: 1, children: ['pd3', 'pd4', 'pd5'] },
  { id: 'pd3', name: 'Ishan Sharma', relation: 'Distant Cousin', city: 'Bhopal', phone: '+91 99100 40003', profession: 'Naturopath', skills: ['Holistic Healing', 'Nutrition'], avatar: 'https://i.pravatar.cc/150?u=pd3', branch: 'Paternal', generation: 0 },
  { id: 'pd4', name: 'Lavanya Sharma', relation: 'Distant Cousin', city: 'Jabalpur', phone: '+91 99100 40004', profession: 'Wildlife Photographer', skills: ['Photography', 'Trekking'], avatar: 'https://i.pravatar.cc/150?u=pd4', branch: 'Paternal', generation: 0 },
  { id: 'pd5', name: 'Neel Sharma', relation: 'Distant Cousin', city: 'Bhopal', phone: '+91 99100 40005', profession: 'Game Developer', skills: ['Unity', 'C#'], avatar: 'https://i.pravatar.cc/150?u=pd5', branch: 'Paternal', generation: 0 },

  // ── Maternal branch — Extended family Cluster A ───────────────────────────
  { id: 'ma1', name: 'Alok Gupta', relation: 'Distant Uncle', city: 'Patna', phone: '+91 99100 50001', profession: 'Civil Contractor', skills: ['Construction', 'Project Planning'], avatar: 'https://i.pravatar.cc/150?u=ma1', branch: 'Maternal', generation: 1, children: ['ma4', 'ma5'] },
  { id: 'ma2', name: 'Sarita Gupta', relation: 'Distant Aunt', city: 'Patna', phone: '+91 99100 50002', profession: 'Microbiologist', skills: ['Lab Research', 'Pathology'], avatar: 'https://i.pravatar.cc/150?u=ma2', branch: 'Maternal', generation: 1, children: ['ma4', 'ma5'] },
  { id: 'ma3', name: 'Umesh Gupta', relation: 'Distant Uncle', city: 'Ranchi', phone: '+91 99100 50003', profession: 'Mining Engineer', skills: ['Geology', 'Drilling'], avatar: 'https://i.pravatar.cc/150?u=ma3', branch: 'Maternal', generation: 1, children: ['ma6'] },
  { id: 'ma4', name: 'Rohit Gupta', relation: 'Distant Cousin', city: 'Patna', phone: '+91 99100 50004', profession: 'Political Analyst', skills: ['Research', 'Public Policy'], avatar: 'https://i.pravatar.cc/150?u=ma4', branch: 'Maternal', generation: 0 },
  { id: 'ma5', name: 'Shraddha Gupta', relation: 'Distant Cousin', city: 'Delhi', phone: '+91 99100 50005', profession: 'Fashion Stylist', skills: ['Styling', 'Trend Forecasting'], avatar: 'https://i.pravatar.cc/150?u=ma5', branch: 'Maternal', generation: 0 },
  { id: 'ma6', name: 'Karan Gupta', relation: 'Distant Cousin', city: 'Ranchi', phone: '+91 99100 50006', profession: 'Software Architect', skills: ['AWS', 'Microservices'], avatar: 'https://i.pravatar.cc/150?u=ma6', branch: 'Maternal', generation: 0 },

  // ── Maternal branch — Extended family Cluster B ───────────────────────────
  { id: 'mb1', name: 'Ramesh Agarwal', relation: 'Distant Uncle', city: 'Jaipur', phone: '+91 99100 60001', profession: 'Jeweler', skills: ['Goldsmithing', 'Valuation'], avatar: 'https://i.pravatar.cc/150?u=mb1', branch: 'Maternal', generation: 1, children: ['mb3', 'mb4', 'mb5'] },
  { id: 'mb2', name: 'Kiran Agarwal', relation: 'Distant Aunt', city: 'Jaipur', phone: '+91 99100 60002', profession: 'Classical Singer', skills: ['Hindustani Music', 'Raga'], avatar: 'https://i.pravatar.cc/150?u=mb2', branch: 'Maternal', generation: 1, children: ['mb3', 'mb4', 'mb5'] },
  { id: 'mb3', name: 'Pranav Agarwal', relation: 'Distant Cousin', city: 'Jaipur', phone: '+91 99100 60003', profession: 'Gemologist', skills: ['Stone Grading', 'Export'], avatar: 'https://i.pravatar.cc/150?u=mb3', branch: 'Maternal', generation: 0 },
  { id: 'mb4', name: 'Tanya Agarwal', relation: 'Distant Cousin', city: 'Mumbai', phone: '+91 99100 60004', profession: 'Bollywood Choreographer', skills: ['Dance', 'Direction'], avatar: 'https://i.pravatar.cc/150?u=mb4', branch: 'Maternal', generation: 0 },
  { id: 'mb5', name: 'Chirag Agarwal', relation: 'Distant Cousin', city: 'Udaipur', phone: '+91 99100 60005', profession: 'Heritage Hotel Manager', skills: ['Hospitality', 'Tourism'], avatar: 'https://i.pravatar.cc/150?u=mb5', branch: 'Maternal', generation: 0 },

  // ── Maternal branch — Extended family Cluster C ───────────────────────────
  { id: 'mc1', name: 'Vinay Pandey', relation: 'Distant Uncle', city: 'Varanasi', phone: '+91 99100 70001', profession: 'Pandit', skills: ['Vedic Rituals', 'Sanskrit'], avatar: 'https://i.pravatar.cc/150?u=mc1', branch: 'Maternal', generation: 1, children: ['mc3', 'mc4'] },
  { id: 'mc2', name: 'Rukmini Pandey', relation: 'Distant Aunt', city: 'Varanasi', phone: '+91 99100 70002', profession: 'Silk Saree Weaver', skills: ['Banarasi Weaving', 'Dyeing'], avatar: 'https://i.pravatar.cc/150?u=mc2', branch: 'Maternal', generation: 1, children: ['mc3', 'mc4'] },
  { id: 'mc3', name: 'Advaith Pandey', relation: 'Distant Cousin', city: 'Varanasi', phone: '+91 99100 70003', profession: 'Sanskrit Scholar', skills: ['Vedanta', 'Teaching'], avatar: 'https://i.pravatar.cc/150?u=mc3', branch: 'Maternal', generation: 0 },
  { id: 'mc4', name: 'Isha Pandey', relation: 'Distant Cousin', city: 'Delhi', phone: '+91 99100 70004', profession: 'IIT Professor', skills: ['Quantum Physics', 'Research'], avatar: 'https://i.pravatar.cc/150?u=mc4', branch: 'Maternal', generation: 0 },

  // ── Maternal branch — Extended family Cluster D ───────────────────────────
  { id: 'md1', name: 'Ashok Verma', relation: 'Distant Uncle', city: 'Chandigarh', phone: '+91 99100 80001', profession: 'Retired IPS Officer', skills: ['Law Enforcement', 'Administration'], avatar: 'https://i.pravatar.cc/150?u=md1', branch: 'Maternal', generation: 1, children: ['md3', 'md4', 'md5'] },
  { id: 'md2', name: 'Sunanda Verma', relation: 'Distant Aunt', city: 'Chandigarh', phone: '+91 99100 80002', profession: 'Child Psychologist', skills: ['Play Therapy', 'Assessment'], avatar: 'https://i.pravatar.cc/150?u=md2', branch: 'Maternal', generation: 1, children: ['md3', 'md4', 'md5'] },
  { id: 'md3', name: 'Aryan Verma', relation: 'Distant Cousin', city: 'Chandigarh', phone: '+91 99100 80003', profession: 'Army Captain', skills: ['Combat Training', 'Leadership'], avatar: 'https://i.pravatar.cc/150?u=md3', branch: 'Maternal', generation: 0 },
  { id: 'md4', name: 'Neelam Verma', relation: 'Distant Cousin', city: 'Mohali', phone: '+91 99100 80004', profession: 'Pharmaceutical Researcher', skills: ['Drug Discovery', 'Clinical Trials'], avatar: 'https://i.pravatar.cc/150?u=md4', branch: 'Maternal', generation: 0 },
  { id: 'md5', name: 'Saurabh Verma', relation: 'Distant Cousin', city: 'Patiala', phone: '+91 99100 80005', profession: 'Agriculturist', skills: ['Organic Farming', 'Irrigation'], avatar: 'https://i.pravatar.cc/150?u=md5', branch: 'Maternal', generation: 0 },

  // ── Maternal branch — Extended family Cluster E ───────────────────────────
  { id: 'me1', name: 'Prakash Shukla', relation: 'Distant Uncle', city: 'Raipur', phone: '+91 99100 90001', profession: 'Chartered Engineer', skills: ['Structural Design', 'AutoCAD'], avatar: 'https://i.pravatar.cc/150?u=me1', branch: 'Maternal', generation: 1, children: ['me3', 'me4'] },
  { id: 'me2', name: 'Manju Shukla', relation: 'Distant Aunt', city: 'Raipur', phone: '+91 99100 90002', profession: 'Dietitian', skills: ['Nutrition Planning', 'Wellness'], avatar: 'https://i.pravatar.cc/150?u=me2', branch: 'Maternal', generation: 1, children: ['me3', 'me4'] },
  { id: 'me3', name: 'Pratik Shukla', relation: 'Distant Cousin', city: 'Raipur', phone: '+91 99100 90003', profession: 'FinTech Developer', skills: ['Blockchain', 'Python'], avatar: 'https://i.pravatar.cc/150?u=me3', branch: 'Maternal', generation: 0 },
  { id: 'me4', name: 'Prachi Shukla', relation: 'Distant Cousin', city: 'Nagpur', phone: '+91 99100 90004', profession: 'Oncologist', skills: ['Chemotherapy', 'Radiology'], avatar: 'https://i.pravatar.cc/150?u=me4', branch: 'Maternal', generation: 0 },

  // ── Paternal branch — Cluster E (South India connection) ─────────────────
  { id: 'pe1', name: 'Gopal Iyer', relation: 'Distant Uncle', city: 'Chennai', phone: '+91 99100 11001', profession: 'Carnatic Musician', skills: ['Veena', 'Composition'], avatar: 'https://i.pravatar.cc/150?u=pe1', branch: 'Paternal', generation: 1, children: ['pe3', 'pe4'] },
  { id: 'pe2', name: 'Radha Iyer', relation: 'Distant Aunt', city: 'Chennai', phone: '+91 99100 11002', profession: 'Bharatanatyam Dancer', skills: ['Classical Dance', 'Abhinaya'], avatar: 'https://i.pravatar.cc/150?u=pe2', branch: 'Paternal', generation: 1, children: ['pe3', 'pe4'] },
  { id: 'pe3', name: 'Karthik Iyer', relation: 'Distant Cousin', city: 'Bengaluru', phone: '+91 99100 11003', profession: 'AI Researcher', skills: ['Deep Learning', 'NLP'], avatar: 'https://i.pravatar.cc/150?u=pe3', branch: 'Paternal', generation: 0 },
  { id: 'pe4', name: 'Meenakshi Iyer', relation: 'Distant Cousin', city: 'Chennai', phone: '+91 99100 11004', profession: 'Classical Dancer', skills: ['Bharatanatyam', 'Kuchipudi'], avatar: 'https://i.pravatar.cc/150?u=pe4', branch: 'Paternal', generation: 0 },

  // ── Paternal branch — Cluster F (Rajasthan) ───────────────────────────────
  { id: 'pf1', name: 'Mahaveer Jain', relation: 'Distant Uncle', city: 'Jodhpur', phone: '+91 99100 12001', profession: 'Marble Exporter', skills: ['Stonework', 'Trade'], avatar: 'https://i.pravatar.cc/150?u=pf1', branch: 'Paternal', generation: 1, children: ['pf3', 'pf4', 'pf5'] },
  { id: 'pf2', name: 'Santosh Jain', relation: 'Distant Aunt', city: 'Jodhpur', phone: '+91 99100 12002', profession: 'Meenakari Artist', skills: ['Enamel Art', 'Jewelry Design'], avatar: 'https://i.pravatar.cc/150?u=pf2', branch: 'Paternal', generation: 1, children: ['pf3', 'pf4', 'pf5'] },
  { id: 'pf3', name: 'Raj Jain', relation: 'Distant Cousin', city: 'Jodhpur', phone: '+91 99100 12003', profession: 'Architect', skills: ['Heritage Conservation', 'Rajasthani Architecture'], avatar: 'https://i.pravatar.cc/150?u=pf3', branch: 'Paternal', generation: 0 },
  { id: 'pf4', name: 'Kavya Jain', relation: 'Distant Cousin', city: 'Jaipur', phone: '+91 99100 12004', profession: 'Block Print Artist', skills: ['Printing', 'Natural Dyes'], avatar: 'https://i.pravatar.cc/150?u=pf4', branch: 'Paternal', generation: 0 },
  { id: 'pf5', name: 'Sumer Jain', relation: 'Distant Cousin', city: 'Bikaner', phone: '+91 99100 12005', profession: 'Camel Breeder', skills: ['Animal Husbandry', 'Tourism'], avatar: 'https://i.pravatar.cc/150?u=pf5', branch: 'Paternal', generation: 0 },

  // ── Maternal branch — Cluster F (Northeast) ───────────────────────────────
  { id: 'mf1', name: 'Biswajit Chakraborty', relation: 'Distant Uncle', city: 'Guwahati', phone: '+91 99100 13001', profession: 'Tea Estate Owner', skills: ['Tea Cultivation', 'Management'], avatar: 'https://i.pravatar.cc/150?u=mf1', branch: 'Maternal', generation: 1, children: ['mf3', 'mf4'] },
  { id: 'mf2', name: 'Protima Chakraborty', relation: 'Distant Aunt', city: 'Guwahati', phone: '+91 99100 13002', profession: 'Handloom Weaver', skills: ['Assamese Silk', 'Mekhela Chador'], avatar: 'https://i.pravatar.cc/150?u=mf2', branch: 'Maternal', generation: 1, children: ['mf3', 'mf4'] },
  { id: 'mf3', name: 'Anup Chakraborty', relation: 'Distant Cousin', city: 'Guwahati', phone: '+91 99100 13003', profession: 'Conservationist', skills: ['Wildlife Research', 'Ecology'], avatar: 'https://i.pravatar.cc/150?u=mf3', branch: 'Maternal', generation: 0 },
  { id: 'mf4', name: 'Priti Chakraborty', relation: 'Distant Cousin', city: 'Shillong', phone: '+91 99100 13004', profession: 'Musician', skills: ['Guitar', 'Songwriting'], avatar: 'https://i.pravatar.cc/150?u=mf4', branch: 'Maternal', generation: 0 },

  // ── In-laws cluster (Paternal, Generation 1) ──────────────────────────────
  { id: 'il1', name: 'Suresh Mehta', relation: 'Father-in-law', city: 'Pune', phone: '+91 98220 11001', profession: 'Retired Bank Manager', skills: ['Finance', 'Cricket'], avatar: 'https://i.pravatar.cc/150?u=il1', branch: 'Paternal', generation: 1, children: ['il3', 'il4'] },
  { id: 'il2', name: 'Anjana Mehta', relation: 'Mother-in-law', city: 'Pune', phone: '+91 98220 11002', profession: 'Homemaker', skills: ['Cooking', 'Sewing'], avatar: 'https://i.pravatar.cc/150?u=il2', branch: 'Paternal', generation: 1, children: ['il3', 'il4'] },
  { id: 'il3', name: 'Priyanka Mehta', relation: 'Wife', city: 'Pune', phone: '+91 98220 11003', profession: 'Paediatrician', skills: ['Child Health', 'Immunology'], avatar: 'https://i.pravatar.cc/150?u=il3', branch: 'Paternal', generation: 0 },
  { id: 'il4', name: 'Sanjay Mehta', relation: 'Brother-in-law', city: 'Mumbai', phone: '+91 98220 11004', profession: 'Advertising Director', skills: ['Branding', 'Copywriting'], avatar: 'https://i.pravatar.cc/150?u=il4', branch: 'Paternal', generation: 0 },
  { id: 'il5', name: 'Naina Mehta', relation: 'Sister-in-law', city: 'Nashik', phone: '+91 98220 11005', profession: 'Veterinary Doctor', skills: ['Surgery', 'Animal Care'], avatar: 'https://i.pravatar.cc/150?u=il5', branch: 'Paternal', generation: 0 },

  // ── Children of Self (Generation -1) ─────────────────────────────────────
  { id: 'ch1', name: 'Aarav Sharma', relation: 'Son', city: 'Pune', phone: '+91 00000 00001', profession: 'Student', skills: ['Math', 'Football'], avatar: 'https://i.pravatar.cc/150?u=ch1', branch: 'Paternal', generation: -1 },
  { id: 'ch2', name: 'Anika Sharma', relation: 'Daughter', city: 'Pune', phone: '+91 00000 00002', profession: 'Student', skills: ['Painting', 'Swimming'], avatar: 'https://i.pravatar.cc/150?u=ch2', branch: 'Paternal', generation: -1 },

  // ── Paternal — Cluster G (Punjab) ─────────────────────────────────────────
  { id: 'pg1', name: 'Gurpreet Singh', relation: 'Distant Uncle', city: 'Ludhiana', phone: '+91 98150 10001', profession: 'Textile Mill Owner', skills: ['Manufacturing', 'Trade'], avatar: 'https://i.pravatar.cc/150?u=pg1', branch: 'Paternal', generation: 1, children: ['pg3', 'pg4'] },
  { id: 'pg2', name: 'Harpreet Kaur', relation: 'Distant Aunt', city: 'Ludhiana', phone: '+91 98150 10002', profession: 'Homeopathic Doctor', skills: ['Homeopathy', 'Nutrition'], avatar: 'https://i.pravatar.cc/150?u=pg2', branch: 'Paternal', generation: 1, children: ['pg3', 'pg4'] },
  { id: 'pg3', name: 'Manpreet Singh', relation: 'Distant Cousin', city: 'Amritsar', phone: '+91 98150 10003', profession: 'Sportsperson (Hockey)', skills: ['Field Hockey', 'Fitness'], avatar: 'https://i.pravatar.cc/150?u=pg3', branch: 'Paternal', generation: 0 },
  { id: 'pg4', name: 'Simran Kaur', relation: 'Distant Cousin', city: 'Chandigarh', phone: '+91 98150 10004', profession: 'Fashion Photographer', skills: ['Photography', 'Editing'], avatar: 'https://i.pravatar.cc/150?u=pg4', branch: 'Paternal', generation: 0 },

  // ── Paternal — Cluster H (Maharashtra) ───────────────────────────────────
  { id: 'ph1', name: 'Dilip Kulkarni', relation: 'Distant Uncle', city: 'Kolhapur', phone: '+91 98230 10001', profession: 'Sugar Factory Owner', skills: ['Agro-industry', 'Labour Management'], avatar: 'https://i.pravatar.cc/150?u=ph1', branch: 'Paternal', generation: 1, children: ['ph3', 'ph4', 'ph5'] },
  { id: 'ph2', name: 'Vrinda Kulkarni', relation: 'Distant Aunt', city: 'Kolhapur', phone: '+91 98230 10002', profession: 'Lavani Performer', skills: ['Lavani', 'Stage Performance'], avatar: 'https://i.pravatar.cc/150?u=ph2', branch: 'Paternal', generation: 1, children: ['ph3', 'ph4', 'ph5'] },
  { id: 'ph3', name: 'Omkar Kulkarni', relation: 'Distant Cousin', city: 'Pune', phone: '+91 98230 10003', profession: 'Startup Founder', skills: ['Product', 'Fundraising'], avatar: 'https://i.pravatar.cc/150?u=ph3', branch: 'Paternal', generation: 0 },
  { id: 'ph4', name: 'Gauri Kulkarni', relation: 'Distant Cousin', city: 'Mumbai', phone: '+91 98230 10004', profession: 'Documentary Filmmaker', skills: ['Direction', 'Editing'], avatar: 'https://i.pravatar.cc/150?u=ph4', branch: 'Paternal', generation: 0 },
  { id: 'ph5', name: 'Swaraj Kulkarni', relation: 'Distant Cousin', city: 'Nagpur', phone: '+91 98230 10005', profession: 'Political Activist', skills: ['Public Speaking', 'Community Organizing'], avatar: 'https://i.pravatar.cc/150?u=ph5', branch: 'Paternal', generation: 0 },

  // ── Maternal — Cluster G (Odisha) ─────────────────────────────────────────
  { id: 'mo1', name: 'Rabindra Mohapatra', relation: 'Distant Uncle', city: 'Bhubaneswar', phone: '+91 98610 10001', profession: 'Odissi Dancer', skills: ['Odissi', 'Choreography'], avatar: 'https://i.pravatar.cc/150?u=mo1', branch: 'Maternal', generation: 1, children: ['mo3', 'mo4'] },
  { id: 'mo2', name: 'Sulochana Mohapatra', relation: 'Distant Aunt', city: 'Bhubaneswar', phone: '+91 98610 10002', profession: 'Pattachitra Artist', skills: ['Pattachitra', 'Natural Colors'], avatar: 'https://i.pravatar.cc/150?u=mo2', branch: 'Maternal', generation: 1, children: ['mo3', 'mo4'] },
  { id: 'mo3', name: 'Subhranshu Mohapatra', relation: 'Distant Cousin', city: 'Cuttack', phone: '+91 98610 10003', profession: 'Jewellery Designer', skills: ['Silver Filigree', 'Design'], avatar: 'https://i.pravatar.cc/150?u=mo3', branch: 'Maternal', generation: 0 },
  { id: 'mo4', name: 'Lipsa Mohapatra', relation: 'Distant Cousin', city: 'Bhubaneswar', phone: '+91 98610 10004', profession: 'Biotechnologist', skills: ['Genetic Engineering', 'Lab Research'], avatar: 'https://i.pravatar.cc/150?u=mo4', branch: 'Maternal', generation: 0 },

  // ── Maternal — Cluster H (Gujarat) ───────────────────────────────────────
  { id: 'mh1', name: 'Bhavesh Patel', relation: 'Distant Uncle', city: 'Surat', phone: '+91 98790 10001', profession: 'Diamond Polisher', skills: ['Diamond Cutting', 'Quality Check'], avatar: 'https://i.pravatar.cc/150?u=mh1', branch: 'Maternal', generation: 1, children: ['mh3', 'mh4'] },
  { id: 'mh2', name: 'Hiral Patel', relation: 'Distant Aunt', city: 'Surat', phone: '+91 98790 10002', profession: 'Garba Teacher', skills: ['Garba', 'Navratri Choreography'], avatar: 'https://i.pravatar.cc/150?u=mh2', branch: 'Maternal', generation: 1, children: ['mh3', 'mh4'] },
  { id: 'mh3', name: 'Parth Patel', relation: 'Distant Cousin', city: 'Ahmedabad', phone: '+91 98790 10003', profession: 'Biomedical Engineer', skills: ['Prosthetics', 'Medical Devices'], avatar: 'https://i.pravatar.cc/150?u=mh3', branch: 'Maternal', generation: 0 },
  { id: 'mh4', name: 'Diya Patel', relation: 'Distant Cousin', city: 'Vadodara', phone: '+91 98790 10004', profession: 'Classical Vocalist', skills: ['Hindustani Classical', 'Thumri'], avatar: 'https://i.pravatar.cc/150?u=mh4', branch: 'Maternal', generation: 0 },

  // ── Paternal — Cluster I (Hyderabad) ─────────────────────────────────────
  { id: 'pi1', name: 'Venkat Rao', relation: 'Distant Uncle', city: 'Hyderabad', phone: '+91 98490 10001', profession: 'IT Entrepreneur', skills: ['Business Development', 'Cloud'], avatar: 'https://i.pravatar.cc/150?u=pi1', branch: 'Paternal', generation: 1, children: ['pi3', 'pi4'] },
  { id: 'pi2', name: 'Padmavathi Rao', relation: 'Distant Aunt', city: 'Hyderabad', phone: '+91 98490 10002', profession: 'Kuchipudi Dancer', skills: ['Kuchipudi', 'Abhinaya'], avatar: 'https://i.pravatar.cc/150?u=pi2', branch: 'Paternal', generation: 1, children: ['pi3', 'pi4'] },
  { id: 'pi3', name: 'Aditya Rao', relation: 'Distant Cousin', city: 'Hyderabad', phone: '+91 98490 10003', profession: 'Cybersecurity Analyst', skills: ['Pen Testing', 'SIEM'], avatar: 'https://i.pravatar.cc/150?u=pi3', branch: 'Paternal', generation: 0 },
  { id: 'pi4', name: 'Swapna Rao', relation: 'Distant Cousin', city: 'Bengaluru', phone: '+91 98490 10004', profession: 'Data Engineer', skills: ['Spark', 'Kafka'], avatar: 'https://i.pravatar.cc/150?u=pi4', branch: 'Paternal', generation: 0 },

  // ── Maternal — Cluster I (Kerala) ─────────────────────────────────────────
  { id: 'mk1', name: 'Krishnadas Nair', relation: 'Distant Uncle', city: 'Kochi', phone: '+91 94470 10001', profession: 'Ayurvedic Physician', skills: ['Panchakarma', 'Herbs'], avatar: 'https://i.pravatar.cc/150?u=mk1', branch: 'Maternal', generation: 1, children: ['mk3', 'mk4'] },
  { id: 'mk2', name: 'Devaki Nair', relation: 'Distant Aunt', city: 'Kochi', phone: '+91 94470 10002', profession: 'Mohiniyattam Dancer', skills: ['Mohiniyattam', 'Teaching'], avatar: 'https://i.pravatar.cc/150?u=mk2', branch: 'Maternal', generation: 1, children: ['mk3', 'mk4'] },
  { id: 'mk3', name: 'Arjun Nair', relation: 'Distant Cousin', city: 'Trivandrum', phone: '+91 94470 10003', profession: 'Space Scientist (ISRO)', skills: ['Aerospace', 'Rocket Propulsion'], avatar: 'https://i.pravatar.cc/150?u=mk3', branch: 'Maternal', generation: 0 },
  { id: 'mk4', name: 'Sreelakshmi Nair', relation: 'Distant Cousin', city: 'Kochi', phone: '+91 94470 10004', profession: 'Marine Biologist', skills: ['Coral Research', 'Diving'], avatar: 'https://i.pravatar.cc/150?u=mk4', branch: 'Maternal', generation: 0 },

  // ── Overseas relatives ────────────────────────────────────────────────────
  { id: 'ov1', name: 'Nikhil Sharma', relation: 'Distant Cousin', city: 'San Francisco, USA', phone: '+1 415 555 0101', profession: 'Product Manager (Google)', skills: ['Product Strategy', 'Growth'], avatar: 'https://i.pravatar.cc/150?u=ov1', branch: 'Paternal', generation: 0 },
  { id: 'ov2', name: 'Preethi Sharma', relation: 'Distant Cousin', city: 'London, UK', phone: '+44 7700 900001', profession: 'NHS Surgeon', skills: ['Cardiac Surgery', 'Research'], avatar: 'https://i.pravatar.cc/150?u=ov2', branch: 'Paternal', generation: 0 },
  { id: 'ov3', name: 'Rajan Gupta', relation: 'Distant Cousin', city: 'Toronto, Canada', phone: '+1 416 555 0102', profession: 'Immigration Lawyer', skills: ['Canadian Law', 'Settlement'], avatar: 'https://i.pravatar.cc/150?u=ov3', branch: 'Maternal', generation: 0 },
  { id: 'ov4', name: 'Sunaina Mehta', relation: 'Distant Cousin', city: 'Dubai, UAE', phone: '+971 50 555 0103', profession: 'Real Estate Developer', skills: ['Property', 'Investment'], avatar: 'https://i.pravatar.cc/150?u=ov4', branch: 'Maternal', generation: 0 },
  { id: 'ov5', name: 'Tarun Sharma', relation: 'Distant Cousin', city: 'Sydney, Australia', phone: '+61 2 5550 0104', profession: 'Environmental Scientist', skills: ['Climate Research', 'GIS'], avatar: 'https://i.pravatar.cc/150?u=ov5', branch: 'Paternal', generation: 0 },
  { id: 'ov6', name: 'Pooja Verma', relation: 'Distant Cousin', city: 'Singapore', phone: '+65 9555 0105', profession: 'Fintech Founder', skills: ['Payments', 'Blockchain'], avatar: 'https://i.pravatar.cc/150?u=ov6', branch: 'Maternal', generation: 0 },
  { id: 'ov7', name: 'Deepak Gupta', relation: 'Distant Uncle', city: 'New Jersey, USA', phone: '+1 201 555 0106', profession: 'Cardiologist', skills: ['Interventional Cardiology', 'Research'], avatar: 'https://i.pravatar.cc/150?u=ov7', branch: 'Maternal', generation: 1, children: ['ov8'] },
  { id: 'ov8', name: 'Rhea Gupta', relation: 'Distant Cousin', city: 'New York, USA', phone: '+1 212 555 0107', profession: 'Wall Street Analyst', skills: ['Equity Research', 'Modeling'], avatar: 'https://i.pravatar.cc/150?u=ov8', branch: 'Maternal', generation: 0 },

  // ── Miscellaneous extended relatives ─────────────────────────────────────
  { id: 'ex1', name: 'Hemant Joshi', relation: 'Distant Uncle', city: 'Goa', phone: '+91 98220 20001', profession: 'Resort Owner', skills: ['Tourism', 'Hospitality'], avatar: 'https://i.pravatar.cc/150?u=ex1', branch: 'Paternal', generation: 1, children: ['ex3', 'ex4'] },
  { id: 'ex2', name: 'Leela Joshi', relation: 'Distant Aunt', city: 'Goa', phone: '+91 98220 20002', profession: 'Yoga Retreat Host', skills: ['Yoga', 'Meditation'], avatar: 'https://i.pravatar.cc/150?u=ex2', branch: 'Paternal', generation: 1, children: ['ex3', 'ex4'] },
  { id: 'ex3', name: 'Ansh Joshi', relation: 'Distant Cousin', city: 'Goa', phone: '+91 98220 20003', profession: 'Scuba Instructor', skills: ['Diving', 'Marine Life'], avatar: 'https://i.pravatar.cc/150?u=ex3', branch: 'Paternal', generation: 0 },
  { id: 'ex4', name: 'Tara Joshi', relation: 'Distant Cousin', city: 'Mumbai', phone: '+91 98220 20004', profession: 'Actress', skills: ['Theatre', 'Hindi Films'], avatar: 'https://i.pravatar.cc/150?u=ex4', branch: 'Paternal', generation: 0 },
  { id: 'ex5', name: 'Baldev Rana', relation: 'Distant Uncle', city: 'Dehradun', phone: '+91 98370 20001', profession: 'Mountaineer', skills: ['Himalayan Expeditions', 'Survival'], avatar: 'https://i.pravatar.cc/150?u=ex5', branch: 'Maternal', generation: 1, children: ['ex7'] },
  { id: 'ex6', name: 'Chandra Rana', relation: 'Distant Aunt', city: 'Dehradun', phone: '+91 98370 20002', profession: 'Forest Officer', skills: ['Wildlife Conservation', 'Administration'], avatar: 'https://i.pravatar.cc/150?u=ex6', branch: 'Maternal', generation: 1, children: ['ex7'] },
  { id: 'ex7', name: 'Veer Rana', relation: 'Distant Cousin', city: 'Rishikesh', phone: '+91 98370 20003', profession: 'Adventure Tour Guide', skills: ['River Rafting', 'Bungee'], avatar: 'https://i.pravatar.cc/150?u=ex7', branch: 'Maternal', generation: 0 },
  { id: 'ex8', name: 'Sonal Saxena', relation: 'Distant Aunt', city: 'Lucknow', phone: '+91 99510 20001', profession: 'Chikankari Artisan', skills: ['Chikankari Embroidery', 'Fashion'], avatar: 'https://i.pravatar.cc/150?u=ex8', branch: 'Maternal', generation: 1, children: ['ex9', 'ex10'] },
  { id: 'ex9', name: 'Mihir Saxena', relation: 'Distant Cousin', city: 'Lucknow', phone: '+91 99510 20002', profession: 'Food Technologist', skills: ['FMCG', 'Quality Assurance'], avatar: 'https://i.pravatar.cc/150?u=ex9', branch: 'Maternal', generation: 0 },
  { id: 'ex10', name: 'Aditi Saxena', relation: 'Distant Cousin', city: 'Delhi', phone: '+91 99510 20003', profession: 'UX Researcher', skills: ['Usability Testing', 'Figma'], avatar: 'https://i.pravatar.cc/150?u=ex10', branch: 'Maternal', generation: 0 },
  { id: 'ex11', name: 'Gopinath Pillai', relation: 'Distant Uncle', city: 'Madurai', phone: '+91 94430 20001', profession: 'Temple Architect', skills: ['Dravidian Architecture', 'Sculpture'], avatar: 'https://i.pravatar.cc/150?u=ex11', branch: 'Paternal', generation: 1, children: ['ex12'] },
  { id: 'ex12', name: 'Meera Pillai', relation: 'Distant Cousin', city: 'Coimbatore', phone: '+91 94430 20002', profession: 'Robotics Engineer', skills: ['ROS', 'Embedded Systems'], avatar: 'https://i.pravatar.cc/150?u=ex12', branch: 'Paternal', generation: 0 },
  { id: 'ex13', name: 'Jitendra Thakur', relation: 'Distant Uncle', city: 'Shimla', phone: '+91 98170 20001', profession: 'Apple Orchard Owner', skills: ['Horticulture', 'Export'], avatar: 'https://i.pravatar.cc/150?u=ex13', branch: 'Paternal', generation: 1, children: ['ex14', 'ex15'] },
  { id: 'ex14', name: 'Kamlesh Thakur', relation: 'Distant Cousin', city: 'Manali', phone: '+91 98170 20002', profession: 'Ski Instructor', skills: ['Skiing', 'Mountain Rescue'], avatar: 'https://i.pravatar.cc/150?u=ex14', branch: 'Paternal', generation: 0 },
  { id: 'ex15', name: 'Pinki Thakur', relation: 'Distant Cousin', city: 'Shimla', phone: '+91 98170 20003', profession: 'Eco-Tourism Operator', skills: ['Tourism', 'Sustainability'], avatar: 'https://i.pravatar.cc/150?u=ex15', branch: 'Paternal', generation: 0 },
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

export const RELATION_TYPES = [
  'Father', 'Mother', 'Son', 'Daughter',
  'Brother', 'Sister', 'Husband', 'Wife',
  'Grandfather', 'Grandmother', 'Grandson', 'Granddaughter',
  'Uncle', 'Aunt', 'Nephew', 'Niece',
  'Cousin', 'Second Cousin',
  'Father-in-law', 'Mother-in-law', 'Son-in-law', 'Daughter-in-law',
  'Brother-in-law', 'Sister-in-law',
  // Indian relation names
  'Chacha', 'Chachi', 'Tau', 'Tai',
  'Mama', 'Mami', 'Mausi', 'Mausa',
  'Bua', 'Fufa', 'Nana', 'Nani',
  'Dada', 'Dadi', 'Bhaiya', 'Didi',
  'Jija', 'Bhabhi', 'Sala', 'Sali',
  'Self',
];