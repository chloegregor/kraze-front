import fetchApi from '../strapi.js';

export async function getSizesAndStock(slug) {
  const produit = await fetchApi({
    endpoint: `produits/${slug}`,
    wrappedByKey: 'data',
    query: {
      populate: {

        produit_couleurs:{
          populate: {
            produit_couleur_sizes:{
              fields: ['taille', 'stock', 'reserve'],
              populate: {
                produit_couleur :{
                  fields: ['nom'],
                }
              }
            }
          },
          sort: ['createdAt:asc']
        },

      },
    },
  });
  /*console.log('✅ Produit récupéré sur api :', produit);*/
  return produit;
}

export async function getPieceStock(slug) {
  const piece = await fetchApi({
    endpoint: `pieces-uniques/${slug}`,
    wrappedByKey: 'data',
    query: {
      fields: ['stock', 'reserve'],
    }
  });
  /*console.log('✅ Piece unique récupérée sur api :', piece);*/
  return piece;
}
