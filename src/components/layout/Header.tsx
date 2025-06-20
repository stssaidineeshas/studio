
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LogoIcon from '@/components/icons/LogoIcon';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from 'lucide-react';

const UserAuthButtons = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="user avatar"/>
          <AvatarFallback>
            <UserCircle className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">Guest User</p>
          <p className="text-xs leading-none text-muted-foreground">
            guest@example.com
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/login">Login</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem disabled>
        Log out (disabled)
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="CertChain Home">
          <LogoIcon className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-semibold tracking-tight">CertChain Demo</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2">
          {/* NavLinks removed */}
          <UserAuthButtons />
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="flex items-center gap-2 mb-4" aria-label="CertChain Home">
                  <LogoIcon className="h-8 w-8 text-primary" />
                  <span className="font-headline text-xl font-semibold tracking-tight">CertChain Demo</span>
                </Link>
                {/* NavLinks removed from mobile */}
                <div className="pt-4 border-t">
                  <UserAuthButtons />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
