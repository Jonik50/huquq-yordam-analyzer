
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, Trash } from 'lucide-react';
import { ContractHistoryItem } from '@/types/contract';
import { useAppContext } from '@/contexts/AppContext';

interface ContractHistoryProps {
  onSelectContract?: (contract: ContractHistoryItem) => void;
}

const ContractHistory: React.FC<ContractHistoryProps> = ({ onSelectContract }) => {
  const { state } = useAppContext();
  const [history, setHistory] = useState<ContractHistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Load contract history from localStorage
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('huquq-contract-history');
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory) as ContractHistoryItem[];
          // Convert string dates to Date objects
          parsedHistory.forEach(item => {
            item.createdAt = new Date(item.createdAt);
            item.modifiedAt = new Date(item.modifiedAt);
          });
          setHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Failed to load contract history:', error);
      }
    };
    
    loadHistory();
  }, []);
  
  const handleSelectContract = (contract: ContractHistoryItem) => {
    if (onSelectContract) {
      onSelectContract(contract);
      setIsOpen(false);
    }
  };
  
  const handleDelete = (contractId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedHistory = history.filter(item => item.id !== contractId);
    setHistory(updatedHistory);
    localStorage.setItem('huquq-contract-history', JSON.stringify(updatedHistory));
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Clock className="h-4 w-4" />
          View History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Contract History</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="final">Finalized</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="max-h-[60vh] overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <p>No contracts in history yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((contract) => (
                  <Card 
                    key={contract.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleSelectContract(contract)}
                  >
                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-md flex items-center gap-2">
                          <FileText className="h-4 w-4 text-huquq-primary" />
                          {contract.templateName}
                        </CardTitle>
                        <CardDescription>
                          Created: {formatDate(contract.createdAt)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{contract.language}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => handleDelete(contract.id, e)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex gap-2 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-huquq-danger"></span>
                          <span className="text-muted-foreground">{contract.risks.high}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-huquq-warning"></span>
                          <span className="text-muted-foreground">{contract.risks.medium}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-huquq-success"></span>
                          <span className="text-muted-foreground">{contract.risks.low}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="drafts">
            <div className="text-center py-10 text-muted-foreground">
              <p>Draft contracts will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="final">
            <div className="text-center py-10 text-muted-foreground">
              <p>Finalized contracts will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContractHistory;
