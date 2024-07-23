export const getIdFromUrl = (url: string): string | null => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : null;
};
