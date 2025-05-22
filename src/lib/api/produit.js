import fetchApi from '../strapi.js';

export async function getProduct(slug) {
  const produit = await fetchApi({
    endpoint: `produits/${slug}`,
    wrappedByKey: 'data',
    query: {
      fields: ['name', 'price', 'description', 'slug'],
      populate: {
        photo: {
          fields: ['url'],
        },
        composition: {
          fields: ['pourcentage'],
          populate: {
            matiere: {
              fields: ['type'],
            },
          },
        },
        produit_couleurs:{
          populate: {
            couleur: {
              populate: ['hex'],
            },
            photo: {
              fields: ['url'],
            },
            produit_couleur_sizes:{
              fields: ['taille']
            }
          }
        },

      },
    },
  });
  /*console.log('✅ Produit récupéré sur api :', produit);*/
  return produit;
}
