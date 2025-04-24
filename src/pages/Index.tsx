
import { AppProvider, useAppContext } from "@/contexts/AppContext";
import LanguageSelector from "@/components/LanguageSelector";
import DocumentUpload from "@/components/DocumentUpload";
import AnalysisProgress from "@/components/AnalysisProgress";
import AnalysisResults from "@/components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
            className="w-full flex items-center justify-center gap-2"
            onClick={() => navigate('/template-builder')}
          >
            <FileText className="h-4 w-4" />
            Create a New Contract from Templates
          </Button>
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
