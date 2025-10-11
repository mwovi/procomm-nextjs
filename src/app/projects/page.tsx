import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Calendar,
  MapPin,
  Users,
  Award,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Projects - ProComm Media',
  description: 'Explore our portfolio of successful strategic communication, media coordination, and development support projects across various sectors.',
};

const projects = [
  {
    id: 1,
    title: 'Resilience Knowledge Fare',
    category: 'resilience',
    location: 'Marsabit County',
    date: '2023-2024',
    client: 'County Government of Marsabit',
    image: '/images/project1.jpg',
    description: 'Our team trained journalists to acquire new skills necessary in their trade and helped county governments, especially in the arid and semi-arid areas to build resilience that will enable them to withstand the shocks and vagaries of weather changes through effective and efficient communication.',
    results: [
      '50+ journalists trained',
      '15 communication strategies developed',
      '3 counties reached',
      '85% improvement in crisis communication'
    ],
    tags: ['Training', 'Crisis Communication', 'Climate Resilience'],
    status: 'completed',
    featured: true
  },
  {
    id: 2,
    title: 'Authoring and Publishing Initiative',
    category: 'agricultural',
    location: 'Kenya',
    date: '2022-2024',
    client: 'Seed Savers Network & Hivos East Africa',
    image: '/images/project2.jpg',
    description: 'Over the last two years, Seed Savers Network a social enterprise dedicated to improving seed access and agro-biodiversity conservation in partnership with Hivos East Africa has been researching and documenting rich, underutilized crops.',
    results: [
      '10 crop varieties documented',
      '500+ farmers reached',
      '2 publications released',
      '70% increase in crop diversity awareness'
    ],
    tags: ['Agriculture', 'Documentation', 'Research'],
    status: 'completed',
    link: 'https://hivos.org/10-richunderutilized-crops-in-kenya/',
    featured: true
  },
  {
    id: 3,
    title: 'Media Mobilization Program',
    category: 'media',
    location: 'Garissa County',
    date: '2023',
    client: 'Various Media Houses',
    image: '/images/project3.jpg',
    description: 'ProComm provides training of various tools, techniques, and platforms used in the creation, distribution, and consumption of different types of media content, such as audio, video, graphics, and more.',
    results: [
      '30+ media professionals trained',
      '5 media houses engaged',
      '100+ content pieces created',
      '60% improvement in content quality'
    ],
    tags: ['Media Training', 'Content Creation', 'Digital Media'],
    status: 'completed',
    featured: false
  },
  {
    id: 4,
    title: 'County Engagement Initiative',
    category: 'training',
    location: 'Multiple Counties',
    date: '2023',
    client: 'County Governments',
    image: '/images/project4.jpg',
    description: 'This is a comprehensive program designed to equip aspiring journalists with the necessary skills, knowledge, and practical experience to excel in the dynamic field of journalism.',
    results: [
      '75 government officials trained',
      '8 counties participated',
      '20 communication policies developed',
      '90% participant satisfaction rate'
    ],
    tags: ['Government Training', 'Policy Development', 'Capacity Building'],
    status: 'completed',
    featured: false
  },
  {
    id: 5,
    title: 'Media Training & Capacity Building',
    category: 'training',
    location: 'Nairobi',
    date: '2022-2023',
    client: 'Independent Journalists',
    image: '/images/project5.jpg',
    description: 'We focus on creating educational content, and training modules to share knowledge and skills on various subjects. We draw this from our pool of professionals who are well-tested in media and journalism.',
    results: [
      '120 journalists trained',
      '15 training modules developed',
      '6 workshops conducted',
      '95% employment rate post-training'
    ],
    tags: ['Journalism', 'Professional Development', 'Skills Training'],
    status: 'completed',
    featured: true
  },
  {
    id: 6,
    title: 'Community Communication Hub',
    category: 'community',
    location: 'Turkana County',
    date: '2024',
    client: 'Turkana County Government',
    image: '/images/gallery1.jpg',
    description: 'Establishing communication networks and training community leaders to effectively disseminate information and coordinate response efforts during emergencies.',
    results: [
      '25 community leaders trained',
      '5 communication hubs established',
      '1000+ community members reached',
      '80% faster emergency response time'
    ],
    tags: ['Community Engagement', 'Emergency Response', 'Information Systems'],
    status: 'ongoing',
    featured: false
  }
];

const categories = [
  { id: 'all', name: 'All Projects', count: projects.length },
  { id: 'agricultural', name: 'Agricultural Insights', count: projects.filter(p => p.category === 'agricultural').length },
  { id: 'media', name: 'Media Technologies', count: projects.filter(p => p.category === 'media').length },
  { id: 'training', name: 'Training Programs', count: projects.filter(p => p.category === 'training').length },
  { id: 'resilience', name: 'Resilience Building', count: projects.filter(p => p.category === 'resilience').length },
  { id: 'community', name: 'Community Projects', count: projects.filter(p => p.category === 'community').length }
];

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '15+', label: 'Counties Reached' },
  { number: '500+', label: 'Professionals Trained' },
  { number: '10K+', label: 'Lives Impacted' }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-br from-green-600 via-teal-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Our Portfolio</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Discover how we&apos;ve helped organizations across Kenya achieve their communication 
              goals through strategic planning and expert execution.
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

      {/* Filters & Search */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full lg:w-80"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-green-500 hover:text-green-600 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Highlighting some of our most impactful and successful communication initiatives 
              that have driven meaningful change across various sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.filter(project => project.featured).map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Client: {project.client}
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {project.results.slice(0, 4).map((result, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-semibold text-gray-900">{result}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {project.results[0]}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                      >
                        View Project
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Projects
            </h2>
            <p className="text-lg text-gray-600">
              Browse our complete portfolio of communication and media coordination projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'agricultural' ? 'bg-green-100 text-green-800' :
                      project.category === 'media' ? 'bg-blue-100 text-blue-800' :
                      project.category === 'training' ? 'bg-purple-100 text-purple-800' :
                      project.category === 'resilience' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {categories.find(c => c.id === project.category)?.name.replace(' Projects', '')}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                    <span className="mx-2">•</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {project.description.substring(0, 120)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-teal-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join the organizations that have transformed their communication strategies 
              with our expert guidance and proven methodologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                Start Your Project
                <ExternalLink className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}