type CookieOptions = {
  expires: Date;
  maxAge: string;
  path: string;
  domain: string;
  secure: boolean;
  sameSite: string;
};

export function getCookieValue(name: string) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
}

export function setCookie(
  name: string,
  value: string,
  options: Partial<CookieOptions> = {},
) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
}

export function deleteCookie(name: string, path = "/", domain?: string) {
  document.cookie =
    `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};` +
    (domain ? ` domain=${domain};` : "");
}
