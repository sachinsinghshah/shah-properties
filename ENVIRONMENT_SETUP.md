# Environment Variables Setup

## 📝 **Create Your .env.local File**

Create a file named `.env.local` in your project root with the following variables:

```env
# Google Analytics 4
# Get this from: https://analytics.google.com/
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
# Get this from: https://search.google.com/search-console
# Format: xxxxxxxxxxxxxxxxxx
GOOGLE_VERIFICATION_CODE=xxxxxxxxxxxxxxxxxx

# Base URL for your website
NEXT_PUBLIC_BASE_URL=https://shahproperties.com

# Optional: Other search engine verifications
YANDEX_VERIFICATION_CODE=xxxxxxxxxxxxxxxxxx
YAHOO_VERIFICATION_CODE=xxxxxxxxxxxxxxxxxx

# Email Configuration (if using contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🔍 **How to Get These Values**

### **1. Google Analytics Measurement ID**

1. Go to https://analytics.google.com/
2. Create a new GA4 property
3. Copy the Measurement ID (starts with `G-`)

### **2. Google Search Console Verification Code**

1. Go to https://search.google.com/search-console
2. Add your property (shahproperties.com)
3. Choose "HTML tag" verification method
4. Copy the verification code

### **3. Base URL**

- Use your actual domain: `https://shahproperties.com`

## ⚠️ **Important Notes**

- **Never commit `.env.local` to version control**
- **Restart your development server** after adding environment variables
- **Test the setup** by checking browser dev tools for analytics requests

## 🧪 **Testing Your Setup**

1. **Start development server**:

   ```bash
   npm run dev
   ```

2. **Check browser console** for:

   - "Google Analytics loaded" message
   - No errors related to missing environment variables

3. **Check Network tab** for:
   - Requests to `googletagmanager.com`
   - Successful loading of analytics scripts
