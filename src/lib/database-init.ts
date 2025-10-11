import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import AdminUser from '@/models/AdminUser';
import BlogPost from '@/models/BlogPost';
import bcrypt from 'bcryptjs';

export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database connection...');
    await dbConnect();
    console.log('✅ Database connected successfully');

    // Check and create default admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@procomm.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin exists in User collection
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('📝 Creating default admin user...');
      adminUser = new User({
        email: adminEmail,
        password: adminPassword, // Will be hashed by pre-save middleware
        name: 'ProComm Admin',
        role: 'admin',
        isActive: true
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created successfully');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Also ensure AdminUser collection has the same user
    let adminInAdminCollection = await AdminUser.findOne({ email: adminEmail });
    
    if (!adminInAdminCollection) {
      console.log('📝 Creating admin entry in AdminUser collection...');
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      adminInAdminCollection = new AdminUser({
        email: adminEmail,
        password: hashedPassword,
        name: 'ProComm Admin',
        role: 'admin',
        isActive: true,
        permissions: ['blogs', 'gallery', 'contacts', 'users', 'settings']
      });
      
      await adminInAdminCollection.save();
      console.log('✅ Admin user created in AdminUser collection');
    } else {
      console.log('✅ Admin user exists in AdminUser collection');
    }

    // Verify collections
    const userCount = await User.countDocuments();
    const adminCount = await AdminUser.countDocuments();
    const blogCount = await BlogPost.countDocuments();

    console.log('📊 Database Statistics:');
    console.log(`  - Users: ${userCount}`);
    console.log(`  - Admin Users: ${adminCount}`);
    console.log(`  - Blog Posts: ${blogCount}`);

    return {
      success: true,
      stats: {
        users: userCount,
        admins: adminCount,
        blogs: blogCount
      },
      adminUser: {
        email: adminEmail,
        exists: true
      }
    };

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function verifyAuthentication(email: string, password: string) {
  try {
    await dbConnect();
    
    // Try to find user in User collection
    const user = await User.findOne({ email });
    
    if (user && await user.comparePassword(password)) {
      console.log('✅ Authentication successful via User collection');
      return { success: true, user, source: 'User' };
    }

    // Try AdminUser collection with direct bcrypt comparison
    const adminUser = await AdminUser.findOne({ email });
    
    if (adminUser && await bcrypt.compare(password, adminUser.password)) {
      console.log('✅ Authentication successful via AdminUser collection');
      return { success: true, user: adminUser, source: 'AdminUser' };
    }

    // Try hardcoded credentials as fallback
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@procomm.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPassword) {
      console.log('✅ Authentication successful via environment credentials');
      return { 
        success: true, 
        user: { email: adminEmail, name: 'Admin', role: 'admin' }, 
        source: 'Environment' 
      };
    }

    console.log('❌ Authentication failed - no matching credentials');
    return { success: false, error: 'Invalid credentials' };

  } catch (error) {
    console.error('❌ Authentication verification failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}