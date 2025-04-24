
import React, { useState } from 'react';
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TemplateLibrary from '@/components/TemplateLibrary';
import ContractBuilder from '@/components/ContractBuilder';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TemplateBuilder = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <CardTitle className="text-2xl font-bold text-huquq-primary">
              Contract Template Builder
            </CardTitle>
          </div>
          <CardDescription>
            Create legally sound contracts from templates
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!selectedTemplate ? (
            <TemplateLibrary onSelectTemplate={setSelectedTemplate} />
          ) : (
            <ContractBuilder 
              templateId={selectedTemplate} 
              onBack={() => setSelectedTemplate(null)} 
            />
          )}
        </CardContent>

        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          Huquq Yordam — Legal Document Builder
        </CardFooter>
      </Card>
    </div>
  );
};

export default TemplateBuilder;
