import { hashPassword } from './password.js';

export async function migratePasswords(connection) {
  try {
    // Get all users with plain text passwords (not hashed)
    const [users] = await connection.execute(
      'SELECT id, password FROM users'
    );

    let migratedCount = 0;
    for (const user of users) {
      // Check if password is already hashed (hashed passwords start with $2a$, $2b$, or $2y$)
      if (!user.password.startsWith('$2')) {
        const hashedPassword = await hashPassword(user.password);
        await connection.execute(
          'UPDATE users SET password = ? WHERE id = ?',
          [hashedPassword, user.id]
        );
        console.log(`✓ Encrypted password for user ID ${user.id}`);
        migratedCount++;
      }
    }

    if (migratedCount > 0) {
      console.log(`✓ Migrated ${migratedCount} passwords`);
    }
  } catch (error) {
    console.error('Migration error:', error.message);
    // Don't throw - migration is optional
  }
}
