'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const features = [
    'Strategic Communication',
    'Media Coordination', 
    'Knowledge Management',
    'Resilience Building'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0">
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800" />
        
        {/* Secondary overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
        
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/15 rounded-full blur-2xl animate-pulse delay-500" />
        
        {/* Floating particles effect */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-700" />
        <div className="absolute top-2/3 left-3/4 w-3 h-3 bg-yellow-400/40 rounded-full animate-bounce delay-1000" />
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-purple-400/50 rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-900" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg hover:bg-white/15 transition-all duration-300">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">Strategic Communication & Media Coordination</span>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block mb-2">Empowering Organizations</span>
            <span className="block mb-2">Through</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
              Strategic Communication
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl opacity-95 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            ProComm Media is strategically placed to support individuals and organizations to make 
            the necessary positive shifts through expert communication strategies and media coordination.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-sm md:text-base">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/services"
              className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border border-white/20"
            >
              Explore Our Services
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center px-10 py-5 bg-transparent border-2 border-white/80 text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-2xl"
            >
              Get In Touch
              <div className="ml-3 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-80">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-80">Professionals Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">10+</div>
              <div className="text-sm opacity-80">Counties Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;