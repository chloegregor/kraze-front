import fetchApi from '../strapi.js';

export async function getPieceUnique(slug) {
  const piece_uniques = await fetchApi({
    endpoint: `piece_uniques/${slug}`,
    wrappedByKey: 'data',
    query: {
      fields: ["titre", "description", "price", "stock", "reserve", "slug"],
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
  console.log('✅ Piece unique récupérées sur api :', piece_uniques);
  return piece_uniques;

}
