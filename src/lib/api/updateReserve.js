export async function updateReserveProduct(documentId, quantity, type) {

  console.log('updateReserve called with:', { documentId, quantity, type });

  if (!documentId || !quantity || !type) {
    throw new Error('Document ID and quantity are required');
  }
  if (type !== 'produit' && type !== 'piece-unique') {
    throw new Error('Type must be either "produit" or "piece-unique"');
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/incrementreserve`);

  const data = {
    documentId: documentId,
    quantity: quantity,
    type: type
  }
  try{

    const res = await fetch(url.toString(), {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.STRAPI_RESERVE}`,
      },
      body: JSON.stringify(
        data),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = json.error || json.message || res.statusText;
      throw new Error(`Failed to update reserve: ${message.message}`);
    }

    return json;

  }catch(error){
    console.error('Error in updateReserveProduct:', error.message);
    throw new Error('Error updating reserve' + error.message);
  }
}



export async function cancelReserveProduct(documentId, quantity, type) {
  console.log('cancelReserve called with:', { documentId, quantity, type });

  if (!documentId || !quantity || !type) {
    throw new Error('Document ID and quantity are required');
  }
  if (type !== 'produit' && type !== 'piece-unique') {
    throw new Error('Type must be either "produit" or "piece-unique"');
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/decrementreserve`);

  const data = {
    documentId: documentId,
    quantity: quantity,
    type: type
  }


  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.STRAPI_RESERVE}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to cancel reserve: ${res.statusText}`);
  }

  const result = await res.json();
  return result;

}


export async function incrementAll(items){
  const updatedItems = []

 for (const item of items){
    try{
      await updateReserveProduct(item.documentId, item.quantity, item.type);
      updatedItems.push(item);
    }catch(error){
      for (const rollback of updatedItems){
        await cancelReserveProduct(rollback.documentId, rollback.quantity, rollback.type);
      }
      throw new Error(`L'article ${item.name} n'est plus disponible. ${updatedItems.length ? 'Supprimez le du panier et réesayer.' : ''}`);
    }
  }
  return updatedItems;
}
