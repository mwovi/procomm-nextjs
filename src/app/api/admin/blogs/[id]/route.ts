import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
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

// Helper function to ensure unique slug (excluding current blog)
async function getUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const query: { slug: string; _id?: { $ne: string } } = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const existingBlog = await BlogPost.findOne(query);
    if (!existingBlog) {
      break;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// GET - Fetch single blog post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { id } = await params;
    const blog = await BlogPost.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update blog post (including publish status)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    await dbConnect();

    const { id } = await params;
    const blog = await BlogPost.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Update fields
    Object.keys(body).forEach(key => {
      if (key !== '_id' && key !== 'createdAt' && key !== 'slug') {
        blog[key] = body[key];
      }
    });

    // Handle title change - regenerate slug if title changed
    if (body.title && body.title !== blog.title) {
      const baseSlug = generateSlug(body.title);
      blog.slug = await getUniqueSlug(baseSlug, id);
    }

    // Handle publish status change
    if ('published' in body) {
      if (body.published && !blog.published) {
        blog.publishedAt = new Date();
      } else if (!body.published && blog.published) {
        blog.publishedAt = null;
      }
    }

    const updatedBlog = await blog.save();

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error);
    
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

// DELETE - Delete blog post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { id } = await params;
    const blog = await BlogPost.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}