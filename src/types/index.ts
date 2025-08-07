// Lesson types
export interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: string; // e.g. "10:41"
}

// Section types
export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

// Course types
export interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image: string;
  description: string;
  sections?: Section[];
}

// Event types
export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  category: string;
  // Additional properties for EventCard
  isFree?: boolean;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  participants?: number;
  maxParticipants?: number;
  // Additional properties for EventCard component
  type?: string;
  rating?: number;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  originalPrice?: number;
}

// Material types
export interface Material {
  id: number;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  size?: string;
  duration?: string;
  author: string;
  category: string;
  downloads: number;
  rating: number;
  image: string;
  // Additional properties for MaterialCard
  isFree?: boolean;
  price?: number;
  originalPrice?: number;
  format?: string;
  pages?: number;
  views?: number;
  fileSize?: string;
}

// Post types
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
} 