import fetchApi from '../strapi.js';

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
        message: `Erreur lors de la récupération du produit ${item.product}.`,
        item: item
      });
      continue;
    }

    if (!product) {
      errors.push({
        message: `le produit ${item.product} n'existe pas.`,
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
      size: isPieceUnique ? item.size : product.taille,
      reserve: item.quantity,
      type: isPieceUnique ? 'piece-unique' : 'produit',

    })


  }

  console.log('validItems:', validItems);



  return {
    validItems,
    errors,
  };

}
