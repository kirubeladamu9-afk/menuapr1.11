import { initializeDatabase } from '@/lib/db';

export async function POST(request) {
  try {
    // In production, you should add authentication here
    const authHeader = request.headers.get('x-admin-secret');
    
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
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
