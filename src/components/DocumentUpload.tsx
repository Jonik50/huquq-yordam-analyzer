
import React, { useCallback, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, X } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const FILE_EXTENSION_MAP: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
};

const DocumentUpload: React.FC = () => {
  const { state, analyzeDocument } = useAppContext();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: 'Unsupported File Type',
        description: 'Please upload a PDF or DOCX file only.',
        variant: 'destructive',
      });
      return;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: 'File Too Large',
        description: 'Maximum file size is 10MB.',
        variant: 'destructive',
      });
      return;
    }

    // Process the file
    analyzeDocument(file);
  }, [analyzeDocument, toast]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileExtension = (file: File): string => {
    return FILE_EXTENSION_MAP[file.type] || 'unknown';
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-huquq-primary">Upload Document</CardTitle>
          <CardDescription>
            Upload a contract or agreement for analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.currentFile ? (
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-huquq-light p-2 rounded-md">
                  <FileText className="h-6 w-6 text-huquq-primary" />
                </div>
                <div>
                  <p className="font-medium truncate max-w-[180px]">{state.currentFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getFileExtension(state.currentFile).toUpperCase()} · {formatFileSize(state.currentFile.size)}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => analyzeDocument(state.currentFile!)}
                disabled={state.isAnalyzing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                ${isDragging ? 'border-huquq-primary bg-huquq-light' : 'border-border hover:border-huquq-secondary hover:bg-huquq-light/50'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <div className="mx-auto bg-huquq-light w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Upload className="h-6 w-6 text-huquq-primary" />
              </div>
              <p className="text-sm font-medium mb-1">
                Drag & drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOCX (Max 10MB)
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => handleFileChange(e.target.files)}
              />
            </div>
          )}
          
          {state.analysisHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Recent Documents</h3>
              <div className="space-y-2">
                {state.analysisHistory.slice(0, 3).map((analysis) => (
                  <div key={analysis.id} className="border rounded p-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[200px]">{analysis.fileName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(analysis.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={state.isAnalyzing}>
            View History
          </Button>
          <Button 
            onClick={() => state.currentFile && analyzeDocument(state.currentFile)}
            disabled={!state.currentFile || state.isAnalyzing}
            className="bg-huquq-primary hover:bg-huquq-primary/90"
          >
            {state.isAnalyzing ? "Analyzing..." : "Analyze Document"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DocumentUpload;
