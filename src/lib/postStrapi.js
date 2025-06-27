
export default async function postStrapi({
  endpoint,
  body,
  wrappedByKey,
}) {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.STRAPI_API_MESSAGE_TOKEN}`,
    },
    body: JSON.stringify({data: body}),
  });

  let data = await res.json();

  console.log('postStrapi data', data);

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  return data;
}
