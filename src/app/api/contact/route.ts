import { NextRequest, NextResponse } from "next/server";
import { ContactForm, ApiResponse } from "@/types";

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

    // In a real implementation, you would:
    // 1. Send email using a service like Nodemailer, SendGrid, or Resend
    // 2. Save to database
    // 3. Send confirmation email to user

    // For now, we'll simulate email sending
    const emailData = {
      to: "info@shahproperties.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>Sent from Shah Properties website</em></p>
      `,
    };

    // TODO: Implement actual email sending service (Nodemailer, SendGrid, etc.)
    // Example with Nodemailer:
    // await transporter.sendMail(emailData);

    // For production, implement proper email service integration
    // For now, data is validated and stored for follow-up

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
