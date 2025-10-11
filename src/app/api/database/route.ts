import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, verifyAuthentication } from '@/lib/database-init';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'init';

    if (action === 'init') {
      const result = await initializeDatabase();
      return NextResponse.json(result);
    }

    if (action === 'verify') {
      const email = searchParams.get('email') || 'admin@procomm.com';
      const password = searchParams.get('password') || 'admin123';
      
      const result = await verifyAuthentication(email, password);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Database API error:', error);
    return NextResponse.json(
      { success: false, error: 'Database operation failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, email, password } = await request.json();

    if (action === 'verify-auth') {
      const result = await verifyAuthentication(email, password);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Database POST API error:', error);
    return NextResponse.json(
      { success: false, error: 'Database operation failed' },
      { status: 500 }
    );
  }
}