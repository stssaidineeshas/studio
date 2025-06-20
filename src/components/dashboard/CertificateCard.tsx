import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Eye, Share2, FileText } from "lucide-react"; // Added FileText as another option

interface CertificateCardProps {
  title: string;
  issuer: string;
  issueDate: string;
  iconType?: "award" | "file";
  imageUrl?: string;
  imageHint?: string;
}

export default function CertificateCard({ 
  title, 
  issuer, 
  issueDate, 
  iconType = "award",
  imageUrl = "https://placehold.co/300x200.png",
  imageHint = "document certificate"
}: CertificateCardProps) {
  
  const IconComponent = iconType === "award" ? Award : FileText;

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start gap-3">
          <IconComponent className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
          <div>
            <CardTitle className="font-headline text-xl mb-1">{title}</CardTitle>
            <CardDescription>Issued by: {issuer}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Issue Date: {issueDate}</p>
        <div className="aspect-[3/2] w-full overflow-hidden rounded-md">
         <Image 
            src={imageUrl} 
            alt={`${title} preview`} 
            width={300} 
            height={200} 
            className="object-cover w-full h-full"
            data-ai-hint={imageHint}
          />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          <Eye className="mr-2 h-4 w-4" /> View
        </Button>
        <Button className="flex-1">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
