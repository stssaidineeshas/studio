
import LoginForm from "@/components/auth/LoginForm";
import LogoIcon from "@/components/icons/LogoIcon";

export default function ClientPortalLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 bg-background px-4">
      <div className="mb-10">
        <div className="flex items-center justify-center space-x-2">
          <LogoIcon className="h-9 w-9 text-blue-600" /> {/* Specific blue for the icon */}
          <span className="text-2xl font-bold text-foreground">CLIENT</span>
          <span className="text-2xl font-medium text-blue-500">Portal</span> {/* Lighter blue for Portal */}
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
