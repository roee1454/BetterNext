'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">Welcome to YourApp</h1>
          <p className="text-xl text-muted-foreground">
            A simple platform to manage your workflow and boost productivity.
          </p>
        </div>

        {/* Image/Lottie Placeholder */}
        <Card>
          <CardContent className="p-12">
            <div className="aspect-video bg-muted rounded-lg border-2 border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Image/Lottie Placeholder</p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 pt-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold mb-2">Fast</h3>
              <p className="text-sm text-muted-foreground">Lightning quick performance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold mb-2">Secure</h3>
              <p className="text-sm text-muted-foreground">Your data is safe</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold mb-2">Simple</h3>
              <p className="text-sm text-muted-foreground">Easy to use interface</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <Link href="/dashboard">
          <Button size="lg" className="text-lg">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}