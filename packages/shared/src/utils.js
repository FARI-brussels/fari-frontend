// @ts-ignore
export function toPascalCase(str) {
  return str.replace(/(^\w|[-_](\w))/g, (_, __, c) => (c ? c.toUpperCase() : _.toUpperCase()));
}
// @ts-ignore
export function toCamelCase(str) {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}
