
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AutofillData } from '@/types/contract';
import { Search, UserCircle, Building2, CreditCard, Phone } from 'lucide-react';

const AutofillManager: React.FC<{
  onSelect: (text: string) => void;
}> = ({ onSelect }) => {
  const [autofillData, setAutofillData] = useState<AutofillData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    // Load autofill data from localStorage
    const loadAutofillData = () => {
      try {
        const savedData = localStorage.getItem('huquq-autofill-data');
        if (savedData) {
          const parsedData = JSON.parse(savedData) as AutofillData[];
          // Convert string dates to Date objects
          parsedData.forEach(item => {
            item.lastUsed = new Date(item.lastUsed);
          });
          setAutofillData(parsedData);
        } else {
          // Set some example data if nothing exists
          const defaultData: AutofillData[] = [
            {
              id: '1',
              label: 'Company Name',
              value: 'Huquq Solutions LLC',
              category: 'business',
              lastUsed: new Date(),
              frequency: 5
            },
            {
              id: '2',
              label: 'Full Name',
              value: 'John Doe',
              category: 'personal',
              lastUsed: new Date(),
              frequency: 3
            },
            {
              id: '3',
              label: 'Payment Term',
              value: '30 days net',
              category: 'payment',
              lastUsed: new Date(),
              frequency: 2
            },
            {
              id: '4',
              label: 'Phone Number',
              value: '+998 71 123 4567',
              category: 'contact',
              lastUsed: new Date(),
              frequency: 1
            }
          ];
          setAutofillData(defaultData);
          localStorage.setItem('huquq-autofill-data', JSON.stringify(defaultData));
        }
      } catch (error) {
        console.error('Failed to load autofill data:', error);
      }
    };
    
    loadAutofillData();
  }, []);
  
  const handleSelectItem = (value: string) => {
    onSelect(value);
    
    // Update frequency and last used
    const updatedData = autofillData.map(item => {
      if (item.value === value) {
        return {
          ...item,
          frequency: item.frequency + 1,
          lastUsed: new Date()
        };
      }
      return item;
    });
    
    setAutofillData(updatedData);
    localStorage.setItem('huquq-autofill-data', JSON.stringify(updatedData));
  };
  
  const filteredData = autofillData.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.value.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort by frequency (most used first)
  const sortedData = [...filteredData].sort((a, b) => b.frequency - a.frequency);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal':
        return <UserCircle className="h-4 w-4" />;
      case 'business':
        return <Building2 className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      case 'contact':
        return <Phone className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="h-4 w-4 mr-1" />
          Autofill
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="p-3 border-b">
          <Input 
            placeholder="Search autofill data..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="h-8"
          />
        </div>
        
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <div className="p-2 border-b">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="personal" className="flex-1">Personal</TabsTrigger>
              <TabsTrigger value="business" className="flex-1">Business</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto p-2">
            {sortedData.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground text-sm">
                No saved data found
              </div>
            ) : (
              <div className="space-y-1">
                {sortedData.map((item) => (
                  <Card 
                    key={item.id} 
                    className="cursor-pointer hover:bg-secondary/10 transition-colors"
                    onClick={() => handleSelectItem(item.value)}
                  >
                    <CardContent className="p-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.value}</div>
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default AutofillManager;
