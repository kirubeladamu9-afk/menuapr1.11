// Simple admin password authentication
// In production, use proper authentication like JWT or NextAuth.js

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function verifyAdminPassword(password) {
  return password === ADMIN_PASSWORD;
}

export function checkAdminSession(sessionToken) {
  // Basic session verification - in production use proper sessions
  if (!sessionToken) return false;
  
  try {
    const decoded = Buffer.from(sessionToken, 'base64').toString();
    return decoded === 'admin_authenticated';
  } catch {
    return false;
  }
}

export function createAdminSession() {
  return Buffer.from('admin_authenticated').toString('base64');
}
