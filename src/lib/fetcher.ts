const fetcher = (url: string) =>
  fetch(`https://rickandmortyapi.com/api${url}`).then((res) => res.json());

export default fetcher;
