# Real Images Guide - Shah Properties

## 🏠 **Image Requirements for Professional Real Estate Website**

### **1. Property Images (Priority: HIGH)**

**For Each Property Listing:**
- **Main Property Photo** (800x600px) - Best angle of the plot
- **Location Shot** (800x600px) - Street view or entrance
- **Surrounding Area** (800x600px) - Neighborhood context
- **Aerial View** (if available) - Google Maps screenshot or drone shot

**Recommended Image Specifications:**
- **Format**: JPG or PNG
- **Size**: 800x600px minimum, 1200x800px optimal
- **File Size**: Under 500KB per image
- **Quality**: High quality, well-lit photos

### **2. Business Images (Priority: MEDIUM)**

**Team Photos:**
- Professional headshots of team members
- Team group photo
- Office staff photos

**Office & Location:**
- Office building exterior
- Office interior
- Signage and branding
- Local landmarks (Dehradun, Saharanpur)

### **3. Current Image Status**

**Placeholder Images:**
- `image1.jpg` - 99KB
- `image2.jpg` - 87KB  
- `image3.jpg` - 105KB
- `image4.jpg` - 298KB

**Properties Using These:**
- Property 1: Van Vihar Plot (image1, image2, image3)
- Property 2: Kalyanpur Plot (image2, image3, image4)
- Property 3: Shimla Bypass Plot (image3, image1, image4)

## 📸 **How to Add Real Images**

### **Step 1: Prepare Your Images**

**For Property Photos:**
1. **Take Photos** of actual properties you're listing
2. **Edit Photos** for consistent lighting and quality
3. **Resize** to 800x600px or 1200x800px
4. **Optimize** file size to under 500KB
5. **Name Convention**: `property-{id}-{number}.jpg`

**Example Naming:**
- `property-1-main.jpg` - Main plot photo
- `property-1-location.jpg` - Location shot
- `property-1-surroundings.jpg` - Area view

### **Step 2: Upload Images**

**Option A: Direct Upload to Vercel**
1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to Settings → Functions
4. Upload images to `public/images/` folder

**Option B: Local Development**
1. Add images to `public/images/` folder
2. Commit and push to GitHub
3. Vercel will auto-deploy

### **Step 3: Update Property Data**

**Update `src/data/properties.ts`:**
```typescript
images: [
  "/images/property-1-main.jpg",
  "/images/property-1-location.jpg", 
  "/images/property-1-surroundings.jpg"
]
```

## 🎯 **Immediate Action Plan**

### **Phase 1: Property Photos (This Week)**
1. **Take Photos** of your actual property listings
2. **Edit & Optimize** images for web
3. **Upload** to `public/images/` folder
4. **Update** property data with real image paths

### **Phase 2: Business Photos (Next Week)**
1. **Team Photos** - Professional headshots
2. **Office Photos** - Building and interior
3. **Location Photos** - Local landmarks

### **Phase 3: Additional Content (Ongoing)**
1. **Property Videos** - Short clips of properties
2. **Virtual Tours** - 360° property views
3. **Before/After** - Development progress

## 📱 **Image Optimization Tips**

### **For Web Performance:**
- **Compress** images without losing quality
- **Use WebP format** for better compression
- **Implement lazy loading** (already done)
- **Provide multiple sizes** for responsive design

### **For SEO:**
- **Descriptive filenames**: `van-vihar-residential-plot.jpg`
- **Alt text** for accessibility
- **Structured data** with image information

## 🏗️ **Image Structure Example**

```
public/images/
├── properties/
│   ├── property-1/
│   │   ├── main.jpg
│   │   ├── location.jpg
│   │   └── surroundings.jpg
│   ├── property-2/
│   │   ├── main.jpg
│   │   ├── location.jpg
│   │   └── surroundings.jpg
│   └── property-3/
│       ├── main.jpg
│       ├── location.jpg
│       └── surroundings.jpg
├── business/
│   ├── team/
│   │   ├── roshan-shah.jpg
│   │   └── team-group.jpg
│   ├── office/
│   │   ├── office-exterior.jpg
│   │   └── office-interior.jpg
│   └── locations/
│       ├── dehradun-landmark.jpg
│       └── saharanpur-landmark.jpg
└── hero/
    ├── hero-1.jpg
    ├── hero-2.jpg
    └── hero-3.jpg
```

## 🚀 **Quick Start Instructions**

### **If You Have Property Photos Ready:**

1. **Rename your photos** using the convention above
2. **Resize them** to 800x600px or 1200x800px
3. **Optimize file size** to under 500KB each
4. **Upload to** `public/images/properties/` folder
5. **Update** the property data in `src/data/properties.ts`

### **If You Need to Take Photos:**

1. **Visit each property** with a good camera/phone
2. **Take multiple angles** - front, side, aerial view
3. **Include location context** - street view, landmarks
4. **Ensure good lighting** - avoid shadows and glare
5. **Follow the naming convention** above

## 📞 **Need Help?**

**I can help you:**
1. **Update the code** once you have images
2. **Optimize images** for web performance
3. **Structure the image folders** properly
4. **Update property data** with new image paths

**Your website is ready for real images!** 🎉

Just add your actual property photos and we'll update the website to showcase your real listings professionally. 