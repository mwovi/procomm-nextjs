import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  BookOpen,
  Tag,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react';

// This would typically come from a database or CMS
const blogPosts = [
  {
    slug: 'strategic-communication-digital-age',
    title: 'Strategic Communication in the Digital Age',
    excerpt: 'Exploring how organizations can leverage digital platforms for effective strategic communication in today\'s interconnected world.',
    content: `
      <p>In today's rapidly evolving digital landscape, strategic communication has become more crucial than ever for organizations seeking to connect with their audiences meaningfully. The traditional boundaries between internal and external communication have blurred, creating new opportunities and challenges for communication professionals.</p>

      <h2>The Evolution of Digital Communication</h2>
      <p>Digital platforms have fundamentally transformed how we approach strategic communication. Social media, mobile applications, and digital collaboration tools have created new channels for engagement, but they've also increased the complexity of managing organizational messaging.</p>

      <p>Organizations must now navigate multiple platforms simultaneously, each with its own audience expectations, communication norms, and optimal content formats. This multi-platform reality requires a sophisticated understanding of how different channels complement and reinforce each other.</p>

      <h2>Key Principles for Digital Strategic Communication</h2>
      <p>Successful digital communication strategies are built on several foundational principles:</p>

      <h3>1. Audience-Centric Approach</h3>
      <p>Understanding your audience's digital behavior, preferences, and communication patterns is essential. This goes beyond demographics to include psychographics, online behaviors, and platform preferences.</p>

      <h3>2. Consistency Across Channels</h3>
      <p>While content may be adapted for different platforms, the core message and brand voice must remain consistent. This builds trust and reinforces organizational identity across touchpoints.</p>

      <h3>3. Real-Time Responsiveness</h3>
      <p>Digital communication happens in real-time, and audiences expect prompt responses. Organizations must be prepared to engage quickly and appropriately across all digital channels.</p>

      <h2>Challenges in Digital Communication</h2>
      <p>The digital age has also introduced unique challenges that communication professionals must navigate:</p>

      <ul>
        <li><strong>Information Overload:</strong> Audiences are bombarded with content, making it harder to capture and maintain attention.</li>
        <li><strong>Misinformation:</strong> The rapid spread of false information requires proactive communication strategies to maintain credibility.</li>
        <li><strong>Platform Dependencies:</strong> Relying heavily on third-party platforms can create vulnerabilities in communication strategies.</li>
        <li><strong>Privacy Concerns:</strong> Increasing awareness of data privacy requires more transparent and ethical communication practices.</li>
      </ul>

      <h2>Best Practices for Implementation</h2>
      <p>Organizations can maximize their digital communication effectiveness by following these best practices:</p>

      <h3>Develop a Digital Communication Strategy</h3>
      <p>Create a comprehensive strategy that aligns digital communication efforts with organizational goals. This should include platform selection, content calendars, crisis communication protocols, and measurement frameworks.</p>

      <h3>Invest in Training and Tools</h3>
      <p>Ensure your communication team has the skills and tools necessary to execute digital strategies effectively. This includes training on platform-specific best practices, content creation tools, and analytics platforms.</p>

      <h3>Monitor and Adapt</h3>
      <p>Digital communication requires continuous monitoring and adaptation. Use analytics to track performance, gather feedback, and adjust strategies based on what's working and what isn't.</p>

      <h2>The Future of Strategic Communication</h2>
      <p>As technology continues to evolve, strategic communication will become even more integrated with digital tools and platforms. Emerging technologies like artificial intelligence, virtual reality, and blockchain will create new opportunities for engagement and storytelling.</p>

      <p>Organizations that embrace these changes while maintaining focus on authentic, value-driven communication will be best positioned to succeed in the digital age.</p>

      <h2>Conclusion</h2>
      <p>Strategic communication in the digital age requires a balanced approach that leverages technology while maintaining human connection. By understanding audience needs, maintaining consistency, and staying adaptable, organizations can build effective digital communication strategies that drive meaningful engagement and achieve their strategic objectives.</p>
    `,
    image: '/images/project1.jpg',
    date: '2024-10-01',
    category: 'Communication',
    readTime: '5 min read',
    author: {
      name: 'Sarah Wanjiku',
      role: 'Senior Communication Strategist',
      image: '/images/gallery1.jpg'
    },
    tags: ['Digital Communication', 'Strategy', 'Technology', 'Best Practices'],
    views: 1245,
    likes: 89,
    comments: 23
  },
  {
    slug: 'building-resilience-arid-areas',
    title: 'Building Resilience in Arid and Semi-Arid Areas',
    excerpt: 'Our experience working with county governments to build resilience against climate challenges through effective communication strategies.',
    content: `
      <p>Arid and semi-arid areas across Kenya face unique challenges related to climate variability, water scarcity, and economic vulnerability. Effective communication strategies play a crucial role in building community resilience and enabling adaptive responses to these challenges.</p>

      <h2>Understanding the Context</h2>
      <p>Arid and semi-arid lands (ASALs) cover approximately 80% of Kenya's land mass and are home to over 15 million people. These areas are characterized by:</p>

      <ul>
        <li>Low and erratic rainfall patterns</li>
        <li>Frequent droughts and occasional floods</li>
        <li>Limited infrastructure and basic services</li>
        <li>Predominantly pastoral and agro-pastoral livelihoods</li>
        <li>High levels of poverty and food insecurity</li>
      </ul>

      <h2>The Role of Communication in Resilience Building</h2>
      <p>Communication serves as a critical enabler in building resilience by:</p>

      <h3>Facilitating Knowledge Transfer</h3>
      <p>Effective communication helps transfer traditional knowledge, scientific information, and best practices across communities. This includes sharing information about drought-resistant crops, water conservation techniques, and early warning systems.</p>

      <h3>Coordinating Response Efforts</h3>
      <p>During crisis situations, clear communication channels enable coordinated responses between communities, local governments, and humanitarian organizations. This coordination is essential for efficient resource allocation and timely intervention.</p>

      <h3>Building Social Cohesion</h3>
      <p>Communication strategies that promote dialogue and participation help build social cohesion, which is fundamental to community resilience. Strong social networks enable communities to support each other during difficult times.</p>

      <h2>Our Approach to Resilience Communication</h2>
      <p>ProComm Media has developed a comprehensive approach to resilience communication based on years of experience working in ASALs:</p>

      <h3>Community-Centered Design</h3>
      <p>We start by understanding local contexts, including cultural norms, communication preferences, and existing social structures. This ensures our interventions are appropriate and sustainable.</p>

      <h3>Multi-Channel Communication</h3>
      <p>We use a combination of traditional and modern communication channels, including radio programs, community meetings, mobile phone messaging, and visual communication materials.</p>

      <h3>Capacity Building</h3>
      <p>We invest in building local communication capacity by training community leaders, government officials, and local media practitioners. This ensures sustainability and local ownership of communication initiatives.</p>

      <h2>Case Study: Marsabit County Resilience Program</h2>
      <p>Our work with Marsabit County Government provides a concrete example of effective resilience communication:</p>

      <h3>Challenge</h3>
      <p>Marsabit County faced recurring droughts, limited access to early warning information, and weak coordination between different stakeholders involved in drought response.</p>

      <h3>Intervention</h3>
      <p>We developed a comprehensive communication strategy that included:</p>
      <ul>
        <li>Training 50+ community leaders on crisis communication</li>
        <li>Establishing community-based early warning systems</li>
        <li>Creating multilingual information materials</li>
        <li>Setting up coordination mechanisms between different stakeholders</li>
      </ul>

      <h3>Results</h3>
      <p>The intervention led to:</p>
      <ul>
        <li>85% improvement in early warning information dissemination</li>
        <li>Reduced response time to drought emergencies</li>
        <li>Enhanced coordination between county government and communities</li>
        <li>Improved preparedness for climate-related shocks</li>
      </ul>

      <h2>Lessons Learned</h2>
      <p>Our experience in resilience communication has taught us several important lessons:</p>

      <h3>Local Language Matters</h3>
      <p>Communication in local languages significantly improves understanding and uptake of resilience messages. Investing in translation and local content creation is essential.</p>

      <h3>Trust is Fundamental</h3>
      <p>Building trust between communities and institutions takes time but is essential for effective communication. Trust is built through consistent, transparent, and reliable communication.</p>

      <h3>Technology Must Be Appropriate</h3>
      <p>While modern technology can enhance communication, it must be appropriate to local contexts. In many ASALs, radio remains the most effective mass communication medium.</p>

      <h2>Moving Forward</h2>
      <p>As climate challenges intensify, the need for effective resilience communication will only grow. Key priorities for the future include:</p>

      <ul>
        <li>Integrating digital technologies where appropriate</li>
        <li>Strengthening links between traditional and scientific knowledge</li>
        <li>Building more robust early warning systems</li>
        <li>Enhancing coordination between different levels of government</li>
        <li>Investing in long-term capacity building</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Building resilience in arid and semi-arid areas requires a comprehensive approach that recognizes the central role of communication. By working closely with communities and local governments, we can develop communication strategies that enhance preparedness, coordinate responses, and build the social cohesion necessary for long-term resilience.</p>
    `,
    image: '/images/project2.jpg',
    date: '2024-09-28',
    category: 'Resilience',
    readTime: '7 min read',
    author: {
      name: 'David Kimani',
      role: 'Rural Development Specialist',
      image: '/images/gallery2.jpg'
    },
    tags: ['Climate Change', 'Resilience', 'Community Development', 'ASAL'],
    views: 892,
    likes: 67,
    comments: 18
  }
];

// Get related posts (excluding current post)
const getRelatedPosts = (currentSlug: string, currentCategory: string) => {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === currentCategory)
    .slice(0, 2);
};

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(post => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - ProComm Media',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${post.title} - ProComm Media Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name]
    }
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(post => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-white">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>

            {/* Category */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Tag className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Author Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.author.name}</h3>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <button className="flex items-center text-gray-500 hover:text-red-600 transition-colors duration-200">
                    <Heart className="w-5 h-5 mr-1" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200">
                    <Share2 className="w-5 h-5 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                  Related Articles
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="relative h-48">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(relatedPost.date).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-1" />
                            {relatedPost.readTime}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {relatedPost.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {relatedPost.excerpt.substring(0, 120)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}