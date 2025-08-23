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
          }
        },

      },
    },
  });
  /*console.log('✅ Produit récupéré sur api :', produit);*/
  return produit;
}

export async function getPieceSizeAndStock(slug) {
  const piece = await fetchApi({
    endpoint: `piece_uniques/${slug}`,
    wrappedByKey: 'data',
    query: {
      fields: ['titre', 'stock', 'reserve'],
    }
  });
  /*console.log('✅ Piece unique récupérée sur api :', piece);*/
  return piece;
}
