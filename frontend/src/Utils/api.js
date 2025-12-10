// api.js in utils folder
// This file contains API functions and mock data for development

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 3.99,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Green Valley Farm",
    location: "Boulder, CO",
    isVerifiedNatural: true,
    category: "Vegetables",
    certifications: ["Organic", "Non-GMO"],
    description:
      "Fresh, locally grown organic tomatoes. Perfect for salads and cooking.",
    dateAdded: "2025-03-15T12:00:00Z",
    soldCount: 250,
  },
  {
    id: 2,
    name: "Grass-Fed Ground Beef",
    price: 8.99,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Sunset Ranch",
    location: "Fort Collins, CO",
    isVerifiedNatural: true,
    category: "Meat",
    certifications: ["Organic", "Regenerative"],
    description: "Premium grass-fed ground beef from ethically raised cattle.",
    dateAdded: "2025-03-17T14:30:00Z",
    soldCount: 175,
  },
  {
    id: 3,
    name: "Fresh Strawberries",
    price: 4.5,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Berry Good Farms",
    location: "Longmont, CO",
    isVerifiedNatural: true,
    category: "Fruits",
    certifications: ["Pesticide-Free"],
    description: "Sweet, juicy strawberries picked at peak ripeness.",
    dateAdded: "2025-03-10T09:15:00Z",
    soldCount: 320,
  },
  {
    id: 4,
    name: "Raw Wildflower Honey",
    price: 12.99,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Buzzing Meadows Apiary",
    location: "Denver, CO",
    isVerifiedNatural: true,
    category: "Honey",
    certifications: ["Organic", "Non-GMO"],
    description:
      "Pure, unfiltered wildflower honey collected from local fields.",
    dateAdded: "2025-03-18T11:45:00Z",
    soldCount: 110,
  },
  {
    id: 5,
    name: "Free-Range Eggs",
    price: 5.99,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Happy Hen Farm",
    location: "Golden, CO",
    isVerifiedNatural: true,
    category: "Eggs",
    certifications: ["Organic"],
    description: "Farm-fresh eggs from free-range, pasture-raised chickens.",
    dateAdded: "2025-03-16T15:20:00Z",
    soldCount: 280,
  },
  {
    id: 6,
    name: "Artisanal Goat Cheese",
    price: 7.5,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Mountain Dairy",
    location: "Estes Park, CO",
    isVerifiedNatural: true,
    category: "Dairy",
    certifications: ["Organic", "Regenerative"],
    description: "Creamy artisanal goat cheese made with traditional methods.",
    dateAdded: "2025-03-12T10:30:00Z",
    soldCount: 95,
  },
  {
    id: 7,
    name: "Fresh Basil Bundle",
    price: 2.99,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Herbal Heights",
    location: "Boulder, CO",
    isVerifiedNatural: true,
    category: "Herbs",
    certifications: ["Organic", "Pesticide-Free"],
    description: "Aromatic fresh basil, perfect for pasta dishes and salads.",
    dateAdded: "2025-03-19T08:45:00Z",
    soldCount: 150,
  },
  {
    id: 8,
    name: "Heirloom Carrots",
    price: 4.25,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Rainbow Roots Farm",
    location: "Lafayette, CO",
    isVerifiedNatural: true,
    category: "Vegetables",
    certifications: ["Organic", "Biodynamic"],
    description: "Colorful mix of heirloom carrot varieties, naturally sweet.",
    dateAdded: "2025-03-14T13:10:00Z",
    soldCount: 200,
  },
  {
    id: 9,
    name: "Organic Quinoa",
    price: 6.75,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Golden Grains Co-op",
    location: "Denver, CO",
    isVerifiedNatural: true,
    category: "Grains",
    certifications: ["Organic", "Non-GMO"],
    description:
      "Protein-rich organic quinoa grown using sustainable practices.",
    dateAdded: "2025-03-13T16:00:00Z",
    soldCount: 130,
  },
  {
    id: 10,
    name: "Grass-Fed Yogurt",
    price: 5.5,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Creamy Pastures",
    location: "Fort Collins, CO",
    isVerifiedNatural: true,
    category: "Dairy",
    certifications: ["Organic", "Regenerative"],
    description: "Probiotic-rich yogurt made from grass-fed cow's milk.",
    dateAdded: "2025-03-11T12:30:00Z",
    soldCount: 165,
  },
  {
    id: 11,
    name: "Heritage Apples",
    price: 3.25,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Orchard Valley",
    location: "Loveland, CO",
    isVerifiedNatural: true,
    category: "Fruits",
    certifications: ["Organic"],
    description: "Mix of heritage apple varieties with unique flavors.",
    dateAdded: "2025-03-20T09:00:00Z",
    soldCount: 210,
  },
  {
    id: 12,
    name: "Pasture-Raised Chicken",
    price: 15.99,
    imageUrl: "/api/placeholder/400/320",
    farmer: "Freedom Range Farms",
    location: "Longmont, CO",
    isVerifiedNatural: true,
    category: "Meat",
    certifications: ["Organic", "Non-GMO"],
    description: "Whole chicken raised on pasture with natural feed.",
    dateAdded: "2025-03-15T14:45:00Z",
    soldCount: 85,
  },
];

// Function to get all products (simulating API fetch)
export const getProducts = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockProducts);
    }, 800);
  });
};

// Function to get a single product by ID
export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 500);
  });
};

// Helper functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Placeholder function for adding a product to cart
export const addToCart = (productId, quantity = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Added product #${productId}, quantity: ${quantity} to cart`);
      resolve({ success: true });
    }, 300);
  });
};
