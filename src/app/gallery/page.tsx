import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Gallery - ProComm Media',
  description: 'Visual showcase of ProComm Media\'s projects, events, and activities in strategic communication and media coordination.',
};

const galleryImages = [
  {
    id: 1,
    src: '/images/project1.jpg',
    alt: 'Strategic Communication Workshop',
    category: 'Workshops',
    title: 'Strategic Communication Workshop',
    description: 'Training session on effective communication strategies for organizations.'
  },
  {
    id: 2,
    src: '/images/project2.jpg',
    alt: 'Media Training Session',
    category: 'Training',
    title: 'Media Training Session',
    description: 'Capacity building workshop for journalists and media professionals.'
  },
  {
    id: 3,
    src: '/images/project3.jpg',
    alt: 'Resilience Building Program',
    category: 'Programs',
    title: 'Resilience Building Program',
    description: 'Working with county governments in arid and semi-arid areas.'
  },
  {
    id: 4,
    src: '/images/project4.jpg',
    alt: 'Knowledge Management Workshop',
    category: 'Workshops',
    title: 'Knowledge Management Workshop',
    description: 'Training on information organization and utilization systems.'
  },
  {
    id: 5,
    src: '/images/project5.jpg',
    alt: 'Public Speaking Training',
    category: 'Training',
    title: 'Public Speaking Training',
    description: 'Building confidence and presentation skills for professionals.'
  },
  {
    id: 6,
    src: '/images/gallery1.jpg',
    alt: 'Media Coordination Event',
    category: 'Events',
    title: 'Media Coordination Event',
    description: 'Coordinating media response and strategic communication.'
  },
  {
    id: 7,
    src: '/images/gallery2.jpg',
    alt: 'Community Engagement',
    category: 'Community',
    title: 'Community Engagement',
    description: 'Building relationships and communication at the grassroots level.'
  },
  {
    id: 8,
    src: '/images/banner1.jpg',
    alt: 'Development Support Program',
    category: 'Programs',
    title: 'Development Support Program',
    description: 'Supporting development initiatives through strategic communication.'
  },
  {
    id: 9,
    src: '/images/banner2.jpg',
    alt: 'Crisis Communication Training',
    category: 'Training',
    title: 'Crisis Communication Training',
    description: 'Preparing organizations for effective crisis communication.'
  },
  {
    id: 10,
    src: '/images/banner3.jpg',
    alt: 'Agricultural Communication',
    category: 'Agriculture',
    title: 'Agricultural Communication',
    description: 'Supporting agricultural initiatives through targeted communication.'
  },
  {
    id: 11,
    src: '/images/services.jpg',
    alt: 'Team Collaboration',
    category: 'Team',
    title: 'Team Collaboration',
    description: 'Our team working together on strategic communication projects.'
  },
  {
    id: 12,
    src: '/images/pcm-logo.jpg',
    alt: 'ProComm Media Logo',
    category: 'Brand',
    title: 'ProComm Media Brand',
    description: 'Our visual identity and brand representation.'
  }
];

const categories = ['All', 'Workshops', 'Training', 'Programs', 'Events', 'Community', 'Agriculture', 'Team', 'Brand'];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-green-600 to-teal-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Gallery
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              A visual journey through our projects, events, and activities in strategic communication, 
              media coordination, and development support.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 hover:border-green-500 hover:text-green-600 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      {image.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
              Load More Images
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the organizations and individuals who have benefited from our strategic communication 
            and media coordination services.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}