
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { ChevronLeft, AlertCircle, Download, File, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from "@/contexts/AppContext";
import ContractSection from './ContractSection';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ContractSectionData, ContractHistoryItem, RiskLevel } from '@/types/contract';
import { getTemplateById } from '@/data/templateData';
import AutofillManager from './AutofillManager';
import LanguageScriptToggle from './LanguageScriptToggle';
import ContractHistory from './ContractHistory';

interface ContractBuilderProps {
  templateId: string;
  onBack: () => void;
}

const ContractBuilder: React.FC<ContractBuilderProps> = ({ templateId, onBack }) => {
  const { toast } = useToast();
  const { state } = useAppContext();
  const [sections, setSections] = useState<ContractSectionData[]>([]);
  const [contractName, setContractName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Load template sections based on language
  useEffect(() => {
    const template = getTemplateById(templateId);
    if (template) {
      setContractName(template.title[state.language]);
      setSections(template.sections[state.language] || template.sections['en']);
    }
  }, [templateId, state.language]);

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
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    // Drop outside the list or no movement
    if (!destination || (destination.index === source.index)) {
      return;
    }
    
    const newSections = Array.from(sections);
    const [removed] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, removed);
    
    setSections(newSections);
  };
  
  const handleExport = (format: 'pdf' | 'docx') => {
    toast({
      title: 'Export Initiated',
      description: `Your contract will be exported as ${format.toUpperCase()}.`,
    });
    
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: `Your ${format.toUpperCase()} is ready.`,
      });
    }, 1500);
  };
  
  const handleAutofill = (sectionId: string, text: string) => {
    updateSectionContent(sectionId, text);
  };
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    toast({
      title: 'Analyzing Contract',
      description: 'Our AI is analyzing your contract for potential risks...'
    });
    
    setTimeout(() => {
      // Simulate risk analysis
      const updatedSections = sections.map(section => {
        // Assign risk levels based on certain content patterns
        if (section.content.toLowerCase().includes('unlimited') && 
            section.content.toLowerCase().includes('liability')) {
          return { ...section, riskLevel: 'high' as RiskLevel };
        }
        if (section.content.toLowerCase().includes('terminate') && 
            section.content.toLowerCase().includes('immediate')) {
          return { ...section, riskLevel: 'high' as RiskLevel };
        }
        if (section.content.toLowerCase().includes('notice period') || 
            section.content.toLowerCase().includes('days notice')) {
          return { ...section, riskLevel: 'medium' as RiskLevel };
        }
        return section;
      });
      
      setSections(updatedSections);
      setIsAnalyzing(false);
      
      toast({
        title: 'Analysis Complete',
        description: 'Contract analysis has been completed. Risk levels updated.',
      });
    }, 2500);
  };
  
  const handleSaveDraft = () => {
    // Count risks
    const risks = {
      high: sections.filter(s => s.riskLevel === 'high').length,
      medium: sections.filter(s => s.riskLevel === 'medium').length,
      low: sections.filter(s => s.riskLevel === 'low').length
    };
    
    // Create history item
    const historyItem: ContractHistoryItem = {
      id: Date.now().toString(),
      templateId: templateId,
      templateName: contractName,
      createdAt: new Date(),
      modifiedAt: new Date(),
      language: state.language,
      sections: sections,
      risks: risks
    };
    
    // Save to localStorage
    try {
      const existingHistory = localStorage.getItem('huquq-contract-history');
      let history: ContractHistoryItem[] = [];
      
      if (existingHistory) {
        history = JSON.parse(existingHistory);
      }
      
      history.unshift(historyItem);
      localStorage.setItem('huquq-contract-history', JSON.stringify(history));
      
      toast({
        title: 'Draft Saved',
        description: 'Your contract draft has been saved successfully.'
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to save contract draft.',
        variant: 'destructive'
      });
    }
  };
  
  const handleContractFromHistory = (contract: ContractHistoryItem) => {
    if (contract.templateId === templateId) {
      setSections(contract.sections);
      toast({
        title: 'Contract Loaded',
        description: 'Contract has been loaded from history.'
      });
    } else {
      toast({
        title: 'Template Mismatch',
        description: 'Selected contract is based on a different template.',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Templates
        </Button>
        <h2 className="text-xl font-semibold flex-grow">{contractName}</h2>
        <div className="flex gap-2 flex-wrap">
          <LanguageScriptToggle />
          <ContractHistory onSelectContract={handleContractFromHistory} />
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Risks'}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleExport('docx')}
          >
            <File className="h-4 w-4 mr-1" />
            Export DOCX
          </Button>
          <Button 
            size="sm"
            onClick={() => handleExport('pdf')}
          >
            <FileText className="h-4 w-4 mr-1" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="contract-sections">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef} 
              className="space-y-4"
            >
              {sections.map((section, index) => (
                <Draggable 
                  key={section.id} 
                  draggableId={section.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ContractSection
                        section={section}
                        onChange={(content) => updateSectionContent(section.id, content)}
                        autofill={
                          <AutofillManager 
                            onSelect={(text) => handleAutofill(section.id, text)} 
                          />
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="flex justify-end gap-4 flex-wrap">
        <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
        <Button onClick={handleAnalyze}>Analyze & Finalize Contract</Button>
      </div>
    </div>
  );
};

export default ContractBuilder;
