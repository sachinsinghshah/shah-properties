// Image utilities for flexible area-based image management

// Common image extensions to look for
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

// Dynamic area image configuration
export interface AreaImageConfig {
  areaKey: string;
  folderPath: string;
  fallbackImages?: string[];
  minImages?: number;
  maxImages?: number;
}

// Area configurations for automatic image detection
export const AREA_CONFIGS: AreaImageConfig[] = [
  {
    areaKey: "kalyanpur",
    folderPath: "/images/properties/dehradun/kalyanpur/",
    minImages: 1,
    maxImages: 20, // Allow up to 20 images
  },
  {
    areaKey: "pondha",
    folderPath: "/images/properties/dehradun/pondha/",
    fallbackImages: [
      "/images/image1.jpg",
      "/images/image3.jpg",
      "/images/image2.jpg",
    ],
    minImages: 1,
    maxImages: 15,
  },
  {
    areaKey: "vikas-nagar",
    folderPath: "/images/properties/dehradun/vikas-nagar/",
    fallbackImages: [
      "/images/image4.jpg",
      "/images/image2.jpg",
      "/images/image1.jpg",
    ],
    minImages: 1,
    maxImages: 10,
  },
  {
    areaKey: "dholas",
    folderPath: "/images/properties/dehradun/dholas/",
    fallbackImages: [
      "/images/image2.jpg",
      "/images/image3.jpg",
      "/images/image1.jpg",
    ],
    minImages: 1,
    maxImages: 10,
  },
];

// Function to build potential image paths for an area
export function buildAreaImagePaths(config: AreaImageConfig): string[] {
  const images: string[] = [];
  const basePath = config.folderPath;

  // Common naming patterns to look for
  const commonNames = [
    "main",
    "primary",
    "hero",
    "location",
    "access",
    "road",
    "connectivity",
    "surroundings",
    "area",
    "neighborhood",
    "amenities",
    "aerial",
    "overview",
    "landscape",
    "infrastructure",
    "facilities",
    "development",
    "view1",
    "view2",
    "view3",
    "view4",
    "view5",
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "photo1",
    "photo2",
    "photo3",
    "photo4",
    "photo5",
  ];

  // Add area-specific patterns
  const areaSpecificNames = getAreaSpecificNames(config.areaKey);

  // Build all possible image paths
  [...commonNames, ...areaSpecificNames].forEach((name) => {
    IMAGE_EXTENSIONS.forEach((ext) => {
      images.push(`${basePath}${name}${ext}`);
    });
  });

  return images;
}

// Get area-specific image name patterns
function getAreaSpecificNames(areaKey: string): string[] {
  switch (areaKey) {
    case "kalyanpur":
      return [
        "van-vihar-main",
        "van-vihar-location",
        "van-vihar-surroundings",
        "plot-main",
        "plot-location",
        "plot-surroundings",
        "kalyanpur-main",
        "kalyanpur-area",
        "kalyanpur-road",
      ];
    case "pondha":
      return [
        "pondha-main",
        "pondha-location",
        "pondha-surroundings",
        "mdda-colony",
        "university-area",
        "educational-hub",
      ];
    case "badshahi-bagh":
      return [
        "badshahi-bagh-main",
        "badshahi-bagh-location",
        "badshahi-bagh-surroundings",
        "farm-main",
        "agricultural-land",
        "irrigation",
        "fertile-soil",
      ];
    case "vikas-nagar":
      return [
        "vikas-nagar-main",
        "vikas-nagar-location",
        "vikas-nagar-surroundings",
        "developing-area",
        "shimla-bypass",
      ];
    case "behat":
      return [
        "behat-main",
        "behat-location",
        "behat-surroundings",
        "rural-residential",
        "developing-area",
      ];
    case "dholas":
      return [
        "dholas-main",
        "dholas-location",
        "dholas-surroundings",
        "peaceful-area",
        "affordable-plots",
      ];
    default:
      return [];
  }
}

// Function to validate if an image exists (for client-side)
export function validateImagePath(imagePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
}

// Function to get valid images from a list of potential paths
export async function getValidImages(imagePaths: string[]): Promise<string[]> {
  const validationPromises = imagePaths.map(async (path) => {
    const isValid = await validateImagePath(path);
    return isValid ? path : null;
  });

  const results = await Promise.all(validationPromises);
  return results.filter((path) => path !== null) as string[];
}

// Function to get images for an area with fallback support
export async function getFlexibleAreaImages(
  areaKey: string,
  config?: AreaImageConfig
): Promise<string[]> {
  const areaConfig = config || AREA_CONFIGS.find((c) => c.areaKey === areaKey);

  if (!areaConfig) {
    // Return generic fallback images
    return ["/images/image1.jpg", "/images/image2.jpg", "/images/image3.jpg"];
  }

  // Try to get real images from the area folder
  const potentialImages = buildAreaImagePaths(areaConfig);
  const validImages = await getValidImages(potentialImages);

  // Apply limits if specified
  let finalImages = validImages;
  if (areaConfig.maxImages && validImages.length > areaConfig.maxImages) {
    finalImages = validImages.slice(0, areaConfig.maxImages);
  }

  // Use fallback if not enough valid images found
  if (
    finalImages.length < (areaConfig.minImages || 1) &&
    areaConfig.fallbackImages
  ) {
    return areaConfig.fallbackImages;
  }

  return finalImages.length > 0 ? finalImages : areaConfig.fallbackImages || [];
}

// Export configurations for easier access
export { AREA_CONFIGS as areaConfigs };
