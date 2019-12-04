export function getRandomId(): number {
  return Math.floor(Math.random() * (Math.floor(430000) - Math.ceil(1) + 1)) + Math.ceil(1);
}
