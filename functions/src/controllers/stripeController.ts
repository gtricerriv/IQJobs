import Stripe from 'stripe';
import { onRequest } from "firebase-functions/v2/https";

// Rutas para la función de creación de suscripción con Stripe
export const createSubscription = onRequest(async (req, res) => {
    try {
        
        const stripe = new Stripe('sk_test_51OWqLSAbpbhU2RpikTr0zxLgFm8UrQQhl4eg7hZCEZEA9687RYGciuKSjvMInanzLJITLDBHpNZaYQE0j5yJF5QR00RW4Un8jS', {
        });
        // Crear un cliente en Stripe
        const customer = await stripe.customers.create({
          email: 'giancarlo.jobs2021@gmail.com'
        });
    
        // Crear una suscripción para el cliente
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: 'price_1OWqSnAbpbhU2RpichlqnDEi', quantity: 1 }],
          payment_behavior: 'default_incomplete', // Notificar al cliente de una factura incompleta
          collection_method: 'send_invoice', // Enviar factura al cliente
          days_until_due: 7 
        });
    
        // Crear factura para la suscripción
        const invoice = await stripe.invoices.create({
          customer: customer.id,
          collection_method: 'send_invoice',
          subscription: subscription.id,
          days_until_due: 7 
        });
    
        console.log("Factura creada: ", invoice);
      } catch (error) {
        console.error('Error al crear la factura:', error);
      }
});
