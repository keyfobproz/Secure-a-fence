const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Initial seed data
const initialData = {
  users: [
    {
      id: "admin-1",
      name: "Site Manager Admin",
      email: "admin@secureafence.com",
      // password: "password123" hashed with bcryptjs or simple fallback
      passwordHash: "$2a$10$w0BInG8mPZf5m6Xp0w2v8OqU0N1c5eQ2W2X2Y2Z2a2b2c2d2e2f2g", // fallback match for password123
      role: "admin",
      company: "Secure-A-Fence Operations",
      phone: "279-261-3890"
    },
    {
      id: "cust-1",
      name: "John Builder",
      email: "john@apexconstruction.com",
      passwordHash: "$2a$10$w0BInG8mPZf5m6Xp0w2v8OqU0N1c5eQ2W2X2Y2Z2a2b2c2d2e2f2g",
      role: "customer",
      company: "Apex Construction Services",
      phone: "(555) 234-5678"
    }
  ],
  products: [
    {
      id: "prod-panel-6x12",
      name: "Refurbished Temporary Fence Panel (6' x 12')",
      category: "sales",
      type: "panel",
      salePrice: 65.00,
      rentalPriceMonthly: 15.00,
      inStock: 300,
      rentedCount: 90,
      description: "Heavy-duty 11-gauge galvanized chain-link mesh with sturdy welded tubular steel frame (6ft x 12ft). Fully refurbished and cross-braced.",
      image: "/assets/panel.svg",
      specs: "Dimensions: 6 ft High x 12 ft Wide | Frame: 1-3/8\" OD Steel | Mesh: 2-3/8\" Galvanized"
    },
    {
      id: "prod-panel-6x10",
      name: "Refurbished Temporary Fence Panel (6' x 10')",
      category: "sales",
      type: "panel",
      salePrice: 50.00,
      rentalPriceMonthly: 12.00,
      inStock: 250,
      rentedCount: 60,
      description: "Standard 6ft x 10ft refurbished temporary chain-link fence panel. Ideal for tighter perimeters and flexible jobsite layouts.",
      image: "/assets/panel.svg",
      specs: "Dimensions: 6 ft High x 10 ft Wide | Frame: 1-3/8\" OD Steel | Mesh: 2-3/8\" Galvanized"
    },
    {
      id: "prod-stand-sale",
      name: "Flat Stand (Standard Tubular Base)",
      category: "sales",
      type: "stand",
      salePrice: 10.00,
      rentalPriceMonthly: 3.00,
      inStock: 600,
      rentedCount: 130,
      description: "Lightweight and easy to handle rectangular tubular steel base with dual upright sleeves. Designed for standard hard asphalt and concrete perimeters.",
      image: "/assets/stand.svg",
      specs: "Style: Flat Stand | Dimensions: 36\" x 16\" | Weight: 24 lbs | Finish: Hot-Dip Galvanized"
    },
    {
      id: "prod-stand-braced",
      name: "Braced Stand (Windy Condition Base)",
      category: "sales",
      type: "stand",
      salePrice: 15.00,
      rentalPriceMonthly: 4.50,
      inStock: 350,
      rentedCount: 85,
      description: "Includes angular diagonal steel bracing for high wind resistance and extra lateral support on open job sites.",
      image: "/assets/stand.svg",
      specs: "Style: Braced Stand | Feature: Dual Diagonal Support Struts | Weight: 32 lbs | Finish: Hot-Dip Galvanized"
    },
    {
      id: "prod-stand-heavyduty",
      name: "Heavy Duty Stand (Max Strength Base)",
      category: "sales",
      type: "stand",
      salePrice: 18.00,
      rentalPriceMonthly: 5.50,
      inStock: 280,
      rentedCount: 70,
      description: "Built with reinforced dual cross-member grid tubes for maximum structural strength, long perimeter runs, and heavy traffic zones.",
      image: "/assets/stand.svg",
      specs: "Style: Heavy Duty Stand | Feature: Quad Cross-Bar Construction | Weight: 38 lbs | Finish: Hot-Dip Galvanized"
    },
    {
      id: "prod-stand-cross",
      name: "Cross Stand (Soft/Uneven Ground Base)",
      category: "sales",
      type: "stand",
      salePrice: 12.00,
      rentalPriceMonthly: 3.50,
      inStock: 400,
      rentedCount: 95,
      description: "4-point wide footprint cross-pipe configuration ideal for dirt, gravel, turf, and soft uneven ground surfaces.",
      image: "/assets/stand.svg",
      specs: "Style: Cross Stand | Feature: 4-Way Surface Spanning Arms | Weight: 26 lbs | Finish: Hot-Dip Galvanized"
    },
    {
      id: "prod-stand-plate",
      name: "Plate Stand (Low Profile Flat Base)",
      category: "sales",
      type: "stand",
      salePrice: 14.00,
      rentalPriceMonthly: 4.00,
      inStock: 320,
      rentedCount: 50,
      description: "Solid smooth steel plate base offering a flush, low-profile footprint to prevent tripping hazards on pedestrian walkways.",
      image: "/assets/stand.svg",
      specs: "Style: Plate Stand | Feature: Flush Beveled Steel Plate | Weight: 30 lbs | Finish: Hot-Dip Galvanized"
    },
    {
      id: "prod-stand-wheel",
      name: "Wheel Stand (Mobile Caster Base)",
      category: "sales",
      type: "stand",
      salePrice: 25.00,
      rentalPriceMonthly: 7.50,
      inStock: 150,
      rentedCount: 40,
      description: "Equipped with heavy-duty locking swivel caster wheels for quick gate opening, repositioning, and mobile perimeter access points.",
      image: "/assets/stand.svg",
      specs: "Style: Wheel Stand | Feature: 4 Heavy-Duty Locking Casters | Weight: 34 lbs | Finish: Hot-Dip Galvanized"
    },
    {
      id: "prod-stand-sandbag",
      name: "Sandbag Stand (Weighted Base)",
      category: "sales",
      type: "stand",
      salePrice: 20.00,
      rentalPriceMonthly: 6.00,
      inStock: 220,
      rentedCount: 60,
      description: "Flat tubular steel frame base equipped with dual heavy-gauge canvas sandbags for extra stability against high winds and storms.",
      image: "/assets/stand.svg",
      specs: "Style: Sandbag Stand | Feature: Frame + 2 Pre-filled 50lb Sandbags | Total Weight: 124 lbs | Finish: Galvanized Steel"
    },
    {
      id: "prod-clip-sale",
      name: "Safety Clamp / Panel Connector Clip",
      category: "sales",
      type: "clip",
      salePrice: 5.00,
      rentalPriceMonthly: 1.00,
      inStock: 1200,
      rentedCount: 260,
      description: "High-tensile steel coupler clamp used to join adjacent fence panels together securely at top and mid rail.",
      image: "/assets/clip.svg",
      specs: "Material: Forged Steel | Bolt: 1/2\" Galvanized Carriage Bolt included"
    },
    {
      id: "prod-screen-sale",
      name: "6' Privacy / Windscreen Mesh Roll (50 ft)",
      category: "sales",
      type: "accessory",
      salePrice: 45.00,
      rentalPriceMonthly: 10.00,
      inStock: 80,
      rentedCount: 15,
      description: "High-density polyethylene knitted fabric providing 88% visual blockage and wind resistance for site privacy.",
      image: "/assets/privacy_screen.svg",
      specs: "Length: 50 ft | Height: 5'8\" | Brass Grommets every 24\""
    },
    {
      id: "prod-gate-pedestrian",
      name: "Custom 3ft Built-In Pedestrian Access Door",
      category: "sales",
      type: "gate",
      salePrice: 75.00,
      rentalPriceMonthly: 15.00,
      inStock: 50,
      rentedCount: 12,
      description: "Custom pre-installed 3ft wide pedestrian pass-through door with secure hinges and quick-latch built directly into a standard temporary fence panel.",
      image: "/assets/panel.svg",
      specs: "Door Width: 3 ft | Frame: 1-3/8\" Galvanized | Includes: Gravity Latch & Heavy-Duty Frame Hinges"
    },
    {
      id: "prod-gate-single",
      name: "Custom Single Swing Vehicle Gate Panel",
      category: "sales",
      type: "gate",
      salePrice: 120.00,
      rentalPriceMonthly: 25.00,
      inStock: 30,
      rentedCount: 8,
      description: "Full-width single swing vehicle gate conversion of a standard panel. Enables single-panel vehicle access on any perimeter run.",
      image: "/assets/panel.svg",
      specs: "Gate Width: 10 ft or 12 ft options | Includes: Swing Hinges & Heavy-Duty Latch"
    },
    {
      id: "prod-gate-double",
      name: "Custom Double Swing Vehicle Gate Panel Pair",
      category: "sales",
      type: "gate",
      salePrice: 220.00,
      rentalPriceMonthly: 45.00,
      inStock: 20,
      rentedCount: 5,
      description: "Custom double-swing dual panel vehicle gate set providing a wider 20ft to 24ft entry point for heavy trucks, cranes, and delivery logistics.",
      image: "/assets/panel.svg",
      specs: "Gate Width: 20 ft to 24 ft Total | Includes: Pair of Swing Hinges, Latch, & Locking Drop Rod"
    },
    {
      id: "prod-gate-latch",
      name: "Gate Latch - Padlock Locking Latch",
      category: "sales",
      type: "gate",
      salePrice: 15.00,
      rentalPriceMonthly: 3.00,
      inStock: 150,
      rentedCount: 45,
      description: "Heavy-duty locking padlock receiver latch for temporary fence gates to secure jobsites after hours.",
      image: "/assets/clip.svg",
      specs: "Material: Hot-Dip Galvanized Forged Steel | Padlock Hole: 1/2\" diameter"
    },
    {
      id: "prod-gate-rod",
      name: "Gate Latch - Ground Drop-Rod Pin",
      category: "sales",
      type: "gate",
      salePrice: 25.00,
      rentalPriceMonthly: 5.00,
      inStock: 100,
      rentedCount: 30,
      description: "Heavy vertical drop-rod pin assembly used to anchor double swing gates firmly into concrete, asphalt, or dirt.",
      image: "/assets/clip.svg",
      specs: "Rod Length: 24\" | Rod Diameter: 5/8\" Galvanized Solid Steel"
    },
    {
      id: "prod-gate-wheel",
      name: "Gate Support Wheel - Locking Swivel Caster",
      category: "sales",
      type: "gate",
      salePrice: 35.00,
      rentalPriceMonthly: 7.00,
      inStock: 80,
      rentedCount: 15,
      description: "Spring-loaded clamp-on support caster wheel designed to roll smoothly on asphalt or gravel while supporting the weight of custom swing gates.",
      image: "/assets/stand.svg",
      specs: "Wheel Diameter: 6\" | Tyre: Solid Hard Rubber | Load Rating: 250 lbs"
    },
    {
      id: "prod-gate-pedestrian",
      name: "Custom 3ft Built-In Pedestrian Access Door",
      category: "sales",
      type: "gate",
      salePrice: 75.00,
      rentalPriceMonthly: 15.00,
      inStock: 50,
      rentedCount: 12,
      description: "Custom pre-installed 3ft wide pedestrian pass-through door with secure hinges and quick-latch built directly into a standard temporary fence panel.",
      image: "/assets/panel.svg",
      specs: "Door Width: 3 ft | Frame: 1-3/8\" Galvanized | Includes: Gravity Latch & Heavy-Duty Frame Hinges"
    },
    {
      id: "prod-gate-single",
      name: "Custom Single Swing Vehicle Gate Panel",
      category: "sales",
      type: "gate",
      salePrice: 120.00,
      rentalPriceMonthly: 25.00,
      inStock: 30,
      rentedCount: 8,
      description: "Full-width single swing vehicle gate conversion of a standard panel. Enables single-panel vehicle access on any perimeter run.",
      image: "/assets/panel.svg",
      specs: "Gate Width: 10 ft or 12 ft options | Includes: Swing Hinges & Heavy-Duty Latch"
    },
    {
      id: "prod-gate-double",
      name: "Custom Double Swing Vehicle Gate Panel Pair",
      category: "sales",
      type: "gate",
      salePrice: 220.00,
      rentalPriceMonthly: 45.00,
      inStock: 20,
      rentedCount: 5,
      description: "Custom double-swing dual panel vehicle gate set providing a wider 20ft to 24ft entry point for heavy trucks, cranes, and delivery logistics.",
      image: "/assets/panel.svg",
      specs: "Gate Width: 20 ft to 24 ft Total | Includes: Pair of Swing Hinges, Latch, & Locking Drop Rod"
    },
    {
      id: "prod-gate-latch",
      name: "Gate Latch - Padlock Locking Latch",
      category: "sales",
      type: "gate",
      salePrice: 15.00,
      rentalPriceMonthly: 3.00,
      inStock: 150,
      rentedCount: 45,
      description: "Heavy-duty locking padlock receiver latch for temporary fence gates to secure jobsites after hours.",
      image: "/assets/clip.svg",
      specs: "Material: Hot-Dip Galvanized Forged Steel | Padlock Hole: 1/2\" diameter"
    },
    {
      id: "prod-gate-rod",
      name: "Gate Latch - Ground Drop-Rod Pin",
      category: "sales",
      type: "gate",
      salePrice: 25.00,
      rentalPriceMonthly: 5.00,
      inStock: 100,
      rentedCount: 30,
      description: "Heavy vertical drop-rod pin assembly used to anchor double swing gates firmly into concrete, asphalt, or dirt.",
      image: "/assets/clip.svg",
      specs: "Rod Length: 24\" | Rod Diameter: 5/8\" Galvanized Solid Steel"
    },
    {
      id: "prod-gate-wheel",
      name: "Gate Support Wheel - Locking Swivel Caster",
      category: "sales",
      type: "gate",
      salePrice: 35.00,
      rentalPriceMonthly: 7.00,
      inStock: 80,
      rentedCount: 15,
      description: "Spring-loaded clamp-on support caster wheel designed to roll smoothly on asphalt or gravel while supporting the weight of custom swing gates.",
      image: "/assets/stand.svg",
      specs: "Wheel Diameter: 6\" | Tyre: Solid Hard Rubber | Load Rating: 250 lbs"
    }
  ],
  orders: [
    {
      id: "ORD-8941",
      customerId: "cust-1",
      customerName: "John Builder",
      customerCompany: "Apex Construction Services",
      customerEmail: "john@apexconstruction.com",
      customerPhone: "(555) 234-5678",
      orderType: "sale", // 'sale' or 'rental'
      items: [
        { productId: "prod-panel-6x10", name: "Refurbished Temporary Fence Panel (6' x 10')", unitPrice: 65.00, quantity: 20, total: 1300.00 },
        { productId: "prod-stand-sale", name: "Heavy-Duty Fence Panel Stand / Base", unitPrice: 10.00, quantity: 21, total: 210.00 },
        { productId: "prod-clip-sale", name: "Safety Clamp / Panel Connector Clip", unitPrice: 5.00, quantity: 20, total: 100.00 }
      ],
      subtotal: 1610.00,
      deliveryFee: 150.00,
      tax: 128.80,
      totalAmount: 1888.80,
      status: "Delivered", // 'Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Completed'
      deliveryAddress: "742 Evergreen Terrace, Jobsite Alpha, Metro Industrial Park",
      deliveryDate: "2026-08-20",
      createdAt: "2026-08-18T10:30:00.000Z"
    }
  ],
  rentals: [
    {
      id: "RNT-3021",
      orderId: "ORD-8941-R",
      customerId: "cust-1",
      customerName: "John Builder",
      customerCompany: "Apex Construction Services",
      customerEmail: "john@apexconstruction.com",
      customerPhone: "(555) 234-5678",
      jobsiteAddress: "1024 Commercial Way, Downtown Tower Project",
      jobsiteContact: "Mike Davis (Site Foreman - 555-987-6543)",
      startDate: "2026-08-01",
      endDate: "2026-09-01",
      monthlyRateTotal: 420.00,
      status: "Active", // 'Active', 'Overdue', 'Pickup Scheduled', 'Returned'
      items: [
        { productId: "prod-panel-sale", name: "Refurbished Panel (Rental)", quantity: 20, monthlyUnitPrice: 15.00, subtotal: 300.00 },
        { productId: "prod-stand-sale", name: "Fence Stand (Rental)", quantity: 20, monthlyUnitPrice: 3.00, subtotal: 60.00 },
        { productId: "prod-clip-sale", name: "Safety Clip (Rental)", quantity: 60, monthlyUnitPrice: 1.00, subtotal: 60.00 }
      ],
      notes: "Installed along South perimeter. Customer requested extra clips."
    }
  ],
  shipments: [
    {
      id: "SHIP-1002",
      orderId: "ORD-8941",
      type: "Outbound Sale Delivery",
      driverName: "Dave Miller (Truck #4)",
      dispatchDate: "2026-08-20",
      status: "Delivered",
      destination: "742 Evergreen Terrace, Jobsite Alpha",
      notes: "Unloaded with forklift on west gate."
    },
    {
      id: "SHIP-1003",
      orderId: "RNT-3021",
      type: "Rental Deployment",
      driverName: "Sam Jackson (Flatbed #2)",
      dispatchDate: "2026-08-01",
      status: "Delivered & Erected",
      destination: "1024 Commercial Way, Downtown Tower Project",
      notes: "Rental panel layout setup completed per site diagram."
    }
  ]
};

function ensureDataFile() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function getDb() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return initialData;
  }
}

function saveDb(data) {
  ensureDataFile();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  getDb,
  saveDb
};
