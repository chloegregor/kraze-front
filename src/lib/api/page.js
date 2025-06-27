import FetchApi from '../strapi.js';

export async function getPage(slug) {
  const page = await FetchApi({
    endpoint: `pages/${slug}`,
    wrappedByKey: 'data',
    query: {
      populate: {
        content: {
          on : {
             'shared.titre-page':{
              fields: ['titre']
            },
            'shared.texte-image':{
              fields: ['texte', 'titre'],
              populate:{
                photo:{
                  fields: ['url']
                }
              }
            },
            
          },
        }
      },
    },
  });
  return page;
}
