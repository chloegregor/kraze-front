import fetchApi from '../strapi.js';

export async function getProducts() {
  const produits = await fetchApi({
    endpoint: 'produits',
    wrappedByKey: 'data',
    query: {
      fields: ['name', 'price', 'description', 'slug'],
      populate: {

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
          }
        }
      },

    },
  });
  /*console.log('✅ Produits récupérés sur api :', produits);
  console.log(JSON.stringify(produits, null, 2)); // 👈 ici !*/
  return produits;

}
