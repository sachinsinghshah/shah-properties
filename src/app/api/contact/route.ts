import { NextRequest, NextResponse } from "next/server";
import { ContactForm, ApiResponse } from "@/types";
import {
  sendEmail,
  createContactFormEmailHTML,
  createAutoReplyEmailHTML,
  createAutoReplyText,
} from "@/lib/email";

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

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

    // Input length validation
    if (name.length > 100) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Name must be 100 characters or fewer" },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Email address is too long" },
        { status: 400 }
      );
    }
    if (phone.length > 20) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Phone number is too long" },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Message must be 5000 characters or fewer" },
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

    // Send business notification email — propagate failure to caller
    await sendEmail(businessEmailData);

    // Send auto-reply to customer (non-blocking, failure does not affect response)
    // Temporarily disabled due to spam issues with Gmail SMTP
    // TODO: Implement with professional email service like SendGrid
    /*
    try {
      const autoReplyText = createAutoReplyText(name);
      await sendEmail({ ...autoReplyData, text: autoReplyText });
    } catch (autoReplyError) {
      if (process.env.NODE_ENV === "development") {
        console.error("Auto-reply email failed:", autoReplyError);
      }
    }
    */

    // Suppress unused variable warnings for the auto-reply variables
    void autoReplyData;
    void createAutoReplyText;

    // Return success response
    return NextResponse.json<ApiResponse<{ id: string }>>({
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
      data: { id: `contact_${Date.now()}` },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Contact form error:", error);
    }

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Failed to send your message. Please try again later.",
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
