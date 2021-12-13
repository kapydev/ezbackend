/**
 * Converts a string to lowercase kebabcase (e.g. Kebab Case → kebab-case)
 * @param str
 * @returns lowecase kebabcase
 */
export const kebabCase = (str: string) => {
  const matchArray = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g,
  );
  if (matchArray === null) {
    throw new Error('kebab case argument cannot be empty');
  }
  return matchArray
    .filter(Boolean)
    .map((x) => x.toLowerCase())
    .join('-');
};
