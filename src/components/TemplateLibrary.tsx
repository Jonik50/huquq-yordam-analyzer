
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { FileText, Home, File, Shield } from 'lucide-react';

interface TemplateLibraryProps {
  onSelectTemplate: (templateId: string) => void;
}

interface TemplateItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  availableLanguages: string[];
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  const { state } = useAppContext();
  
  const templates: TemplateItem[] = [
    {
      id: 'service-agreement',
      title: 'Service Agreement',
      description: 'Contract for providing professional services',
      icon: FileText,
      availableLanguages: ['uz-latin', 'uz-cyrillic', 'ru', 'en']
    },
    {
      id: 'rental-agreement',
      title: 'Real Estate Rental',
      description: 'Lease agreement for property rental',
      icon: Home,
      availableLanguages: ['uz-latin', 'uz-cyrillic', 'ru', 'en']
    },
    {
      id: 'employment-contract',
      title: 'Employment Contract',
      description: 'Agreement between employer and employee',
      icon: File,
      availableLanguages: ['uz-latin', 'uz-cyrillic', 'ru', 'en']
    },
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      description: 'Confidentiality agreement to protect sensitive information',
      icon: Shield,
      availableLanguages: ['uz-latin', 'uz-cyrillic', 'ru', 'en']
    }
  ];

  const filteredTemplates = templates.filter(template => 
    template.availableLanguages.includes(state.language)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select a Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map(template => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:border-primary hover:shadow-md transition-all"
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <template.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-md">{template.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{template.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;
