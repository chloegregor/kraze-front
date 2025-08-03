import fetchApi from '../strapi.js';

import {updateReserve} from './updateReserve.js';

export async function FetchStockAndPrice(documentId) {
  const stockAndPrice = await fetchApi({
    endpoint: `produit-couleur-sizes/${documentId}`,
    wrappedByKey: 'data',
    query: {
      fields: ['stock', 'reserve', 'taille'],
      populate:{
        produit_couleur:{
          fields: ['nom'],
          populate:{
            produit:{
              fields: ['price']
            }
          }
        }
      }
    }
  })
 return stockAndPrice;
}

export async function StockAndPrice(cart){
  const errors = [];
  const validItems = [];
  let total = 0

  for (const item of cart) {
    const product = await FetchStockAndPrice(item.documentId);
    if (!product) {
      errors.push({
        message: `Le produit avec l'ID ${item.documentId} n'a pas été trouvé.`,
        item: item
      })
      continue;
    }
    if ((product.stock - product.reserve) < item.quantity) {
      errors.push({
        message: `Le stock pour ${product.produit_couleur.nom} (${product.taille}) est insuffisant. Stock disponible: ${(product.stock - product.reserve)}.`,
        item: item
      })
      continue;
    }


    validItems.push({
      documentId: item.documentId,
      quantity: item.quantity,
      price: product.produit_couleur.produit.price,
      name: product.produit_couleur.nom,
      taille: product.taille,
      newReserve: product.reserve + item.quantity,

    })


  }

  console.log('validItems:', validItems);


  await Promise.all(
    validItems.map(item => updateReserve(item.documentId, item.newReserve))
  );


  return {
    validItems,
    errors,
  };

}
