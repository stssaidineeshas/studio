
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogoIcon from '@/components/icons/LogoIcon';
import { LayoutDashboard, BarChart3, Settings, ListChecks, LibraryBig, CircleSlash, ChevronRight, RefreshCcw } from 'lucide-react';

interface Activity {
  id: string;
  date: string;
  description: string;
  activityReference: string;
  amount: string;
}

interface Payout {
  id: string;
  date: string;
  payrollReference: string;
  payout: string;
  withhold: string;
}

const activitiesData: Activity[] = [
  { id: '1', date: '12/11/2024', description: 'Freelance Project A', activityReference: '#73489', amount: '$11,000.00' },
  { id: '2', date: '12/11/2024', description: 'Consulting Services', activityReference: '#73490', amount: '$11,000.00' },
  { id: '3', date: '12/11/2024', description: 'Content Creation', activityReference: '#73491', amount: '$11,000.00' },
  { id: '4', date: '12/11/2024', description: 'Web Development Q4', activityReference: '#73492', amount: '$11,000.00' },
  { id: '5', date: '12/11/2024', description: 'Graphic Design Work', activityReference: '#73493', amount: '$11,000.00' },
];

const payoutsData: Payout[] = [
  { id: '1', date: '12/10/2024', payrollReference: 'PAY-DEC2024-001', payout: '$9,500.00', withhold: '$1,500.00' },
  { id: '2', date: '11/10/2024', payrollReference: 'PAY-NOV2024-001', payout: '$9,200.00', withhold: '$1,300.00' },
  { id: '3', date: '10/10/2024', payrollReference: 'PAY-OCT2024-001', payout: '$9,800.00', withhold: '$1,700.00' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [currentYear, setCurrentYear] = useState<string>('');
  const [taxYears, setTaxYears] = useState<string[]>([]);

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year.toString());
    const years = Array.from({ length: 5 }, (_, i) => (year - i).toString());
    setTaxYears(years);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const userName = "Martin";
  const userEmail = "martinmiller@gmail.com";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md flex flex-col">
        <Link href="/dashboard" className="flex items-center gap-2 mb-10">
          <LogoIcon className="h-9 w-9 text-blue-600" />
          <div>
            <span className="font-headline text-xl font-semibold text-blue-600">CLIENT</span>
            <span className="font-headline text-xl font-medium text-blue-500"> Portal</span>
          </div>
        </Link>
        <nav className="flex-grow">
          <ul>
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-md bg-blue-500 text-white font-medium">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            </li>
            <li className="mt-2">
              <Link href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 text-gray-700">
                <BarChart3 size={20} />
                Reports
              </Link>
            </li>
            <li className="mt-2">
              <Link href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 text-gray-700">
                <Settings size={20} />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              The following vendors have successfully completed their W-9 submissions using both the Request By URL and Request By Email methods
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-700">Welcome {userName}!</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-blue-500 text-white text-lg font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Tax Year</span>
              <Select value={currentYear} onValueChange={setCurrentYear}>
                <SelectTrigger className="w-[100px] h-9">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {taxYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Activities</CardTitle>
              <ListChecks className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">310</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Payouts</CardTitle>
              <LibraryBig className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">$13,000.00</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Withhold</CardTitle>
              <CircleSlash className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">$4,000.91</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Vendor Details */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-grow">
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-[200px]">
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
              </TabsList>
              <TabsContent value="activities">
                <Card className="shadow-sm">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="bg-gray-50">Date</TableHead>
                          <TableHead className="bg-gray-50">Description</TableHead>
                          <TableHead className="bg-gray-50">Activity Reference</TableHead>
                          <TableHead className="text-right bg-gray-50">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activitiesData.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell>{activity.date}</TableCell>
                            <TableCell>{activity.description}</TableCell>
                            <TableCell>{activity.activityReference}</TableCell>
                            <TableCell className="text-right">{activity.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payouts">
                <Card className="shadow-sm">
                   <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="bg-gray-50">Date</TableHead>
                          <TableHead className="bg-gray-50">Payroll Reference</TableHead>
                          <TableHead className="text-right bg-gray-50">Payout</TableHead>
                          <TableHead className="text-right bg-gray-50">Withhold</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payoutsData.map((payout) => (
                          <TableRow key={payout.id}>
                            <TableCell>{payout.date}</TableCell>
                            <TableCell>{payout.payrollReference}</TableCell>
                            <TableCell className="text-right">{payout.payout}</TableCell>
                            <TableCell className="text-right">{payout.withhold}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Vendor Details Card */}
          <div className="lg:w-96 flex-shrink-0">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Vendor Details</CardTitle>
                <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                  <RefreshCcw size={16} className="mr-1" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Name</h4>
                  <p className="text-gray-800">Martin Miller</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-gray-800">123 Main street, CVG Road,<br/>CA 569384</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">W-9 Status</h4>
                  <Link href="#" className="flex items-center text-orange-500 hover:text-orange-600">
                    - <span className="ml-auto">Complete W-9 <ChevronRight size={16} /></span>
                  </Link>
                </div>
                 <div>
                  <h4 className="text-sm font-medium text-gray-500">TIN Matching Status</h4>
                   <p className="text-gray-800">-</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <footer className="text-center text-sm text-gray-500 pt-8">
          This is a sample Vendor portal developed by TaxBandits.
        </footer>
      </main>
    </div>
  );
}
