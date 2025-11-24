import { Code, Brain, Heart, Briefcase, Microscope, Palette, Hammer, Zap, Wrench, ChefHat, Beaker, GraduationCap, Building2, Award, Globe, Code2, Calculator, TrendingUp, UserIcon, Calendar, MessageSquare, Target } from 'lucide-react';
import { Leaf, Dumbbell, Music, BookOpen, Landmark } from 'lucide-react';
import type { Slide } from '../types/types';

export const studyMatchess = [
  {
    id: 'informatik',
    title: 'Computer Science',
    type: 'Study Program',
    match: 95,
    description: 'A degree program focused on development, programming, and application of computer systems.',
    icon: Code,
    careers: ['#SoftwareDeveloper', '#DataScientist', '#SystemArchitect'],
    gradient: 'from-teal-500/20 to-cyan-500/20',
    glowColor: 'rgba(20, 184, 166, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB0ZWNobm9sb2d5JTIwZGV2ZWxvcGVyfGVufDF8fHx8MTc2MzM5ODI2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'carpenter',
    title: 'Carpenter',
    type: 'Apprenticeship',
    match: 89,
    description: 'Learn to craft, build, and repair wooden structures and furniture with precision and creativity.',
    icon: Hammer,
    careers: ['#Carpenter', '#Furniture Maker', '#Construction Specialist'],
    gradient: 'from-amber-500/20 to-yellow-500/20',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1590880795696-20c7dfadacde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJwZW50ZXIlMjB3b29kd29ya2luZyUyMHRvb2xzfGVufDF8fHx8MTc2MzM5NjMyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'psychologie',
    title: 'Psychology',
    type: 'Study Program',
    match: 87,
    description: 'The study of human behavior, thoughts, and emotions.',
    icon: Brain,
    careers: ['#Psychotherapist', '#Counselor', '#Researcher'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1561993629-67302018480e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaG9sb2d5JTIwYnJhaW4lMjB0aGVyYXB5fGVufDF8fHx8MTc2MzM5NjMyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'electrician',
    title: 'Electrician',
    type: 'Apprenticeship',
    match: 84,
    description: 'Master electrical systems installation, maintenance, and repair in residential and commercial settings.',
    icon: Zap,
    careers: ['#Electrician', '#Electrical Engineer', '#Industrial Technician'],
    gradient: 'from-yellow-500/20 to-orange-500/20',
    glowColor: 'rgba(234, 179, 8, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1636218685495-8f6545aadb71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMGVsZWN0cmljYWwlMjB3b3JrfGVufDF8fHx8MTc2MzM5NjMyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'medizin',
    title: 'Medicine',
    type: 'Study Program',
    match: 82,
    description: 'A degree program for diagnosis, treatment, and prevention of diseases.',
    icon: Heart,
    careers: ['#Doctor', '#Surgeon', '#Researcher'],
    gradient: 'from-red-500/20 to-rose-500/20',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1646913508331-5ef3f22ba677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NjMzNDEyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'mechanic',
    title: 'Automotive Mechanic',
    type: 'Apprenticeship',
    match: 80,
    description: 'Specialize in diagnosing, maintaining, and repairing vehicles and automotive systems.',
    icon: Wrench,
    careers: ['#Mechanic', '#Automotive Technician', '#Service Manager'],
    gradient: 'from-slate-500/20 to-gray-500/20',
    glowColor: 'rgba(100, 116, 139, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1698998882494-57c3e043f340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMGF1dG9tb3RpdmUlMjByZXBhaXJ8ZW58MXx8fHwxNzYzMzk2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'bwl',
    title: 'Business Administration',
    type: 'Study Program',
    match: 78,
    description: 'Study of business management, marketing, and finance.',
    icon: Briefcase,
    careers: ['#Manager', '#Consultant', '#Entrepreneur'],
    gradient: 'from-blue-500/20 to-indigo-500/20',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1666790676906-0295230c121d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMHdvcmtwbGFjZXxlbnwxfHx8fDE3NjMzOTYzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'biologie',
    title: 'Biology',
    type: 'Study Program',
    match: 75,
    description: 'The study of living organisms and their life processes.',
    icon: Microscope,
    careers: ['#Biologist', '#Researcher', '#Lab Director'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    glowColor: 'rgba(34, 197, 94, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1614934273538-70f8ffc2e76e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2d5JTIwbGFib3JhdG9yeSUyMHNjaWVuY2V8ZW58MXx8fHwxNzYzMzk2MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'chef',
    title: 'Professional Chef',
    type: 'Apprenticeship',
    match: 73,
    description: 'Train in culinary arts, food preparation, and kitchen management in professional environments.',
    icon: ChefHat,
    careers: ['#Chef', '#Pastry Chef', '#Restaurant Manager'],
    gradient: 'from-rose-500/20 to-pink-500/20',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1740727665746-cfe80ababc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZyUyMGtpdGNoZW58ZW58MXx8fHwxNzYzMzA1NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'design',
    title: 'Design',
    type: 'Study Program',
    match: 71,
    description: 'Creative degree program for visual communication and design.',
    icon: Palette,
    careers: ['#Designer', '#ArtDirector', '#UXDesigner'],
    gradient: 'from-orange-500/20 to-amber-500/20',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1664520132859-727fc515fc8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYzMzc0Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];


export const studyMatches = [
  {
    id: '1',
    title: 'Computer Science',
    type: 'B.Sc.',
    match: 95,
    description: 'A degree program focused on development, programming, and application of computer systems. Perfect for problem solvers.',
    icon: Code2,
    careers: ['Software Dev', 'Data Scientist', 'Architect'],
    glowColor: '#3b82f6', // blue
    backgroundImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Design',
    type: 'Study Program',
    match: 71,
    description: 'Creative degree program for visual communication and design.',
    icon: Palette,
    careers: ['#Designer', '#ArtDirector', '#UXDesigner'],
    glowColor: 'rgba(249, 115, 22, 0.5)',
    backgroundImage: 'https://images.unsplash.com/photo-1664520132859-727fc515fc8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzYzMzc0Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Data Science',
    type: 'M.Sc.',
    match: 88,
    description: 'Analyze complex data sets to drive decision making. Combines statistics, math, and computer science.',
    icon: Calculator,
    careers: ['Data Analyst', 'ML Engineer', 'Consultant'],
    glowColor: '#8b5cf6',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Biotechnology',
    type: 'B.Sc.',
    match: 82,
    description: 'The intersection of biology and technology. Develop new products for medicine and agriculture.',
    icon: Microscope,
    careers: ['Lab Researcher', 'Biotech Engineer'],
    glowColor: '#10b981', // emerald
    backgroundImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
  }
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
  name: 'Alex',
  email: 'alex.mueller@email.com',
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