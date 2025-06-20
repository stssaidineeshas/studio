
import LoginForm from "@/components/auth/LoginForm";
import LogoIcon from "@/components/icons/LogoIcon";

export default function ClientPortalLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 bg-background px-4">
      <div className="mb-8 text-center">
        <LogoIcon className="h-14 w-14 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground">Client Portal</h1>
      </div>
      <LoginForm />
    </div>
  );
}
