import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import GalleryImage from '../../../models/GalleryImage';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured) {
      query.featured = true;
    }

    const images = await GalleryImage
      .find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await GalleryImage.countDocuments(query);

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Gallery images fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { message: 'Title and image URL are required' },
        { status: 400 }
      );
    }

    const galleryImage = new GalleryImage({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      category: body.category || 'general',
      tags: body.tags || [],
      featured: body.featured || false,
      order: body.order || 0
    });

    await galleryImage.save();

    return NextResponse.json(
      { message: 'Gallery image added successfully', image: galleryImage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Gallery image creation error:', error);
    return NextResponse.json(
      { message: 'Failed to add gallery image' },
      { status: 500 }
    );
  }
}