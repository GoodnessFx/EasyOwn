import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Security Headers (Helmet)
// This applies CSP, frame ancestors, X-Content-Type-Options, etc.
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Add other directives as needed for frontend
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 2. CORS setup
// Explicitly configure CORS for the frontend origin
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true, // required for Supabase Auth cookies
}));

// 3. Rate Limiting
// Global rate limiting to prevent abuse
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(globalLimiter);

// Specific stricter rate limiter for public unauthenticated endpoints (like verification)
const verifyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: 'Verification rate limit exceeded.' }
});

// Middleware for parsing JSON (except for webhooks which need raw body for signature verification)
app.use(express.json({
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));

// --- Routes (Stubs) ---
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/verify/:transactionRef', verifyLimiter, (req, res) => {
  // TODO: implement verification logic using the packages/verification module
  res.json({
    status: 'pending_implementation',
    ref: req.params.transactionRef
  });
});

// --- Static frontend (apps/web/dist) with SPA fallback ---
const webDistDir = path.resolve(__dirname, '../../web/dist');
if (fs.existsSync(webDistDir)) {
  app.use(express.static(webDistDir));

  // SPA fallback: serve index.html for any non-API GET request
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/health') || req.path.startsWith('/verify')) {
      return next();
    }
    res.sendFile(path.join(webDistDir, 'index.html'));
  });
} else {
  console.warn(`Web dist not found at ${webDistDir} - serving API only`);
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`EasyOwn server listening on port ${PORT}`);
});
