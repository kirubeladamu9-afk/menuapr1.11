import { queryDatabase } from '@/lib/db';

export async function GET(request) {
  try {
    const categories = await queryDatabase('SELECT * FROM categories ORDER BY created_at');
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const result = await queryDatabase(
      'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
      [name, slug, description || null]
    );

    return new Response(JSON.stringify({ id: result.insertId, ...body }), { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response(JSON.stringify({ error: 'Failed to create category' }), { status: 500 });
  }
}
