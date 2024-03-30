import { onRequest } from 'firebase-functions/v2/https';
import Stripe from 'stripe';

export const createSubscription = onRequest(async (req, res) => {
  try {
    const stripe = new Stripe(
      'sk_test_51OWqLSAbpbhU2RpikTr0zxLgFm8UrQQhl4eg7hZCEZEA9687RYGciuKSjvMInanzLJITLDBHpNZaYQE0j5yJF5QR00RW4Un8jS'
    );

    // Obtener los datos del cliente y el tipo de suscripción desde la solicitud
    const { email, name, customerId, subscriptionType } = req.body;

    let priceId = '';
    if (subscriptionType === 'professional') {
      priceId = 'price_1OWqUuAbpbhU2RpiDzNcBcKo';
    } else if (subscriptionType === 'applicant') {
      priceId = 'price_1OWqSnAbpbhU2RpichlqnDEi';
    } else if (subscriptionType === 'recruiter') {
      priceId = 'price_1OWqT9AbpbhU2RpiUx08K7bF';
    } else {
      throw new Error('Tipo de suscripción no válido');
    }

    // Crear una suscripción para el cliente existente
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId, quantity: 1 }],
      payment_behavior: 'default_incomplete',
      collection_method: 'send_invoice',
      days_until_due: 7,
    });

    // Crear factura para la suscripción
    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: 'send_invoice',
      subscription: subscription.id,
      days_until_due: 7,
    });

    console.log('Factura creada:', invoice);

    res.status(200).send('Suscripción creada exitosamente');
  } catch (error) {
    console.error('Error al crear la suscripción:', error);
    res.status(500).send('Ocurrió un error al crear la suscripción');
  }
});

export const createCustomer = onRequest(async (req, res) => {
  try {
    const stripe = new Stripe('sk_test_51OWqLSAbpbhU2RpikTr0zxLgFm8UrQQhl4eg7hZCEZEA9687RYGciuKSjvMInanzLJITLDBHpNZaYQE0j5yJF5QR00RW4Un8jS');

    // Obtener los datos de los clientes desde la solicitud
    const { email, name } = req.body;

    let existingCustomer;

    // Buscar un cliente con el mismo email
    const customers = await stripe.customers.list({ email: email });

    if (customers.data && customers.data.length > 0) {
      // Si existe al menos un cliente con el mismo email, utilizar el primer cliente encontrado
      existingCustomer = customers.data[0];
      console.log('Cliente existente en Stripe:', existingCustomer);

    } else {
      // Si no existe un cliente con el mismo email, crear uno nuevo
      existingCustomer = await stripe.customers.create({
        email: email,
        name: name
      });

      console.log('Nuevo cliente creado en Stripe:', existingCustomer);
      res.status(200).send(existingCustomer);

    }

    res.status(200).send(existingCustomer);

  } catch (error) {
    console.error('Error al crear o encontrar el cliente en Stripe:', error);
    res.status(500).send('Ocurrió un error al crear o encontrar el cliente en Stripe');
  }
});
