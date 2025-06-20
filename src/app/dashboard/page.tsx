import CertificateCard from "@/components/dashboard/CertificateCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const mockCertificates = [
  { id: "1", title: "Web Development Masterclass", issuer: "Tech Academy", issueDate: "June 15, 2023", iconType: "award" as const, imageUrl: "https://placehold.co/600x400.png?a=1", imageHint: "web development" },
  { id: "2", title: "Project Management Professional", issuer: "Global Certifiers", issueDate: "March 02, 2024", iconType: "file" as const, imageUrl: "https://placehold.co/600x400.png?a=2", imageHint: "project management" },
  { id: "3", title: "Advanced Cloud Computing", issuer: "Cloud Institute", issueDate: "September 20, 2023", iconType: "award" as const, imageUrl: "https://placehold.co/600x400.png?a=3", imageHint: "cloud computing" },
  { id: "4", title: "Data Science Fundamentals", issuer: "Data University", issueDate: "January 10, 2024", iconType: "file" as const, imageUrl: "https://placehold.co/600x400.png?a=4", imageHint: "data science" },
];


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Certificates</h1>
        <Button className="transition-transform duration-200 hover:scale-105">
          <PlusCircle className="mr-2 h-5 w-5" /> Issue New Certificate
        </Button>
      </div>

      {mockCertificates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-4">You don&apos;t have any certificates yet.</p>
          <Button variant="outline">Issue Your First Certificate</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              title={cert.title}
              issuer={cert.issuer}
              issueDate={cert.issueDate}
              iconType={cert.iconType}
              imageUrl={cert.imageUrl}
              imageHint={cert.imageHint}
            />
          ))}
        </div>
      )}
    </div>
  );
}
