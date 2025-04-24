
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateCategory } from '@/types/contract';

interface TemplateCategoryFilterProps {
  selectedCategory: TemplateCategory | 'all';
  onCategoryChange: (category: TemplateCategory | 'all') => void;
}

const TemplateCategoryFilter: React.FC<TemplateCategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Tabs value={selectedCategory} onValueChange={(value) => onCategoryChange(value as TemplateCategory | 'all')}>
      <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="employment">Employment</TabsTrigger>
        <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
        <TabsTrigger value="personal">Personal</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TemplateCategoryFilter;
