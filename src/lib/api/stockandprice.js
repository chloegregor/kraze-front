import fetchApi from '../strapi.js';

import {updateReserveProduct} from './updateReserve.js';

export async function FetchProductStockAndPrice(documentId) {
  const productStockAndPrice = await fetchApi({
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
  console.log('✅ Produit récupéré sur api :', productStockAndPrice);
 return productStockAndPrice;
}


export async function FetchPieceStockAndPrice(documentId) {
  console.log('Fetching piece stock and price for docu:', documentId);
  const pieceStockAndPrice = await fetchApi({
    endpoint: "pieces-uniques",
    wrappedByKey: 'data',
    query: {
        filters: {
        documentId: { $eq: documentId }
      },
      fields: ['documentId', 'stock', 'reserve', 'titre', 'price'],
    }
  })
  console.log('✅ Piece unique récupérée sur api :', pieceStockAndPrice);
 return pieceStockAndPrice;
}

export async function StockAndPrice(cart){
  const errors = [];
  const validItems = [];

  for (const item of cart) {
    console.log('Processing item:', item);
    let product;
    let isPieceUnique = item.type === 'piece-unique';

    try {
      console.log('Fetching product for item:', item.documentId);
      product = isPieceUnique

        ? (await FetchPieceStockAndPrice(item.documentId))[0]

        : await FetchProductStockAndPrice(item.documentId);
    }catch (error) {
      errors.push({
        message: `Erreur lors de la récupération du produit avec l'ID ${item.documentId}.`,
        item: item
      });
      continue;
    }

    if (!product) {
      errors.push({
        message: `Le produit avec l'ID ${item.documentId} n'a pas été trouvé.`,
        item: item
      })
      continue;
    }
    if ((product.stock - product.reserve) < item.quantity) {
      errors.push({
        message: `Le stock pour ${item.type === 'produit' ? `${product.produit_couleur.nom} (${product.taille})` :product.titre}  est insuffisant. Stock disponible: ${(product.stock - product.reserve)}.`,
        item: item
      })
      continue;
    }
    console.log('Stock suffisant pour l\'article:', item);
    console.log('Produit:', product);


    validItems.push({
      documentId: product.documentId,
      quantity: item.quantity,
      price: isPieceUnique ? product.price : product.produit_couleur.produit.price,
      name: isPieceUnique ? product.titre : product.produit_couleur.nom,
      taille: isPieceUnique ? item.taille : product.taille,
      newReserve: product.reserve + item.quantity,
      type: isPieceUnique ? 'piece-unique' : 'produit',

    })


  }

  console.log('validItems:', validItems);


  await Promise.all(
    validItems.map(item => updateReserveProduct(item.documentId, item.newReserve, item.type))
  );


  return {
    validItems,
    errors,
  };

}
