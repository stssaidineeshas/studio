
'use client';

import Link from 'next/link';
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
import { X, Copy, ZoomIn, ZoomOut, Download, MoreVertical, Printer } from 'lucide-react';

interface W9ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function W9ViewModal({ isOpen, onClose }: W9ViewModalProps) {
  const submissionId = "9ba0960a-ac56-4a54-801e-6a31453b349f"; // Example data
  const webhookUrl = "https://webhook.site/df12e876-8790-452d-92bc-10bfe4a9ffe4"; // Example data
  const webhookHeaderContent = `{
  "Accept": "application/json",
  "Timestamp": "06/17/2025 05:45:55.086 AM",
  "Signature": "ONn5GbHKQufxlrmZ8fedGVKrDI6FpU1LeUTaeI5vi1s=",
  "IpAddress": "203.223.189.10",
  "User-Agent": "taxbandits.com"
}`;
  const webhookPayloadContent = `{
  "SubmissionId": "b49fef45-a94e-4b16-ab7f-42c750d4d06a",
  "FormType": "FORM1099NEC",
  "Records": [
    {
      "RecordId": "c4d90ad7-0249-4ef8-b067-9efd9a999de4",
      "RecipientId": "0b85d03b-aaa3-4f27-a6ea-c8bec4b18511",
      "PayeeRef": null,
      "AccountNum": "20243550021714064642",
      "Status": "Accepted",
      "StatusCode": 14,
      "FilingReference": null,
      "StatusTime": "2024-12-21T00:02:40.2005851-05:00",
      "RejectedBy": null,
      "Errors": null
    }
  ]
}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optionally, show a toast notification for success
    } catch (err) {
      // Handle errors
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-5xl p-0">
        <DialogHeader className="p-4 border-b flex flex-row justify-between items-center" style={{ backgroundColor: '#003366' }}>
          <DialogTitle className="text-lg font-semibold text-white">Webhook payload</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="p-6">
          <Tabs defaultValue="view-w9" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted">
              <TabsTrigger
                value="view-w9"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:text-muted-foreground py-2.5"
              >
                View W-9
              </TabsTrigger>
              <TabsTrigger
                value="w9-status-change"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:text-muted-foreground py-2.5"
              >
                W-9 Status Change
              </TabsTrigger>
              <TabsTrigger
                value="tin-matching-status-change"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:text-muted-foreground py-2.5"
              >
                TIN Matching Status Change
              </TabsTrigger>
            </TabsList>
            <TabsContent value="view-w9">
              <div className="border rounded-md">
                <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 p-2 rounded-t-md border-b">
                  <span className="text-sm font-medium text-foreground">Form W-9 (Rev. March 2024)</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-xs">1 / 6</Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><ZoomIn size={16}/></Button>
                    <span className="text-xs">156%</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><ZoomOut size={16}/></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Download size={16}/></Button>
                    {/* Assuming a Printer icon might be desired here based on context */}
                    {/* <Button variant="ghost" size="icon" className="h-7 w-7"><Printer size={16}/></Button> */}
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical size={16}/></Button>
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
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 border-b pb-4">
                  <div className="text-sm">
                    <span className="font-medium text-muted-foreground">Submission Id: </span>
                    <span className="text-foreground break-all">{submissionId}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-muted-foreground">URL: </span>
                    <Link href={webhookUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                      {webhookUrl}
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-semibold text-foreground mb-2">Webhook Header</h3>
                    <pre className="bg-muted/30 p-4 rounded-md text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
                      {webhookHeaderContent}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-md font-semibold text-foreground">Webhook Payload</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopy(webhookPayloadContent)}
                        aria-label="Copy payload"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="bg-muted/30 p-4 rounded-md text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
                      {webhookPayloadContent}
                    </pre>
                  </div>
                </div>
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

    