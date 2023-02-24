/** Convert kebab-case to title-case. */
export function kebabToTitle(value: string | undefined) {
  return value?.replaceAll("-", " ");
}

/** Get Pokemon id from url. */
export function getPokemonIdFromUrl(url: string) {
  const regex = /(?<=pokemon\/)[0-9]+/;
  const matches = url.match(regex);

  return matches?.length ? matches[0] : null;
}
