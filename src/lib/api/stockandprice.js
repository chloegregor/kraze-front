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
      switch (item.type) {

        case 'produit':
          product = await FetchProductStockAndPrice(item.documentId);
          break;
        case 'piece-unique':
          product = (await FetchPieceStockAndPrice(item.documentId))[0];
          break;
        default:
          errors.push({
            message: `Type inconnu pour l'article ${item.product}.`,
            item: item
          });

          continue;
      }


    }catch (error) {
      errors.push({
        message: `Erreur lors de la récupération de l'article ${item.product}.`,
        item: item
      });
      continue;
    }

    if (!product) {
      errors.push({
        message: `L'article ${item.product} n'existe plus.`,
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
