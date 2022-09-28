import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Props } from 'next/script';
import cart from '../styles/Cart.module.css'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <form onSubmit={async (event) => {
      event.preventDefault()
      const res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/invoice`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      const session = await res.json()
      const stripe = await stripePromise
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id
      })
      console.warn(error.message)
    }}>
      

      
      <section>
        <button className={cart.addButton} type="submit" role="link"> 
          Checkout
        </button>
      </section>

    </form>
  );
}