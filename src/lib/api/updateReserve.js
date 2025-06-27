
export async function updateReserve(documentId, newReserve) {

  console.log('updateReserve called with:', { documentId, newReserve });

  if (!documentId || !newReserve) {
    throw new Error('Document ID and quantity are required');
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/produit-couleur-sizes/${documentId}`);

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
