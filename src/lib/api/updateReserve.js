
export async function updateReserveProduct(documentId, newReserve, type) {

  console.log('updateReserve called with:', { documentId, newReserve, type });

  if (!documentId || !newReserve || !type) {
    throw new Error('Document ID and quantity are required');
  }
  if (type !== 'produit' && type !== 'piece-unique') {
    throw new Error('Type must be either "produit" or "piece-unique"');
  }
  const endpoint = type === 'produit' ? 'produit-couleur-sizes' : 'pieces-uniques';

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}/${documentId}`);

  const res = await fetch(url.toString(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.STRAPI_API_RESERVE_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        reserve: newReserve,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update reserve: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
