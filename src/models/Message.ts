import mongoose from 'mongoose';

export interface IMessage {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  service?: string;
  message: string;
  newsletter: boolean;
  createdAt: Date;
  read: boolean;
}

const MessageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  organization: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  newsletter: {
    type: Boolean,
    default: false
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;