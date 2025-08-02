import fetchApi from '../strapi.js';

export async function getPieceUniques() {
  const piece_uniques = await fetchApi({
    endpoint: 'piece-uniques',
    wrappedByKey: 'data',
    query: {
      fields: ["titre", "description", "price", "stock", "reserve"],
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
  console.log('✅ Piece uniques récupérées sur api :', piece_uniques);
  return piece_uniques;

}
