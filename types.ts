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

export interface Course {
  id: string;
  created_at: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  price_eur: number; // 0 = Free
  is_published: boolean;
  slug?: string;
  modules?: Module[];
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  type: 'VIDEO' | 'PDF' | 'AUDIO';
  content_url: string;
  thumbnail_url?: string;
  duration?: number;
  sort_order: number;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'revoked' | 'expired';
  created_at: string;
}
