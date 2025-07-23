// Property data file for Shah Properties
// Contains actual properties in Dehradun and surrounding areas

import { Property } from "@/types";

// COMPLETELY FLEXIBLE area-based image mapping - supports ANY image names!
// Just add your images with ANY names to the arrays below
const areaImageMap: Record<string, string[]> = {
  kalyanpur: [
    "/images/properties/dehradun/kalyanpur/van-vihar-main.jpg",
    "/images/properties/dehradun/kalyanpur/van-vihar-location.jpg",
    "/images/properties/dehradun/kalyanpur/van-vihar-surroundings.jpg",
    "/images/properties/dehradun/kalyanpur/plot-main.jpg",
    "/images/properties/dehradun/kalyanpur/plot-location.jpg",
    "/images/properties/dehradun/kalyanpur/plot-surroundings.jpg",
    // Add more images with ANY names:
    // "/images/properties/dehradun/kalyanpur/my-custom-photo.jpg",
    // "/images/properties/dehradun/kalyanpur/beautiful-sunset.jpg",
    // "/images/properties/dehradun/kalyanpur/drone-shot.jpg",
  ],
  pondha: [
    // Add your real Pondha images with ANY names:
    "/images/properties/dehradun/pondha/pondha_1.jpg",
    "/images/properties/dehradun/pondha/pondha_2.jpg",
    "/images/properties/dehradun/pondha/pondha_3.jpg",
    "/images/properties/dehradun/pondha/pondha_4.jpg",
    "/images/properties/dehradun/pondha/pondha_5.jpg",
  ],

  dholas: [
    // Add your real Dholas images with ANY names:
    "/images/properties/dehradun/dholas/dholas_1.jpg",
    "/images/properties/dehradun/dholas/dholas_2.jpg",
  ],
};

// Helper function to get area-based images - supports ANY image names
function getAreaImages(location: string): string[] {
  const locationLower = location.toLowerCase();

  // Check for each area and return all available images
  if (locationLower.includes("kalyanpur")) {
    return areaImageMap["kalyanpur"];
  } else if (locationLower.includes("pondha")) {
    return areaImageMap["pondha"];
  } else if (locationLower.includes("dholas")) {
    return areaImageMap["dholas"];
  }

  // Fallback to generic images if no area match
  return ["/images/image1.jpg", "/images/image2.jpg", "/images/image3.jpg"];
}

// Helper function to add images with ANY names to an area
function addImagesToArea(areaKey: string, newImages: string[]): void {
  if (areaImageMap[areaKey]) {
    // Add new images to existing area (avoid duplicates)
    const existingImages = new Set(areaImageMap[areaKey]);
    newImages.forEach((img) => {
      if (!existingImages.has(img)) {
        areaImageMap[areaKey].push(img);
      }
    });
  } else {
    // Create new area with images
    areaImageMap[areaKey] = newImages;
  }
}

// Helper function to update area images (for easy management)
function updateAreaImages(areaKey: string, images: string[]): void {
  areaImageMap[areaKey] = images;
}

// Export the area image map for external access
export { areaImageMap, addImagesToArea, updateAreaImages };

// Real properties data based on the reference links
export const properties: Property[] = [
  {
    id: "1",
    title: "200 Sq. Yards Residential Plot in Van Vihar, Kalyanpur",
    description:
      "Opportunity to get cheap plots near city in Dehradun! Located just 20 minutes drive from ISBT, these plots are in Kalyanpur near 4 lane Chandigarh Highway. Fair deal, mutation, and up to 90% bank loan facility available. Get higher returns than bank FD. Small and big plots available, contact quickly. No brokerage. Rate 10500/square yard.",
    price: 2100000, // 21 Lac
    pricePerSqYard: 10500,
    location: "Kalyanpur, Van Vihar, Dehradun",
    area: {
      value: 200,
      unit: "Sq. Yards",
    },
    type: "residential",
    category: "plot",
    features: [
      "Near 4 Lane Chandigarh Highway",
      "20 Minutes from ISBT",
      "Fair Deal with Mutation",
      "Up to 90% Bank Loan Available",
      "No Brokerage",
      "Higher Returns than Bank FD",
    ],
    amenities: [
      "Road Connectivity",
      "Electricity Connection",
      "Water Supply Available",
      "Clear Title",
      "Bank Loan Facility",
    ],
    nearbyFacilities: [
      {
        name: "Hospitals",
        distance: "1 KM",
        type: "healthcare",
      },
      {
        name: "School",
        distance: "2 KM",
        type: "education",
      },
      {
        name: "Bank",
        distance: "3 KM",
        type: "bank",
      },
      {
        name: "Railway Station",
        distance: "4 KM",
        type: "transport",
      },
      {
        name: "Airport",
        distance: "7 KM",
        type: "transport",
      },
      {
        name: "Shopping Mall",
        distance: "8 KM",
        type: "shopping",
      },
      {
        name: "Metro Station",
        distance: "9 KM",
        type: "transport",
      },
    ],
    images: getAreaImages("Kalyanpur, Van Vihar, Dehradun"),
    videoUrl: "https://youtu.be/RvOUMyv6Css?si=X9QMicUdf7X_B2ai",
    agent: {
      name: "Roshan Singh Shah",
      phone: "8383815279",
      email: "shahproperties03@gmail.com",
      facebook: "https://www.facebook.com/share/1AnqEc5BRA/",
    },
    postedDate: "2023-10-15",
    status: "available",
  },
  {
    id: "2",
    title:
      "200 Sq. Yards Residential Plot For Sale In Shimla Bypass Road, Dehradun",
    description:
      "👍👍👍👍 2100 square yard, negotiable 👍👍👍👍 800 yard plot is available for sale on Shimla bypass road which is 500 meters from the highway. Anyone who wants even 80-90 yards can get it. 90% loan is available. It is a clean place, on one side there is a lush green forest which is situated at a height. The plot is situated at a high place from where a magnificent view of Dehradun and Mussoorie is visible. Underground tubewell line is laid for irrigation. Those who are thinking of buying land by collecting money, change your thinking. It would be better to take a loan. Build your own house instead of renting and pay EMI. Clear, land with mutation. Approach Road 50/20/25/30 feet.",
    price: 2100000, // 21 Lac
    pricePerSqYard: 10500,
    location: "Kalyanpur, Van Vihar, Dehradun",
    area: {
      value: 200,
      unit: "Sq. Yards",
    },
    type: "residential",
    category: "plot",
    features: [
      "MDDA Approved",
      "Clear Title Property",
      "Good Investment Returns",
      "Nearby Developments",
      "Proper Documentation",
      "Mountain View",
    ],
    amenities: [
      "Water Supply",
      "Electricity Connection",
      "Proper Drainage System",
      "Road Infrastructure",
      "Street Lights",
    ],
    nearbyFacilities: [
      {
        name: "Doon University",
        distance: "3 KM",
        type: "education",
      },
      {
        name: "Synergy Hospital",
        distance: "2 KM",
        type: "hospital",
      },
      {
        name: "Local Market",
        distance: "1 KM",
        type: "shopping",
      },
      {
        name: "State Bank of India",
        distance: "2.5 KM",
        type: "bank",
      },
      {
        name: "Public Transport",
        distance: "800 M",
        type: "transport",
      },
    ],
    images: getAreaImages("Kalyanpur, Van Vihar, Dehradun"),
    videoUrl: "https://youtu.be/RvOUMyv6Css?si=X9QMicUdf7X_B2ai",
    agent: {
      name: "Roshan Singh Shah",
      phone: "8383815279",
      email: "shahproperties03@gmail.com",
      facebook: "https://www.facebook.com/share/1AnqEc5BRA/",
    },
    postedDate: "2023-09-02",
    status: "available",
  },
  {
    id: "3",
    title:
      "100 Sq. Yards Residential Plot For Sale In Shimla Bypass Road Shimla Bypass Road, Dehradun",
    description:
      "100 square yard plot for sale at Shimla bypass road dehradun. For more information Kindly contact 7518215007.",
    price: 1050000, // 10.50 Lac
    pricePerSqYard: 10500,
    location: "Kalyanpur, Van Vihar, Dehradun",
    area: {
      value: 100,
      unit: "Sq. Yards",
    },
    type: "residential",
    category: "plot",
    features: [
      "Shimla Bypass Road Location",
      "Affordably Priced",
      "Ready for Construction",
      "Good Connectivity",
      "Clear Title",
      "Investment Opportunity",
    ],
    amenities: [
      "Road Access",
      "Electricity Connection",
      "Water Supply Available",
      "Clear Documentation",
      "Immediate Possession",
    ],
    nearbyFacilities: [
      {
        name: "Hospital",
        distance: "3 KM",
        type: "healthcare",
      },
      {
        name: "School",
        distance: "3 KM",
        type: "education",
      },
      {
        name: "Bank",
        distance: "3 KM",
        type: "bank",
      },
      {
        name: "Bus Stop",
        distance: "1 KM",
        type: "transport",
      },
      {
        name: "Airport",
        distance: "45 KM",
        type: "transport",
      },
      {
        name: "Atm",
        distance: "3 KM",
        type: "bank",
      },
      {
        name: "Shopping Mall",
        distance: "3 KM",
        type: "shopping",
      },
      {
        name: "Railway",
        distance: "23 KM",
        type: "transport",
      },
    ],
    images: getAreaImages("Kalyanpur, Van Vihar, Dehradun"),
    videoUrl: "https://youtu.be/RvOUMyv6Css?si=X9QMicUdf7X_B2ai",
    agent: {
      name: "Roshan Singh Shah",
      phone: "8383815279",
      email: "shahproperties03@gmail.com",
      facebook: "https://www.facebook.com/share/1AnqEc5BRA/",
    },
    postedDate: "2023-09-10",
    status: "available",
  },
  {
    id: "5",
    title: "Residential Plot For Sale In Pondha, Dehradun (150 Sq. Yards)",
    description:
      "Premium MDDA approved residential plot in the prestigious Laxmi Garden society, Pondha, Dehradun. This 150 square yard plot is strategically located on Gurkul road with excellent connectivity and infrastructure. Perfect for building your dream home in a well-planned residential society. The area is known for its proximity to educational institutions, hospitals, and commercial centers. New MDDA Approved plots coming soon in Dehradun - contact us to book your perfect size and facing plots in this prime Dehradun society.",
    price: 5400000, // 54 Lac
    pricePerSqYard: 36000,
    location: "Gurkul Road, Pondha, Dehradun",
    area: {
      value: 150,
      unit: "Sq. Yards",
    },
    type: "residential",
    category: "plot",
    features: [
      "MDDA Approved",
      "Laxmi Garden Society",
      "Gurkul Road Location",
      "Premium Plot",
      "New Property",
      "Immediate Possession",
    ],
    amenities: [
      "Electricity Available",
      "Water Supply",
      "Proper Drainage",
      "Wide Roads",
      "Society Infrastructure",
      "Security Provisions",
    ],
    nearbyFacilities: [
      {
        name: "Hospitals",
        distance: "1 KM",
        type: "hospital",
      },
      {
        name: "School",
        distance: "2 KM",
        type: "school",
      },
      {
        name: "Bank",
        distance: "3 KM",
        type: "bank",
      },
      {
        name: "ATM",
        distance: "5 KM",
        type: "bank",
      },
      {
        name: "Bus Stop",
        distance: "6 KM",
        type: "transport",
      },
      {
        name: "Shopping Mall",
        distance: "8 KM",
        type: "shopping",
      },
    ],
    images: getAreaImages("Gurkul Road, Pondha, Dehradun"),
    videoUrl: "https://youtu.be/m4p9OR2Hn6Q?si=vZ4BLDZBHU3PVONl",
    agent: {
      name: "Roshan Singh Shah",
      phone: "8383815279",
      email: "shahproperties03@gmail.com",
      facebook: "https://www.facebook.com/share/1AnqEc5BRA/",
    },
    postedDate: "2023-08-18",
    status: "available",
  },
  {
    id: "6",
    title:
      "RERA Approved Gated Society Plots For Sale In Pondha, Dehradun (180 Sq. Yards)",
    description:
      "RERA and MDDA Approved gated society plots are available for sale at Dehradun. This premium 180 square yard residential plot is located in the prestigious Vishnu Garden society on Gurkul road, Pondha, Dehradun. The plot features excellent facilities including 30 feet cemented road, electricity availability, running water tap, STP and STP chamber, bank loan facility, and no brokerage. Price starts from 33000 per square yard onwards. Contact us for more details and site visit.",
    price: 6000000, // 60 Lac
    pricePerSqYard: 33333,
    location: "Gurkul Road, Pondha, Dehradun",
    area: {
      value: 180,
      unit: "Sq. Yards",
    },
    type: "residential",
    category: "plot",
    features: [
      "RERA Approved",
      "MDDA Approved",
      "Gated Society",
      "Vishnu Garden Society",
      "No Brokerage",
      "Bank Loan Facility",
    ],
    amenities: [
      "30 Feet Cemented Road",
      "Electricity Available",
      "Running Water Tap",
      "STP and STP Chamber",
      "Geet lakh lira Water Storage Tank",
      "Security Features",
    ],
    nearbyFacilities: [
      {
        name: "Hospital",
        distance: "1 KM",
        type: "hospital",
      },
      {
        name: "School",
        distance: "5 KM",
        type: "school",
      },
      {
        name: "Bank",
        distance: "1 KM",
        type: "bank",
      },
      {
        name: "Airport",
        distance: "30 KM",
        type: "transport",
      },
      {
        name: "Railway",
        distance: "15 KM",
        type: "transport",
      },
      {
        name: "Shopping Mall",
        distance: "1 KM",
        type: "shopping",
      },
      {
        name: "ATM",
        distance: "1 KM",
        type: "bank",
      },
      {
        name: "Bus Stop",
        distance: "5 KM",
        type: "transport",
      },
    ],
    images: getAreaImages("Gurkul Road, Pondha, Dehradun"),
    videoUrl: "https://youtu.be/m4p9OR2Hn6Q?si=vZ4BLDZBHU3PVONl",
    agent: {
      name: "Roshan Singh Shah",
      phone: "8383815279",
      email: "shahproperties03@gmail.com",
      facebook: "https://www.facebook.com/share/1AnqEc5BRA/",
    },
    postedDate: "2023-06-30",
    status: "available",
  },
  {
    id: "10",
    title: "80 Sq. Yards Residential Plot in Dholas, Dehradun",
    description:
      "Affordable residential plot in the upcoming area of Dholas, Dehradun. Perfect for those looking to build a small home or as an entry-level investment in Dehradun real estate. The plot is located in a peaceful residential area with good connectivity to the city center. As Dehradun continues to expand, this area offers excellent potential for property appreciation. The plot has all basic amenities and clear documentation for hassle-free purchase.",
    price: 960000, // 9.6 Lac
    pricePerSqYard: 12000,
    location: "Dholas, Dehradun",
    area: {
      value: 80,
      unit: "Sq. Yards",
    },
    type: "residential",
    category: "plot",
    features: [
      "Affordable Price",
      "Growing Area",
      "Clean Environment",
      "Clear Title",
      "Immediate Registration",
      "Construction Ready",
    ],
    amenities: [
      "Electricity Availability",
      "Water Connection",
      "Road Access",
      "Sewage System",
      "Street Lighting",
    ],
    nearbyFacilities: [
      {
        name: "Primary School",
        distance: "1.0 KM",
        type: "education",
      },
      {
        name: "Community Clinic",
        distance: "1.5 KM",
        type: "healthcare",
      },
      {
        name: "Convenience Store",
        distance: "800 M",
        type: "shopping",
      },
      {
        name: "Post Office",
        distance: "1.2 KM",
        type: "service",
      },
      {
        name: "Bus Stop",
        distance: "500 M",
        type: "transport",
      },
    ],
    images: getAreaImages("Dholas, Dehradun"),
    agent: {
      name: "Roshan Singh Shah",
      phone: "8383815279",
      email: "shahproperties03@gmail.com",
      facebook: "https://www.facebook.com/share/1AnqEc5BRA/",
    },
    postedDate: "2023-11-01",
    status: "available",
  },
];

/*
// Detailed property information with more fields - Currently not used
export const propertyDetails = {
  "1": {
    id: "1",
    title: "Premium Residential Plot in Pondha",
    address: "Pondha, Dehradun, Uttarakhand",
    price: 3800000,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 1800,
    squareYards: 200,
    pricePerSquareYard: 19000,
    imageUrl:
      "https://images.unsplash.com/photo-1619468129361-605ebea04b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80",
    propertyType: "residential",
    location: "Pondha, Dehradun",
    description:
      "Located in the highly desirable Pondha area of Dehradun, this premium residential plot offers an excellent opportunity to build your dream home. The 200 square yard plot is situated in a peaceful locality with good connectivity to major roads. The area is fully developed with all amenities including water, electricity, and sewage systems in place. Surrounded by a growing residential community, this plot has excellent appreciation potential and is ideal for both end-users and investors.",
    features: [
      "Prime location in Pondha",
      "200 square yards (1800 square feet)",
      "Regular shaped plot",
      "Road facing",
      "All utilities available",
      "Clear title",
      "Immediate registration",
      "Suitable for residential construction",
      "Near to schools and markets",
      "Good connectivity to city center",
    ],
    nearbyFacilities: [
      "Schools within 1-2 km",
      "Shopping centers within 3 km",
      "Hospital within 4 km",
      "Public transportation within 500m",
      "Parks and recreational areas nearby",
    ],
    agent: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@shahproperties.com",
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
    contactDetails: {
      mobile: "+91 98765 43210",
      email: "rajesh@shahproperties.com",
    },
    images: [
      "https://images.unsplash.com/photo-1619468129361-605ebea04b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      "https://images.unsplash.com/photo-1628744404730-5118bf0c1798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },



  "11": {
    id: "11",
    title: "Residential Plot in Dholas",
    address: "Dholas, Dehradun, Uttarakhand",
    price: 3900000,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 1800,
    squareYards: 200,
    pricePerSquareYard: 19500,
    imageUrl:
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    propertyType: "residential",
    location: "Dholas, Dehradun",
    description:
      "Excellent opportunity to own a residential plot in the rapidly developing area of Dholas, Dehradun. This 200 square yard plot is ideal for building your dream home in a serene environment with beautiful mountain views. The plot is situated in a well-planned residential area with proper road connectivity and all basic amenities. Dholas is known for its peaceful atmosphere while still providing easy access to the city center. Perfect for families looking to build a custom home in a premium location.",
    features: [
      "200 square yards corner plot",
      "East-facing",
      "Rectangular shape",
      "Road width: 20 feet",
      "All utilities available",
      "Clear title",
      "Peaceful neighborhood",
      "Mountain views",
      "Close to educational institutions",
      "Developing area with high appreciation potential",
    ],
    nearbyFacilities: [
      "Educational institutions within 2 km",
      "Daily needs stores within 1 km",
      "Hospital within 3 km",
      "Public transportation access within 500m",
    ],
    agent: {
      name: "Amit Sharma",
      phone: "+91 87654 32109",
      email: "amit@shahproperties.com",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    contactDetails: {
      mobile: "+91 87654 32109",
      email: "amit@shahproperties.com",
    },
    images: [
      "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1628744404730-5118bf0c1798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },

  // Add more detailed information for new properties
  "12": {
    id: "12",
    title: "Premium Residential Plot on Shimla Bypass Road",
    address: "Shimla Bypass Road, Dehradun, Uttarakhand",
    price: 5850000,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 2700,
    squareYards: 300,
    pricePerSquareYard: 19500,
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    propertyType: "residential",
    location: "Shimla Bypass Road, Dehradun",
    description:
      "Premium residential plot located on the prestigious Shimla Bypass Road in Dehradun. This 300 square yard plot is in a prime location with excellent connectivity to all parts of the city. The plot is part of a well-developed residential area with wide roads and all modern amenities. The Shimla Bypass Road area is known for its premium residential developments and increasing property values. This plot offers the perfect combination of location, size, and investment potential for discerning buyers.",
    features: [
      "300 square yards of premium land",
      "Located on Shimla Bypass Road",
      "Rectangular shape with good dimensions",
      "40-foot wide approach road",
      "All utilities available",
      "Gated community",
      "Security provisions",
      "Clear title and documentation",
      "Ready for immediate construction",
      "High appreciation potential",
    ],
    nearbyFacilities: [
      "Shopping complexes within 1 km",
      "Hospitals within 3 km",
      "Schools within 2 km",
      "Parks and recreational areas nearby",
      "Public transportation readily available",
    ],
    agent: {
      name: "Sanjay Rawat",
      phone: "+91 76543 21098",
      email: "sanjay@shahproperties.com",
      imageUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
    contactDetails: {
      mobile: "+91 76543 21098",
      email: "sanjay@shahproperties.com",
    },
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },


      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },
};
*/

// Helper function to get property details or generate from basic data
export function getPropertyDetails(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}

export function getFilteredProperties(
  type?: string,
  category?: string,
  location?: string,
  minPrice?: number,
  maxPrice?: number,
  minArea?: number,
  maxArea?: number
): Property[] {
  return properties.filter((property) => {
    // Filter by type if provided
    if (type && property.type !== type) return false;

    // Filter by category if provided
    if (category && property.category !== category) return false;

    // Filter by location if provided
    if (
      location &&
      !property.location.toLowerCase().includes(location.toLowerCase())
    )
      return false;

    // Filter by price range if provided
    if (minPrice && property.price < minPrice) return false;
    if (maxPrice && property.price > maxPrice) return false;

    // Filter by area range if provided
    if (minArea && property.area.value < minArea) return false;
    if (maxArea && property.area.value > maxArea) return false;

    return true;
  });
}

export function getSimilarProperties(
  propertyId: string,
  count: number = 3
): Property[] {
  const property = getPropertyDetails(propertyId);
  if (!property) return [];

  // Filter properties of the same type and category, excluding the current property
  const similar = properties.filter(
    (p) =>
      p.id !== propertyId &&
      p.type === property.type &&
      p.category === property.category
  );

  // Sort by location similarity (same location gets priority)
  const sortedByLocation = [...similar].sort((a, b) => {
    const aMatchesLocation = a.location.includes(
      property.location.split(",")[0]
    );
    const bMatchesLocation = b.location.includes(
      property.location.split(",")[0]
    );

    if (aMatchesLocation && !bMatchesLocation) return -1;
    if (!aMatchesLocation && bMatchesLocation) return 1;
    return 0;
  });

  // Return the requested number of similar properties
  return sortedByLocation.slice(0, count);
}
