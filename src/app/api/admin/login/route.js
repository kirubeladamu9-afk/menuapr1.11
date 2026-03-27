import { verifyAdminPassword, createAdminSession } from '@lib/adminAuth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return new Response(JSON.stringify({ error: 'Password required' }), { status: 400 });
    }

    if (verifyAdminPassword(password)) {
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
    }

    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
  }
}
