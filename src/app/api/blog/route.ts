import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '../../../lib/mongodb';
import BlogPost from '../../../models/BlogPost';
import { invalidateBlogCache } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const published = searchParams.get('published') === 'true';
    const tag = searchParams.get('tag');

    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};
    if (published) {
      query.published = true;
    }
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const posts = await BlogPost
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude content for list view

    const total = await BlogPost.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized access. Admin authentication required.' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.content || !body.excerpt) {
      return NextResponse.json(
        { message: 'Title, content, and excerpt are required' },
        { status: 400 }
      );
    }

    const blogPost = new BlogPost({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      featuredImage: body.featuredImage,
      author: body.author || 'ProComm Admin',
      tags: body.tags || [],
      published: body.published || false
    });

    await blogPost.save();

    // Invalidate blog cache to show new content immediately  
    await invalidateBlogCache();

    return NextResponse.json(
      { message: 'Blog post created successfully', post: blogPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('Blog post creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}