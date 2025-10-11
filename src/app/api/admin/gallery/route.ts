import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';

// GET - Fetch all gallery images for admin
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const images = await GalleryImage.find()
      .sort({ createdAt: -1 })
      .select('title description imageUrl category tags featured order createdAt updatedAt');

    return NextResponse.json(images);
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new gallery image with file upload
export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string || '';
    const category = formData.get('category') as string || 'general';
    const tags = formData.get('tags') as string || '';
    const isFeatured = formData.get('isFeatured') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Create upload directory if it doesn't exist
    const uploadDir = './public/uploads/gallery';
    const fs = await import('fs');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.name.split('.').pop();
    const filename = `gallery-${uniqueSuffix}.${fileExtension}`;
    const filepath = `${uploadDir}/${filename}`;

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const { writeFile } = await import('fs/promises');
    await writeFile(filepath, buffer);

    // Create database entry
    await dbConnect();

    const galleryImage = new GalleryImage({
      title: title || file.name.split('.')[0],
      description,
      imageUrl: `/uploads/gallery/${filename}`,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category,
      featured: isFeatured,
      order: 0
    });

    const savedImage = await galleryImage.save();

    return NextResponse.json(savedImage, { status: 201 });
  } catch (error) {
    console.error('Create gallery image error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}