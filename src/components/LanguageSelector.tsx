
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext, Language } from "@/contexts/AppContext";
import { ChevronRight } from 'lucide-react';

const languages: { id: Language; name: string; nativeName: string }[] = [
  { id: 'uz-latin', name: 'Uzbek (Latin)', nativeName: 'O\'zbek' },
  { id: 'uz-cyrillic', name: 'Uzbek (Cyrillic)', nativeName: 'Ўзбек' },
  { id: 'ru', name: 'Russian', nativeName: 'Русский' },
  { id: 'en', name: 'English', nativeName: 'English' }
];

const LanguageSelector: React.FC = () => {
  const { dispatch } = useAppContext();

  const selectLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-huquq-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-huquq-primary">
            Huquq Yordam
          </CardTitle>
          <CardDescription>
            Please select your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {languages.map((lang) => (
            <Button
              key={lang.id}
              variant="outline"
              className="w-full justify-between text-left h-14 mb-2 hover:bg-huquq-light hover:text-huquq-primary hover:border-huquq-primary transition-all"
              onClick={() => selectLanguage(lang.id)}
            >
              <div>
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-muted-foreground">{lang.name}</div>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          AI-powered legal assistant for Uzbekistan
        </CardFooter>
      </Card>
    </div>
  );
};

export default LanguageSelector;
