import LoginForm from "@/components/auth/LoginForm";
import LogoIcon from "@/components/icons/LogoIcon";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 bg-background">
      <div className="flex items-center space-x-3 mb-10">
        <LogoIcon className="h-14 w-14 text-blue-600" />
        <div className="font-body">
          <h1 className="text-4xl font-bold text-gray-700">CLIENT</h1>
          <p className="text-base text-gray-500 tracking-wider -mt-1">Portal</p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
