#!/usr/bin/env node

/**
 * Area-Based Image Update Script for Shah Properties
 * This script helps update property data with real images organized by area
 */

const fs = require("fs");
const path = require("path");

// Area-based image path mapping
const areaImagePaths = {
  // Dehradun Areas
  kalyanpur: {
    1: [
      // Van Vihar Plot
      "/images/properties/dehradun/kalyanpur/van-vihar-main.jpg",
      "/images/properties/dehradun/kalyanpur/van-vihar-location.jpg",
      "/images/properties/dehradun/kalyanpur/van-vihar-surroundings.jpg",
    ],
    2: [
      // Kalyanpur Plot
      "/images/properties/dehradun/kalyanpur/plot-main.jpg",
      "/images/properties/dehradun/kalyanpur/plot-location.jpg",
      "/images/properties/dehradun/kalyanpur/plot-surroundings.jpg",
    ],
    3: [
      // Kalyanpur Plot (formerly Shimla Bypass)
      "/images/properties/dehradun/kalyanpur/van-vihar-main.jpg",
      "/images/properties/dehradun/kalyanpur/van-vihar-location.jpg",
      "/images/properties/dehradun/kalyanpur/van-vihar-surroundings.jpg",
    ],
  },
  "vikas-nagar": {
    4: [
      // Vikas Nagar Plot
      "/images/properties/dehradun/vikas-nagar/main.jpg",
      "/images/properties/dehradun/vikas-nagar/location.jpg",
      "/images/properties/dehradun/vikas-nagar/surroundings.jpg",
    ],
  },
  pondha: {
    5: [
      // Pondha Premium Plot
      "/images/properties/dehradun/pondha/premium-main.jpg",
      "/images/properties/dehradun/pondha/premium-location.jpg",
      "/images/properties/dehradun/pondha/premium-surroundings.jpg",
    ],
    6: [
      // Pondha Small Plot
      "/images/properties/dehradun/pondha/small-main.jpg",
      "/images/properties/dehradun/pondha/small-location.jpg",
      "/images/properties/dehradun/pondha/small-surroundings.jpg",
    ],
  },
  dholas: {
    10: [
      // Dholas Plot
      "/images/properties/dehradun/dholas/main.jpg",
      "/images/properties/dehradun/dholas/location.jpg",
      "/images/properties/dehradun/dholas/surroundings.jpg",
    ],
  },

  // Saharanpur Areas
  "badshahi-bagh": {
    7: [
      // Badshahi Bagh Farm
      "/images/properties/saharanpur/badshahi-bagh/farm-main.jpg",
      "/images/properties/saharanpur/badshahi-bagh/farm-location.jpg",
      "/images/properties/saharanpur/badshahi-bagh/farm-surroundings.jpg",
    ],
    8: [
      // Badshahi Bagh Small Farm
      "/images/properties/saharanpur/badshahi-bagh/small-main.jpg",
      "/images/properties/saharanpur/badshahi-bagh/small-location.jpg",
      "/images/properties/saharanpur/badshahi-bagh/small-surroundings.jpg",
    ],
  },
  behat: {
    9: [
      // Behat Plot
      "/images/properties/saharanpur/behat/main.jpg",
      "/images/properties/saharanpur/behat/location.jpg",
      "/images/properties/saharanpur/behat/surroundings.jpg",
    ],
  },
};

// Property to area mapping
const propertyToArea = {
  1: "kalyanpur",
  2: "kalyanpur",
  3: "kalyanpur",
  4: "vikas-nagar",
  5: "pondha",
  6: "pondha",
  7: "badshahi-bagh",
  8: "badshahi-bagh",
  9: "behat",
  10: "dholas",
};

function checkImageExists(imagePath) {
  const fullPath = path.join(process.cwd(), "public", imagePath);
  return fs.existsSync(fullPath);
}

function getAvailableImages(propertyId) {
  const area = propertyToArea[propertyId];
  if (!area || !areaImagePaths[area] || !areaImagePaths[area][propertyId]) {
    return [];
  }

  const images = areaImagePaths[area][propertyId];
  const availableImages = images.filter((img) => checkImageExists(img));

  return {
    area,
    totalImages: images.length,
    availableImages: availableImages.length,
    missingImages: images.length - availableImages.length,
    images: availableImages,
    missing: images.filter((img) => !checkImageExists(img)),
  };
}

function generateUpdateScript(propertyId) {
  const imageInfo = getAvailableImages(propertyId);

  if (imageInfo.availableImages === 0) {
    console.log(`❌ Property ${propertyId}: No images available yet`);
    console.log(`   Missing: ${imageInfo.missing.join(", ")}`);
    return null;
  }

  console.log(
    `✅ Property ${propertyId} (${imageInfo.area}): ${imageInfo.availableImages}/${imageInfo.totalImages} images ready`
  );

  if (imageInfo.missingImages > 0) {
    console.log(`   Missing: ${imageInfo.missing.join(", ")}`);
  }

  return `
// Update Property ${propertyId} images
{
  id: "${propertyId}",
  images: ${JSON.stringify(imageInfo.images, null, 2)}
}`;
}

function main() {
  console.log("🏠 Shah Properties - Area-Based Image Checker\n");

  const allProperties = Object.keys(propertyToArea)
    .map(Number)
    .sort((a, b) => a - b);

  console.log("📊 Image Status by Property:\n");

  let totalImages = 0;
  let availableImages = 0;
  let readyProperties = [];

  allProperties.forEach((propertyId) => {
    const imageInfo = getAvailableImages(propertyId);
    totalImages += imageInfo.totalImages;
    availableImages += imageInfo.availableImages;

    if (imageInfo.availableImages > 0) {
      readyProperties.push(propertyId);
    }
  });

  console.log(
    `📈 Overall Status: ${availableImages}/${totalImages} images available`
  );
  console.log(
    `🏠 Properties with images: ${readyProperties.length}/${allProperties.length}`
  );

  if (readyProperties.length > 0) {
    console.log("\n🚀 Ready to update properties:", readyProperties.join(", "));
    console.log("\n📝 Update script for ready properties:");

    readyProperties.forEach((propertyId) => {
      const updateScript = generateUpdateScript(propertyId);
      if (updateScript) {
        console.log(updateScript);
      }
    });
  }

  console.log("\n📋 Next Steps:");
  console.log("1. Add missing images to the appropriate folders");
  console.log("2. Run this script again to check availability");
  console.log("3. Update src/data/properties.ts with the new image paths");
}

if (require.main === module) {
  main();
}

module.exports = {
  areaImagePaths,
  propertyToArea,
  getAvailableImages,
  checkImageExists,
};
