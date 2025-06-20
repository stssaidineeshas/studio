
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { X } from "lucide-react";

interface AddVendorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; // In a real app, this would likely take form data
}

export default function AddVendorSheet({ isOpen, onClose, onSave }: AddVendorSheetProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form validation logic here if needed
    // Collect form data
    onSave();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl w-full p-0 flex flex-col">
        <SheetHeader className="p-4 border-b" style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
          <div className="flex justify-between items-center">
            <SheetTitle>Add Vendor</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-grow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Vendor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2 space-y-1">
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input id="vendorName" placeholder="Snow Flake Icecream Company" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="vendorId">Vendor ID</Label>
                  <Input id="vendorId" placeholder="#84869" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="vendorEmail">Vendor Email address</Label>
                <Input id="vendorEmail" type="email" placeholder="davidkinston@gmail.com" />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Payouts and withheld</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="totalActivities">Total Activities</Label>
                  <Input id="totalActivities" placeholder="699" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="totalPayouts">Total Payouts</Label>
                  <Input id="totalPayouts" placeholder="$ 11,000.00" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="totalWithheld">Total Withheld</Label>
                  <Input id="totalWithheld" placeholder="$ 3,500.00" />
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>

        <SheetFooter className="border-t p-4 flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {/* The Save button is styled orange as per the image for this specific component */}
          <Button
            onClick={() => {
              // In a real app, you'd likely call form.submit() or pass form data
              onSave();
            }}
            style={{ backgroundColor: '#F59E0B', color: 'white' }}
            className="hover:bg-amber-600"
          >
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
