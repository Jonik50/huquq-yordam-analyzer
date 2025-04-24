
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, AlertCircle, Download, File, FileText } from 'lucide-react';
import LanguageScriptToggle from './LanguageScriptToggle';
import ContractHistory from './ContractHistory';
import { useToast } from '@/hooks/use-toast';
import { ContractHistoryItem } from '@/types/contract';

interface ContractToolbarProps {
  onBack: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  contractName: string;
  onExport: (format: 'pdf' | 'docx') => void;
  onSelectHistory: (contract: ContractHistoryItem) => void;
}

const ContractToolbar: React.FC<ContractToolbarProps> = ({
  onBack,
  onAnalyze,
  isAnalyzing,
  contractName,
  onExport,
  onSelectHistory,
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={onBack}>
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Templates
      </Button>
      <h2 className="text-xl font-semibold flex-grow">{contractName}</h2>
      <div className="flex gap-2 flex-wrap">
        <LanguageScriptToggle />
        <ContractHistory onSelectContract={onSelectHistory} />
        <Button 
          size="sm" 
          variant="outline"
          onClick={onAnalyze}
          disabled={isAnalyzing}
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Risks'}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onExport('docx')}
        >
          <File className="h-4 w-4 mr-1" />
          Export DOCX
        </Button>
        <Button 
          size="sm"
          onClick={() => onExport('pdf')}
        >
          <FileText className="h-4 w-4 mr-1" />
          Export PDF
        </Button>
      </div>
    </div>
  );
};

export default ContractToolbar;
