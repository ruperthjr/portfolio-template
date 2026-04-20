import { fetchPosts } from '$lib/utils/blog';
import type { RequestHandler } from '@sveltejs/kit';

const siteUrl = '';
const siteTitle = 'First Name Second Name';
const siteDescription = 'Personal blog about software development, technology, and life.';

export const GET: RequestHandler = async () => {
	const posts = await fetchPosts();

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${siteTitle}</title>
  <description>${siteDescription}</description>
  <link>${siteUrl}</link>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${posts
		.map(
			(post) => `
  <item>
    <guid isPermaLink="true">${siteUrl}/blogs/${post.slug}</guid>
    <title>${escapeXml(post.title)}</title>
    <description>${escapeXml(post.description)}</description>
    <link>${siteUrl}/blogs/${post.slug}</link>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n    ')}
  </item>`
		)
		.join('\n')}
</channel>
</rss>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}