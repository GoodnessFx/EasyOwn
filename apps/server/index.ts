import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: true,
  frameguard: { action: 'deny' }
}));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Webhook parsing needs raw body for signature verification
app.use('/webhooks/paystack', express.raw({ type: 'application/json' }), (req, res) => {
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '').update(req.body).digest('hex');
  if (hash == req.headers['x-paystack-signature']) {
    // Process webhook idempotently (store event ID, process plan transition, record ledger entry)
    res.status(200).send('Webhook received');
  } else {
    res.status(400).send('Invalid signature');
  }
});

app.use(express.json());

// Public Verification Endpoint
app.get('/verify/:transactionRef', (req, res) => {
  // Return neutral fintech language response, never blockchain/hash terminology
  res.json({
    status: 'success',
    data: {
      integrity_status: 'verified',
      verification_code: 'abc123stub',
      item_name: 'iPhone 11 Stub',
      amount: 50000,
      date: new Date().toISOString(),
      buyer_id: 'Buyer #A93F',
      seller_id: 'Seller #B22X'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
