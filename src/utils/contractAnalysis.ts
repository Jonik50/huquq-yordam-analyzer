
import { ContractSectionData, RiskLevel } from '@/types/contract';

export const analyzeContractSection = (section: ContractSectionData): RiskLevel => {
  const content = section.content.toLowerCase();
  
  if ((content.includes('unlimited') && content.includes('liability')) || 
      (content.includes('terminate') && content.includes('immediate'))) {
    return 'high';
  }
  
  if (content.includes('notice period') || content.includes('days notice')) {
    return 'medium';
  }
  
  return section.riskLevel || 'low';
};

export const analyzeContractSections = (sections: ContractSectionData[]): ContractSectionData[] => {
  return sections.map(section => ({
    ...section,
    riskLevel: analyzeContractSection(section)
  }));
};
