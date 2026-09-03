const defaultSiteUrl =
  "https://ludun-mike-digital-card.mike020124.chatgpt.site";

export const publicSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl
).replace(/\/+$/, "");

export const publicBasePath = (
  process.env.NEXT_PUBLIC_BASE_PATH ?? ""
).replace(/\/+$/, "");

export function absoluteSiteUrl(pathname: string) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${publicSiteUrl}${normalizedPath}`;
}

export function absolutePageUrl(pathname: string) {
  const url = absoluteSiteUrl(pathname);
  return pathname === "/" ? `${publicSiteUrl}/` : `${url.replace(/\/+$/, "")}/`;
}

export function publicPath(pathname: string) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${publicBasePath}${normalizedPath}`;
}
