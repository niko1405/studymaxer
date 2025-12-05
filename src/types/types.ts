import type { Dispatch, ReactNode, SetStateAction } from "react";

export type AppState = 'get-started' | 'onboarding' | 'evaluating' | 'main';
export type SetState<T> = Dispatch<SetStateAction<T>>;

export type ActiveTab = 'home' | 'premium' | 'profile';


//Get Started
export interface Partner {
  name: string;
  icon: ReactNode;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export type SlideType = 'hero' | 'partners' | 'stats';

export interface BaseSlide {
  id: string;
  type: SlideType;
  title: string;
  description: string;
}

export interface HeroSlide extends BaseSlide {
  type: 'hero';
  image: string;
}

export interface PartnersSlide extends BaseSlide {
  type: 'partners';
  partners: Partner[];
}

export interface StatsSlide extends BaseSlide {
  type: 'stats';
  stats: Stat[];
}

export type Slide = HeroSlide | PartnersSlide | StatsSlide;

export type InstitutionType = 'University' | 'University of Applied Sciences' | 'Company' | 'Vocational Training' | 'Other';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  location: string;
  logo: string; // URL
  tags: string[];
  description: string;
  background: string;
  website?: string;
}
