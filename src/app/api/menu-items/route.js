import { queryDatabase } from '@lib/db';

export async function GET(request) {
  try {
    const items = await queryDatabase(`
      SELECT m.*, c.name as category_name 
      FROM menu_items m 
      JOIN categories c ON m.category_id = c.id 
      ORDER BY m.category_id, m.created_at
    `);
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch menu items' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { category_id, title, price, currency, image, text, badge, rating } = body;

    if (!category_id || !title || !price) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const result = await queryDatabase(
      'INSERT INTO menu_items (category_id, title, price, currency, image, text, badge, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [category_id, title, price, currency || '$', image, text, badge, rating || 5]
    );

    return new Response(JSON.stringify({ id: result.insertId, ...body }), { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return new Response(JSON.stringify({ error: 'Failed to create menu item' }), { status: 500 });
  }
}
