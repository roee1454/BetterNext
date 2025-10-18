'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: TrendingUp, text: 'Next JS + Shadcn' },
    { icon: Zap, text: 'Neon + Redis Integration' },
    { icon: Shield, text: 'BetterAuth Security' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden flex items-center">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.5s ease-out',
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Introducing our latest features</span>
          </div>

          {/* Main headline */}
          <div className="space-y-6">
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Build Your Dream SaaS
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                10x Faster
              </span>
            </h1>
            <p
              className={`max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              The most straight-forward template to use for innovative ideas. From idea to production in minutes, not months.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
            >
              <Link href={"/auth"}>
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all hover:scale-105"
            >
              View Demo
            </Button>
          </div>

          {/* Feature pills */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 pt-8 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 backdrop-blur-sm border border-border hover:bg-muted hover:border-border/50 transition-all cursor-default hover:scale-105"
              >
                <feature.icon className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Social proof
          <div
            className={`pt-12 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-sm text-muted-foreground/60 mb-6">Trusted by innovative teams worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-50 hover:opacity-70 transition-opacity">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-24 h-8 bg-muted rounded animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Floating elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-lg rotate-12 animate-pulse"
        style={{ animationDuration: '3s' }}
      />
      <div
        className="absolute bottom-32 right-20 w-16 h-16 border border-primary/30 rounded-full animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute top-1/2 right-10 w-12 h-12 border border-primary/30 rounded-lg -rotate-12 animate-pulse"
        style={{ animationDuration: '5s' }}
      />
    </div>
  );
};

export default HeroSection;