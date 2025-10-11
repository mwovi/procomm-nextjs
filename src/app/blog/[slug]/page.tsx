import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import ShareButton from "@/components/ShareButton";
import { Calendar, Clock, ArrowLeft, Eye, Tag } from "lucide-react";

// Types
interface BlogPostType {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// Get blog post by slug
async function getBlogPost(slug: string): Promise<BlogPostType | null> {
  try {
    await dbConnect();

    const post = await BlogPost.findOne({
      slug,
      published: true,
    }).lean();

    if (!post) {
      return null;
    }

    // Increment view count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await BlogPost.updateOne({ _id: (post as any)._id }, { $inc: { views: 1 } });

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: ((post as any)._id as string).toString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      title: (post as any).title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slug: (post as any).slug,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: (post as any).content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      excerpt: (post as any).excerpt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      featuredImage: (post as any).featuredImage,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      author: (post as any).author,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      publishedAt: (post as any).publishedAt || (post as any).createdAt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: (post as any).tags || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      views: ((post as any).views || 0) + 1, // Include the increment
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (post as any).createdAt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedAt: (post as any).updatedAt,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Get related blog posts
async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<BlogPostType[]> {
  try {
    await dbConnect();

    const posts = await BlogPost.find({
      slug: { $ne: currentSlug },
      published: true,
      $or: [{ tags: { $in: tags } }, { author: { $exists: true } }],
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select("title slug excerpt featuredImage author publishedAt tags views")
      .lean();

    return posts.map((post) => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: ((post as any)._id as string).toString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      title: (post as any).title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slug: (post as any).slug,
      content: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      excerpt: (post as any).excerpt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      featuredImage: (post as any).featuredImage,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      author: (post as any).author,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      publishedAt: (post as any).publishedAt || (post as any).createdAt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: (post as any).tags || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      views: (post as any).views || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (post as any).createdAt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedAt: (post as any).updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found - ProComm Media",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - ProComm Media`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const textLength = content.replace(/<[^>]*>/g, "").split(" ").length;
  return Math.ceil(textLength / wordsPerMinute);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags);
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="pt-24 lg:pt-32 pb-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Eye className="w-4 h-4 mr-2" />
                <span>{post.views} views</span>
              </div>
              <div className="flex items-center mb-2">
                <span>By {post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            )}

            {/* Share Button */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
              <ShareButton
                title={post.title}
                excerpt={post.excerpt}
                url={`${
                  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
                }/blog/${post.slug}`}
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg prose-neutral prose-black max-w-none mb-12 text-black"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.featuredImage || "/images/banner1.jpg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:text-blue-600 transition-colors duration-200"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {relatedPost.author}
                        </span>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
