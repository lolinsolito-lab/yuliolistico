export enum TreatmentType {
  MANUAL = 'Tecniche Manuali',
  TOOLS = 'Strumenti Naturali',
  RITUAL = 'Rituali Olistici'
}

export interface Service {
  id: string;
  title: string;
  category: TreatmentType;
  description: string;
  duration: string;
  price: string;
  imageUrl: string;
  // Deep Dive Fields
  subtitle?: string;
  soul_description?: string;
  benefits?: string[]; // Simplified for FE typing, though DB is JSONB
  program_details?: any; // JSONB
  active?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}

export interface UserState {
  name: string;
  email: string;
  feeling: string;
}


export interface AiRecommendation {
  treatment: string;
  reasoning: string;
  oilRecommendation: string;
}

export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  symptom: string;
  result_treatment: string;
  status?: 'new' | 'contacted' | 'converted';
}
