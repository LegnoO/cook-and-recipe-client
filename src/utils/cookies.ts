// ** Lib
import { isSSR } from "./helpers";

type ParsedCookie = {
  name: string;
  value: string;
  domain?: string | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  priority?: "low" | "medium" | "high" | undefined;
  expires?: number | Date | undefined;
  sameSite?: true | false | "lax" | "strict" | "none" | undefined;
  secure?: boolean | undefined;
  path?: string | undefined;
};

type SetCookie = Omit<
  ParsedCookie,
  "domain" | "httpOnly" | "name" | "value" | "priority" | "maxAge"
>;

export function getCookieValue(name: string) {
  if (isSSR) {
    return "";
  }

  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
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

export function setCookie(
  name: string,
  value: string,
  options: SetCookie = {},
) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === "number") {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    } else if (options.expires instanceof Date) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
}

export function deleteCookie(name: string, options?: { path?: string }) {
  let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  if (options?.path) cookie += `path=${options?.path};`;

  document.cookie = cookie;
}
