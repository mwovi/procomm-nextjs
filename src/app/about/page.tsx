import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Target,
  Eye,
  Heart,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Calendar,
  TrendingUp
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - ProComm Media',
  description: 'Learn about ProComm Media\'s mission, vision, and the expert team behind our strategic communication and media coordination services.',
};

const teamMembers = [
  {
    name: 'Sarah Wanjiku',
    role: 'Founder & Managing Director',
    image: '/images/gallery1.jpg',
    bio: 'With over 15 years of experience in strategic communication and journalism, Sarah leads our vision of transforming organizational communication across Kenya.',
    expertise: ['Strategic Communication', 'Media Relations', 'Crisis Management']
  },
  {
    name: 'David Kimani',
    role: 'Senior Communication Strategist',
    image: '/images/gallery2.jpg', 
    bio: 'David specializes in developing comprehensive communication strategies for government and non-profit organizations, with a focus on rural development.',
    expertise: ['Government Relations', 'Rural Communication', 'Policy Advocacy']
  },
  {
    name: 'Grace Muthoni',
    role: 'Training & Capacity Building Lead',
    image: '/images/project3.jpg',
    bio: 'Grace has trained over 300 journalists and communication professionals across Kenya, bringing expertise in adult learning and professional development.',
    expertise: ['Journalism Training', 'Capacity Building', 'Workshop Facilitation']
  },
  {
    name: 'James Ochieng',
    role: 'Media Coordination Specialist',
    image: '/images/project4.jpg',
    bio: 'James coordinates complex media campaigns and manages relationships with media houses across Kenya, ensuring effective message dissemination.',
    expertise: ['Media Relations', 'Campaign Management', 'Digital Media']
  }
];

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in every project, ensuring our clients receive the highest quality communication solutions.'
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We operate with unwavering integrity, building trust through transparent and ethical communication practices.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of collaboration, working closely with our clients to achieve shared communication goals.'
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'We focus on creating meaningful impact that drives positive change in communities and organizations.'
  }
];

const milestones = [
  {
    year: '2018',
    title: 'Company Founded',
    description: 'ProComm Media was established with a vision to transform communication in Kenya.'
  },
  {
    year: '2019',
    title: 'First Major Project',
    description: 'Successfully completed our first county-wide communication training program.'
  },
  {
    year: '2020',
    title: 'Digital Expansion',
    description: 'Expanded services to include digital media training and online communication strategies.'
  },
  {
    year: '2021',
    title: 'Partnership Growth',
    description: 'Formed strategic partnerships with international development organizations.'
  },
  {
    year: '2022',
    title: 'Award Recognition',
    description: 'Received Kenya Communication Excellence Award for outstanding service delivery.'
  },
  {
    year: '2023',
    title: 'Regional Expansion',
    description: 'Extended services to cover all counties in Kenya with specialized programs.'
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Launched our Communication Innovation Hub for research and development.'
  }
];

const stats = [
  { number: '6+', label: 'Years of Excellence' },
  { number: '50+', label: 'Projects Completed' },
  { number: '15+', label: 'Counties Served' },
  { number: '500+', label: 'Professionals Trained' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">About ProComm Media</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              We are a team of passionate communication professionals dedicated to empowering 
              organizations across Kenya through strategic communication and media coordination.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower individuals and organizations across Kenya with strategic communication 
                solutions that drive positive change and sustainable development in their communities.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading strategic communication partner in Kenya, recognized for excellence 
                in transforming organizational communication and building resilient communities.
              </p>
            </div>

            {/* Impact */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Since 2018, we have trained over 500 professionals, completed 50+ projects, 
                and positively impacted communities across 15+ counties in Kenya.
              </p>
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src="/images/project1.jpg"
                  alt="Our story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  ProComm Media was born from a vision to bridge the communication gap that exists 
                  between organizations and their target audiences in Kenya. Founded in 2018 by a team 
                  of experienced communication professionals, we recognized the critical need for 
                  strategic communication services in both the public and private sectors.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our journey began with a simple belief: effective communication is the foundation 
                  of positive change. Whether it&apos;s helping county governments build resilience 
                  against climate challenges or training journalists to better serve their communities, 
                  we are committed to making a lasting impact.
                </p>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">
                    Trusted by organizations across Kenya since 2018
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide every decision we make and every project we undertake, 
              ensuring we deliver exceptional value to our clients and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From our humble beginnings to becoming a trusted communication partner, 
              explore the key milestones that have shaped our growth and impact.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-700 hidden lg:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-lg font-bold text-blue-600">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
                  </div>
                  
                  <div className="hidden lg:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team of communication experts brings together decades of experience 
              in journalism, strategic communication, and development support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join the organizations and individuals who have transformed their communication 
              strategies with ProComm Media. Let&apos;s create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                Get In Touch
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