import { useState, useEffect } from 'react';
import { clearCart } from '../lib/cart';

export default function FetchOrder() {
  console.log('FetchOrder component rendered');

  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    clearCart();
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (!sessionId) {
      setErrors(['Aucun ID de session trouvé dans l\'URL.']);
      return;
    }

    fetch(`${import.meta.env.PUBLIC_STRAPI_URL}/api/stripe/session/${sessionId}`)
    .then (response => {
      if (!response.ok) {
        console.error('Erreur lors de la récupération de la session Stripe:', response.statusText);
        throw new Error('Erreur lors de la récupération de la session Stripe');
      }
      console.log('resonse;', response);
      return response.json();

    })

    .then (data => {
      console.log('Session data:', data);
      setOrder(data)

    })
    .catch(error => setErrors(error.message))
  }, []);

    if (errors.length > 1) return <div>Error: {errors}</div>;
    if (!order) return <div>Loading...</div>;

    const items = JSON.parse(order.metadata.items)
    console.log('Items dans la commande:', items);


  return (

    <>

      <p className="text-center mb-[3em]">{`Un email sera envoyé à l'addresse ${order.customer_details.email}` }</p>
      <div className="border-1">
                  <div className="flex flex-col gap-[1em] m-[1em]">
                    {items.map(item => (
                      <div key={item.documentId} className="flex gap-[2em]">
                        <div className="flex gap-[1em]">
                          <span className="">
                            {item.name} - {item.taille}
                          </span>
                        </div>
                        <div class="flex gap-[1em]">
                          <span className="w-[]">x {item.quantity}</span>

                        </div>
                      </div>
                    ))}
                    <span className="border-t-[1px] text-right pt-[1em]">
                      TOTAL : {order.amount_total / 100} €
                    </span>
                  </div>
                </div>
    </>
  )
}
