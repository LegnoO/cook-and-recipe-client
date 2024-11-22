type CookieOptions = {
  expires: Date;
  maxAge: string;
  path: string;
  domain: string;
  secure: boolean;
  sameSite: string;
};

type ParsedCookie = {
  name: string;
  value: string;
  domain?: string | undefined;
  expires?: Date | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  path?: string | undefined;
  priority?: "low" | "medium" | "high" | undefined;
  sameSite?: true | false | "lax" | "strict" | "none" | undefined;
  secure?: boolean | undefined;
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


export function parseSetCookie(cookieString: string): ParsedCookie {
  const parts = cookieString.split(";").map((part) => part.trim());
  const [nameValuePair, ...attributes] = parts;
  const [name, value] = nameValuePair.split("=");
  const parsedCookie: ParsedCookie = { name, value };

  attributes.forEach((attribute) => {
    const [key, value] = attribute.split("=");

    switch (key.toLowerCase()) {
      case "expires":
        parsedCookie.expires = new Date(value);
        break;
      case "path":
        parsedCookie.path = value;
        break;
      case "httponly":
        parsedCookie.httpOnly = true;
        break;
      case "secure":
        parsedCookie.secure = true;
        break;
      case "samesite":
        parsedCookie.sameSite = value as ParsedCookie["sameSite"];
        break;
      case "priority":
        parsedCookie.priority = value as ParsedCookie["priority"];
        break;
    }
  });

  return parsedCookie;
}
