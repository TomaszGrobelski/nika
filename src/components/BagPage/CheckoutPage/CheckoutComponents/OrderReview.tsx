import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

import {
  BagItemsProps,
  ItemsProps,
} from '../../../../types/BagPage/bagPage.types';

interface OrderReviewProps {
  validate: () => boolean;
}
function OrderReview({ validate }: OrderReviewProps) {
  const [error, setError] = useState('');
  let items: ItemsProps[] = [];
  const bagItemsString = localStorage.getItem('bagItems');

  if (bagItemsString) {
    const bagItems: BagItemsProps[] = JSON.parse(bagItemsString);

    const itemCounts = bagItems.reduce<Record<string, ItemsProps>>(
      (acc, item) => {
        if (acc[item.name]) {
          acc[item.name].quantity += 1;
        } else {
          acc[item.name] = {
            price: item.stripePrice,
            quantity: 1,
          };
        }
        return acc;
      },
      {},
    );

    items = Object.values(itemCounts);
  } else {
    setError('No items');
  }

  let stripePromise: Promise<Stripe | null>;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
    }
    return stripePromise;
  };

  const checkoutOptions = {
    lineItems: items,
    mode: 'payment' as const,
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/checkout`,
  };

  const redirectToCheckout = async () => {
    if (!validate()) {
      return console.log('Not valid');
    }
    const stripe = await getStripe();
    if (stripe) {
      const result = await stripe.redirectToCheckout(checkoutOptions);
      if (result.error) {
        setError(result.error.message as string);
      }
    } else {
      setError('Stripe could not be initialized');
    }
  };

  return (
    <div className='flex max-w-[660px] justify-end py-10'>
      <div>{error}</div>
      <button
        onClick={redirectToCheckout}
        className=' rounded-3xl border-2 p-3 px-8 text-[20px] font-bold'>
        Pay
      </button>
    </div>
  );
}

export default OrderReview;
