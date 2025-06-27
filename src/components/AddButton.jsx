'use client';
import { addToCart } from '../lib/cart';

export default function AddButton({ product }) {

  return (
    <button
      disabled={!product}
      onClick= {() =>{
        if (product){
          console.log('Adding product to cart:', product);
          addToCart(product)}
        }
      }
      className={` px-[1em] py-[0.2em] ${product ? 'border-1 text-[1.3em]  cursor-pointer orange'  : 'border-1 border-gray-400 text-[1.3em] text-gray-400 '}`}
    >
      AJOUTER AU PANIER
    </button>
  );
}
