"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation"; 

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, { // Changed min to 1 as per image (no specific length mentioned)
    message: "Password is required.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (values.email === "martinmiller@gmail.com" && values.password === "password") { // Example credentials
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
      form.setError("root", { message: "Invalid credentials" }); 
      form.setError("email", { message: "" }); 
      form.setError("password", { message: "" }); 
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl rounded-lg">
      <CardHeader className="text-left pt-8 pb-6 px-8">
        <CardTitle className="text-2xl font-semibold font-body">Sign In to your Account</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">Email Id</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="martinmiller@gmail.com" 
                      {...field} 
                      aria-describedby="email-message"
                      className="text-base md:text-sm h-11"
                    />
                  </FormControl>
                  <FormMessage id="email-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-gray-600">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      aria-describedby="password-message"
                      className="text-base md:text-sm h-11"
                    />
                  </FormControl>
                  <FormMessage id="password-message" />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
            )}
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium transition-transform duration-200 hover:scale-105 mt-4" 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
