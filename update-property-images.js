// Script to update property images with real photos
// Run this after adding real images to the properties folder

const fs = require("fs");
const path = require("path");

// Function to check if image exists
function imageExists(imagePath) {
  return fs.existsSync(path.join("public", imagePath));
}

// Function to update property data
function updatePropertyImages() {
  console.log("🏠 Checking for real property images...\n");

  const properties = [
    {
      id: "1",
      name: "Van Vihar Plot",
      images: [
        "/images/properties/property-1-main.jpg",
        "/images/properties/property-1-location.jpg",
        "/images/properties/property-1-surroundings.jpg",
      ],
    },
    {
      id: "2",
      name: "Kalyanpur Plot",
      images: [
        "/images/properties/property-2-main.jpg",
        "/images/properties/property-2-location.jpg",
        "/images/properties/property-2-surroundings.jpg",
      ],
    },
    {
      id: "3",
      name: "Shimla Bypass Plot",
      images: [
        "/images/properties/property-3-main.jpg",
        "/images/properties/property-3-location.jpg",
        "/images/properties/property-3-surroundings.jpg",
      ],
    },
  ];

  let allImagesExist = true;
  const missingImages = [];

  properties.forEach((property) => {
    console.log(`📸 Checking Property ${property.id}: ${property.name}`);

    property.images.forEach((imagePath) => {
      if (imageExists(imagePath)) {
        console.log(`  ✅ ${path.basename(imagePath)}`);
      } else {
        console.log(`  ❌ ${path.basename(imagePath)} - MISSING`);
        allImagesExist = false;
        missingImages.push(imagePath);
      }
    });
    console.log("");
  });

  if (allImagesExist) {
    console.log("🎉 All property images are ready!");
    console.log(
      "📝 Next step: Update src/data/properties.ts with real image paths"
    );

    console.log("\n📋 Image paths to use:");
    properties.forEach((property) => {
      console.log(`\nProperty ${property.id}:`);
      property.images.forEach((image) => {
        console.log(`  "${image}",`);
      });
    });
  } else {
    console.log("⚠️  Some images are missing:");
    missingImages.forEach((image) => {
      console.log(`  - ${image}`);
    });
    console.log("\n📸 Please add the missing images to the properties folder");
  }
}

// Run the update
updatePropertyImages();
