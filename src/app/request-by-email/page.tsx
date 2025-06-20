
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LogoIcon from "@/components/icons/LogoIcon";
import { Bell, Search, PlusCircle, Eye, SendHorizonal, Circle } from "lucide-react";
import AddVendorSheet from '@/components/request-by-email/AddVendorSheet';

interface Vendor {
  id: string;
  name: string;
  vendorId: string;
  email: string;
  ein: string;
  activities: number;
  payouts: string;
  withheld: string;
  w9Status: 'Completed' | 'Requested W-9';
  tinStatus: 'In Progress' | 'Success' | 'Order Created';
}

const vendorsData: Vendor[] = [
  { id: '1', name: 'Tristian Stubbs', vendorId: '#73489', email: 'tristianstubbs@gmail.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Completed', tinStatus: 'In Progress' },
  { id: '2', name: 'Steve Martin', vendorId: '#84659', email: 'steve@gmail.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Completed', tinStatus: 'Success' },
  { id: '3', name: 'Martin Shane', vendorId: '#73489', email: 'martinshane@gmail.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Completed', tinStatus: 'In Progress' },
  { id: '4', name: 'Clara Marshall', vendorId: '#45879', email: 'claramarsh@gmail.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Requested W-9', tinStatus: 'Order Created' },
];

const getStatusIndicator = (status: Vendor["w9Status"] | Vendor["tinStatus"]) => {
  let colorClass = "";
  switch (status) {
    case "Completed":
    case "Success":
      colorClass = "text-green-500";
      break;
    case "In Progress":
      colorClass = "text-yellow-500"; // Changed to yellow for "In Progress" for better visual distinction
      break;
    case "Requested W-9":
    case "Order Created":
      colorClass = "text-blue-500";
      break;
    default:
      colorClass = "text-gray-500";
  }
  return <Circle className={`h-2.5 w-2.5 fill-current ${colorClass}`} />;
};


export default function RequestByEmailPage() {
  const router = useRouter();
  const userName = "Martin"; // Hardcoded for example
  const [isAddVendorSheetOpen, setIsAddVendorSheetOpen] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleSaveVendor = () => {
    // Logic to save vendor data would go here
    console.log("Vendor saved!"); // Placeholder
    setIsAddVendorSheetOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-card shadow-sm px-6 py-3">
        <div className="mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon className="h-9 w-9 text-primary" />
            <div>
              <span className="font-headline text-xl font-semibold text-primary">CLIENT</span>
              <span className="font-headline text-xl font-medium text-primary/80"> Portal</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                0
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      martinmiller@gmail.com 
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 space-y-6">
        <p className="text-muted-foreground max-w-3xl">
          The following vendors have successfully completed their W-9 submissions using both the Request By URL and Request By Email methods
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto md:flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search Lead" className="pl-10 w-full" />
          </div>
          <Button className="w-full md:w-auto" onClick={() => setIsAddVendorSheetOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Vendor
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>EIN</TableHead>
                  <TableHead className="text-right">Total Activities</TableHead>
                  <TableHead className="text-right">Total Payouts</TableHead>
                  <TableHead className="text-right">Total Withheld</TableHead>
                  <TableHead>W-9 Status</TableHead>
                  <TableHead>TIN Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorsData.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <Checkbox id={`select-${vendor.id}`} />
                    </TableCell>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.vendorId}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.ein}</TableCell>
                    <TableCell className="text-right">{vendor.activities}</TableCell>
                    <TableCell className="text-right">{vendor.payouts}</TableCell>
                    <TableCell className="text-right">{vendor.withheld}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIndicator(vendor.w9Status)}
                        {vendor.w9Status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIndicator(vendor.tinStatus)}
                        {vendor.tinStatus}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="mr-1">
                        <Eye className="h-5 w-5 text-primary" />
                      </Button>
                       <Button variant="ghost" size="icon">
                        <SendHorizonal className="h-5 w-5 text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center text-sm text-muted-foreground py-6 px-6 border-t">
        This is a sample Vendor portal developed by TaxBandits.
      </footer>

      <AddVendorSheet
        isOpen={isAddVendorSheetOpen}
        onClose={() => setIsAddVendorSheetOpen(false)}
        onSave={handleSaveVendor}
      />
    </div>
  );
}
