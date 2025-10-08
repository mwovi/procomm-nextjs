'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Resilience Knowledge Fare',
      category: 'resilience',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/20230706_132733_l9emii.jpg',
      description: 'Our team has trained journalists to acquire new skills necessary in their trade and helped county governments, especially in the arid and semi-arid areas to build resilience that will enable them to withstand the shocks and vagaries of weather changes through effective and efficient communication.',
      link: '#'
    },
    {
      id: 2,
      title: 'Authoring and Publishing',
      category: 'agricultural',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/10_rich_2_z8bvak.jpg',
      description: 'Over the last two years, Seed Savers Network a social enterprise dedicated to improving seed access and agro-biodiversity conservation in partnership with Hivos East Africa has been researching and documenting rich, underutilized crops.',
      link: 'https://hivos.org/10-richunderutilized-crops-in-kenya/'
    },
    {
      id: 3,
      title: 'Media Mobilization',
      category: 'media',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/garissa_media_veskxg.jpg',
      description: 'ProComm provides training of various tools, techniques, and platforms used in the creation, distribution, and consumption of different types of media content, such as audio, video, graphics, and more.',
      link: '#'
    },
    {
      id: 4,
      title: 'Engagement with County',
      category: 'training',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/20230502_120952_qmqdc0.jpg',
      description: 'This is a comprehensive program designed to equip aspiring journalists with the necessary skills, knowledge, and practical experience to excel in the dynamic field of journalism.',
      link: '#'
    },
    {
      id: 5,
      title: 'Media Training and Capacity Building',
      category: 'training',
      image: 'https://res.cloudinary.com/dcutc6ix8/image/upload/speech_g9jko3.jpg',
      description: 'We focus on creating educational content, and training modules to share knowledge and skills on various subjects. We draw this from our pool of professionals who are well-tested in media and journalism.',
      link: '#'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'agricultural', name: 'Agricultural Insights' },
    { id: 'media', name: 'Media Technologies' },
    { id: 'training', name: 'Journalists Training' },
    { id: 'resilience', name: 'Resilience Knowledge' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore our projects and gain a deeper understanding of the intricate interplay between technology, 
            sustainability, policy, and the people who drive the agriculture sector forward. Whether you&apos;re a farmer, 
            industry professional, policymaker, or anyone our projects are designed to inform, inspire, and foster 
            meaningful conversations that shape the future of different sectors.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Overlay Link */}
                {project.link !== '#' && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                  {project.description}
                </p>
                
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                    {filters.find(f => f.id === project.category)?.name || 'General'}
                  </span>
                  
                  {project.link !== '#' && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300"
                    >
                      Learn More →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;