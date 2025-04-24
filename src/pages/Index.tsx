
import { AppProvider, useAppContext } from "@/contexts/AppContext";
import LanguageSelector from "@/components/LanguageSelector";
import DocumentUpload from "@/components/DocumentUpload";
import AnalysisProgress from "@/components/AnalysisProgress";
import AnalysisResults from "@/components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { FileText, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const HistoryDialog = () => {
  const { state, resetAnalysis } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const handleSelectAnalysis = (analysisId: string) => {
    const analysis = state.analysisHistory.find(item => item.id === analysisId);
    if (analysis) {
      // In a real implementation, we would load the analysis details
      // For now, we'll just show a toast
      setIsOpen(false);
    }
  };
  
  if (state.analysisHistory.length === 0) {
    return (
      <Button variant="outline" className="w-full flex items-center justify-center gap-2" disabled>
        <Clock className="h-4 w-4" />
        No History Available
      </Button>
    );
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" />
          View History ({state.analysisHistory.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Document Analysis History</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {state.analysisHistory.map((item) => (
            <div 
              key={item.id}
              className="p-3 border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSelectAnalysis(item.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{item.fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(item.uploadedAt)} · {(item.fileSize / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-huquq-danger font-medium">{item.risks.filter(r => r.level === 'high').length}</span>
                  <span className="mx-1 text-muted-foreground">/</span>
                  <span className="text-huquq-warning font-medium">{item.risks.filter(r => r.level === 'medium').length}</span>
                  <span className="mx-1 text-muted-foreground">/</span>
                  <span className="text-huquq-success font-medium">{item.risks.filter(r => r.level === 'low').length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Main = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  
  // Show language selector if language is not selected
  if (!state.languageSelected) {
    return <LanguageSelector />;
  }
  
  // Show analysis results if available
  if (state.currentAnalysis) {
    return <AnalysisResults />;
  }
  
  // Show analysis progress if analyzing
  if (state.isAnalyzing) {
    return <AnalysisProgress />;
  }
  
  // Show document upload by default
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-huquq-light p-4">
      <div className="w-full max-w-md space-y-6">
        <DocumentUpload />
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">or</div>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 mb-4"
            onClick={() => navigate('/template-builder')}
          >
            <FileText className="h-4 w-4" />
            Create a New Contract from Templates
          </Button>
          
          <HistoryDialog />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Main />
      </div>
    </AppProvider>
  );
};

export default Index;
