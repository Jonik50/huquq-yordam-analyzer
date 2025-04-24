
import { AppProvider, useAppContext } from "@/contexts/AppContext";
import LanguageSelector from "@/components/LanguageSelector";
import DocumentUpload from "@/components/DocumentUpload";
import AnalysisProgress from "@/components/AnalysisProgress";
import AnalysisResults from "@/components/AnalysisResults";

const Main = () => {
  const { state } = useAppContext();
  
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
  return <DocumentUpload />;
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
