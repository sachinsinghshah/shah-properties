import nodemailer from "nodemailer";

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

// Email data interface
interface EmailData {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text?: string;
}

// Create transporter with SMTP configuration
function createTransporter() {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"), // Changed default to 465
    secure:
      process.env.SMTP_SECURE === "true" ||
      parseInt(process.env.SMTP_PORT || "465") === 465, // Auto-detect SSL for port 465
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  };

  // Validate required environment variables
  if (!config.user || !config.pass) {
    throw new Error(
      "SMTP credentials are required. Please set SMTP_USER and SMTP_PASS environment variables."
    );
  }

  // Try alternative configurations for Gmail
  const isGmail = config.host === "smtp.gmail.com";
  const useSecurePort = isGmail && config.port === 587 ? false : config.secure;

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: useSecurePort,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    // Additional options for better compatibility
    tls: {
      rejectUnauthorized: false, // For self-signed certificates
    },
    // Connection timeout settings
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
    // Retry settings
    maxConnections: 1,
    maxMessages: 3,
    // Pool settings for better reliability
    pool: false,
    // Debug mode for troubleshooting
    debug: process.env.NODE_ENV === "development",
    logger: process.env.NODE_ENV === "development",
  } as any);
}

// Send email function
export async function sendEmail(emailData: EmailData): Promise<void> {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: emailData.from?.includes("@")
          ? "Shah Properties"
          : emailData.from || "Shah Properties",
        address: emailData.from?.includes("@")
          ? emailData.from
          : process.env.CONTACT_EMAIL_FROM || process.env.SMTP_USER || "",
      },
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text || emailData.html.replace(/<[^>]*>/g, ""), // Strip HTML for text version
      // Anti-spam headers
      headers: {
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        Importance: "normal",
        "X-Mailer": "Shah Properties Contact Form",
        "List-Unsubscribe": `<mailto:${
          process.env.SMTP_USER || "shahproperties03@gmail.com"
        }?subject=unsubscribe>`,
        Precedence: "bulk",
        "X-Auto-Response-Suppress": "OOF, AutoReply",
        "X-Report-Abuse": `Please report abuse here: mailto:${
          process.env.SMTP_USER || "shahproperties03@gmail.com"
        }?subject=abuse`,
        "X-Entity-Ref-ID": `contact-${Date.now()}`,
        "Message-ID": `<contact-${Date.now()}@shahproperties.8bitcode.in>`,
        Date: new Date().toUTCString(),
        "MIME-Version": "1.0",
        "Content-Type": "text/html; charset=UTF-8",
        "Content-Transfer-Encoding": "8bit",
      },
      // DKIM and SPF friendly
      priority: "normal" as const,
    };

    const info = await transporter.sendMail(mailOptions);

    // Log success only in development
    if (process.env.NODE_ENV === "development") {
      console.log("Email sent successfully:", info.messageId);
    }
  } catch (error) {
    // Log error only in development
    if (process.env.NODE_ENV === "development") {
      console.error("Email sending failed:", error);
    }

    // Re-throw the error to be handled by the caller
    throw new Error("Failed to send email. Please try again later.");
  }
}

// Utility function to create contact form email HTML
export function createContactFormEmailHTML(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #065f46, #10b981);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #f9fafb;
          padding: 30px;
          border: 1px solid #e5e7eb;
        }
        .footer {
          background: #1f2937;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 0 0 8px 8px;
          font-size: 14px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 6px;
          border-left: 4px solid #10b981;
        }
        .field-label {
          font-weight: bold;
          color: #065f46;
          margin-bottom: 5px;
        }
        .field-value {
          color: #374151;
        }
        .message-field {
          background: #f0fdf4;
          border-left: 4px solid #22c55e;
        }
        .contact-info {
          margin-top: 30px;
          padding: 20px;
          background: #ecfdf5;
          border-radius: 6px;
          border: 1px solid #bbf7d0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏠 New Contact Form Submission</h1>
        <p>Shah Properties Website</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="field-label">👤 Name:</div>
          <div class="field-value">${data.name}</div>
        </div>
        
        <div class="field">
          <div class="field-label">✉️ Email:</div>
          <div class="field-value">${data.email}</div>
        </div>
        
        <div class="field">
          <div class="field-label">📱 Phone:</div>
          <div class="field-value">${data.phone}</div>
        </div>
        
        <div class="field">
          <div class="field-label">📋 Subject:</div>
          <div class="field-value">${data.subject}</div>
        </div>
        
        <div class="field message-field">
          <div class="field-label">💬 Message:</div>
          <div class="field-value">${data.message.replace(/\n/g, "<br>")}</div>
        </div>
        
        <div class="contact-info">
          <p><strong>Quick Actions:</strong></p>
          <p>📞 <a href="tel:${data.phone}" style="color: #065f46;">Call ${
    data.name
  }</a></p>
          <p>✉️ <a href="mailto:${
            data.email
          }" style="color: #065f46;">Reply to ${data.email}</a></p>
        </div>
      </div>
      
      <div class="footer">
        <p>This email was sent from the Shah Properties contact form</p>
        <p>Timestamp: ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}</p>
      </div>
    </body>
    </html>
  `;
}

// Utility function to create auto-reply email HTML
export function createAutoReplyEmailHTML(name: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Message Received - Shah Properties</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          background: #065f46;
          color: white;
          padding: 25px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border: 1px solid #e5e7eb;
        }
        .footer {
          background: #1f2937;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 0 0 8px 8px;
          font-size: 12px;
        }
        .contact-info {
          background: #f0fdf4;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 4px solid #10b981;
        }
        .cta-button {
          background: #10b981;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          margin: 10px 5px;
          font-weight: bold;
        }
        .unsubscribe {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 11px;
          color: #6b7280;
        }
        .physical-address {
          background: #f9fafb;
          padding: 15px;
          border-radius: 6px;
          margin: 15px 0;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Message Received</h1>
        <p>Shah Properties</p>
      </div>
      
      <div class="content">
        <h2>Hello ${name},</h2>
        
        <p>We have received your message and will respond within 24 hours.</p>
        
        <p>While you wait, you can:</p>
        <ul>
          <li>Visit our website to view properties</li>
          <li>Use our mortgage calculator</li>
          <li>Contact us directly by phone</li>
        </ul>
        
        <div class="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> <a href="tel:+918383815279" style="color: #065f46;">+91 8383815279</a></p>
          <p><strong>Email:</strong> <a href="mailto:shahproperties03@gmail.com" style="color: #065f46;">shahproperties03@gmail.com</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/918383815279" style="color: #065f46;">Chat with us</a></p>
        </div>
        
        <div class="physical-address">
          <p><strong>Our Office:</strong><br>
          Shah Properties<br>
          123 Rajpur Road, Dehradun<br>
          Uttarakhand, India - 248001</p>
        </div>
        
        <p><strong>Business Hours:</strong><br>
        Monday - Saturday: 9:00 AM - 7:00 PM<br>
        Sunday: 10:00 AM - 2:00 PM</p>
        
        <p>Thank you for choosing Shah Properties.</p>
        
        <p>Best regards,<br>
        The Shah Properties Team</p>
        
        <div class="unsubscribe">
          <p>This is an automated response to your contact form submission. To unsubscribe, reply with "UNSUBSCRIBE" in the subject line.</p>
        </div>
      </div>
      
      <div class="footer">
        <p>Shah Properties - Real Estate Services</p>
        <p>Dehradun | <a href="https://shahproperties.8bitcode.in" style="color: #60a5fa;">shahproperties.8bitcode.in</a></p>
        <p>© ${new Date().getFullYear()} Shah Properties. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

// Utility function to create auto-reply plain text
export function createAutoReplyText(name: string): string {
  return `Hello ${name},

Thank you for reaching out to Shah Properties! We have received your message and our team will get back to you within 24 hours.

In the meantime, feel free to:
- Browse our featured properties on our website
- Use our mortgage calculator tool
- Follow us on social media for property updates

Need Immediate Assistance?
Phone: +91 8383815279
Email: shahproperties03@gmail.com
WhatsApp: https://wa.me/918383815279

Business Hours:
Monday - Saturday: 9:00 AM - 7:00 PM
Sunday: 10:00 AM - 2:00 PM

We look forward to helping you with your property needs!

Best regards,
The Shah Properties Team

---
Shah Properties - Your Trusted Real Estate Partner
Dehradun | https://shahproperties.8bitcode.in

This is an automated response to your contact form submission. If you no longer wish to receive these emails, please reply with "UNSUBSCRIBE" in the subject line.`;
}

// Test email connection
export async function testEmailConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Email connection test failed:", error);
    }
    return false;
  }
}
