import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export const metadata: Metadata = {
  title: 'Blog - ProComm Media',
  description: 'Latest insights and articles from ProComm Media on strategic communication, media coordination, and development support.',
};

// Enable ISR with 60 seconds revalidation
export const revalidate = 60;

// Force dynamic rendering for admin users
export const dynamic = 'auto';

// Types for blog data
interface BlogPostType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  views: number;
}

// Loading component for blog posts
function BlogPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-2 w-5/6"></div>
            <div className="h-3 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Function to fetch blog posts from database
async function getBlogPosts(page: number = 1, limit: number = 6): Promise<{ posts: BlogPostType[], total: number, pages: number }> {
  try {
    await dbConnect();
    
    const skip = (page - 1) * limit;
    
    // Fetch only published blog posts
    const posts = await BlogPost
      .find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('title slug excerpt featuredImage author publishedAt tags views')
      .lean();
    
    const total = await BlogPost.countDocuments({ published: true });
    const pages = Math.ceil(total / limit);
    
    // Convert MongoDB ObjectId to string and format data
    const formattedPosts = posts.map(post => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: ((post as any)._id as string).toString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      title: (post as any).title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slug: (post as any).slug,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      excerpt: (post as any).excerpt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      featuredImage: (post as any).featuredImage || '/images/banner1.jpg', // Default image
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      author: (post as any).author,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      publishedAt: (post as any).publishedAt || (post as any).createdAt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: (post as any).tags || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      views: (post as any).views || 0
    }));
    
    return {
      posts: formattedPosts,
      total,
      pages
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: [],
      total: 0,
      pages: 0
    };
  }
}

// Blog Posts Component
async function BlogPosts() {
  const { posts, total } = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No blog posts yet</h3>
          <p className="text-gray-500">Check back soon for insightful articles and updates from our team.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <p className="text-gray-600">
          {total} {total === 1 ? 'article' : 'articles'} published
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={post.featuredImage || '/images/banner1.jpg'}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {post.tags.length > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {post.tags[0]}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <time dateTime={post.publishedAt.toISOString()}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.views} views</span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-black mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                >
                  Read More →
                </Link>
                
                {post.tags.length > 1 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(1, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-12 bg-gradient-to-r from-blue-600 to-indigo-700">
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
          <Suspense fallback={<BlogPostsSkeleton />}>
            <BlogPosts />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}