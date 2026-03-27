import { createAdminSession } from '@lib/adminAuth';
import { comparePassword } from '@lib/password';
import { queryDatabase } from '@lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password required' }),
        { status: 400 }
      );
    }

    // Query user from database (will auto-initialize if needed via getConnection)
    const users = await queryDatabase(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid username or password' }),
        { status: 401 }
      );
    }

    // Compare provided password with hashed password
    const passwordMatch = await comparePassword(password, users[0].password);

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: 'Invalid username or password' }),
        { status: 401 }
      );
    }

    const sessionToken = createAdminSession();

    const response = new Response(
      JSON.stringify({ success: true, sessionToken }),
      { status: 200 }
    );

    // Set cookie
    response.headers.set(
      'Set-Cookie',
      `admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Login failed', details: error.message }),
      { status: 500 }
    );
  }
}
