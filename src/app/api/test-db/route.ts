import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test MongoDB connection
    await dbConnect();
    console.log('✅ Database connected successfully');
    
    // Get connection state
    const connectionState = mongoose.connection.readyState;
    const stateNames = {
      0: 'disconnected',
      1: 'connected', 
      2: 'connecting',
      3: 'disconnecting'
    };
    
    // Test database operations
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Test a simple operation
    const testCollection = db.collection('test');
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    const testDoc = await testCollection.findOne({ test: true });
    if (testDoc) {
      await testCollection.deleteOne({ _id: testDoc._id });
    }
    
    return NextResponse.json({
      success: true,
      database: {
        status: 'connected',
        connectionState: stateNames[connectionState as keyof typeof stateNames],
        connectionStateCode: connectionState,
        databaseName: db.databaseName,
        collections: collectionNames,
        mongodbUri: process.env.MONGODB_URI ? 'configured' : 'missing'
      },
      operations: {
        insert: 'success',
        read: 'success', 
        delete: 'success'
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}