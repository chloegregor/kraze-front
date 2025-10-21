'use client';
import { addToCart } from '../lib/cart';
import {useState, useEffect} from 'react';

export default function AddButton({ product }) {
  const [text, setText] = useState('');

  return (
    <>
    <button

      onClick= {() =>{
        if (product){
          // console.log('Adding product to cart:', product);
          addToCart(product)
          setText('Produit ajouté au panier !')
        } else {
          setText('Sélectionnez une taille disponible.')}
      }
      }
      className={` px-[1em] py-[0.2em] ${product ? 'border-1 text-[1.3em]  cursor-pointer orange'  : 'border-1 border-gray-400 text-[1.3em] text-gray-400 '}`}
    >
      AJOUTER AU PANIER
    </button>
     {text !== '' && (
    <p className='mt-[0.5em] text-[0.9em] h-[1.5em]'>
      {text}
    </p>
  )}
    </>
  );
}
