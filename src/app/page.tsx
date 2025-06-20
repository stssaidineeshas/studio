import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { FileText, LockKeyhole, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-12">
      <section className="pt-12 md:pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
          Welcome to <span className="text-primary">CertChain Demo</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Experience the future of certificate management. Securely issue, manage, and verify digital certificates on our demonstration platform.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="transition-transform duration-200 hover:scale-105">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="transition-transform duration-200 hover:scale-105">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-5xl py-12">
        <h2 className="text-3xl font-bold tracking-tight mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-left hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-2xl">Digital Certificates</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily create and manage digital versions of your important certificates. Access them anytime, anywhere.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="text-left hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <LockKeyhole className="w-10 h-10 text-primary" />
                 <CardTitle className="font-headline text-2xl">Secure Storage</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Leverage blockchain-inspired principles for enhanced security and verifiability (simulated).
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="text-left hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Share2 className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-2xl">Easy Sharing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Securely share your certificates with employers, institutions, or anyone you choose with controlled access.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="w-full max-w-4xl py-12">
         <Image src="https://placehold.co/800x400.png" alt="CertChain platform illustration" width={800} height={400} className="rounded-lg shadow-2xl mx-auto" data-ai-hint="digital security" />
      </section>

    </div>
  );
}
