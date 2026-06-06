export function getDriveDirectLink(url: string | undefined): string {
  if (!url) return '';

  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  const idParam = url.match(/[?&]id=([^&]+)/);
  if (url.includes('drive.google.com') && idParam?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${idParam[1]}`;
  }

  return url;
}
