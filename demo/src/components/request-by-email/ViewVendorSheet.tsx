
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Circle } from "lucide-react";


interface Vendor {
  id: string;
  name: string;
  vendorId: string;
  email: string;
  ein: string;
  activities: number;
  payouts: string;
  withheld: string;
  w9Status: 'Completed' | 'Requested W-9' | 'Not Requested';
  tinStatus: 'In Progress' | 'Success' | 'Order Created' | 'Not Requested';
}

interface ViewVendorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor | null;
}

const getStatusIndicatorVisual = (status: Vendor["w9Status"] | Vendor["tinStatus"] | undefined) => {
  if (!status) return null;
  let colorClass = "text-gray-400";
  switch (status) {
    case "Completed":
    case "Success":
      colorClass = "text-green-500";
      break;
    case "In Progress":
      colorClass = "text-yellow-500"; 
      break;
    case "Requested W-9":
    case "Order Created":
      colorClass = "text-blue-500";
      break;
    case "Not Requested":
      // colorClass remains text-gray-400
      break;
    default:
      colorClass = "text-gray-500";
  }
  return <Circle className={`h-2.5 w-2.5 fill-current ${colorClass} mr-2`} />;
};

const DetailItem = ({ label, value, isStatus = false, statusValue }: { label: string; value: string | number; isStatus?: boolean; statusValue?: Vendor["w9Status"] | Vendor["tinStatus"] }) => (
  <div className="mb-3">
    <Label className="text-sm text-muted-foreground">{label}</Label>
    {isStatus ? (
      <div className="text-sm text-foreground mt-1 flex items-center">
        {getStatusIndicatorVisual(statusValue)}
        {value === 'Not Requested' ? '-' : value}
      </div>
    ) : (
      <p className="text-sm text-foreground mt-1">{value}</p>
    )}
  </div>
);


export default function ViewVendorSheet({ isOpen, onClose, vendor }: ViewVendorSheetProps) {
  if (!vendor) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-lg w-full p-0 flex flex-col">
        <SheetHeader className="p-4 border-b" style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
          <div className="flex justify-between items-center">
            <SheetTitle>Vendor Details</SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-grow">
          <div className="p-6 space-y-3">
            <DetailItem label="Vendor Name" value={vendor.name} />
            <DetailItem label="Vendor ID" value={vendor.vendorId} />
            <DetailItem label="Email Address" value={vendor.email} />
            <DetailItem label="EIN" value={vendor.ein} />
            
            <Separator className="my-4" />
            
            <h4 className="text-md font-medium text-foreground mb-2">Financials & Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <DetailItem label="Total Activities" value={vendor.activities.toString()} />
                <DetailItem label="Total Payouts" value={vendor.payouts} />
                <DetailItem label="Total Withheld" value={vendor.withheld} />
                <DetailItem label="W-9 Status" value={vendor.w9Status} isStatus statusValue={vendor.w9Status} />
                <DetailItem label="TIN Status" value={vendor.tinStatus} isStatus statusValue={vendor.tinStatus} />
            </div>

          </div>
        </ScrollArea>

        <SheetFooter className="border-t p-4 flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

    