'use client';

import { useParams } from 'next/navigation';
import BlogForm from '@/components/BlogForm';

const EditBlogPage = () => {
  const params = useParams();
  const blogId = params.id as string;

  return <BlogForm blogId={blogId} isEdit={true} />;
};

export default EditBlogPage;