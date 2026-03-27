import { initializeDatabase, queryDatabase } from '@lib/db';

export async function POST(request) {
  try {
    // Check if tables already exist
    try {
      const result = await queryDatabase('SELECT 1 FROM categories LIMIT 1');
      // If we get here, tables exist
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Database is already initialized.'
        }),
        { status: 200 }
      );
    } catch (e) {
      // Tables don't exist, proceed with initialization
      console.log('Tables do not exist, initializing...');
    }

    await initializeDatabase();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Database initialized successfully. You can now use the admin panel.'
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Database initialization error:', error);
    return new Response(
      JSON.stringify({
        error: 'Database initialization failed',
        details: error.message
      }),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return new Response(
    JSON.stringify({ 
      message: 'Database initialization endpoint. Use POST with x-admin-secret header to initialize.' 
    }),
    { status: 200 }
  );
}
