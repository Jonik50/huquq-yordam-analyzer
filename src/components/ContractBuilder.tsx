
import React, { useState } from 'react';
import { useAppContext } from "@/contexts/AppContext";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ContractHistoryItem } from '@/types/contract';
import ContractSection from './ContractSection';
import ContractToolbar from './ContractToolbar';
import { useToast } from '@/hooks/use-toast';
import { useContractSections } from '@/hooks/useContractSections';
import { analyzeContractSections } from '@/utils/contractAnalysis';

interface ContractBuilderProps {
  templateId: string;
  onBack: () => void;
}

const ContractBuilder: React.FC<ContractBuilderProps> = ({ templateId, onBack }) => {
  const { toast } = useToast();
  const { state } = useAppContext();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { sections, setSections, contractName, updateSectionContent } = useContractSections(templateId, state.language);
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
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
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    toast({
      title: 'Analyzing Contract',
      description: 'Our AI is analyzing your contract for potential risks...'
    });
    
    setTimeout(() => {
      const updatedSections = analyzeContractSections(sections);
      setSections(updatedSections);
      setIsAnalyzing(false);
      
      toast({
        title: 'Analysis Complete',
        description: 'Contract analysis has been completed. Risk levels updated.',
      });
    }, 2500);
  };
  
  const handleSaveDraft = () => {
    const risks = {
      high: sections.filter(s => s.riskLevel === 'high').length,
      medium: sections.filter(s => s.riskLevel === 'medium').length,
      low: sections.filter(s => s.riskLevel === 'low').length
    };
    
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
      <ContractToolbar
        onBack={onBack}
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        contractName={contractName}
        onExport={handleExport}
        onSelectHistory={handleContractFromHistory}
      />
      
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
                        autofill={null}
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
