import { Code, Brain, Heart, Briefcase, Palette, Wrench, ChefHat, Beaker, GraduationCap, Building2, Award, Globe, Code2, TrendingUp, UserIcon, Calendar, MessageSquare, Target, Building, Users, CheckCircle2, ClipboardList, Factory } from 'lucide-react';
import { Leaf, Dumbbell, Music, BookOpen, Landmark } from 'lucide-react';
import type { Institution, Slide } from '../types/types';

export const matches = [
  {
    id: 'computerscience',
    title: 'Computer Science',
    type: 'B.Sc.',
    match: 95,
    description: 'A degree program focused on development, programming, and application of computer systems. Perfect for problem solvers. Dive deep into algorithms, AI, and software engineering.',
    icon: Code2,
    careers: ['Software Dev', 'Data Scientist', 'Architect'],
    glowColor: '#a165f0',
    backgroundImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
  },
  {
    id: 'porsche',
    title: 'Porsche Engineering',
    type: 'Company',
    match: 67,
    description: 'Shape the future of the sports car. Driven by dreams and precision. Work on cutting-edge automotive technologies in a highly innovative environment.',
    backgroundImage: 'https://motionbgs.com/media/3959/porsche-gt3rs-in-rain.jpg', // Fallback image used as requested URL link was broken in context, reverted to high quality Unsplash car image
    glowColor: '#ef4444',
    icon: TrendingUp,
    careers: ['Automotive Engineer', 'R&D Specialist', 'Simulation Engineer'],
  },
  {
    id: 'design',
    title: 'Design',
    type: 'Study Program',
    match: 71,
    description: 'Creative degree program for visual communication and design. Learn typography, color theory, and user experience principles.',
    icon: Palette,
    careers: ['#Designer', '#ArtDirector', '#UXDesigner'],
    glowColor: '#cd6a9b',
    backgroundImage: 'https://images.unsplash.com/photo-1664520132859-727fc515fc8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYzMzc0Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'professionalchef',
    title: 'Professional Chef',
    type: 'Apprenticeship',
    match: 73,
    description: 'Train in culinary arts, food preparation, and kitchen management in professional environments. Master the art of taste.',
    icon: ChefHat,
    careers: ['#Chef', '#Pastry Chef', '#Restaurant Manager'],
    glowColor: '#86e9e5',
    backgroundImage: 'https://i.pinimg.com/originals/4b/fa/c2/4bfac2846c9c552d5b42d6798728a81f.jpg',
  },
  {
    id: 'sap',
    title: 'SAP Dual Study',
    type: 'Company',
    match: 95,
    description: 'Combine theory and practice with the global leader in enterprise software. Earn a salary while studying and gain invaluable real-world experience from day one.',
    backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    glowColor: '#4ac356',
    icon: Briefcase,
    careers: ['Consultant', 'Full Stack Developer', 'Product Manager'],
  },
  {
    id: 'automechanic',
    title: 'Automotive Mechanic',
    type: 'Apprenticeship',
    match: 80,
    description: 'Specialize in diagnosing, maintaining, and repairing vehicles and automotive systems. Get hands-on with engines and electronics.',
    icon: Wrench,
    careers: ['#Mechanic', '#Automotive Technician', '#Service Manager'],
    glowColor: '#f97316', // Orange fallback for empty string
    backgroundImage: 'https://images.unsplash.com/photo-1698998882494-57c3e043f340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMGF1dG9tb3RpdmUlMjByZXBhaXJ8ZW58MXx8fHwxNzYzMzk2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];


export const questions = [
  {
    id: 1,
    title: 'Your Interests',
    question: 'Which topics fascinate you the most?',
    description: 'Choose up to 5 areas that you are really passionate about. This helps us understand your passions.',
    type: 'multiple-choice',
    options: [
      { id: 'tech', label: 'Technology & IT', icon: Code },
      { id: 'art', label: 'Art & Design', icon: Palette },
      { id: 'science', label: 'Science', icon: Beaker },
      { id: 'health', label: 'Health', icon: Heart },
      { id: 'social', label: 'Social', icon: Heart },
      { id: 'business', label: 'Business', icon: Briefcase },
      { id: 'nature', label: 'Nature', icon: Leaf },
      { id: 'sports', label: 'Sports', icon: Dumbbell },
      { id: 'music', label: 'Music', icon: Music },
      { id: 'history', label: 'History', icon: BookOpen },
      { id: 'politics', label: 'Politics', icon: Landmark },
    ],
    maxSelections: 5,
  },
  {
    id: 2,
    title: 'Your Strengths',
    question: 'What are your favorite subjects?',
    description: 'Select the subjects you enjoy most in school.',
    type: 'multiple-choice',
    options: [
      { id: 'math', label: 'Mathematics', icon: Code },
      { id: 'physics', label: 'Physics', icon: Beaker },
      { id: 'chemistry', label: 'Chemistry', icon: Beaker },
      { id: 'biology', label: 'Biology', icon: Leaf },
      { id: 'languages', label: 'Languages', icon: BookOpen },
      { id: 'arts', label: 'Arts', icon: Palette },
      { id: 'sports', label: 'Sports', icon: Dumbbell },
      { id: 'music', label: 'Music', icon: Music },
    ],
    maxSelections: 5,
  },
  {
    id: 3,
    title: 'Your Goals',
    question: 'What are your career goals?',
    description: 'Tell us about what you want to achieve in your professional life.',
    type: 'text-input',
    placeholder: 'e.g., I want to work in technology and help solve real-world problems...',
  },
  {
    id: 4,
    title: 'Your Hobbies',
    question: 'What do you enjoy doing in your free time?',
    description: 'Tell us about your hobbies and activities.',
    type: 'multiple-choice',
    options: [
      { id: 'coding', label: 'Programming', icon: Code },
      { id: 'gaming', label: 'Gaming', icon: Code },
      { id: 'reading', label: 'Reading', icon: BookOpen },
      { id: 'sports-activity', label: 'Sports', icon: Dumbbell },
      { id: 'music-activity', label: 'Making Music', icon: Music },
      { id: 'art-activity', label: 'Creating Art', icon: Palette },
      { id: 'volunteering', label: 'Volunteering', icon: Heart },
      { id: 'travel', label: 'Traveling', icon: Landmark },
    ],
    maxSelections: 5,
  },
  {
    id: 5,
    title: 'How Others See You',
    question: 'How would others describe you?',
    description: 'Select traits that best describe your personality.',
    type: 'multiple-choice',
    options: [
      { id: 'analytical', label: 'Analytical', icon: Code },
      { id: 'creative', label: 'Creative', icon: Palette },
      { id: 'helpful', label: 'Helpful', icon: Heart },
      { id: 'leader', label: 'Leadership', icon: Briefcase },
      { id: 'curious', label: 'Curious', icon: Beaker },
      { id: 'organized', label: 'Organized', icon: Briefcase },
      { id: 'social', label: 'Social', icon: Heart },
      { id: 'innovative', label: 'Innovative', icon: Code },
    ],
    maxSelections: 5,
  },
];

export const slides: Slide[] = [
  {
    id: 'intro',
    type: 'hero',
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "Find Your Path",
    description: "Discover the perfect degree program or apprenticeship tailored to your strengths."
  },
  {
    id: 'partners',
    type: 'partners',
    title: "Strong Network",
    description: "We work with top-tier universities and industry leaders to get you the best spots.",
    partners: [
      { name: "Tech Univ", icon: <GraduationCap /> },
      { name: "Global Corp", icon: <Building2 /> },
      { name: "Innovate", icon: <Briefcase /> },
      { name: "Future Lab", icon: <Globe /> },
      { name: "Design Inst", icon: <Award /> },
      { name: "Tech Univ", icon: <GraduationCap /> },
      { name: "Global Corp", icon: <Building2 /> },
    ]
  },
  {
    id: 'stats',
    type: 'stats',
    title: "Proven Success",
    description: "Join a massive community of students who have found their way.",
    stats: [
      { value: 300000, suffix: "+", label: "Users Helped" },
      { value: 98, suffix: "%", label: "Success Rate" },
      { value: 5000, suffix: "", label: "Partners" }
    ]
  }
];


export const user = {
  name: 'Lena Hoffmann',
  email: 'lena.hoffmann@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
};

export const savedStudyPrograms = [
  {
    id: '1',
    title: 'Computer Science',
    institution: 'MIT',
    location: 'Cambridge, MA',
    image: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  },
  {
    id: '2',
    title: 'Psychology',
    institution: 'Stanford University',
    location: 'Stanford, CA',
    image: 'https://images.unsplash.com/photo-1561993629-67302018480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  },
];

export const savedCareers = [
  {
    id: '1',
    title: 'Carpenter',
    institution: 'Johnson & Sons Carpentry',
    location: 'Munich, Germany',
    image: 'https://images.unsplash.com/photo-1590880795696-20c7dfadacde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  },
  {
    id: '2',
    title: 'Professional Chef',
    institution: 'Culinary Institute',
    location: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1740727665746-cfe80ababc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  },
];

export const nextSteps = [
  {
    id: '1',
    icon: TrendingUp,
    title: 'Compare your Top 2',
    description: 'See side-by-side comparison of your favorite options',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: '2',
    icon: UserIcon,
    title: 'Take the Personality Test',
    description: 'Discover which careers match your personality traits',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: '3',
    icon: Calendar,
    title: 'Attend Open House Events',
    description: 'Visit universities and training centers in person',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: '4',
    icon: MessageSquare,
    title: 'Talk to Current Students',
    description: 'Get firsthand insights from people in your field',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: '5',
    icon: Target,
    title: 'Set Your Application Goals',
    description: 'Create a timeline for your application process',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: '6',
    icon: Award,
    title: 'Explore Scholarship Options',
    description: 'Find funding opportunities for your education',
    color: 'from-rose-500 to-red-500',
  },
];

export const mentors = [
  {
    id: '1',
    name: 'Sarah Mueller',
    role: 'Software Engineer',
    company: 'Google',
    field: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Happy to help with your questions!',
    unread: 2,
    lastActive: '2m ago',
    recentlyContacted: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Schmidt',
    role: 'Clinical Psychologist',
    company: 'University Hospital',
    field: 'Psychology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    online: false,
    lastMessage: 'The studies are very exciting...',
    unread: 0,
    lastActive: '1h ago',
    recentlyContacted: true,
  },
  {
    id: '3',
    name: 'Lisa Weber',
    role: 'UX Designer',
    company: 'BMW',
    field: 'Design',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Creativity is the most important thing!',
    unread: 1,
    lastActive: '5m ago',
    recentlyContacted: true,
  },
  {
    id: '4',
    name: 'Thomas Becker',
    role: 'Data Scientist',
    company: 'Siemens',
    field: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Machine Learning is the future',
    unread: 0,
    lastActive: '10m ago',
    recentlyContacted: false,
  },
  {
    id: '5',
    name: 'Anna Schneider',
    role: 'Medical Doctor',
    company: 'Charité Berlin',
    field: 'Medicine',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    online: false,
    lastMessage: 'Medicine requires dedication',
    unread: 0,
    lastActive: '2h ago',
    recentlyContacted: false,
  },
  {
    id: '6',
    name: 'Mark Johnson',
    role: 'Master Carpenter',
    company: 'Johnson & Sons',
    field: 'Carpentry',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    online: true,
    lastMessage: 'Craftsmanship is an art',
    unread: 0,
    lastActive: '30m ago',
    recentlyContacted: false,
  },
];

export const mockChats: Record<string, Array<{ sender: 'user' | 'mentor'; message: string; time: string }>> = {
  '1': [
    { sender: 'mentor', message: 'Hello! Great to see you\'re interested in Computer Science. How can I help you?', time: '10:30' },
    { sender: 'user', message: 'Hi Sarah! I\'m not sure if Computer Science is right for me. How was your degree?', time: '10:32' },
    { sender: 'mentor', message: 'The studies were challenging but super exciting! You not only learn to program, but also to think in a problem-solving way.', time: '10:35' },
    { sender: 'mentor', message: 'What are your biggest concerns?', time: '10:35' },
    { sender: 'user', message: 'I\'m worried it will be too difficult, especially math...', time: '10:40' },
    { sender: 'mentor', message: 'Happy to help with your questions!', time: '10:42' },
  ],
  '2': [
    { sender: 'mentor', message: 'Hello! I\'m Dr. Schmidt. Are you interested in Psychology?', time: '14:20' },
    { sender: 'user', message: 'Yes, very much! How long did your studies take?', time: '14:25' },
    { sender: 'mentor', message: 'The studies are very exciting...', time: '14:30' },
  ],
  '3': [
    { sender: 'mentor', message: 'Hey! Lisa here. You\'re interested in Design?', time: '09:15' },
    { sender: 'user', message: 'Yes! How did you end up at BMW?', time: '09:20' },
    { sender: 'mentor', message: 'Creativity is the most important thing!', time: '09:25' },
  ],
  '4': [
    { sender: 'mentor', message: 'Hello! Thomas here. Data Science is an exciting field!', time: '16:00' },
    { sender: 'user', message: 'What skills do I need for it?', time: '16:05' },
    { sender: 'mentor', message: 'Machine Learning is the future', time: '16:10' },
  ],
  '5': [
    { sender: 'mentor', message: 'Hi! I\'m Dr. Schneider. Medicine is a rewarding but demanding path.', time: '11:00' },
    { sender: 'mentor', message: 'Medicine requires dedication', time: '11:01' },
  ],
  '6': [
    { sender: 'mentor', message: 'Hello! Mark here. Carpentry is both art and skill.', time: '13:00' },
    { sender: 'mentor', message: 'Craftsmanship is an art', time: '13:01' },
  ],
};

export const dayInLife = [
  { time: '09:00 - 10:30', activity: 'Lecture: Intro to AI', description: 'Dive into the fundamentals of Artificial Intelligence and machine learning concepts.' },
  { time: '11:00 - 12:30', activity: 'Coding Session', description: 'Apply what you\'ve learned in a hands-on programming exercise. Today: Python basics.' },
  { time: '13:00 - 14:00', activity: 'Lunch at the Mensa', description: 'Recharge and socialize with fellow students over a healthy meal.' },
  { time: '14:00 - 16:00', activity: 'Teamwork on App Prototype', description: 'Collaborate with your group on the semester project. Brainstorming and wireframing.' },
  { time: '16:00 - 17:30', activity: 'Library Research', description: 'Independent study time for research for your upcoming essay on ethics in AI.' },
  { time: '18:00 - 19:00', activity: 'University Sports', description: 'Unwind and stay active with your favorite campus sports team.' },
];

// export const colleges = [
//   { name: 'MIT', location: 'Cambridge, MA', rank: '#1 Worldwide' },
//   { name: 'Stanford University', location: 'Stanford, CA', rank: '#2 Worldwide' },
//   { name: 'ETH Zurich', location: 'Zurich, Switzerland', rank: '#1 Europe' },
//   { name: 'Technical University Munich', location: 'Munich, Germany', rank: 'Top 50' },
// ];

export const trainingInstitutions = [
  { name: 'Johnson & Sons Carpentry', location: 'Munich, Germany', rank: 'Master Training' },
  { name: 'Handwerk Excellence Center', location: 'Berlin, Germany', rank: 'Award-Winning' },
  { name: 'Traditional Crafts Guild', location: 'Hamburg, Germany', rank: 'Certified' },
];

export const getDayInLife = (type: string, title: string) => {
  if (type === 'Company' || title.includes('SAP') || title.includes('Porsche')) {
    return [
      { time: '09:00', activity: 'Team Standup', description: 'Align with your squad on daily goals and blockers.', icon: Users, color: 'from-blue-500 to-indigo-500' },
      { time: '10:00', activity: 'Deep Work / Focus', description: 'Programming, CAD design, or strategic planning blocks.', icon: Brain, color: 'from-purple-500 to-pink-500' },
      { time: '12:30', activity: 'Business Lunch', description: 'Networking with colleagues at the campus canteen.', icon: Users, color: 'from-orange-500 to-red-500' },
      { time: '14:00', activity: 'Client/Stakeholder Meeting', description: 'Presenting progress and gathering requirements.', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
      { time: '16:00', activity: 'Skill Development', description: 'Internal workshops or learning new tech stacks.', icon: BookOpen, color: 'from-teal-500 to-cyan-500' },
    ];
  } else if (type === 'Apprenticeship' || title.includes('Chef') || title.includes('Mechanic')) {
    return [
      { time: '07:30', activity: 'Shift Start & Prep', description: 'Preparing tools, mise-en-place, or checking equipment.', icon: ClipboardList, color: 'from-orange-500 to-amber-500' },
      { time: '09:00', activity: 'Practical Work', description: 'Hands-on tasks: Cooking service or vehicle diagnostics.', icon: Wrench, color: 'from-blue-500 to-cyan-500' },
      { time: '12:00', activity: 'Team Break', description: 'Short break with the crew.', icon: Users, color: 'from-green-500 to-emerald-500' },
      { time: '13:00', activity: 'Vocational School', description: 'Theoretical block: Learning the science behind the craft.', icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
      { time: '16:00', activity: 'Clean Up & Review', description: 'Ensuring workspace safety and reviewing daily progress.', icon: CheckCircle2, color: 'from-slate-500 to-slate-400' },
    ];
  } else {
    // Default: Study
    return [
      { time: '09:00', activity: 'Morning Lecture', description: 'Theoretical foundations in large auditoriums.', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
      { time: '11:00', activity: 'Lab / Tutorial', description: 'Applying theory in small groups.', icon: Users, color: 'from-purple-500 to-pink-500' },
      { time: '13:00', activity: 'Mensa Lunch', description: 'Socializing with fellow students.', icon: Users, color: 'from-orange-500 to-amber-500' },
      { time: '14:30', activity: 'Library Session', description: 'Independent study and research.', icon: BookOpen, color: 'from-teal-500 to-emerald-500' },
      { time: '17:00', activity: 'Campus Sports', description: 'Unwinding with university sports clubs.', icon: TrendingUp, color: 'from-rose-500 to-red-500' },
    ];
  }
};

export const getTasks = (id: string) => {
  switch (id) {
    case 'porsche':
      return [
        { title: 'Aerodynamics Analysis', desc: 'Review wind tunnel data for the new GT3 wing.', difficulty: 'Hard' },
        { title: 'Battery Simulation', desc: 'Run thermal efficiency tests for EV prototypes.', difficulty: 'Medium' },
        { title: 'Track Day Prep', desc: 'Prepare telemetry systems for Nürburgring tests.', difficulty: 'Easy' }
      ];
    case 'computerscience':
      return [
        { title: 'Debug Algorithm', desc: 'Find the logic error in a sorting function.', difficulty: 'Medium' },
        { title: 'Database Design', desc: 'Sketch an ER-Model for a social app.', difficulty: 'Hard' },
        { title: 'Code Review', desc: 'Review a peer\'s pull request on GitHub.', difficulty: 'Easy' }
      ];
    case 'design':
      return [
        { title: 'Logo Sketching', desc: 'Draft 3 concepts for a sustainable brand.', difficulty: 'Medium' },
        { title: 'Color Palette', desc: 'Create a moodboard with accessible contrast.', difficulty: 'Easy' },
        { title: 'UI Prototyping', desc: 'Build a clickable wireframe in Figma.', difficulty: 'Hard' }
      ];
    case 'professionalchef':
      return [
        { title: 'Mise en Place', desc: 'Chop vegetables for the dinner service.', difficulty: 'Easy' },
        { title: 'Sauce Reduction', desc: 'Monitor and season the demi-glace.', difficulty: 'Medium' },
        { title: 'Plating Design', desc: 'Arrange the main course for visual appeal.', difficulty: 'Hard' }
      ];
    case 'automechanic':
      return [
        { title: 'Oil Change', desc: 'Perform standard maintenance on a sedan.', difficulty: 'Easy' },
        { title: 'Engine Diagnostics', desc: 'Use OBD-II scanner to identify fault codes.', difficulty: 'Medium' },
        { title: 'Brake System', desc: 'Replace pads and bleed hydraulic lines.', difficulty: 'Hard' }
      ];
    default:
      return [
        { title: 'Research Topic', desc: 'Find 3 sources for your thesis.', difficulty: 'Easy' },
        { title: 'Group Project', desc: 'Coordinate tasks with your semester team.', difficulty: 'Medium' },
        { title: 'Exam Prep', desc: 'Summarize chapter 4 for the finals.', difficulty: 'Hard' }
      ];
  }
};

export const getKeyLocations = (id: string) => {
  if (id === 'porsche') {
    return [
      { name: 'Weissach', label: 'R&D Center', icon: Brain },
      { name: 'Zuffenhausen', label: 'Main Factory', icon: Factory },
      { name: 'Leipzig', label: 'Production', icon: Factory },
      { name: 'Berlin', label: 'Digital Lab', icon: Code2 },
    ];
  }
  if (id === 'sap') {
    return [
      { name: 'Walldorf', label: 'Global HQ', icon: Building },
      { name: 'Palo Alto', label: 'Innovation Hub', icon: Globe },
      { name: 'Bangalore', label: 'Dev Center', icon: Code2 },
      { name: 'Berlin', label: 'Data Space', icon: Brain },
    ];
  }
  return [];
};

export const quizQuestions = [
  { question: 'Do you enjoy solving complex problems?', type: 'rating' },
  { question: 'How comfortable are you with mathematics?', type: 'rating' },
  { question: 'Do you prefer working alone or in teams?', type: 'choice' },
];

export const colleges: Institution[] = [
  {
    id: 'hka',
    name: 'Karlsruhe University of Applied Sciences (HKA)',
    type: 'University of Applied Sciences',
    location: 'Karlsruhe, DE',
    logo: 'https://tse1.mm.bing.net/th/id/OIP.SA5pQahj_d1H3lpUnmmEbgHaEK?cb=ucfimg2&pid=Api&ucfimg=1',
    tags: ['Technology', 'Computer Science', 'Engineering', 'Top Rank'],
    description: 'HKA offers high practical relevance and close cooperation with the industry.',
    background: 'https://www.iras.hs-karlsruhe.de/fileadmin/_processed_/2/d/csm_ZH_Campus_Imagefoto_130_183a3428c4.jpg',
    website: 'https://www.h-ka.de'
  },
  {
    id: 'kit',
    name: 'Karlsruhe Institute of Technology (KIT)',
    type: 'University',
    location: 'Karlsruhe, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Logo_KIT.svg/1200px-Logo_KIT.svg.png',
    tags: ['Research', 'Elite University', 'Physics', 'Informatics'],
    description: 'One of the largest research and teaching institutions in Germany.',
    background: 'https://www.intl.kit.edu/img/content/20180924-CN-01-018_1280.jpg',
    website: 'https://www.kit.edu'
  },
  {
    id: 'tum',
    name: 'Technical University of Munich (TUM)',
    type: 'University',
    location: 'Munich, DE',
    logo: 'https://tse4.mm.bing.net/th/id/OIP.KXKT1WgqgPXFMXvvOcFvngHaD-?cb=ucfimg2&pid=Api&ucfimg=1',
    tags: ['Excellence', 'Innovation', 'Startups', 'Global'],
    description: 'The Entrepreneurial University. Fostering talent and innovation.',
    background: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&q=80',
    website: 'https://www.tum.de'
  },
];

export const companies: Institution[] = [
  {
    id: 'sap',
    name: 'SAP SE',
    type: 'Company',
    location: 'Walldorf, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/2560px-SAP_2011_logo.svg.png',
    tags: ['Dual Study', 'Software', 'Global Player', 'Business'],
    description: 'Market leader for enterprise software. Powering businesses globally.',
    background: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    website: 'https://www.sap.com'
  },
  {
    id: 'porsche',
    name: 'Porsche AG',
    type: 'Company',
    location: 'Stuttgart, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/de/thumb/2/2d/Porsche_Wappen.svg/1200px-Porsche_Wappen.svg.png',
    tags: ['Automotive', 'Luxury', 'Engineering', 'Dual Study'],
    description: 'Shape the future of the sports car. Driven by dreams.',
    background: 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Products/Upgrades-Zuffenhausen-production/258899_.jpg/jcr:content/258899_.jpg',
    website: 'https://www.porsche.com'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Germany',
    type: 'Company',
    location: 'Munich/Berlin, DE',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
    tags: ['AI', 'Hardware', 'Deep Learning', 'Gaming'],
    description: 'Pioneers of accelerated computing and artificial intelligence.',
    background: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    website: 'https://www.nvidia.com'
  },
];

export const vocationalInstitutions: Institution[] = [
  {
    id: '42',
    name: '42 Heilbronn',
    type: 'Vocational Training',
    location: 'Heilbronn, DE',
    logo: 'https://tse2.mm.bing.net/th/id/OIP.e4HT_UPX5D5Qurf9linsrgHaE8?cb=ucfimg2&pid=Api&ucfimg=1',
    tags: ['Coding School', 'Free', 'Peer-to-Peer', 'JavaScript'],
    description: 'The revolutionary coding school without teachers or books.',
    background: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80',
    website: 'https://www.42heilbronn.de'
  },
  {
    id: 'fraunhofer',
    name: 'Fraunhofer IOSB',
    type: 'Other',
    location: 'Karlsruhe, DE',
    logo: 'https://tse3.mm.bing.net/th/id/OIP.PfusNrO4d53oBnZK_HkNDAHaCD?pid=Api',
    tags: ['Research', 'Robotics', 'Artificial Intelligence'],
    description: 'Research for practice. Discover innovations of tomorrow.',
    background: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    website: 'https://www.iosb.fraunhofer.de'
  },
  {
    id: 'ihk',
    name: 'IHK Karlsruhe',
    type: 'Other',
    location: 'Karlsruhe, DE',
    logo: 'https://werkraum.net/fileadmin/Logos/IHK_Ausbildungsbetrieb.jpg',
    tags: ['Consulting', 'Education', 'Networking'],
    description: 'Partner of the economy for training and further education.',
    background: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
    website: 'https://www.karlsruhe.ihk.de'
  }
];

export const matchMentors = [
  {
    id: 1,
    name: "Sarah Lin",
    role: "Senior Developer",
    company: "SAP SE",
    exp: "6 years",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    status: "online"
  },
  {
    id: 2,
    name: "Marcus Weber",
    role: "Automotive Engineer",
    company: "Porsche AG",
    exp: "4 years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    status: "busy"
  },
  {
    id: 3,
    name: "Dr. Elena M.",
    role: "Professor",
    company: "KIT Karlsruhe",
    exp: "12 years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    status: "online"
  },
  {
    id: 4,
    name: "Jonas K.",
    role: "Dual Student",
    company: "DHBW / DM",
    exp: "2 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    status: "offline"
  }
];

// Extended Details Mock Data
export const extendedDetails = {
  // COLLEGES
  'tum': {
    programs: [
      { name: 'Computer Science (B.Sc.)', type: 'Bachelor', duration: '6 Semesters', language: 'German' },
      { name: 'Mechanical Engineering (B.Sc.)', type: 'Bachelor', duration: '6 Semesters', language: 'German' },
      { name: 'Data Science (M.Sc.)', type: 'Master', duration: '4 Semesters', language: 'English' },
    ],
    resources: [
      { name: 'Modulhandbuch Informatik.pdf', size: '2.4 MB' },
      { name: 'Campus Map.pdf', size: '1.1 MB' },
    ],
    stats: { students: '52,000+', founded: '1868', staff: '12,000+', faculties: '8' }
  },
  'hka': {
    programs: [
      { name: 'Computer Science (B.Sc.)', type: 'Bachelor', duration: '6 Semesters', language: 'German' },
      { name: 'Mechanical Engineering (B.Sc.)', type: 'Bachelor', duration: '6 Semesters', language: 'German' },
      { name: 'Business Informatics (B.Sc.)', type: 'Bachelor', duration: '6 Semesters', language: 'German' },
      { name: 'Data Science (M.Sc.)', type: 'Master', duration: '4 Semesters', language: 'English' },
    ],
    resources: [
      { name: 'Modulhandbuch Informatik.pdf', size: '2.4 MB' },
      { name: 'Campus Map.pdf', size: '1.1 MB' },
    ],
    stats: { students: '6,300+', founded: '1878', staff: '1,000+', faculties: '6' }
  },
  'kit': {
    programs: [
      { name: 'Computer Science (B.Sc.)', type: 'Bachelor', duration: '6 Semesters', language: 'German' },
      { name: 'Mechanical Engineering (B.Sc.)', type: 'Bachelor', duration: '6 Semesters', language: 'German' },
      { name: 'Data Science (M.Sc.)', type: 'Master', duration: '4 Semesters', language: 'English' },
    ],
    resources: [
      { name: 'Modulhandbuch Informatik.pdf', size: '2.4 MB' },
      { name: 'Campus Map.pdf', size: '1.1 MB' },
    ],
    stats: { students: '22,000+', founded: '1825', staff: '9,000+', faculties: '15' }
  },
  // COMPANIES
  'sap': {
    departments: [
      { name: 'Cloud ERP', icon: Globe, desc: 'Developing the backbone of intelligent enterprises.' },
      { name: 'Artificial Intelligence', icon: Brain, desc: 'Integrating GenAI into business processes.' },
      { name: 'Consulting', icon: Users, desc: 'Helping clients transform their business.' },
    ],
    jobs: [
      { title: 'Junior Java Developer', loc: 'Walldorf', type: 'Full-time' },
      { title: 'Dual Student (Wirtschaftsinformatik)', loc: 'Rot', type: 'Dual Study' },
      { title: 'UX Design Intern', loc: 'Berlin', type: 'Internship' },
    ],
    benefits: ['Flexible Hours', 'Stock Options', 'Free Lunch', 'Health Center']
  },
  // VOCATIONAL / OTHER
  '42': {
    tracks: [
      { name: 'Core Curriculum', desc: 'C, Shell, Algorithms, Graphics' },
      { name: 'Web Branch', desc: 'React, Node.js, Databases' },
      { name: 'AI Branch', desc: 'Python, TensorFlow, Data Science' },
    ],
    info: [
      { label: 'Tuition', value: '€0 (Free)' },
      { label: 'Campus Open', value: '24/7' },
      { label: 'Prerequisites', value: 'None (Logic Test only)' },
    ]
  },
  'fraunhofer': {
    tracks: [
      { name: 'Core Curriculum', desc: 'C, Shell, Algorithms, Graphics' },
      { name: 'Web Branch', desc: 'React, Node.js, Databases' },
      { name: 'AI Branch', desc: 'Python, TensorFlow, Data Science' },
    ],
    info: [
      { label: 'Tuition', value: '€0 (Free)' },
      { label: 'Campus Open', value: '24/7' },
      { label: 'Prerequisites', value: 'None (Logic Test only)' },
    ]
  },
  'ihk': {
    tracks: [
      { name: 'Core Curriculum', desc: 'C, Shell, Algorithms, Graphics' },
      { name: 'Web Branch', desc: 'React, Node.js, Databases' },
      { name: 'AI Branch', desc: 'Python, TensorFlow, Data Science' },
    ],
    info: [
      { label: 'Tuition', value: '€0 (Free)' },
      { label: 'Campus Open', value: '24/7' },
      { label: 'Prerequisites', value: 'None (Logic Test only)' },
    ]
  }
};

// Mock Contacts
export const institutionContacts = {
  'kit': [
    { name: 'Prof. Dr. Weber', role: 'Dean of Studies', status: 'online', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200' },
    { name: 'Lisa M.', role: 'Student Council', status: 'busy', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  ],
  'sap': [
    { name: 'Markus T.', role: 'Tech Lead', status: 'online', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
    { name: 'Sarah K.', role: 'Recruiter', status: 'offline', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
  ],
  '42': [
    { name: 'Alex R.', role: 'Peer (Level 12)', status: 'online', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'Head of Staff', role: 'Administration', status: 'online', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200' },
  ]
};