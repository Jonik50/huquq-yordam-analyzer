
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleAlert, CircleCheck, CircleX, HelpCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ContractSectionProps {
  section: {
    id: string;
    title: string;
    content: string;
    required: boolean;
    riskLevel: 'high' | 'medium' | 'low' | null;
    tooltip?: string;
  };
  onChange: (content: string) => void;
}

const ContractSection: React.FC<ContractSectionProps> = ({ section, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  
  const getRiskIcon = () => {
    switch (section.riskLevel) {
      case 'high':
        return <CircleX className="h-5 w-5 text-huquq-danger" />;
      case 'medium':
        return <CircleAlert className="h-5 w-5 text-huquq-warning" />;
      case 'low':
        return <CircleCheck className="h-5 w-5 text-huquq-success" />;
      default:
        return null;
    }
  };
  
  const getRiskText = () => {
    switch (section.riskLevel) {
      case 'high':
        return <span className="text-xs font-medium text-huquq-danger">High Risk</span>;
      case 'medium':
        return <span className="text-xs font-medium text-huquq-warning">Medium Risk</span>;
      case 'low':
        return <span className="text-xs font-medium text-huquq-success">Low Risk</span>;
      default:
        return null;
    }
  };
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-md"
    >
      <CollapsibleTrigger className="w-full">
        <Card className="border-0 shadow-none">
          <CardHeader className="py-2 px-4 flex flex-row items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">
                {section.title}
                {section.required && <span className="text-huquq-danger ml-1">*</span>}
              </CardTitle>
              {getRiskText()}
            </div>
            <div className="flex items-center gap-2">
              {getRiskIcon()}
              {section.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{section.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <div className="ml-2">
                {isOpen ? '−' : '+'}
              </div>
            </div>
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CardContent className="pt-0 px-4 pb-4">
          <Textarea
            value={section.content}
            onChange={handleContentChange}
            rows={4}
            className="resize-y"
            placeholder="Enter section content..."
          />
        </CardContent>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ContractSection;
