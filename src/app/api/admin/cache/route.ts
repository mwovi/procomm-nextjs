import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { invalidateAllContentCache, invalidateBlogCache, invalidateGalleryCache } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized access. Admin authentication required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type } = body; // 'all', 'blog', 'gallery'

    let result;
    switch (type) {
      case 'blog':
        result = await invalidateBlogCache();
        break;
      case 'gallery':
        result = await invalidateGalleryCache();
        break;
      case 'all':
      default:
        result = await invalidateAllContentCache();
        break;
    }

    if (result.success) {
      return NextResponse.json({
        message: `Cache invalidated successfully for: ${type || 'all'}`,
        success: true
      });
    } else {
      return NextResponse.json({
        message: 'Cache invalidation failed',
        error: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Cache invalidation API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}