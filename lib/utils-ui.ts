export function getActiveClass(path: string, regex: string) {
  return path.match(new RegExp(regex)) ? "active" : ""
}

export function formatAsTitle(string: string) {
  return string.toLowerCase().replace(/(?<!\S)\S/g, initial => initial.toUpperCase())
}
