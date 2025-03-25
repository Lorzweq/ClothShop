import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ cart, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      // Calculate total amount
      const amount = cart.reduce((total, item) => total + item.price * 100, 0);

      // Send paymentMethod.id to your server to create a payment intent
      const response = await fetch('http://localhost:5000/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount }),
      });

      const paymentIntent = await response.json();
      console.log('PaymentIntent:', paymentIntent);

      const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret);
      if (confirmError) {
        console.error(confirmError);
      } else {
        console.log('Payment successful!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-gray-800 backdrop-blur-md">
      <form className="bg-white p-8 rounded shadow-lg max-w-sm w-full relative" onSubmit={handleSubmit}>
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
        <CardElement className="mb-4 p-2 border rounded" />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
          disabled={!stripe}
        >
          Pay {cart.reduce((total, item) => total + item.price, 0)}€
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;