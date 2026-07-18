export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export const normalizePath = (pathname: string) => {
  let normalized: string
  try {
    normalized = decodeURIComponent(pathname)
  } catch {
    normalized = pathname
  }

  normalized = normalized
    .replace(/\/index\.html$/, "/")
    .replace(/\.html$/, "")
    .replace(/\/+$/, "")

  return normalized || "/"
}
