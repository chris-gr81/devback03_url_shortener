export function createShortUrl(): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let shortUrl = "";

  for (let i = 0; i < 6; i++) {
    shortUrl += charset[Math.floor(Math.random() * charset.length)];
  }
  return shortUrl;
}
