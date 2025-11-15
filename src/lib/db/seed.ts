import { db, STORES } from './indexedDB';
import type { User } from './schema';

export async function seedDatabase() {
  try {
    // Check if already seeded
    const userCount = await db.count(STORES.USERS);
    if (userCount > 0) {
      console.log('Database already seeded');
      return;
    }

    const now = new Date().toISOString();

    const usersToSeed: User[] = [
      {
        id: crypto.randomUUID(),
        name: 'Administrador',
        email: 'admin@erp.com',
        password: 'admin123', // In production, hash this!
        role: 'admin',
        active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: crypto.randomUUID(),
        name: 'João Caixista',
        email: 'joao@erp.com',
        password: 'caixa123',
        role: 'cashier',
        active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: crypto.randomUUID(),
        name: 'Maria Caixista',
        email: 'maria@erp.com',
        password: 'caixa123',
        role: 'cashier',
        active: true,
        created_at: now,
        updated_at: now,
      },
    ];
    
    for (const user of usersToSeed) {
      await db.add(STORES.USERS, user);
    }
    
    console.log('Database seeded successfully with admin and cashier users!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}