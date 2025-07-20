import { NextRequest, NextResponse } from "next/server";
import { ContactForm, ApiResponse } from "@/types";
import {
  sendEmail,
  createContactFormEmailHTML,
  createAutoReplyEmailHTML,
  createAutoReplyText,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();

    // Validate required fields
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Basic phone validation (Indian format)
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Invalid phone number",
        },
        { status: 400 }
      );
    }

    // Send email to business
    const businessEmailHTML = createContactFormEmailHTML({
      name,
      email,
      phone,
      subject,
      message,
    });

    const businessEmailData = {
      to: process.env.CONTACT_EMAIL_TO || "shahproperties03@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: businessEmailHTML,
    };

    // Send auto-reply to customer
    const autoReplyHTML = createAutoReplyEmailHTML(name);
    const autoReplyData = {
      to: email,
      subject: "We received your message - Shah Properties",
      html: autoReplyHTML,
    };

    try {
      // Send business notification email
      await sendEmail(businessEmailData);

      // Send auto-reply to customer (non-blocking)
      // Temporarily disabled due to spam issues with Gmail SMTP
      // TODO: Implement with professional email service like SendGrid
      /*
    try {
      // Create plain text version for better deliverability
      const autoReplyText = createAutoReplyText(name);
      const autoReplyDataWithText = {
        ...autoReplyData,
        text: autoReplyText,
      };

      await sendEmail(autoReplyDataWithText);
    } catch (autoReplyError) {
      // Log auto-reply failure but don't fail the main request
      if (process.env.NODE_ENV === "development") {
        console.error("Auto-reply email failed:", autoReplyError);
      }
    }
    */
    } catch (emailError) {
      // If email sending fails, log error but don't fail the request
      // This ensures the user gets a response even if email service is down
      if (process.env.NODE_ENV === "development") {
        console.error("Business email failed:", emailError);
      }

      // In production, you might want to save to a queue for retry
      // or store in database for manual follow-up
    }

    // Return success response
    return NextResponse.json<ApiResponse<{ id: string }>>({
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
      data: { id: `contact_${Date.now()}` },
    });
  } catch (error) {
    // Log error only in development
    if (process.env.NODE_ENV === "development") {
      console.error("Contact form error:", error);
    }

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      error: "Method not allowed",
    },
    { status: 405 }
  );
}
