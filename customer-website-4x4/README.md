# Customer Product Website

A separate customer-facing website where customers can view and purchase products after receiving an SMS link from the ANPR system.

## 🎯 Purpose

When a vehicle arrives at the service center:
1. ANPR camera detects the vehicle plate number
2. System automatically sends SMS with product page link to customer
3. Customer clicks link and views products
4. Customer can add items to cart and checkout
5. Orders are automatically synced with the main POS system

## 🚀 Setup

### 1. Install Dependencies

```powershell
cd customer-website
npm install
```

### 2. Configure Environment

Create `.env` file (optional):
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
VITE_API_URL=http://localhost:5000
```

### 3. Start Development Server

```powershell
npm run dev
```

The customer website will run on: **http://localhost:4000**

## 🌐 Usage

### Customer Flow

1. **Receive SMS**: When vehicle is detected by ANPR, customer receives SMS:
   ```
   Welcome to Sniper Car Care! View our products and order online: 
   http://localhost:4000?plate=ABC1234
   ```

2. **View Products**: Customer clicks link, sees all available products

3. **Add to Cart**: Customer can add products to cart

4. **Checkout**: Customer proceeds to checkout, enters payment info

5. **Order Placed**: Order is automatically created in main POS system

### Direct Access

- **With Vehicle Plate**: `http://localhost:4000?plate=ABC1234`
- **Without Plate**: `http://localhost:4000` (generic view)

## 📁 Structure

```
customer-website/
├── src/
│   ├── pages/
│   │   ├── ProductPage.jsx    # Main product listing page
│   │   ├── Checkout.jsx       # Checkout and payment
│   │   └── OrderSuccess.jsx   # Order confirmation page
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🔌 API Integration

The customer website uses public API endpoints (no authentication):

- `GET /api/public/products` - Get all products
- `GET /api/public/customer/by-plate?plate=XXX` - Get customer by plate
- `POST /api/public/orders` - Create order
- `GET /api/public/orders/:id` - Get order details
- `POST /api/public/payments/create-intent` - Create Stripe payment
- `POST /api/public/payments/confirm` - Confirm payment

## 🔄 Order Sync

When customer places order:
1. Order created in database with `source = 'customer_website'`
2. Order appears in main POS system Orders page
3. Staff can view and process the order
4. Stock automatically updated

## 🚀 Deployment

### Build for Production

```powershell
npm run build
```

Deploy the `dist` folder to:
- Vercel
- Netlify
- Any static hosting service

### Environment Variables (Production)

Set these in your hosting platform:
- `VITE_API_URL` - Your backend API URL (e.g., `https://api.snipercare.com`)
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

## 📝 Notes

- Customer website is **public** - no login required
- Orders are linked to customers by vehicle plate number
- Stock updates in real-time when customers purchase
- All orders sync with main POS system automatically

