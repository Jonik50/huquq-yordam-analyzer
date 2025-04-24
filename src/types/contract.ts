export type Language = 'uz-latin' | 'uz-cyrillic' | 'ru' | 'en';

export type RiskLevel = 'high' | 'medium' | 'low' | null;

export type ContractSectionData = {
  id: string;
  title: string;
  content: string;
  required: boolean;
  riskLevel: RiskLevel;
  tooltip?: string;
};

export type TemplateCategory = 
  | 'business' 
  | 'real-estate' 
  | 'employment' 
  | 'personal'
  | 'partnership'
  | 'nda'
  | 'custom';

export type ContractTemplate = {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: TemplateCategory;
  icon: string;
  availableLanguages: Language[];
  sections: Record<Language, ContractSectionData[]>;
};

export type AutofillData = {
  id: string;
  label: string;
  value: string;
  category: 'personal' | 'business' | 'payment' | 'contact';
  lastUsed: Date;
  frequency: number;
};

export type ContractHistoryItem = {
  id: string;
  templateId: string;
  templateName: string;
  createdAt: Date;
  modifiedAt: Date;
  language: Language;
  sections: ContractSectionData[];
  risks: {
    high: number;
    medium: number;
    low: number;
  };
};
