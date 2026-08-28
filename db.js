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
      name: "Heavy-Duty Fence Panel Stand / Base",
      category: "sales",
      type: "stand",
      salePrice: 10.00,
      rentalPriceMonthly: 3.00,
      inStock: 600,
      rentedCount: 130,
      description: "Low-profile steel base plate designed to hold panel uprights securely on flat surfaces like asphalt, concrete, or packed soil. Note: Stand style/specs subject to change.",
      image: "/assets/stand.svg",
      specs: "Dimensions: 36\" x 16\" Base Plate | Weight: 26 lbs | Steel Finish: Hot-Dip Galvanized (Specs subject to change)"
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
        { productId: "prod-panel-sale", name: "Refurbished Temporary Fence Panel (6' x 10')", unitPrice: 65.00, quantity: 20, total: 1300.00 },
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
