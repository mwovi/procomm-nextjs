import { revalidatePath, revalidateTag } from 'next/cache';

export async function invalidateCache(paths: string[], tags?: string[]) {
  try {
    // Revalidate specific paths
    for (const path of paths) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }
    
    // Revalidate specific tags if provided
    if (tags) {
      for (const tag of tags) {
        revalidateTag(tag);
        console.log(`Revalidated tag: ${tag}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Cache invalidation error:', error);
    return { success: false, error };
  }
}

// Commonly used cache invalidation functions
export async function invalidateBlogCache() {
  return invalidateCache(['/blog'], ['blogs', 'blog-posts']);
}

export async function invalidateGalleryCache() {
  return invalidateCache(['/gallery'], ['gallery', 'gallery-images']);
}

export async function invalidateAllContentCache() {
  return invalidateCache(['/blog', '/gallery', '/'], ['blogs', 'gallery', 'homepage']);
}