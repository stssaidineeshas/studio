
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCircle, FileText, ChevronRight } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Request Methods Demo</h1>
        <p className="text-muted-foreground">Choose a method to request a Withholding Certificate.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl w-full">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Request By URL</CardTitle>
            <Button variant="link" asChild className="text-primary p-0 h-auto">
              <Link href="/login">
                View Demo <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-start space-x-4">
              <UserCircle className="h-12 w-12 text-primary flex-shrink-0 mt-1" />
              <CardDescription className="text-sm">
                This method can be used if you have a dedicated portal to maintain your vendors and their
                information on your own. We will provide the URL in response which can be used by your vendors to
                submit the Withholding forms.
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Request By Email</CardTitle>
            <Button variant="link" asChild className="text-primary p-0 h-auto">
              <Link href="/request-by-email"> 
                View Demo <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-start space-x-4">
              <FileText className="h-12 w-12 text-primary flex-shrink-0 mt-1" />
              <CardDescription className="text-sm">
                This method can be used if you prefer to request your vendor&apos;s Withholding certificate through Email.
                This can be used if you don&apos;t have a dedicated portal to maintain your vendor information.
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
