import { queryDatabase } from '@lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { category_id, title, price, currency, image, text, badge, rating } = body;

    if (!category_id || !title || !price) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    await queryDatabase(
      'UPDATE menu_items SET category_id = ?, title = ?, price = ?, currency = ?, image = ?, text = ?, badge = ?, rating = ? WHERE id = ?',
      [category_id, title, price, currency || '$', image, text, badge, rating || 5, id]
    );

    return new Response(JSON.stringify({ id, ...body }), { status: 200 });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return new Response(JSON.stringify({ error: 'Failed to update menu item' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await queryDatabase('DELETE FROM menu_items WHERE id = ?', [id]);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete menu item' }), { status: 500 });
  }
}
