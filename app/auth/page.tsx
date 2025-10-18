'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { auth } from '@/lib/auth-client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Type definitions
type AuthMode = 'signin' | 'signup';

type AuthProvider = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Zod Schemas
const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Please enter a valid name" }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Infer types from Zod schemas
type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [mode, setMode] = useState<AuthMode>('signin');

  // Auth providers configuration
  const authProviders: AuthProvider[] = [
    { name: 'Google', icon: FcGoogle },
    { name: 'Github', icon: FaGithub }
  ];

  // Form setup with conditional schema
  const form = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(mode === 'signin' ? signInSchema : signUpSchema),
    defaultValues: {
      name: "",
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Switch between sign in/up and reset form
  const toggleMode = (): void => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    form.reset({
      name: "",
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  // Sign In Handler
  const handleSignIn = async (data: SignInFormData): Promise<void> => {
    try {
      await auth.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      }, { onError: (err) => {
          form.setError("root", { type: "value", message: err.error.message })
        } });
      router.push("/dashboard")
    } catch (error: any) {
      // Handle known HTTP errors
      if (error?.status === 401 || error?.status === 404) {
        form.setError("root", {
          type: "value",
          message: "Invalid email or password. Please try again.",
        });
      } else {
        // Handle unexpected errors
        form.setError("root", {
          type: "value",
          message: "Something went wrong. Please try again later.",
        });
        console.error("Sign-in error:", error);
      }
    }
  };

  // Sign Up Handler
  const handleSignUp = async (data: SignUpFormData): Promise<void> => {
    try {
      await auth.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      }, {
        onError: (err) => {
          form.setError("root", { type: "value", message: err.error.message })
        }
      });
      router.push("/dashboard");
    } catch (error: any) {
      // Handle known HTTP errors
      if (error?.status === 401 || error?.status === 404) {
        form.setError("root", {
          type: "value",
          message: "Invalid or already registered user. Please check your details.",
        });
      } else {
        // Handle unexpected errors
        form.setError("root", {
          type: "value",
          message: "Something went wrong during sign-up. Please try again later.",
        });
        console.error("Sign-up error:", error);
      }
    }
  };


  // General form submission handler
  const handleSubmit = async (data: SignInFormData | SignUpFormData): Promise<void> => {
    try {
      setLoading(true)
      if (mode === 'signin') {
        // Call sign in handler with typed data
        await handleSignIn(data as SignInFormData);
      } else {
        // Call sign up handler with typed data
        await handleSignUp(data as SignUpFormData);
      } 
    } finally {
      setLoading(false);
    }
  };

  // Handle social auth
  const handleSocialAuth = async (provider: string) => {
    await auth.signIn.social({ provider, callbackURL: "/dashboard", errorCallbackURL: "/error", newUserCallbackURL: "/welcome" })
  };

  const isSignUp = mode === 'signup';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Sign up to get started with your account' 
              : 'Sign in to your account to continue'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Social auth providers */}
          <div className="grid grid-cols-2 gap-3">
            {authProviders.map((provider, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full"
                onClick={() => handleSocialAuth(provider.name.toLowerCase())}
              >
                <provider.icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{provider.name}</span>
                <span className="sm:hidden">{provider.name.slice(0, 3)}</span>
              </Button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form with shadcn Form component */}
          <Form {...form}>
            <div className="space-y-4">

              { /* Name field (Sign up only) */ }
              {isSignUp && (
                <FormField control={form.control} name='name' render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="eviltwin"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              )}

              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password field (Sign Up only) */}
              {isSignUp && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Forgot password link (Sign In only) */}
              {!isSignUp && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 font-normal"
                    onClick={() => console.log('Forgot password clicked')}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              { form.formState.errors?.root && <p className='text-sm text-red-500'>{form.formState.errors?.root.message}</p> }

              {/* Submit button */}
              <Button
                type="button"
                className="w-full flex items-center justify-center gap-2"
                onClick={form.handleSubmit(handleSubmit)}
                disabled={loading}
              >
                {loading && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {isSignUp ? 'Create account' : 'Sign in'}
              </Button>
            </div>
          </Form>

          {/* Terms (Sign Up only) */}
          {isSignUp && (
            <p className="text-xs text-center text-muted-foreground pt-2">
              By signing up, you agree to our{' '}
              <Button variant="link" className="p-0 h-auto font-normal text-xs">
                Terms of Service
              </Button>
              {' '}and{' '}
              <Button variant="link" className="p-0 h-auto font-normal text-xs">
                Privacy Policy
              </Button>
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={toggleMode}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;