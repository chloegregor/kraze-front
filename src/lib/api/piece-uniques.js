import fetchApi from '../strapi.js';

export async function getPieceUniques() {
  const piece_uniques = await fetchApi({
    endpoint: 'pieces-uniques',
    wrappedByKey: 'data',
    query: {
      fields: ["titre", "description", "price", "stock", "reserve", "slug", "createdAt"],
      pagination: { pageSize: 50},
      sort: ['createdAt:desc'],
      populate:{
        photos: {
          fields: ['url']
        },
        tags: {
          fields: ['tag']
        }

      }

  }});
  console.log('✅ Produits récupérés sur api :', piece_uniques);

  console.log(JSON.stringify(piece_uniques, null, 2)); // 👈 ici !
  return piece_uniques;

}
