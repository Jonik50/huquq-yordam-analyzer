
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { ChevronLeft, AlertCircle, Download, FilePdf, FileWord } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from "@/contexts/AppContext";
import ContractSection from './ContractSection';

interface ContractBuilderProps {
  templateId: string;
  onBack: () => void;
}

interface ContractSectionData {
  id: string;
  title: string;
  content: string;
  required: boolean;
  riskLevel: 'high' | 'medium' | 'low' | null;
  tooltip?: string;
}

const ContractBuilder: React.FC<ContractBuilderProps> = ({ templateId, onBack }) => {
  const { toast } = useToast();
  const { state } = useAppContext();
  
  // This would come from a template data service in a real app
  const [sections, setSections] = useState<ContractSectionData[]>([
    {
      id: 'parties',
      title: 'Parties to the Agreement',
      content: 'This agreement is made between [Party A] and [Party B].',
      required: true,
      riskLevel: null,
      tooltip: 'Include full legal names and addresses of all parties.'
    },
    {
      id: 'subject',
      title: 'Subject of Agreement',
      content: 'The subject of this agreement is [describe services or products].',
      required: true,
      riskLevel: null,
      tooltip: 'Clearly define what services or products are covered by this agreement.'
    },
    {
      id: 'term',
      title: 'Term & Termination',
      content: 'This agreement is valid from [start date] to [end date]. Either party may terminate with [notice period] written notice.',
      required: true,
      riskLevel: 'medium',
      tooltip: 'Specify the duration of the agreement and the conditions under which either party can terminate it.'
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      content: 'Payment of [amount] will be made within [timeframe] days of invoice receipt.',
      required: true,
      riskLevel: 'low',
      tooltip: 'Include the amount, currency, payment method, and deadline.'
    },
    {
      id: 'liability',
      title: 'Liability',
      content: 'Neither party shall be liable for any indirect or consequential damages arising from this agreement.',
      required: false,
      riskLevel: 'high',
      tooltip: 'This clause limits what damages can be claimed if something goes wrong.'
    },
    {
      id: 'force-majeure',
      title: 'Force Majeure',
      content: 'Neither party shall be liable for failure to perform due to events beyond reasonable control.',
      required: false,
      riskLevel: null,
      tooltip: 'This excuses a party from performing when events like natural disasters occur.'
    }
  ]);
  
  const updateSectionContent = (sectionId: string, newContent: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId ? { ...section, content: newContent } : section
      )
    );
    
    // In a real implementation, we would analyze the text with Gemini API here
    // and update the risk level accordingly
    
    // For now, we'll simulate a risk analysis after a delay
    if (newContent.toLowerCase().includes('unlimited liability')) {
      setTimeout(() => {
        setSections(prevSections => 
          prevSections.map(section => 
            section.id === sectionId ? { ...section, riskLevel: 'high' } : section
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
  
  const handleExport = (format: 'pdf' | 'docx') => {
    // In a real implementation, we would generate a document here
    toast({
      title: 'Export Initiated',
      description: `Your contract will be exported as ${format.toUpperCase()}.`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: `Your ${format.toUpperCase()} is ready.`,
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Templates
        </Button>
        <h2 className="text-xl font-semibold flex-grow">Contract Editor</h2>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleExport('docx')}
          >
            <FileWord className="h-4 w-4 mr-1" />
            Export DOCX
          </Button>
          <Button 
            size="sm"
            onClick={() => handleExport('pdf')}
          >
            <FilePdf className="h-4 w-4 mr-1" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {sections.map(section => (
          <ContractSection
            key={section.id}
            section={section}
            onChange={(content) => updateSectionContent(section.id, content)}
          />
        ))}
      </div>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline">Save Draft</Button>
        <Button>Finalize Contract</Button>
      </div>
    </div>
  );
};

export default ContractBuilder;
