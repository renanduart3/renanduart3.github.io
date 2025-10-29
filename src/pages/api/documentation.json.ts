import { getCollection } from 'astro:content';
import { shouldShowPost } from '@/utils/markdown';

export async function GET() {
  const isDev = import.meta.env.DEV;
  const docs = await getCollection('docs');
  
  const visibleDocs = docs
    .filter(doc => shouldShowPost(doc, isDev))
    .map(doc => ({
      id: doc.id,
      title: doc.data.title,
      description: doc.data.description,
      url: `/docs/${doc.slug}`,
      type: 'docs' as const,
      tags: [doc.data.category],
      category: doc.data.category,
      version: doc.data.version,
      order: doc.data.order,
      lastModified: doc.data.lastModified?.toISOString()
    }));

  return new Response(JSON.stringify(visibleDocs), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
}
