import fetchApi from '../strapi.js';

export async function getPieceUniques() {
  const piece_uniques = await fetchApi({
    endpoint: 'pieces-uniques',
    wrappedByKey: 'data',
    query: {
      fields: ["titre", "description", "price", "stock", "reserve", "slug", "createdAt"],
      populate:{
        photos: {
          fields: ['url']
        },
        tags: {
          fields: ['tag']
        }

      }

  }});
  /*console.log('✅ Produits récupérés sur api :', produits);
  console.log(JSON.stringify(produits, null, 2)); // 👈 ici !*/
  return piece_uniques;

}
