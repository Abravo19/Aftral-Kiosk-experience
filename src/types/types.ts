export enum UserProfile {
  STUDENT = 'Étudiant',
  PARENT = 'Parent',
  EMPLOYEE = 'Salarié / Reconversion',
  COMPANY = 'Entreprise'
}

export enum Screen {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  MAP = 'MAP',
  QUIZ = 'QUIZ',
  EVENTS = 'EVENTS',
  JOB_SHEETS = 'JOB_SHEETS',
  CONTACT = 'CONTACT',
  NEWS = 'NEWS'
}

export interface TrainingProgram {
  id: string;
  title: string;
  level: string;
  duration: string;
  type: 'Alternance' | 'Continu' | 'Initiale';
  category: 'Transport' | 'Logistique' | 'Sécurité';
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'JPO' | 'Job Dating' | 'Information';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface JobProfile {
  id: string;
  title: string;
  category: 'Transport' | 'Logistique' | 'Voyageurs';
  description: string;
  missions: string[];
  skills: string[];
  trainingPaths: string[];
}

export type NewsType = 'NEWS' | 'PROMOTION';

export interface NewsItem {
  id: string;
  type: NewsType;
  title: string;
  summary: string;
  body: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  priority: number; // 1 = High (Featured), 2 = Normal
  ctaLabel: string;
  ctaTarget?: Screen;
}