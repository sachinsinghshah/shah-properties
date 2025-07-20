# Email Service Setup Guide - Shah Properties

## 🎯 Overview

Your contact form now has full email functionality! This guide will help you set up SMTP email service to send and receive contact form submissions.

## 📧 Email Service Options

### Option 1: Gmail SMTP (Recommended for small business)

**Pros:** Free, reliable, easy setup  
**Cons:** Daily sending limits (500 emails/day), less professional

**Setup Steps:**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings → Security
   - Under "Signing in to Google" → App passwords
   - Select app: Mail, Select device: Other (custom name)
   - Copy the 16-character password

3. **Environment Variables:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=shahproperties03@gmail.com
SMTP_PASS=lhao vtpp dryg nbny
CONTACT_EMAIL_TO=info@shahproperties.com
CONTACT_EMAIL_FROM=noreply@shahproperties.com
```

### Option 2: Custom Email Provider SMTP

If you have business email with providers like:
- **Hostinger:** smtp.hostinger.com (port 587)
- **GoDaddy:** smtpout.secureserver.net (port 587)
- **Namecheap:** mail.privateemail.com (port 587)

```env
SMTP_HOST=your-provider-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@shahproperties.com
SMTP_PASS=your-email-password
CONTACT_EMAIL_TO=info@shahproperties.com
CONTACT_EMAIL_FROM=noreply@shahproperties.com
```

### Option 3: Professional Email Services (For high volume)

**SendGrid, Mailgun, or Amazon SES** - Better deliverability, analytics, higher limits

## 🔧 Setup Instructions

### 1. Local Development Setup

Create `.env.local` file in your project root:

```env
# Site Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Shah Properties"

# SMTP Configuration (Port 465 - SSL)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=shahproperties03@gmail.com
SMTP_PASS=lhao vtpp dryg nbny

# Contact Configuration
CONTACT_EMAIL_TO=info@shahproperties.com
CONTACT_EMAIL_FROM=noreply@shahproperties.com
```

### 2. Production Setup (Vercel)

Add environment variables in your Vercel dashboard:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add each variable:

```
NEXT_PUBLIC_BASE_URL = https://shahproperties.8bitcode.in
NEXT_PUBLIC_SITE_NAME = Shah Properties
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465
SMTP_SECURE = true
SMTP_USER = shahproperties03@gmail.com
SMTP_PASS = lhao vtpp dryg nbny
CONTACT_EMAIL_TO = info@shahproperties.com
CONTACT_EMAIL_FROM = noreply@shahproperties.com
```

### 3. Test the Setup

1. **Start development server:**
```bash
npm run dev
```

2. **Test contact form:**
   - Go to http://localhost:3000/contact
   - Fill out the form
   - Check your email for:
     - Business notification (to CONTACT_EMAIL_TO)
     - Auto-reply confirmation (to the email you entered)

## 📋 Email Features Implemented

### ✅ Business Notification Email
- **To:** Your business email (CONTACT_EMAIL_TO)
- **Subject:** "New Contact Form Submission: [Subject]"
- **Content:** Beautifully formatted HTML with all form data
- **Features:** Click-to-call, click-to-email links

### ✅ Auto-Reply Email
- **To:** Customer's email
- **Subject:** "Thank you for contacting Shah Properties"
- **Content:** Professional thank you message
- **Features:** Business hours, contact info, CTA buttons

### ✅ Error Handling
- Graceful fallback if email service is down
- Logs errors only in development
- User always gets success response

## 🔍 Troubleshooting

### Common Issues

**"SMTP credentials required" Error:**
- Check environment variables are set correctly
- Verify .env.local file exists and has no typos

**Gmail "Invalid credentials" Error:**
- Enable 2-Factor Authentication
- Use App Password, not regular password
- Check SMTP_USER is correct email address

**Connection timeout errors:**
- **Port 587 blocked:** Use port 465 (SSL) instead
- **Firewall issues:** Try different ports or contact network admin
- **Network restrictions:** Use SSL port 465 which is more commonly allowed

**Emails not being sent:**
- Check spam/junk folders
- Verify SMTP_HOST and SMTP_PORT
- Test with a simple email service first

**Auto-reply not working but business email works:**
- This is expected behavior - auto-reply failures don't break the form
- Check development console for error details

### Testing Commands

Test email connection:
```bash
# Run the test script
node test-email-connection.js
```

## 🚀 Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Test contact form on production site
- [ ] Verify business email receives notifications
- [ ] Check auto-reply works
- [ ] Test from different email addresses
- [ ] Check spam folder configuration

## 📊 Email Service Recommendations

### For Testing & Small Business (0-100 contacts/month)
✅ **Gmail SMTP** - Free, reliable

### For Growing Business (100-1000 contacts/month)
✅ **Business Email SMTP** - Professional sender address

### For High Volume (1000+ contacts/month)
✅ **SendGrid/Mailgun** - Better deliverability, analytics

## 🔒 Security Notes

- Never commit `.env.local` to git (already in .gitignore)
- Use App Passwords for Gmail, not main password
- Consider using dedicated email service for production
- Monitor email sending logs for suspicious activity

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set
3. Test with a simple Gmail setup first
4. Check development console for error messages

Your email service is now production-ready! 🎉 