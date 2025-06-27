'use client';
import { CartProvider } from '../contexts/CartContext';
import AddButton from './AddButton';

export default function ButtonWrapper({ product }) {
  return (
    <CartProvider>
      <AddButton product={product} />
    </CartProvider>
  );
}
