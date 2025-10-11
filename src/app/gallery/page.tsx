import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';

export const metadata: Metadata = {
  title: 'Gallery - ProComm Media',
  description: 'Visual showcase of ProComm Media\'s projects, events, and activities in strategic communication and media coordination.',
};

// Enable ISR with 60 seconds revalidation
export const revalidate = 60;

// Force dynamic rendering for admin users
export const dynamic = 'auto';

// Types for gallery data
interface GalleryImageType {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Loading component for gallery
function GalleryImagesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="group relative overflow-hidden rounded-lg shadow-md animate-pulse">
          <div className="aspect-square bg-gray-300"></div>
          <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
            <div className="h-4 bg-gray-400 rounded mb-2"></div>
            <div className="h-3 bg-gray-400 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Function to fetch gallery images from database
async function getGalleryImages(): Promise<GalleryImageType[]> {
  try {
    await dbConnect();
    
    // Fetch gallery images, prioritizing featured and ordered items
    const images = await GalleryImage
      .find({})
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .select('title description imageUrl category tags featured order createdAt updatedAt')
      .lean();
    
    // Convert MongoDB ObjectId to string and format data
    const formattedImages = images.map(image => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: ((image as any)._id as string).toString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      title: (image as any).title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      description: (image as any).description || '',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      imageUrl: (image as any).imageUrl,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      category: (image as any).category || 'General',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: (image as any).tags || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      featured: (image as any).featured || false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      order: (image as any).order || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: (image as any).createdAt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedAt: (image as any).updatedAt
    }));
    
    return formattedImages;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

// Get unique categories from images
function getCategories(images: GalleryImageType[]): string[] {
  const categories = images.map(img => img.category);
  return ['All', ...Array.from(new Set(categories))];
}

// Gallery Images Component
async function GalleryImages() {
  const images = await getGalleryImages();
  const categories = getCategories(images);

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No images yet</h3>
          <p className="text-gray-500">Check back soon for our latest project photos and event highlights.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className="px-6 py-2 rounded-full border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-white"
            data-category={category}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Count */}
      <div className="text-center mb-8">
        <p className="text-gray-600">
          {images.length} {images.length === 1 ? 'image' : 'images'} in gallery
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={image._id}
            className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
              image.featured ? 'ring-2 ring-blue-500' : ''
            }`}
            data-category={image.category}
          >
            <div className="aspect-square relative">
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading={index < 8 ? 'eager' : 'lazy'} // Lazy load images after the first 8
              />
              
              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-3 right-3">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                  {image.category}
                </span>
              </div>
              
              {/* Overlay with Image Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                    {image.title}
                  </h3>
                  {image.description && (
                    <p className="text-sm opacity-90 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                  
                  {/* Tags */}
                  {image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/20 text-white px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Client-side Gallery Functionality */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Category filtering
              const categoryButtons = document.querySelectorAll('[data-category]');
              const galleryItems = document.querySelectorAll('[data-category]');
              
              categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                  const selectedCategory = this.getAttribute('data-category');
                  
                  // Update active button
                  categoryButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-600', 'text-white');
                    btn.classList.add('bg-white', 'text-gray-700');
                  });
                  this.classList.add('bg-blue-600', 'text-white');
                  this.classList.remove('bg-white', 'text-gray-700');
                  
                  // Filter gallery items
                  galleryItems.forEach(item => {
                    if (selectedCategory === 'All' || item.getAttribute('data-category') === selectedCategory) {
                      item.style.display = 'block';
                      item.style.animation = 'fadeIn 0.3s ease-in';
                    } else {
                      item.style.display = 'none';
                    }
                  });
                });
              });
              
              // Image click handler for lightbox effect
              const imageContainers = document.querySelectorAll('.group.relative.overflow-hidden');
              imageContainers.forEach(container => {
                container.addEventListener('click', function() {
                  const img = this.querySelector('img');
                  const title = this.querySelector('h3')?.textContent;
                  const description = this.querySelector('p')?.textContent;
                  
                  // Create lightbox
                  const lightbox = document.createElement('div');
                  lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';
                  lightbox.innerHTML = \`
                    <div class="max-w-4xl max-h-full relative">
                      <button class="absolute -top-4 -right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-colors" onclick="this.closest('.fixed').remove()">×</button>
                      <img src="\${img.src}" alt="\${img.alt}" class="max-w-full max-h-full object-contain">
                      \${title ? \`<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                        <h3 class="text-xl font-semibold">\${title}</h3>
                        \${description ? \`<p class="text-sm opacity-90 mt-1">\${description}</p>\` : ''}
                      </div>\` : ''}
                    </div>
                  \`;
                  
                  document.body.appendChild(lightbox);
                  
                  // Close on background click
                  lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                      lightbox.remove();
                    }
                  });
                  
                  // Close on escape key
                  document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                      lightbox.remove();
                    }
                  }, { once: true });
                });
              });
            });
          `
        }}
      />
    </>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-12 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Gallery
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Visual showcase of our projects, events, and activities in strategic communication and media coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<GalleryImagesSkeleton />}>
            <GalleryImages />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  );
}