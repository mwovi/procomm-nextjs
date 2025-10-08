'use client';

import Image from 'next/image';
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  Mic, 
  Shield, 
  Zap 
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: 'Training and Skill Development',
      description: 'Comprehensive programs designed to equip individuals and teams with essential skills for professional growth and development.'
    },
    {
      icon: MessageCircle,
      title: 'Strategic Communication',
      description: 'Expert communication strategies that help organizations effectively reach and engage their target audiences.'
    },
    {
      icon: BookOpen,
      title: 'Knowledge Management',
      description: 'Systematic approaches to organizing, accessing, and utilizing information for informed decision-making.'
    },
    {
      icon: Mic,
      title: 'Public Speaking',
      description: 'Professional training to enhance public speaking skills and build confidence in presentations and communications.'
    },
    {
      icon: Shield,
      title: 'Resilience Building',
      description: 'Helping organizations and communities prepare for and adapt to environmental challenges and uncertainties.'
    },
    {
      icon: Zap,
      title: 'Adaptation to Change',
      description: 'Specialized support to help entities navigate and thrive through periods of transformation and change.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="mb-12 lg:mb-0">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dcutc6ix8/image/upload/what_we_offer_h3ypdp.jpg"
                alt="What We Offer"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto lg:mx-0 mb-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                        <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center lg:text-left">
              <a
                href="#contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Learn More About Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;