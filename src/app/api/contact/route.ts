import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Create a transporter (you'll need to configure this with your email provider)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@procomm.com', // Your admin email
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from ProComm Contact Form</small></p>
      `,
    };

    // Auto-reply to user
    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: validatedData.email,
      subject: 'Thank you for contacting ProComm Media',
      html: `
        <h2>Thank you for your message, ${validatedData.name}!</h2>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        <p>Here's a copy of your message:</p>
        <blockquote style="border-left: 4px solid #2563eb; padding-left: 16px; margin: 16px 0;">
          ${validatedData.message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>The ProComm Media Team</p>
        <hr>
        <p><small>This is an automated response. Please do not reply to this email.</small></p>
      `,
    };

    // Send emails
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails, just log it
      }
    }

    // Save to database
    try {
      await dbConnect();

      // Get client IP and user agent for tracking
      const forwarded = request.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(/, /)[0] : 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      const contact = new Contact({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || undefined,
        subject: 'Contact Form Submission', // Default subject since contact schema expects it
        message: validatedData.message,
        status: 'new',
        ipAddress: ip,
        userAgent: userAgent
      });

      await contact.save();
    } catch (dbError) {
      console.error('Database save failed:', dbError);
      // Don't fail the request if database save fails, just log it
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}