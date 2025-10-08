import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog - ProComm Media',
  description: 'Latest insights and articles from ProComm Media on strategic communication, media coordination, and development support.',
};

const blogPosts = [
  {
    id: 1,
    title: 'Strategic Communication in the Digital Age',
    excerpt: 'Exploring how organizations can leverage digital platforms for effective strategic communication in today\'s interconnected world.',
    image: '/images/project1.jpg',
    date: '2024-10-01',
    category: 'Communication',
    readTime: '5 min read',
    slug: 'strategic-communication-digital-age'
  },
  {
    id: 2,
    title: 'Building Resilience in Arid and Semi-Arid Areas',
    excerpt: 'Our experience working with county governments to build resilience against climate challenges through effective communication strategies.',
    image: '/images/project2.jpg',
    date: '2024-09-28',
    category: 'Resilience',
    readTime: '7 min read',
    slug: 'building-resilience-arid-areas'
  },
  {
    id: 3,
    title: 'Media Training Best Practices',
    excerpt: 'Essential training techniques and tools for developing media skills and building capacity in journalism and communication.',
    image: '/images/project3.jpg',
    date: '2024-09-25',
    category: 'Training',
    readTime: '4 min read',
    slug: 'media-training-best-practices'
  },
  {
    id: 4,
    title: 'Knowledge Management for Organizations',
    excerpt: 'How effective knowledge management systems can transform organizational learning and decision-making processes.',
    image: '/images/project4.jpg',
    date: '2024-09-22',
    category: 'Knowledge Management',
    readTime: '6 min read',
    slug: 'knowledge-management-organizations'
  },
  {
    id: 5,
    title: 'Public Speaking and Presentation Skills',
    excerpt: 'Tips and techniques for developing confident public speaking abilities and creating impactful presentations.',
    image: '/images/project5.jpg',
    date: '2024-09-20',
    category: 'Training',
    readTime: '5 min read',
    slug: 'public-speaking-presentation-skills'
  },
  {
    id: 6,
    title: 'Media Coordination in Crisis Communication',
    excerpt: 'Effective strategies for coordinating media response during crisis situations and emergency communications.',
    image: '/images/gallery1.jpg',
    date: '2024-09-18',
    category: 'Crisis Communication',
    readTime: '8 min read',
    slug: 'media-coordination-crisis-communication'
  }
];

const categories = ['All', 'Communication', 'Resilience', 'Training', 'Knowledge Management', 'Crisis Communication'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Insights & Articles
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Stay updated with the latest trends in strategic communication, media coordination, 
              and development support from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 text-gray-900">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}