import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Development/testing seed only. No business logic.
async function main(): Promise<void> {
  const password = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@aln.local' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@aln.local',
      password,
      role: 'ADMIN',
    },
  });

  const categories = await Promise.all(
    [
      { name: 'Main', description: 'Main dishes' },
      { name: 'Drinks', description: 'Beverages' },
      { name: 'Dessert', description: 'Desserts' },
    ].map((c) => prisma.category.upsert({ where: { name: c.name }, update: {}, create: c })),
  );

  const byName = new Map(categories.map((c) => [c.name, c.id]));
  const products = [
    { name: 'Pho Bo', sellingPrice: 55000, category: 'Main' },
    { name: 'Bun Cha', sellingPrice: 45000, category: 'Main' },
    { name: 'Tra Da', sellingPrice: 10000, category: 'Drinks' },
    { name: 'Ca Phe Sua', sellingPrice: 25000, category: 'Drinks' },
    { name: 'Che Thai', sellingPrice: 25000, category: 'Dessert' },
  ];
  for (const p of products) {
    const categoryId = byName.get(p.category);
    if (!categoryId) throw new Error(`Missing category ${p.category}`);
    await prisma.product.upsert({
      where: { categoryId_name: { categoryId, name: p.name } },
      update: {},
      create: { name: p.name, sellingPrice: p.sellingPrice, categoryId },
    });
  }

  const ingredients = [
    { name: 'Beef', unit: 'kg', currentPrice: 280000, stockQuantity: 12, minimumStock: 5 },
    { name: 'Rice noodles', unit: 'kg', currentPrice: 25000, stockQuantity: 20, minimumStock: 5 },
    { name: 'Herbs', unit: 'kg', currentPrice: 40000, stockQuantity: 3, minimumStock: 2 },
    { name: 'Pork', unit: 'kg', currentPrice: 150000, stockQuantity: 10, minimumStock: 4 },
    { name: 'Coffee', unit: 'kg', currentPrice: 200000, stockQuantity: 5, minimumStock: 2 },
    { name: 'Milk', unit: 'liter', currentPrice: 30000, stockQuantity: 8, minimumStock: 3 },
    { name: 'Sugar', unit: 'kg', currentPrice: 22000, stockQuantity: 15, minimumStock: 5 },
    { name: 'Ice', unit: 'kg', currentPrice: 5000, stockQuantity: 30, minimumStock: 10 },
  ];
  for (const i of ingredients) {
    await prisma.ingredient.upsert({ where: { name: i.name }, update: {}, create: i });
  }

  console.log(`Seed done. admin=${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
