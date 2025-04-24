
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/contexts/AppContext";
import { FileText, Home, File, Shield, Search } from 'lucide-react';
import { getTemplatesByLanguage, getIconComponent } from '@/data/templateData';
import { ContractTemplate, TemplateCategory } from '@/types/contract';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContractHistory from './ContractHistory';

interface TemplateLibraryProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  const { state } = useAppContext();
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  
  useEffect(() => {
    // Get templates based on selected language
    const availableTemplates = getTemplatesByLanguage(state.language);
    setTemplates(availableTemplates);
  }, [state.language]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title[state.language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description[state.language].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-medium">Select a Template</h3>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ContractHistory />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as TemplateCategory | 'all')}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No templates found. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map(template => {
            const IconComponent = getIconComponent(template.icon);
            return (
              <Card 
                key={template.id}
                className="cursor-pointer hover:border-primary hover:shadow-md transition-all"
                onClick={() => onSelectTemplate(template.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <CardTitle className="text-md">{template.title[state.language]}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{template.description[state.language]}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;
