'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/banner1_w5xchy.jpg',
      title: 'Media coordination and communication assistance',
      subtitle: 'ProComm Media is strategically placed to support individuals and organizations to make the necessary positive shifts. Drawing from our pool of professionals who are well-tested in media and journalism, strategic communication, public speaking and development support communication.',
      cta: 'Get in touch',
      ctaLink: '/contact'
    },
    {
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/banner2_kdbyc2.jpg',
      title: 'Knowledge sharing and management',
      subtitle: 'In a world where information is constantly evolving and changing, knowledge management is crucial. This service involves helping clients organize, access and utilize information effectively in order to make informed decisions.',
      cta: 'Get in touch',
      ctaLink: '/contact'
    },
    {
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/banner3_jpmns9.jpg',
      title: 'Resilience Building',
      subtitle: 'The organization has experience in helping entities prepare for and adapt to environmental challenges and uncertainties, hence its commitment to working with county governments to build resilience in arid and semi-arid areas.',
      cta: 'Get in touch',
      ctaLink: '/contact'
    }
  ];

  const features = [
    'Training and Skill Development',
    'Strategic Communication', 
    'Knowledge Management',
    'Public Speaking',
    'Resilience Building',
    'Adaptation to Change'
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-700/30 to-indigo-800/30" />
        </div>
      ))}

      {/* Enhanced Gradient Background Overlay */}
      <div className="absolute inset-0 z-10">
        {/* Secondary overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
        
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/8 rounded-full blur-2xl animate-pulse delay-500" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Dynamic Content */}
          <div className="transition-all duration-700 ease-in-out">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                {slides[currentSlide].title}
              </span>
            </h1>

            <p className="text-xl md:text-2xl opacity-95 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-sm md:text-base">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex justify-center items-center mb-10">
            <Link
              href="/contact"
              className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border border-white/20"
            >
              Get In Touch
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Strategic Communication Badge */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">Strategic Communication & Media Coordination</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">2k</div>
              <div className="text-sm opacity-80">Multimedia Rich Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">40</div>
              <div className="text-sm opacity-80">Expert Voices and Insights</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">12</div>
              <div className="text-sm opacity-80">Inspiring Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">160</div>
              <div className="text-sm opacity-80">Community Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;