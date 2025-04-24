
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContractTemplate, Language } from '@/types/contract';
import * as LucideIcons from 'lucide-react';

interface TemplatePreviewCardProps {
  template: ContractTemplate;
  currentLanguage: Language;
  onSelect: (templateId: string) => void;
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
  template,
  currentLanguage,
  onSelect,
}) => {
  // Dynamically get the icon component, fallback to FileText if not found
  const IconComponent = template.icon && LucideIcons[template.icon as keyof typeof LucideIcons] 
    ? LucideIcons[template.icon as keyof typeof LucideIcons] 
    : LucideIcons.FileText;

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
