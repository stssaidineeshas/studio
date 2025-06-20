
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { X } from 'lucide-react';

interface W9ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  // w9Data?: any; // Future: pass actual W9 data or URL
}

export default function W9ViewModal({ isOpen, onClose }: W9ViewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl p-0">
        <DialogHeader className="p-4 border-b flex flex-row justify-between items-center">
          <DialogTitle className="text-lg font-semibold text-foreground">Webhook payload</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="p-6">
          <Tabs defaultValue="view-w9" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted">
              <TabsTrigger 
                value="view-w9" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
              >
                View W-9
              </TabsTrigger>
              <TabsTrigger 
                value="w9-status-change"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
              >
                W-9 Status Change
              </TabsTrigger>
              <TabsTrigger 
                value="tin-matching-status-change"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
              >
                TIN Matching Status Change
              </TabsTrigger>
            </TabsList>
            <TabsContent value="view-w9">
              <div className="border rounded-md">
                <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 p-2 rounded-t-md border-b">
                  <span className="text-sm font-medium text-foreground">Form W-9 (Rev. March 2024)</span>
                  {/* Placeholder for other controls like page nav, zoom */}
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-xs">1 / 6</Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></Button>
                    <span className="text-xs">156%</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/></svg></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></Button>
                     <Button variant="ghost" size="icon" className="h-7 w-7"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></Button>
                  </div>
                </div>
                <div className="aspect-[8.5/11] w-full relative bg-white">
                  <Image
                    src="https://placehold.co/850x1100.png" 
                    alt="W-9 Form Placeholder"
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint="tax form"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="w9-status-change">
              <div className="border rounded-md p-8 text-center min-h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">W-9 Status Change content will appear here.</p>
              </div>
            </TabsContent>
            <TabsContent value="tin-matching-status-change">
              <div className="border rounded-md p-8 text-center min-h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">TIN Matching Status Change content will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
