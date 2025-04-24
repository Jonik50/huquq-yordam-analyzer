
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/contexts/AppContext";
import { Search } from 'lucide-react';
import { getTemplatesByLanguage } from '@/data/templateData';
import { TemplateCategory } from '@/types/contract';
import TemplateCategoryFilter from './TemplateCategoryFilter';
import TemplatePreviewCard from './TemplatePreviewCard';
import ContractHistory from './ContractHistory';

interface TemplateLibraryProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const templates = getTemplatesByLanguage(state.language);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title[state.language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description[state.language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
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

      <TemplateCategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No templates found. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map(template => (
            <TemplatePreviewCard
              key={template.id}
              template={template}
              currentLanguage={state.language}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;
