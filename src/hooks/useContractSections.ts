
import { useState, useEffect } from 'react';
import { ContractSectionData, RiskLevel } from '@/types/contract';
import { getTemplateById } from '@/data/templateData';
import { useToast } from '@/hooks/use-toast';

export const useContractSections = (templateId: string, language: string) => {
  const [sections, setSections] = useState<ContractSectionData[]>([]);
  const [contractName, setContractName] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const template = getTemplateById(templateId);
    if (template) {
      setContractName(template.title[language]);
      setSections(template.sections[language] || template.sections['en']);
    }
  }, [templateId, language]);

  const updateSectionContent = (sectionId: string, newContent: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId ? { ...section, content: newContent } : section
      )
    );
    
    if (newContent.toLowerCase().includes('unlimited liability')) {
      setTimeout(() => {
        setSections(prevSections => 
          prevSections.map(section => 
            section.id === sectionId ? { ...section, riskLevel: 'high' as RiskLevel } : section
          )
        );
        
        toast({
          title: 'Risk Detected',
          description: 'Unlimited liability clause may expose you to significant risk.',
          variant: 'destructive',
        });
      }, 1000);
    }
  };

  return { sections, setSections, contractName, updateSectionContent };
};
