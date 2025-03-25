import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

const stripe = new Stripe('your-stripe-secret-key');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, 'products.json');

// Ensure products.json exists
if (!fs.existsSync(productsFile)) {
  fs.writeFileSync(productsFile, JSON.stringify([])); // Initialize with empty array
}

// Endpoint to save the changes
app.post('/api/products', async (req, res) => {
  try {
    await writeJsonFile(productsFile, req.body);
    res.status(200).send('Products saved successfully');
  } catch (err) {
    console.error('Error saving products:', err); // Log error for debugging
    res.status(500).send('Error saving products');
  }
});

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  fs.readFile(productsFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading products:', err); // Log error
      return res.status(500).send('Error reading products');
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(productsFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading product:', err); // Log error
      return res.status(500).send('Error reading product');
    }

    const products = JSON.parse(data);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  });
});

// Endpoint to create a payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    res.json(paymentIntent);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
