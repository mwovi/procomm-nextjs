import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 100); // Limit length
}

// Helper function to ensure unique slug
async function getUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (await BlogPost.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// GET - Fetch all blog posts for admin
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const blogs = await BlogPost.find()
      .sort({ updatedAt: -1 })
      .select('title slug excerpt author published publishedAt createdAt updatedAt views tags');

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Blogs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, tags, published, featuredImage } = body;

    // Validation
    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: 'Title, content, and excerpt are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Generate unique slug from title
    const baseSlug = generateSlug(title);
    const uniqueSlug = await getUniqueSlug(baseSlug);

    const blogPost = new BlogPost({
      title,
      slug: uniqueSlug,
      content,
      excerpt,
      tags: tags || [],
      published: published || false,
      featuredImage: featuredImage || '',
      author: session.user.name || 'Admin',
      publishedAt: published ? new Date() : null
    });

    const savedPost = await blogPost.save();

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    
    // Handle duplicate slug error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'A blog post with this title already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}