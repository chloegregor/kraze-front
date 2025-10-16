export const prerender = false;


import Stripe from 'stripe';
import {StockAndPrice} from '../../lib/api/stockandprice';




const stripe = new Stripe(import.meta.env.SECRET_STRIPE);

export  async function POST({ request }){
  try {
    console.log("Cart reçu dans /api/checkout:", request);

  const clientCart = await request.json();
  if (!clientCart || !Array.isArray(clientCart)) {
    return new Response(JSON.stringify({ error: 'Invalid cart data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (clientCart.length === 0) {
    return new Response(JSON.stringify({ message: 'Votre panier est vide.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { validItems, errors } = await StockAndPrice(clientCart);

  if (errors.length > 0) {
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (validItems.length === 0) {
    return new Response(JSON.stringify({ message: 'Votre panier est vide.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    mode: 'payment',
    line_items: validItems.map(item =>({
      price_data: {
        currency: 'eur',
        product_data:{
          name: `${item.name} - ${item.size}`,
        },
        unit_amount: Math.round(item.price * 100), // Stripe requires the amount in cents
        },
      quantity: item.quantity,
      })),
      billing_address_collection: 'required',
      shipping_address_collection:{
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      },
      metadata:{
        items: JSON.stringify(validItems.map(item => ({
          documentId: item.documentId,
          quantity: item.quantity,
        }))),
      },
      customer_creation: 'always',
      success_url: `${import.meta.env.PUBLIC_ASTRO_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${import.meta.env.PUBLIC_ASTRO_URL}/panier`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Session expires in 30 minutes
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

}
