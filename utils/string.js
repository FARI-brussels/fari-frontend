// @ts-ignore
export function toPascalCase(text) {
  return text.replace(/(^\w|[-_](\w))/g, (_, __, c) => (c ? c.toUpperCase() : _.toUpperCase()));
}
// @ts-ignore
export function toCamelCase(text) {
  return text.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}
