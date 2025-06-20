
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, type ChangeEvent } from 'react';
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
import ViewVendorSheet from '@/components/request-by-email/ViewVendorSheet';
import { useToast } from '@/hooks/use-toast';
import { sendMailAction } from '@/actions/emailActions';

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

const initialVendorsData: Vendor[] = [
  { id: '1', name: 'Tristian Stubbs', vendorId: '#73489', email: 'tristianstubbs@example.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Completed', tinStatus: 'Success' },
  { id: '2', name: 'Steve Martin', vendorId: '#84659', email: 'saidineesha.s@spantechnologyservices.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Not Requested', tinStatus: 'Not Requested' },
  { id: '3', name: 'Martin Shane', vendorId: '#73489', email: 'martinshane@example.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Requested W-9', tinStatus: 'Order Created' },
  { id: '4', name: 'Clara Marshall', vendorId: '#45879', email: 'claramarsh@example.com', ein: '89-456XXXX', activities: 699, payouts: '$11,000.00', withheld: '$3,500.00', w9Status: 'Not Requested', tinStatus: 'Not Requested' },
  { id: '5', name: 'John Doe', vendorId: '#12345', email: 'johndoe@example.com', ein: '12-345XXXX', activities: 100, payouts: '$1,000.00', withheld: '$100.00', w9Status: 'Not Requested', tinStatus: 'Not Requested' },
];

const getStatusIndicator = (status: Vendor["w9Status"] | Vendor["tinStatus"]) => {
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
      colorClass = "text-gray-400";
      break;
    default:
      colorClass = "text-gray-500";
  }
  return <Circle className={`h-2.5 w-2.5 fill-current ${colorClass}`} />;
};


export default function RequestByEmailPage() {
  const router = useRouter();
  const { toast } = useToast();
  const userName = "Martin"; 
  const [isAddVendorSheetOpen, setIsAddVendorSheetOpen] = useState(false);
  const [vendorsData, setVendorsData] = useState<Vendor[]>(initialVendorsData);
  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isViewVendorSheetOpen, setIsViewVendorSheetOpen] = useState(false);
  const [currentVendorDetails, setCurrentVendorDetails] = useState<Vendor | null>(null);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleSaveVendor = (newVendorData: Omit<Vendor, 'id' | 'w9Status' | 'tinStatus'>) => {
    const newVendorEntry: Vendor = {
      ...newVendorData,
      id: (vendorsData.length + 1).toString(),
      w9Status: 'Not Requested', 
      tinStatus: 'Not Requested',  
    };
    setVendorsData(prevVendors => [newVendorEntry, ...prevVendors]);
    setIsAddVendorSheetOpen(false);
    toast({ title: "Vendor Added", description: `${newVendorEntry.name} has been added.` });
  };

  const handleSelectAll = (checked: boolean | string) => {
    if (checked) {
      setSelectedVendorIds(filteredVendors.map(vendor => vendor.id));
    } else {
      setSelectedVendorIds([]);
    }
  };

  const handleSelectRow = (vendorId: string, checked: boolean | string) => {
    if (checked) {
      setSelectedVendorIds(prev => [...prev, vendorId]);
    } else {
      setSelectedVendorIds(prev => prev.filter(id => id !== vendorId));
    }
  };

  const handleViewVendor = (vendor: Vendor) => {
    setCurrentVendorDetails(vendor);
    setIsViewVendorSheetOpen(true);
  };

  const generateEmailTemplate = (vendorName?: string) => {
    return `
    <p>Request Approved</p>
    <p>Hello ${vendorName || ''},</p>
    <p>You have requested W9 from through email.</p>
    <br/>
    <p>Regards,</p>
    <p>Team API</p>
    <br/>
    <p>&copy; ${new Date().getFullYear()} Taxbandits API. All rights reserved.</p>
  `;
  };

  const handleSendRequestEmail = async (vendorId: string) => {
    const vendor = vendorsData.find(v => v.id === vendorId);
    if (vendor && vendor.w9Status === 'Not Requested') {
      const mailData = {
        email: vendor.email,
        subject: 'Request by email: W-9 Form',
        emailTemplate: generateEmailTemplate(vendor.name),
      };
      
      toast({ title: "Sending Email...", description: `Processing request for ${vendor.name}.` });
      const result = await sendMailAction(mailData);

      if (result.success) {
        setVendorsData(prevVendors =>
          prevVendors.map(v =>
            v.id === vendorId
              ? { ...v, w9Status: 'Requested W-9', tinStatus: 'Order Created' }
              : v
          )
        );
        toast({
          title: "Email Sent",
          description: `W-9 request email has been sent to ${vendor.name}.`,
        });
      } else {
        toast({
          title: "Email Failed",
          description: result.message || `Failed to send W-9 request to ${vendor.name}.`,
          variant: "destructive",
        });
      }
    } else if (vendor) {
       toast({
          title: "Action Not Allowed",
          description: `W-9 request for ${vendor.name} has already been processed or is completed.`,
          variant: "destructive",
        });
    }
  };

  const handleSendBulkRequestEmails = async () => {
    let emailsAttempted = 0;
    let emailsSentSuccessfully = 0;

    const eligibleVendorIds = selectedVendorIds.filter(id => {
      const vendor = vendorsData.find(v => v.id === id);
      return vendor && vendor.w9Status === 'Not Requested';
    });

    if (eligibleVendorIds.length === 0) {
      toast({
        title: "No Eligible Vendors",
        description: "No selected vendors were eligible for a new W-9 request.",
        variant: "destructive"
      });
      setSelectedVendorIds([]);
      return;
    }
    
    toast({ title: "Processing Bulk Email Requests...", description: `Sending ${eligibleVendorIds.length} email(s).` });

    for (const vendorId of eligibleVendorIds) {
      const vendor = vendorsData.find(v => v.id === vendorId);
      if (vendor) {
        emailsAttempted++;
        const mailData = {
          email: vendor.email,
          subject: 'Request by email: W-9 Form',
          emailTemplate: generateEmailTemplate(vendor.name),
        };
        const result = await sendMailAction(mailData);
        if (result.success) {
          emailsSentSuccessfully++;
          setVendorsData(prevVendors =>
            prevVendors.map(v =>
              v.id === vendorId
                ? { ...v, w9Status: 'Requested W-9', tinStatus: 'Order Created' }
                : v
            )
          );
        } else {
          toast({
            title: "Email Failed (Bulk)",
            description: `Failed for ${vendor.name}: ${result.message}`,
            variant: "destructive"
          });
        }
      }
    }

    if (emailsSentSuccessfully > 0) {
      toast({
        title: "Bulk Emails Processed",
        description: `${emailsSentSuccessfully} of ${emailsAttempted} W-9 request email(s) have been sent.`,
      });
    } else if (emailsAttempted > 0) {
       toast({
        title: "Bulk Emails Failed",
        description: `All ${emailsAttempted} email attempts failed. Check console for details.`,
        variant: "destructive"
      });
    }
    setSelectedVendorIds([]);
  };

  const filteredVendors = vendorsData.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAllSelected = filteredVendors.length > 0 && selectedVendorIds.length === filteredVendors.length;
  
  const canSendBulkEmail = selectedVendorIds.length > 0 && 
                           selectedVendorIds.some(id => {
                             const vendor = vendorsData.find(v => v.id === id);
                             return vendor && vendor.w9Status === 'Not Requested';
                           });

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
            <Input 
              type="search" 
              placeholder="Search by Vendor Name, Email or ID" 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button className="flex-grow md:flex-grow-0" onClick={() => setIsAddVendorSheetOpen(true)}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Vendor
            </Button>
            <Button 
              className="flex-grow md:flex-grow-0"
              onClick={handleSendBulkRequestEmails}
              disabled={!canSendBulkEmail}
            >
              <SendHorizonal className="mr-2 h-5 w-5" />
              Send W-9 Requests
            </Button>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50px] px-4">
                    <Checkbox 
                      id="select-all"
                      aria-label="Select all vendors"
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      disabled={filteredVendors.length === 0}
                    />
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
                {filteredVendors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-10 text-muted-foreground">
                      No vendors found.
                    </TableCell>
                  </TableRow>
                )}
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id} data-state={selectedVendorIds.includes(vendor.id) ? "selected" : ""}>
                    <TableCell className="px-4">
                      <Checkbox 
                        id={`select-${vendor.id}`} 
                        aria-label={`Select vendor ${vendor.name}`}
                        checked={selectedVendorIds.includes(vendor.id)}
                        onCheckedChange={(checked) => handleSelectRow(vendor.id, !!checked)}
                      />
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
                        {vendor.w9Status === 'Not Requested' ? '-' : vendor.w9Status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIndicator(vendor.tinStatus)}
                        {vendor.tinStatus === 'Not Requested' ? '-' : vendor.tinStatus}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {vendor.w9Status === 'Not Requested' ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSendRequestEmail(vendor.id)}
                          title="Send W-9 Request Email"
                        >
                          <SendHorizonal className="h-5 w-5 text-primary" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" onClick={() => handleViewVendor(vendor)} title="View Vendor Details">
                          <Eye className="h-5 w-5 text-primary" />
                        </Button>
                      )}
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
      {currentVendorDetails && (
        <ViewVendorSheet
          isOpen={isViewVendorSheetOpen}
          onClose={() => {
            setIsViewVendorSheetOpen(false);
            setCurrentVendorDetails(null);
          }}
          vendor={currentVendorDetails}
        />
      )}
    </div>
  );
}
