# Google Analytics & Search Console Setup Guide

## 🎯 **Step-by-Step Setup Instructions**

### **1. Create Google Analytics 4 (GA4) Account**

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Click "Start measuring"**
3. **Account Setup**:
   - Account name: `Shah Properties`
   - Data sharing settings: Enable all (recommended)
4. **Property Setup**:
   - Property name: `Shah Properties Website`
   - Reporting time zone: `Asia/Kolkata`
   - Currency: `Indian Rupee (INR)`
5. **Business Details**:
   - Industry category: `Real Estate`
   - Business size: `Small business`
   - Business objectives: Select all relevant options

### **2. Get Your GA4 Measurement ID**

1. After creating the property, you'll get a **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID - you'll need it for the environment variables

### **3. Create Google Search Console Account**

1. **Go to Google Search Console**: https://search.google.com/search-console
2. **Add Property**:
   - Choose "Domain" property type (recommended)
   - Enter: `shahproperties.com`
3. **Verify Ownership**:
   - Choose "HTML tag" method
   - Copy the verification code (format: `xxxxxxxxxxxxxxxxxx`)

### **4. Environment Variables Setup**

Create or update your `.env.local` file with these variables:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
GOOGLE_VERIFICATION_CODE=xxxxxxxxxxxxxxxxxx

# Base URL
NEXT_PUBLIC_BASE_URL=https://shahproperties.8bitcode.in
```

### **5. Test the Setup**

1. **Start your development server**:

   ```bash
   npm run dev
   ```

2. **Check Google Analytics**:

   - Open browser dev tools
   - Go to Network tab
   - Look for requests to `googletagmanager.com`
   - Check Console for "Google Analytics loaded" message

3. **Verify Search Console**:
   - Deploy your site
   - Go to Google Search Console
   - Click "Verify" button

## 📊 **What We're Tracking**

### **Automatic Tracking**:

- ✅ Page views
- ✅ User sessions
- ✅ Traffic sources
- ✅ Device types
- ✅ Geographic locations

### **Custom Events**:

- 🏠 **Property Views**: Uses standard GA4 `view_item` event for enhanced ecommerce tracking
- 📞 **Phone Calls**: `phone_call_click` event when users click phone numbers
- 📝 **Contact Forms**: `contact_form_submit` event when forms are submitted
- 🔍 **Search Queries**: `search` event when users search for properties
- 📱 **Button Clicks**: Important CTA interactions

### **Enhanced E-commerce**:

- 💰 Property prices
- 📍 Property locations
- 🏘️ Property types
- 👤 Agent interactions

## 🎯 **Next Steps After Setup**

### **1. Configure Goals in GA4**

- **Contact Form Submissions**
- **Phone Call Tracking**
- **Property View Goals**
- **Search Engagement**

### **2. Set Up Custom Reports**

- **Property Performance Report**
- **Location-based Analytics**
- **Lead Generation Funnel**
- **User Journey Analysis**

### **3. Search Console Optimization**

- **Submit Sitemap**: `https://shahproperties.8bitcode.in/sitemap.xml`
- **Monitor Core Web Vitals**
- **Track Search Performance**
- **Fix any indexing issues**

### **4. Advanced Tracking Features**

- **Enhanced E-commerce** for property sales
- **User ID tracking** for returning visitors
- **Custom dimensions** for property types
- **Conversion tracking** for lead generation

## 🔧 **Troubleshooting**

### **Common Issues**:

1. **Analytics not loading**:

   - Check if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
   - Verify the ID format (should start with `G-`)

2. **Search Console verification fails**:

   - Ensure the meta tag is present in page source
   - Wait 24-48 hours for verification

3. **No data appearing**:
   - Check if ad blockers are disabled
   - Verify the property is in the correct timezone
   - Wait 24-48 hours for initial data

## 📈 **Expected Results**

After setup, you should see:

- **Real-time data** in Google Analytics
- **Search performance** in Search Console
- **Property-specific insights**
- **User behavior patterns**
- **Conversion tracking**

## 🚀 **Advanced Features to Enable**

1. **Enhanced E-commerce**
2. **User ID Tracking**
3. **Custom Dimensions**
4. **Event Tracking**
5. **Conversion Goals**

---

**Need Help?** Check the Google Analytics and Search Console documentation for detailed guides.
