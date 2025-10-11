import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    // Test database connection
    await dbConnect();
    
    // Test session
    const session = await getServerSession(authOptions);
    
    // Test environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@procomm.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const mongoUri = process.env.MONGODB_URI;
    const nextAuthSecret = process.env.NEXTAUTH_SECRET;
    
    return NextResponse.json({
      success: true,
      authentication: {
        session: session ? 'active' : 'none',
        sessionUser: session?.user?.email || null,
        sessionRole: session?.user?.role || null
      },
      environment: {
        adminEmail,
        adminPasswordSet: adminPassword ? 'yes' : 'no',
        mongoUriConfigured: mongoUri ? 'yes' : 'no',
        nextAuthSecretSet: nextAuthSecret ? 'yes' : 'no'
      },
      database: {
        connected: 'yes'
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Test authentication logic similar to NextAuth
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@procomm.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({
        success: true,
        authentication: 'valid',
        user: {
          email: adminEmail,
          name: 'Admin',
          role: 'admin'
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        authentication: 'invalid',
        provided: { email, passwordLength: password?.length || 0 },
        expected: { email: adminEmail, passwordLength: adminPassword.length }
      });
    }
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}