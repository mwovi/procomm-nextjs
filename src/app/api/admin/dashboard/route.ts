import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import GalleryImage from '@/models/GalleryImage';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Get blog statistics
    const totalBlogs = await BlogPost.countDocuments();
    const publishedBlogs = await BlogPost.countDocuments({ published: true });
    const draftBlogs = totalBlogs - publishedBlogs;

    // Get gallery statistics
    const totalImages = await GalleryImage.countDocuments();

    // Get contact message statistics
    const totalMessages = await Contact.countDocuments();
    const newMessages = await Contact.countDocuments({ status: 'new' });

    // Get recent activity (last 10 items)
    const recentBlogs = await BlogPost.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title updatedAt published');

    const recentImages = await GalleryImage.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title createdAt');

    const recentMessages = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select('subject createdAt name');

    // Combine and sort recent activity
    const recentActivity = [
      ...recentBlogs.map(blog => ({
        id: blog._id.toString(),
        type: 'blog' as const,
        title: `${blog.published ? 'Published' : 'Updated'} blog: ${blog.title}`,
        timestamp: blog.updatedAt.toISOString()
      })),
      ...recentImages.map(image => ({
        id: image._id.toString(),
        type: 'image' as const,
        title: `New image uploaded: ${image.title}`,
        timestamp: image.createdAt.toISOString()
      })),
      ...recentMessages.map(message => ({
        id: message._id.toString(),
        type: 'message' as const,
        title: `New message from ${message.name}: ${message.subject}`,
        timestamp: message.createdAt.toISOString()
      }))
    ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
      .map(item => ({
        ...item,
        timestamp: new Date(item.timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));

    const stats = {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalImages,
      totalMessages,
      newMessages,
      recentActivity
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}