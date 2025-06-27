
export const prerender = false;
import type { APIRoute } from "astro";
import postStrapi from '../../lib/postStrapi';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

 console.log('✅ FormData reçu :', formData);

const body = {
  nom: formData.get('nom')?.toString() || '',
  email: formData.get('email')?.toString() || '',
  content: formData.get('content')?.toString() || '',
}
  const data = await postStrapi({
    endpoint: 'messages',
    body,
    wrappedByKey: 'data',
  });

  console.log('✅ Message envoyé à Strapi :', data);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },

  });

}
