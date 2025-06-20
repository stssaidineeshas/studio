
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
import { useState, type FormEvent } from 'react';

interface VendorFormData {
  name: string;
  vendorId: string;
  email: string;
  activities: number;
  payouts: string;
  withheld: string;
}

interface AddVendorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: VendorFormData) => void; 
}

export default function AddVendorSheet({ isOpen, onClose, onSave }: AddVendorSheetProps) {
  const [formData, setFormData] = useState<VendorFormData>({
    name: '',
    vendorId: '',
    email: '',
    activities: 0,
    payouts: '',
    withheld: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formData);
    // Optionally reset form after save
    setFormData({ name: '', vendorId: '', email: '', activities: 0, payouts: '', withheld: '' });
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
                  <Label htmlFor="name">Vendor Name</Label>
                  <Input id="name" placeholder="Snow Flake Icecream Company" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="vendorId">Vendor ID</Label>
                  <Input id="vendorId" placeholder="#84869" value={formData.vendorId} onChange={handleChange} required/>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Vendor Email address</Label>
                <Input id="email" type="email" placeholder="davidkinston@gmail.com" value={formData.email} onChange={handleChange} required/>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Payouts and withheld</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="activities">Total Activities</Label>
                  <Input id="activities" type="number" placeholder="699" value={formData.activities} onChange={handleChange} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="payouts">Total Payouts</Label>
                  <Input id="payouts" placeholder="$ 11,000.00" value={formData.payouts} onChange={handleChange} required/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="withheld">Total Withheld</Label>
                  <Input id="withheld" placeholder="$ 3,500.00" value={formData.withheld} onChange={handleChange} required/>
                </div>
              </div>
            </div>
             <SheetFooter className="border-t p-4 flex-shrink-0 mt-6 -mx-6 -mb-6 bg-background">
                <Button variant="outline" type="button" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    style={{ backgroundColor: '#F59E0B', color: 'white' }}
                    className="hover:bg-amber-600"
                >
                    Save Vendor
                </Button>
            </SheetFooter>
          </form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
