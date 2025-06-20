
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Info, X } from "lucide-react";

interface W9FormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function W9Form({ isOpen, onClose, onSave }: W9FormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form validation logic here if needed
    onSave();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[900px] w-full p-0 flex flex-col">
        <SheetHeader className="bg-primary-foreground border-b p-4" style={{backgroundColor: '#003366'}}>
          <div className="flex justify-between items-center">
            <SheetTitle className="text-white">Fill Form W-9</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-grow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Form W-9</h3>
              <p className="text-xs text-muted-foreground">
                (Rev. March 2024) <br />
                Department of the Treasury <br />
                Internal Revenue Service
              </p>
            </div>

            <div className="text-center py-4 border-y">
                <h2 className="text-xl font-semibold">Request for Taxpayer</h2>
                <h2 className="text-xl font-semibold">Identification Number and Certification</h2>
                <Link href="https://www.irs.gov/FormW9" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    Go to www.irs.gov/FormW9 for instructions and the latest information.
                </Link>
            </div>

            <p className="text-sm">
              <span className="font-semibold">Before you begin.</span> For guidance related to the purpose of Form W-9, see Purpose of Form, below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <Label>Type of TIN</Label>
                  <RadioGroup defaultValue="ssn" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ein" id="ein" />
                      <Label htmlFor="ein">EIN</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ssn" id="ssn" />
                      <Label htmlFor="ssn">SSN</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex items-end space-x-2 md:col-span-1">
                <Info size={18} className="text-muted-foreground" />
                 <Input id="ssn-number" placeholder="XXX-XX-XXXX" defaultValue="234-52-4354" />
              </div>
            </div>
             <div className="space-y-1">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" defaultValue="asdasd@gmail.com"/>
            </div>


            <div className="border-t pt-6 space-y-1">
              <p className="text-sm font-semibold">1. Name (as shown on your income tax return). Name is required on this line; do not leave this line blank.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="First name" defaultValue="Robert" />
                </div>
                <div>
                  <Label htmlFor="middleInitial">Middle initial (Optional)</Label>
                  <Input id="middleInitial" placeholder="MI" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Last name" defaultValue="Alanan"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="md:col-start-3">
                     <Label htmlFor="suffix">Suffix (Optional)</Label>
                    <Select defaultValue="IV">
                        <SelectTrigger id="suffix">
                        <SelectValue placeholder="Suffix" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Jr.">Jr.</SelectItem>
                        <SelectItem value="Sr.">Sr.</SelectItem>
                        <SelectItem value="II">II</SelectItem>
                        <SelectItem value="III">III</SelectItem>
                        <SelectItem value="IV">IV</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-1">
              <Label htmlFor="businessName">2. Business name/disregarded entity name, if different from above</Label>
              <Input id="businessName" placeholder="Business name" defaultValue="qqer" />
            </div>
            
            <div className="border-t pt-6 space-y-4">
                <p className="text-sm font-semibold">3a. Check appropriate box for federal tax classification of the person whose name is entered on line 1. Check only one of the following seven boxes.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { id: "individual", label: "Individual/sole proprietor", checked: true },
                        { id: "cCorp", label: "C corporation" },
                        { id: "sCorp", label: "S corporation" },
                        { id: "partnership", label: "Partnership" },
                        { id: "trustEstate", label: "Trust/Estate" },
                    ].map(item => (
                        <div className="flex items-center space-x-2" key={item.id}>
                            <Checkbox id={item.id} defaultChecked={item.checked} />
                            <Label htmlFor={item.id} className="font-normal">{item.label}</Label>
                        </div>
                    ))}
                </div>
                <div>
                    <Label htmlFor="llcClassification">LLC. Enter the tax classification (C = C corporation, S = S corporation, P = Partnership)</Label>
                    <Select>
                        <SelectTrigger id="llcClassification">
                        <SelectValue placeholder="Select LLC classification" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="c">C Corporation</SelectItem>
                        <SelectItem value="s">S Corporation</SelectItem>
                        <SelectItem value="p">Partnership</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="border-t pt-6 space-y-2">
                <p className="text-sm font-semibold">4. Exemptions (codes apply only to certain entities, not individuals; See instructions on page 3):</p>
                <div>
                    <Label htmlFor="exemptPayeeCode">Exempt payee code (if any)</Label>
                    <Select>
                        <SelectTrigger id="exemptPayeeCode">
                        <SelectValue placeholder="Select code" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        {/* Add other exempt codes as needed */}
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="mt-6 p-4 border bg-muted/30 rounded-md text-sm">
                <p className="font-semibold">Give form to the requester. Do not send to the IRS.</p>
            </div>
          </form>
        </ScrollArea>

        <SheetFooter className="border-t p-4 flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Back
          </Button>
          <Button type="submit" onClick={() => {
            // Simulate form submission for now. In a real app, you'd handle form data.
            onSave();
          }}>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Helper component for cleaner JSX (Optional)
const FormField: React.FC<{ label: string; id: string; children: React.ReactNode; className?: string }> = ({ label, id, children, className }) => (
  <div className={cn("space-y-1", className)}>
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
);

// Need to add Link import if not already there
import Link from 'next/link';
import { cn } from "@/lib/utils";

    