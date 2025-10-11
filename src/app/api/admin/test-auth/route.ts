import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  try {
    console.log('🔍 Testing admin authentication...');
    
    const session = await getServerSession(authOptions);
    
    console.log('Session data:', {
      exists: !!session,
      user: session?.user,
      expires: session?.expires
    });

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        message: 'No session found',
        redirectToLogin: true
      }, { status: 401 });
    }

    if (!session.user) {
      return NextResponse.json({
        authenticated: false,
        message: 'No user in session',
        session: session
      }, { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({
        authenticated: false,
        message: 'User is not admin',
        userRole: session.user.role
      }, { status: 403 });
    }

    return NextResponse.json({
      authenticated: true,
      message: 'Admin authentication successful',
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      },
      sessionExpires: session.expires
    });

  } catch (error) {
    console.error('Auth test error:', error);
    return NextResponse.json({
      authenticated: false,
      message: 'Authentication test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}