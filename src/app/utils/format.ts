export function formatRwf(amount: number) {
  return `${Math.round(amount).toLocaleString('en-RW')} RWF`;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

