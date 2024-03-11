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
    const stripe = new Stripe(
      'sk_test_51OWqLSAbpbhU2RpikTr0zxLgFm8UrQQhl4eg7hZCEZEA9687RYGciuKSjvMInanzLJITLDBHpNZaYQE0j5yJF5QR00RW4Un8jS'
    );

    // Obtener los datos de los clientes desde la solicitud
    const { email, name } = req.body;

    // Crear el primer cliente con un identificador único
    const customer1 = await stripe.customers.create({
      email: email,
      name: name,
      metadata: { role: 'recruiter' },
    });

    // Crear el segundo cliente con un identificador único diferente
    const customer2 = await stripe.customers.create({
      email: email,
      name: name,
      metadata: { role: 'applicant' },
    });

    console.log('Primer cliente creado en Stripe:', customer1);
    console.log('Segundo cliente creado en Stripe:', customer2);

    res.status(200).send({ recruiter: customer1, applicant: customer2 });
  } catch (error) {
    console.error('Error al crear los clientes en Stripe:', error);
    res.status(500).send('Ocurrió un error al crear los clientes en Stripe');
  }
});
