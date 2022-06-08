export default async function getPosts(url) {
  return fetch(url).then(res => {
    return res.json();
  });
}
