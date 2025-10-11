import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '../../../../lib/mongodb';
import BlogPost from '../../../../models/BlogPost';
import GalleryImage from '../../../../models/GalleryImage';

export async function GET() {
  try {
    console.log('🔍 Running comprehensive admin system verification...');
    
    // Test 1: Authentication
    const session = await getServerSession(authOptions);
    const authTest = {
      hasSession: !!session,
      hasUser: !!session?.user,
      userRole: session?.user?.role,
      userEmail: session?.user?.email,
      isAdmin: session?.user?.role === 'admin'
    };

    // Test 2: Database Connection
    const dbTest: { connected: boolean; error: string | null } = { connected: false, error: null };
    try {
      await dbConnect();
      dbTest.connected = true;
      console.log('✅ Database connection successful');
    } catch (error) {
      dbTest.error = error instanceof Error ? error.message : 'Unknown error';
      console.log('❌ Database connection failed:', dbTest.error);
    }

    // Test 3: Blog Model Access (only if authenticated)
    const blogTest: { accessible: boolean; count: number; error: string | null } = { accessible: false, count: 0, error: null };
    if (authTest.isAdmin && dbTest.connected) {
      try {
        const blogCount = await BlogPost.countDocuments();
        blogTest.accessible = true;
        blogTest.count = blogCount;
        console.log(`✅ Blog model accessible, ${blogCount} posts found`);
      } catch (error) {
        blogTest.error = error instanceof Error ? error.message : 'Unknown error';
        console.log('❌ Blog model access failed:', blogTest.error);
      }
    }

    // Test 4: Gallery Model Access (only if authenticated)
    const galleryTest: { accessible: boolean; count: number; error: string | null } = { accessible: false, count: 0, error: null };
    if (authTest.isAdmin && dbTest.connected) {
      try {
        const galleryCount = await GalleryImage.countDocuments();
        galleryTest.accessible = true;
        galleryTest.count = galleryCount;
        console.log(`✅ Gallery model accessible, ${galleryCount} images found`);
      } catch (error) {
        galleryTest.error = error instanceof Error ? error.message : 'Unknown error';
        console.log('❌ Gallery model access failed:', galleryTest.error);
      }
    }

    // Overall system status
    const systemStatus = {
      authentication: authTest.isAdmin ? 'PASS' : 'FAIL',
      database: dbTest.connected ? 'PASS' : 'FAIL',
      blogSystem: blogTest.accessible ? 'PASS' : 'PENDING',
      gallerySystem: galleryTest.accessible ? 'PASS' : 'PENDING',
      overallStatus: authTest.isAdmin && dbTest.connected ? 'OPERATIONAL' : 'ISSUES_DETECTED'
    };

    console.log('🎯 System verification complete:', systemStatus);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      systemStatus,
      testResults: {
        authentication: authTest,
        database: dbTest,
        blogSystem: blogTest,
        gallerySystem: galleryTest
      },
      recommendations: {
        nextSteps: authTest.isAdmin 
          ? ['System is ready for use', 'Test blog creation workflow', 'Test gallery upload workflow']
          : ['Please log in as admin', 'Navigate to /admin/login', 'Use credentials: admin@procomm.com / admin123'],
        criticalIssues: [
          ...(!authTest.isAdmin ? ['Admin authentication required'] : []),
          ...(!dbTest.connected ? ['Database connection failed'] : []),
          ...(dbTest.connected && !blogTest.accessible ? ['Blog system not accessible'] : []),
          ...(dbTest.connected && !galleryTest.accessible ? ['Gallery system not accessible'] : [])
        ]
      }
    });

  } catch (error) {
    console.error('❌ System verification failed:', error);
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      systemStatus: {
        overallStatus: 'SYSTEM_ERROR'
      },
      error: error instanceof Error ? error.message : 'Unknown verification error',
      recommendations: {
        nextSteps: ['Check server logs for detailed error information'],
        criticalIssues: ['System verification endpoint failed']
      }
    }, { status: 500 });
  }
}