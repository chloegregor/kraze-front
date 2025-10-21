import qs from 'qs';

export default async function fetchApi({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}) {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  // console.log('queryString', queryString);


  const url =
  typeof window !== 'undefined' ?
    new URL(`${import.meta.env.PUBLIC_STRAPI_URL}/api/${endpoint}?${queryString}`)
    : new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}?${queryString}`);


  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data;
}
