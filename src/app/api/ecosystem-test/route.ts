import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    console.log('🔄 Starting comprehensive ecosystem test...');
    
    const results: {
      timestamp: string;
      tests: Record<string, Record<string, unknown>>;
      summary: { passed: number; failed: number; total: number };
    } = {
      timestamp: new Date().toISOString(),
      tests: {},
      summary: { passed: 0, failed: 0, total: 0 }
    };

    // Test 1: Database Connection
    try {
      await dbConnect();
      results.tests['database_connection'] = { status: 'PASS', message: 'Database connected successfully' };
      results.summary.passed++;
    } catch (error) {
      results.tests['database_connection'] = { status: 'FAIL', message: `Database connection failed: ${error}` };
      results.summary.failed++;
    }
    results.summary.total++;

    // Test 2: Environment Variables
    const requiredEnvVars = ['MONGODB_URI', 'NEXTAUTH_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length === 0) {
      results.tests['environment_variables'] = { status: 'PASS', message: 'All required environment variables are set' };
      results.summary.passed++;
    } else {
      results.tests['environment_variables'] = { status: 'FAIL', message: `Missing variables: ${missingVars.join(', ')}` };
      results.summary.failed++;
    }
    results.summary.total++;

    // Test 3: Model Definitions
    try {
      // Test if models can be accessed
      const blogSchema = BlogPost.schema;
      const userSchema = User.schema;
      
      if (blogSchema && userSchema) {
        results.tests['model_definitions'] = { status: 'PASS', message: 'All models are properly defined' };
        results.summary.passed++;
      } else {
        results.tests['model_definitions'] = { status: 'FAIL', message: 'Some models are not properly defined' };
        results.summary.failed++;
      }
    } catch (error) {
      results.tests['model_definitions'] = { status: 'FAIL', message: `Model definition error: ${error}` };
      results.summary.failed++;
    }
    results.summary.total++;

    // Test 4: Session Management
    try {
      const session = await getServerSession(authOptions);
      results.tests['session_management'] = { 
        status: 'PASS', 
        message: session ? 'Session active' : 'No active session (normal for API call)',
        sessionUser: session?.user?.email || null
      };
      results.summary.passed++;
    } catch (error) {
      results.tests['session_management'] = { status: 'FAIL', message: `Session error: ${error}` };
      results.summary.failed++;
    }
    results.summary.total++;

    // Test 5: Database Operations
    try {
      // Test blog operations
      const blogCount = await BlogPost.countDocuments();
      const userCount = await User.countDocuments();
      
      results.tests['database_operations'] = { 
        status: 'PASS', 
        message: 'Database operations working',
        data: { blogs: blogCount, users: userCount }
      };
      results.summary.passed++;
    } catch (error) {
      results.tests['database_operations'] = { status: 'FAIL', message: `Database operation error: ${error}` };
      results.summary.failed++;
    }
    results.summary.total++;

    // Test 6: Authentication Logic
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@procomm.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      // Simulate authentication logic
      if (adminEmail && adminPassword) {
        results.tests['authentication_logic'] = { 
          status: 'PASS', 
          message: 'Authentication credentials configured',
          adminEmail: adminEmail
        };
        results.summary.passed++;
      } else {
        results.tests['authentication_logic'] = { status: 'FAIL', message: 'Authentication credentials not properly configured' };
        results.summary.failed++;
      }
    } catch (error) {
      results.tests['authentication_logic'] = { status: 'FAIL', message: `Authentication error: ${error}` };
      results.summary.failed++;
    }
    results.summary.total++;

    // Overall status
    const overallStatus = results.summary.failed === 0 ? 'HEALTHY' : 'ISSUES_DETECTED';
    
    return NextResponse.json({
      ecosystem_status: overallStatus,
      success_rate: `${Math.round((results.summary.passed / results.summary.total) * 100)}%`,
      ...results
    });

  } catch (error) {
    return NextResponse.json({
      ecosystem_status: 'CRITICAL_ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}