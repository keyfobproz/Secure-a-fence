# Implementation Plan: Custom Gate & Door Designer Feature

## Summary of Goals
Add a dedicated interactive Custom Gate & Door Designer section to the Fence Calculator view (`calc-view`) in `public/index.html`, along with supporting backend products in `db.js` and frontend handlers in `public/script.js`. Customers can configure custom pedestrian access doors and vehicle swing gates, preview them dynamically, select optional hardware (latches, drop rods, wheels), and add them directly to their cart for an extra fee.

---

## Key Changes

### 1. Add Gate & Hardware Products (`db.js`)
- Add custom gate products to `db.js`:
  - `prod-gate-pedestrian` (3ft Pedestrian Access Door: $75 buy / $15/mo rent)
  - `prod-gate-single` (Single Swing Vehicle Gate: $120 buy / $25/mo rent)
  - `prod-gate-double` (Double Swing Vehicle Gate Pair: $220 buy / $45/mo rent)
  - `prod-gate-latch` (Padlock Latch: $15 buy / $3/mo rent)
  - `prod-gate-rod` (Ground Drop-Rod Pin: $25 buy / $5/mo rent)
  - `prod-gate-wheel` (Locking Gate Support Wheel: $35 buy / $7/mo rent)

### 2. Add Custom Gate Designer UI (`public/index.html`)
- Add a new section inside the Fence Calculator page (`#calc-view`) featuring:
  - Gate style selector (Pedestrian, Single Swing, Double Swing).
  - Optional hardware checkboxes (Padlock Latch, Ground Drop-Rod, Support Wheel).
  - Quantity selector.
  - Visual configuration preview box.
  - Cost breakdown and "Add Custom Gate Package to Cart" button.

### 3. Add Frontend Logic (`public/script.js`)
- Implement `updateGateDesigner()` to calculate total custom gate fees (base gate + selected hardware × quantity) for both Outright Purchase and Monthly Rental.
- Implement `addCustomGateToCart()` to add the configured gate and selected hardware accessories to the shopping cart.
- Add a filter chip for `"gate"` in the store catalog.
