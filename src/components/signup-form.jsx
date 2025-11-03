import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

// ✅ Validation Schema
const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    emailOrPhone: z
      .string()
      .min(1, "Email or phone is required")
      .refine(
        (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^[0-9]{10,15}$/;
          return emailRegex.test(value) || phoneRegex.test(value);
        },
        { message: "Enter a valid email or phone number" }
      ),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      emailOrPhone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    let email = null;
    let phone = null;
    if (emailRegex.test(values.emailOrPhone)) email = values.emailOrPhone;
    else if (phoneRegex.test(values.emailOrPhone)) phone = values.emailOrPhone;

    console.log({
      name: values.name,
      email,
      phone,
      password: values.password,
    });
    alert("Form logged in console!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl shadow-lg rounded-xl overflow-hidden">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">
              Create your free account
            </h1>
            <Button
              variant="outline"
              className="w-full mb-4 flex items-center justify-center gap-2"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </Button>
            <div className="flex items-center my-4">
              <hr className="grow border-gray-300" />
              <span className="mx-2 text-gray-400">or</span>
              <hr className="grow border-gray-300" />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email or Phone Field */}
              <FormField
                control={form.control}
                name="emailOrPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email or phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-900"
              >
                Continue
              </Button>
            </form>
          </Form>

          <p className="text-xs text-gray-400 mt-4 text-center">
            By proceeding, you accept the{" "}
            <a href="#" className="underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-sm text-center mt-4">
            Already a user?{" "}
            <a href="/login" className="text-black underline">
              Log in
            </a>
          </p>
        </div>

        {/* Right - Illustration */}
        <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
          <svg className="w-64 h-64" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <line x1="100" y1="20" x2="100" y2="180" stroke="black" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="black" />
            <line x1="40" y1="40" x2="160" y2="160" stroke="black" />
            <line x1="160" y1="40" x2="40" y2="160" stroke="black" />
          </svg>
        </div>
      </div>
    </div>
  );
}
