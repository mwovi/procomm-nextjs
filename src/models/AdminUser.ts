import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'admin'
  },
  avatar: {
    type: String,
    required: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  permissions: [{
    type: String,
    enum: ['blogs', 'gallery', 'contacts', 'users', 'settings']
  }]
}, {
  timestamps: true
});

// Index for login performance
adminUserSchema.index({ email: 1 });

export default mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);