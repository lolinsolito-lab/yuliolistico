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
