
import {useEffect, useState} from 'react';
import { getCart } from '../lib/cart';

export default function CartBadge() {

   const [count, setCount] = useState(() => {
    const cart = getCart();
    return Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
   })

   useEffect(() => {
    function handleCartUpdate(event) {
      const cart = event.detail
      console.log('Cart updated, event.deetail:', cart);
      setCount(Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0);
    }
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);

   }}, []);


  return (
    <span className=" rounded-full px-2 py-1 text-xs self-center">
      {count}
    </span>
  );
}
