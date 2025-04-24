
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContractTemplate, Language } from '@/types/contract';
import { FileText, FileContract, UserCheck, Building, Home, Shield, Handshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TemplatePreviewCardProps {
  template: ContractTemplate;
  currentLanguage: Language;
  onSelect: (templateId: string) => void;
}

// Define mapping of categories to specific icons
const categoryIcons: Record<string, LucideIcon> = {
  'business': FileContract,
  'employment': UserCheck,
  'real-estate': Building,
  'personal': Home,
  'partnership': Handshake,
  'nda': Shield,
  'custom': FileText
};

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
  template,
  currentLanguage,
  onSelect,
}) => {
  // Get the icon component based on template category or use FileText as fallback
  const IconComponent = categoryIcons[template.category] || FileText;

  return (
    <Card 
      className="cursor-pointer hover:border-primary transition-colors"
      onClick={() => onSelect(template.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent className="h-5 w-5 text-primary" />
            <CardTitle className="text-md">{template.title[currentLanguage]}</CardTitle>
          </div>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        <CardDescription>{template.description[currentLanguage]}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {template.sections[currentLanguage]?.length || 0} sections
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatePreviewCard;
