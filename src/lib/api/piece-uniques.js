import fetchApi from '../strapi.js';

export async function getPieceUniques() {
  const piece_uniques = await fetchApi({
    endpoint: 'piece-uniques',
    wrappedByKey: 'data',
    query: {
      fields: ['titre', 'price', 'stock', 'reserve', 'tag'],
      populate: {
        photo: {
              fields: ['url'],
            },

      },

    },
  });
  /*console.log('✅ Produits récupérés sur api :', produits);
  console.log(JSON.stringify(produits, null, 2)); // 👈 ici !*/
  return piece_uniques;

}
