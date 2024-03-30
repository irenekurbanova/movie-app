export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function checkIsFavorite(id: string, favorites: string[]) {
  if (!favorites.length) {
    return;
  }
  if (favorites.includes(id)) {
    return true;
  } else false;
}
