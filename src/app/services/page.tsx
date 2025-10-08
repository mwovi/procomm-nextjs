import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  Users, 
  Megaphone, 
  Shield, 
  Target, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Quote
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services - ProComm Media',
  description: 'Comprehensive strategic communication, media coordination, and development support services tailored to your organizational needs.',
};

const services = [
  {
    id: 1,
    icon: BookOpen,
    title: 'Knowledge Sharing & Management',
    description: 'In a world where information is constantly evolving, we help clients organize, access, and utilize information effectively for informed decision-making.',
    features: [
      'Information Architecture',
      'Knowledge Base Development', 
      'Documentation Systems',
      'Training Materials Creation'
    ],
    image: '/images/services.jpg'
  },
  {
    id: 2,
    icon: Megaphone,
    title: 'Media Coordination & Communication',
    description: 'Strategic media coordination and communication assistance drawing from our pool of professionals tested in media, journalism, and strategic communication.',
    features: [
      'Media Strategy Development',
      'Press Release Writing',
      'Media Relations',
      'Communication Planning'
    ],
    image: '/images/project1.jpg'
  },
  {
    id: 3,
    icon: Shield,
    title: 'Resilience Building',
    description: 'Helping entities prepare for and adapt to environmental challenges and uncertainties, especially supporting county governments in arid and semi-arid areas.',
    features: [
      'Climate Adaptation Strategies',
      'Community Resilience Planning',
      'Risk Communication',
      'Capacity Building Programs'
    ],
    image: '/images/project2.jpg'
  },
  {
    id: 4,
    icon: Users,
    title: 'Training & Capacity Building',
    description: 'Comprehensive training programs designed to equip professionals with necessary skills in journalism, communication, and development support.',
    features: [
      'Journalism Training',
      'Public Speaking Workshops',
      'Communication Skills',
      'Professional Development'
    ],
    image: '/images/project3.jpg'
  },
  {
    id: 5,
    icon: Target,
    title: 'Strategic Communication Planning',
    description: 'Develop comprehensive communication strategies that align with your organizational goals and effectively reach your target audiences.',
    features: [
      'Communication Audits',
      'Strategy Development',
      'Message Framework',
      'Implementation Planning'
    ],
    image: '/images/project4.jpg'
  },
  {
    id: 6,
    icon: TrendingUp,
    title: 'Development Support Communication',
    description: 'Supporting development initiatives through targeted communication strategies that engage communities and stakeholders effectively.',
    features: [
      'Community Engagement',
      'Stakeholder Communication',
      'Project Communication',
      'Impact Storytelling'
    ],
    image: '/images/project5.jpg'
  }
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Assessment',
    description: 'We begin by understanding your unique challenges, goals, and communication needs through comprehensive consultation.'
  },
  {
    number: '02', 
    title: 'Strategy Development',
    description: 'Our team crafts a tailored communication strategy that aligns with your objectives and target audience.'
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'We execute the strategy with precision, utilizing our expertise and proven methodologies for maximum impact.'
  },
  {
    number: '04',
    title: 'Monitoring & Optimization',
    description: 'Continuous monitoring and refinement ensure your communication efforts deliver measurable results.'
  }
];

const testimonials = [
  {
    name: 'Sarah Kimani',
    role: 'County Director',
    company: 'Marsabit County',
    quote: 'ProComm Media transformed how we communicate with our communities. Their resilience building program was exactly what we needed.',
    image: '/images/gallery1.jpg'
  },
  {
    name: 'John Mwangi',
    role: 'Media Manager',
    company: 'Green Initiative Kenya',
    quote: 'The strategic communication training provided by ProComm Media significantly improved our media outreach and public engagement.',
    image: '/images/gallery2.jpg'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-sm font-medium">Professional Services</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Comprehensive strategic communication and media coordination services 
              designed to empower organizations and drive meaningful change.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of services is designed to address your unique communication 
              challenges and help you achieve your organizational goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure your communication objectives are met 
              with precision and measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-700 opacity-30 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Don&apos;t just take our word for it - hear from organizations we&apos;ve helped succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 relative">
                <Quote className="w-12 h-12 text-blue-600 opacity-20 absolute top-4 right-4" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 relative overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Communication?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Let&apos;s discuss how our services can help you achieve your communication goals 
              and drive meaningful impact in your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}