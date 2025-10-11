import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '../../../../lib/mongodb';
import BlogPost from '../../../../models/BlogPost';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    
    const { slug } = await params;

    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await BlogPost.updateOne(
      { _id: post._id },
      { $inc: { views: 1 } }
    );

    return NextResponse.json(post);
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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
    
    const { slug } = await params;
    const body = await request.json();
    
    const updatedPost = await BlogPost.findOneAndUpdate(
      { slug },
      {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        featuredImage: body.featuredImage,
        author: body.author,
        tags: body.tags,
        published: body.published
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Blog post update error:', error);
    return NextResponse.json(
      { message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
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
    
    const { slug } = await params;

    const deletedPost = await BlogPost.findOneAndDelete({ slug });

    if (!deletedPost) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Blog post deletion error:', error);
    return NextResponse.json(
      { message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}