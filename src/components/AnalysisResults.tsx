
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppContext, Risk } from "@/contexts/AppContext";
import { AlertTriangle, Check, ChevronRight, FileText, Info } from "lucide-react";

const RiskIndicator: React.FC<{ level: 'high' | 'medium' | 'low' }> = ({ level }) => {
  const config = {
    high: { icon: AlertTriangle, color: 'text-huquq-danger', bg: 'bg-huquq-danger/10', label: 'High Risk' },
    medium: { icon: Info, color: 'text-huquq-warning', bg: 'bg-huquq-warning/10', label: 'Medium Risk' },
    low: { icon: Check, color: 'text-huquq-success', bg: 'bg-huquq-success/10', label: 'Low Risk' },
  };

  const { icon: Icon, color, bg, label } = config[level];

  return (
    <div className={`flex items-center space-x-2 rounded-full px-3 py-1 ${bg}`}>
      <Icon className={`h-3.5 w-3.5 ${color}`} />
      <span className={`text-xs font-medium ${color}`}>{label}</span>
    </div>
  );
};

const RiskItem: React.FC<{ risk: Risk }> = ({ risk }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg mb-3 overflow-hidden">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-3">
          {risk.level === 'high' && <div className="w-1.5 h-10 bg-huquq-danger rounded-full" />}
          {risk.level === 'medium' && <div className="w-1.5 h-10 bg-huquq-warning rounded-full" />}
          {risk.level === 'low' && <div className="w-1.5 h-10 bg-huquq-success rounded-full" />}
          <div>
            <p className="font-medium">{risk.title}</p>
            <RiskIndicator level={risk.level} />
          </div>
        </div>
        <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </div>
      
      {expanded && (
        <div className="p-3 pt-0 bg-muted/20">
          <Separator className="mb-3" />
          <p className="text-sm mb-3">{risk.description}</p>
          <div className="bg-huquq-light p-3 rounded-md">
            <p className="text-xs font-semibold text-huquq-primary mb-1">RECOMMENDATION</p>
            <p className="text-sm">{risk.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const AnalysisResults: React.FC = () => {
  const { state, resetAnalysis } = useAppContext();
  const analysis = state.currentAnalysis;

  if (!analysis) {
    return null;
  }

  const highRisks = analysis.risks.filter(risk => risk.level === 'high');
  const mediumRisks = analysis.risks.filter(risk => risk.level === 'medium');
  const lowRisks = analysis.risks.filter(risk => risk.level === 'low');

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-huquq-primary">Analysis Results</h1>
          <Badge variant="outline" className="bg-huquq-light">
            {new Date(analysis.uploadedAt).toLocaleDateString()}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Completed in {analysis.analysisDuration.toFixed(1)} seconds
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <div className="bg-huquq-light p-2 rounded-md">
              <FileText className="h-5 w-5 text-huquq-primary" />
            </div>
            <div>
              <CardTitle>{analysis.fileName}</CardTitle>
              <CardDescription>
                {analysis.fileType.toUpperCase()} · {(analysis.fileSize / (1024 * 1024)).toFixed(2)} MB
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex items-center justify-between py-2 mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-huquq-danger">{highRisks.length}</span>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-huquq-warning">{mediumRisks.length}</span>
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-huquq-success">{lowRisks.length}</span>
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Risk Score:</span>
              <div className="bg-huquq-light px-3 py-1 rounded-full">
                <span className="text-sm font-bold text-huquq-primary">
                  {((highRisks.length * 10 + mediumRisks.length * 5) / 
                    (highRisks.length + mediumRisks.length + lowRisks.length || 1)).toFixed(1)}
                  /10
                </span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="risks">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="risks">Risks & Recommendations</TabsTrigger>
              <TabsTrigger value="summary">Document Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="risks" className="pt-4">
              {analysis.risks.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No risks detected in this document
                </div>
              ) : (
                <div className="space-y-1">
                  {highRisks.length > 0 && (
                    <>
                      {highRisks.map(risk => (
                        <RiskItem key={risk.id} risk={risk} />
                      ))}
                    </>
                  )}
                  
                  {mediumRisks.length > 0 && (
                    <>
                      {mediumRisks.map(risk => (
                        <RiskItem key={risk.id} risk={risk} />
                      ))}
                    </>
                  )}
                  
                  {lowRisks.length > 0 && (
                    <>
                      {lowRisks.map(risk => (
                        <RiskItem key={risk.id} risk={risk} />
                      ))}
                    </>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="summary" className="space-y-4 pt-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-huquq-primary">Document Title</h3>
                <p className="text-sm">{analysis.summary.title}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2 text-huquq-primary">Parties</h3>
                <ul className="list-disc text-sm pl-5">
                  {analysis.summary.parties.map((party, idx) => (
                    <li key={idx} className="mb-1">{party}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-huquq-primary">Effective Date</h3>
                  <p className="text-sm">{analysis.summary.effectiveDate || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-huquq-primary">Expiry Date</h3>
                  <p className="text-sm">{analysis.summary.expiryDate || 'Not specified'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2 text-huquq-primary">Key Terms</h3>
                <ul className="list-disc text-sm pl-5">
                  {analysis.summary.keyTerms.map((term, idx) => (
                    <li key={idx} className="mb-1">{term}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2 text-huquq-primary">Key Obligations</h3>
                <ul className="list-disc text-sm pl-5">
                  {analysis.summary.obligations.map((obligation, idx) => (
                    <li key={idx} className="mb-1">{obligation}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between pt-6">
          <Button variant="outline" onClick={resetAnalysis}>
            Analyze Another Document
          </Button>
          <Button className="bg-huquq-primary hover:bg-huquq-primary/90">
            Download Summary
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnalysisResults;
