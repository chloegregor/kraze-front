import { useState, useEffect } from 'react';
import { clearCart, getCart } from '../lib/cart';

export default function FetchOrder() {
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState([]);
  const [CartContent, setCartContent] = useState([]);


  useEffect(() => {
    const CartContent = getCart();
    setCartContent(CartContent);

    clearCart();
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (!sessionId) {
      setErrors(['Aucun ID de session trouvé dans l\'URL.']);
      return;
    }

    fetch(`${import.meta.env.PUBLIC_STRAPI_URL}/api/stripe/session/${sessionId}`)
    .then(response => {

      if (!response.ok) {
        console.error(`Erreur lors de la récupération de la session Stripe:, ${text}`);
        throw new Error('Erreur lors de la récupération de la session Stripe');
      }

      return response.json();

    })

    .then (data => {
      setOrder(data)

    })
    .catch(error => setErrors(error.message))
  }, []);

    if (errors.length > 1) return <div>Error: {errors}</div>;
    if (!order) return <div>Loading...</div>;

    const items = CartContent
    console.log('Order fetched:', order);



  return (

    <>

      <p className="text-center mb-[3em]">{`Un email sera envoyé à l'addresse ${order.customer_details.email}` }</p>
      <div className="border-1">
                  <div className="flex flex-col gap-[1em] m-[1em]">
                    {items.map(item => (
                      <div key={item.documentId} className="flex gap-[2em]">
                        <div className="flex gap-[1em]">
                          <span className="">
                            {item.product}{item.size}
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
