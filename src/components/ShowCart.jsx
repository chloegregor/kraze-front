'use client';
import { getCart } from '../lib/cart';
import { addToCart, removeFromCart } from '../lib/cart';
import {useEffect, useState} from 'react';

export default function ShowCart() {


  const [cart, setCart] = useState(() => {
    const initialCart = getCart();
    return Array.isArray(initialCart) ? initialCart : [];
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    function handleCartUpdate(event) {
      const updatedCart = event.detail;
      setCart(Array.isArray(updatedCart) ? updatedCart : []);
    }
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  async function handleCheckout() {
    try{
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });

     let data;

    try {
      data = await response.json(); // lire la réponse une seule fois, en JSON
    } catch (err) {
      // Si ce n’est pas du JSON, on peut afficher le texte brut
      const raw = await response.text();
      console.error('❌ Réponse non-JSON reçue :', raw);
      setErrorMessage('Erreur serveur innatendue');
      return;
    }

    if (response.ok && data.url) {
      window.location.href = data.url;
    } else {
      const errors = data.errors || [{message: data.message || 'verifiez votre panier'}];
      setErrorMessage(errors.map(error => error.message).join(', '));
    }
  } catch (err) {
    console.error('Erreur réseau', err);
    setErrorMessage('Erreur réseau lors du paiement.');
  }
}


 return (
    <>
      {cart.length === 0 && (
        <div className="text-center">Votre panier est vide.</div>
      )}

      {cart.length > 0 && (
        <>
          <div className="border-1">
            <div className="flex flex-col gap-[1em] m-[1em]">
              {cart.map(item => (
                <div key={item.documentId} className="flex gap-[2em] justify-between">
                  <div className="flex gap-[1em]">
                    <span className="">
                      {item.product} - {item.size}
                    </span>
                    <span className="">{item.price} €</span>
                  </div>
                  <div class="flex gap-[1em]">
                    <span className="w-[]">x {item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="border-1 size-[1.5em] self-center text-center cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="border-1 size-[1.5em] self-center text-center cursor-pointer"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
              <span className="border-t-[1px] text-right pt-[1em]">
                TOTAL : {totalPrice} €
              </span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="text-right cursor-pointer mt-[1em]"
          >
            <span className="border px-[1em] py-[0.5em] orange">VALIDER ET PAYER</span>
          </button>
        </>
      )}

      {errorMessage && (
        <div className="text-red-500 text-center">{errorMessage}</div>
      )}
    </>
  );
}
