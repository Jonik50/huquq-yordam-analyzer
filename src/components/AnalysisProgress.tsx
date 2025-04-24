
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppContext } from "@/contexts/AppContext";
import { FileText } from "lucide-react";

const AnimatedElement: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const AnalysisProgress: React.FC = () => {
  const { state } = useAppContext();
  const [progress, setProgress] = useState(0);
  const fileName = state.currentFile?.name || '';
  
  useEffect(() => {
    // Simulate analysis progress
    if (state.isAnalyzing) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(prev + (Math.random() * 10), 100);
        });
      }, 300);
      
      return () => clearInterval(timer);
    }
  }, [state.isAnalyzing]);

  const stepProgress = Math.min(Math.floor(progress / 25), 3);

  const analysisSteps = [
    { label: 'Extracting document text', detail: 'Converting and processing document content' },
    { label: 'Identifying clauses', detail: 'Finding and categorizing contract sections' },
    { label: 'Analyzing legal risks', detail: 'Evaluating terms and conditions' },
    { label: 'Generating recommendations', detail: 'Creating summary and risk assessment' }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-huquq-primary">Analyzing Document</CardTitle>
          <CardDescription>
            Please wait while we process your document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3 border p-3 rounded-lg">
            <div className="bg-huquq-light p-2 rounded-md">
              <FileText className="h-5 w-5 text-huquq-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{fileName}</p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{progress.toFixed(0)}% complete</span>
              <span className="text-sm text-muted-foreground">Step {stepProgress + 1}/4</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="space-y-4">
            {analysisSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${index < stepProgress 
                    ? 'bg-huquq-success text-white' 
                    : index === stepProgress 
                      ? 'bg-huquq-primary text-white animate-pulse-slow' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                  {index < stepProgress ? '✓' : index + 1}
                </div>
                <div>
                  <p className={`font-medium ${index === stepProgress ? 'text-huquq-primary' : ''}`}>
                    {step.label}
                  </p>
                  {index <= stepProgress && (
                    <AnimatedElement delay={index * 500}>
                      <p className="text-xs text-muted-foreground">{step.detail}</p>
                    </AnimatedElement>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisProgress;
