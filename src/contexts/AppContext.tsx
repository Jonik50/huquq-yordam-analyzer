
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type Language = 'uz-latin' | 'uz-cyrillic' | 'ru' | 'en';

type RiskLevel = 'high' | 'medium' | 'low';

type Risk = {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  level: RiskLevel;
};

type DocumentSummary = {
  title: string;
  parties: string[];
  effectiveDate: string | null;
  expiryDate: string | null;
  keyTerms: string[];
  obligations: string[];
};

type AnalysisResult = {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'docx';
  fileSize: number;
  uploadedAt: Date;
  analysisDuration: number;
  risks: Risk[];
  summary: DocumentSummary;
};

type AppState = {
  language: Language;
  languageSelected: boolean;
  currentFile: File | null;
  isAnalyzing: boolean;
  currentAnalysis: AnalysisResult | null;
  analysisHistory: AnalysisResult[];
};

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_FILE'; payload: File | null }
  | { type: 'START_ANALYSIS' }
  | { type: 'COMPLETE_ANALYSIS'; payload: AnalysisResult }
  | { type: 'RESET_ANALYSIS' }
  | { type: 'LOAD_HISTORY' };

const initialState: AppState = {
  language: 'uz-latin',
  languageSelected: false,
  currentFile: null,
  isAnalyzing: false,
  currentAnalysis: null,
  analysisHistory: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('huquq-language', action.payload);
      return {
        ...state,
        language: action.payload,
        languageSelected: true
      };
    case 'SET_FILE':
      return {
        ...state,
        currentFile: action.payload,
        currentAnalysis: null
      };
    case 'START_ANALYSIS':
      return {
        ...state,
        isAnalyzing: true
      };
    case 'COMPLETE_ANALYSIS':
      const updatedHistory = [action.payload, ...state.analysisHistory].slice(0, 10);
      localStorage.setItem('huquq-history', JSON.stringify(updatedHistory));
      
      return {
        ...state,
        isAnalyzing: false,
        currentAnalysis: action.payload,
        analysisHistory: updatedHistory,
        currentFile: null
      };
    case 'RESET_ANALYSIS':
      return {
        ...state,
        currentFile: null,
        isAnalyzing: false,
        currentAnalysis: null
      };
    case 'LOAD_HISTORY':
      try {
        const savedHistory = localStorage.getItem('huquq-history');
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory) as AnalysisResult[];
          // Convert string dates to Date objects
          parsedHistory.forEach(item => {
            item.uploadedAt = new Date(item.uploadedAt);
          });
          return {
            ...state,
            analysisHistory: parsedHistory
          };
        }
      } catch (error) {
        console.error('Failed to load history:', error);
        toast({
          title: 'Error loading history',
          description: 'Your previous analysis history could not be loaded.',
          variant: 'destructive'
        });
      }
      return state;
    default:
      return state;
  }
}

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  resetAnalysis: () => void;
  analyzeDocument: (file: File) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('huquq-language') as Language | null;
    if (savedLanguage) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage });
    }
    
    // Load history
    dispatch({ type: 'LOAD_HISTORY' });
  }, []);

  const resetAnalysis = () => {
    dispatch({ type: 'RESET_ANALYSIS' });
  };

  // Mock document analysis function (will be replaced with actual API call)
  const analyzeDocument = async (file: File) => {
    dispatch({ type: 'SET_FILE', payload: file });
    dispatch({ type: 'START_ANALYSIS' });

    // In a real implementation, this is where you would:
    // 1. Upload the file to a server or process it client-side
    // 2. Call the OpenRouter + Gemini 2.5 API for analysis
    // 3. Process the results

    // For now, we'll simulate an API delay and return mock data
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        id: Date.now().toString(),
        fileName: file.name,
        fileType: file.name.endsWith('.pdf') ? 'pdf' : 'docx',
        fileSize: file.size,
        uploadedAt: new Date(),
        analysisDuration: 3.2, // seconds
        risks: [
          {
            id: '1',
            title: 'Termination Clause',
            description: 'The contract allows unilateral termination without cause with only 5 days notice.',
            recommendation: 'Negotiate for at least 30 days notice period before termination.',
            level: 'high'
          },
          {
            id: '2',
            title: 'Payment Terms',
            description: 'Payment terms extend to 60 days after invoice submission.',
            recommendation: 'Standard payment terms are 30 days. Consider negotiating shorter payment period.',
            level: 'medium'
          },
          {
            id: '3',
            title: 'Intellectual Property',
            description: 'Contract includes clear IP protection for work products.',
            recommendation: 'Maintain this clause as is.',
            level: 'low'
          }
        ],
        summary: {
          title: 'Service Agreement',
          parties: ['ABC Company', 'XYZ Freelancer'],
          effectiveDate: '2023-04-01',
          expiryDate: '2024-03-31',
          keyTerms: [
            'Hourly rate: 50 USD',
            'Payment within 60 days',
            'Non-compete for 12 months'
          ],
          obligations: [
            'Deliver reports weekly',
            'Maintain confidentiality',
            'Provide own equipment'
          ]
        }
      };

      dispatch({ type: 'COMPLETE_ANALYSIS', payload: mockAnalysis });
    }, 3000);
  };

  const value = {
    state,
    dispatch,
    resetAnalysis,
    analyzeDocument
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export type { Language, RiskLevel, Risk, DocumentSummary, AnalysisResult };
