import { connectDB } from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import bcrypt from 'bcryptjs';

export async function seedAdminUser() {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@procomm.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin user already exists
    const existingAdmin = await AdminUser.findOne({ email: adminEmail });

    if (!existingAdmin) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      // Create admin user
      const adminUser = new AdminUser({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully');
      return { success: true, message: 'Admin user created' };
    } else {
      console.log('ℹ️  Admin user already exists');
      return { success: true, message: 'Admin user already exists' };
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

// API route to manually seed admin user
export async function GET() {
  const result = await seedAdminUser();
  
  if (result.success) {
    return Response.json({ message: result.message }, { status: 200 });
  } else {
    return Response.json({ error: result.error }, { status: 500 });
  }
}