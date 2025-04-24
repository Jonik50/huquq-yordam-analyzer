
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { Language } from '@/types/contract';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

const LanguageScriptToggle: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  const languages: { id: Language, name: string, nativeName: string }[] = [
    { id: 'uz-latin', name: 'Uzbek (Latin)', nativeName: 'O\'zbek' },
    { id: 'uz-cyrillic', name: 'Uzbek (Cyrillic)', nativeName: 'Ўзбек' },
    { id: 'ru', name: 'Russian', nativeName: 'Русский' },
    { id: 'en', name: 'English', nativeName: 'English' }
  ];

  const handleLanguageChange = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const currentLanguage = languages.find(lang => lang.id === state.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {currentLanguage?.nativeName || 'Language'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.id}
            onClick={() => handleLanguageChange(lang.id)}
            className="cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageScriptToggle;
