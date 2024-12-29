export const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export function getCharInitials(name: string) {
  if (!name) return "";

  const splitName = name.split(" ");
  if (splitName.length === 1) {
    return splitName[0].charAt(0);
  } else {
    return splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0);
  }
}

export const isSSR = typeof window === "undefined";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatAddress(
  address: {
    number: string;
    street: string;
    ward: string;
    district: string;
    city: string;
  },
  maxLength: number = 100,
) {
  const formattedAddress = `${address.number}, ${address.street}, ${address.ward}, ${address.district}, ${address.city}`;

  if (formattedAddress.length > maxLength) {
    return formattedAddress.slice(0, maxLength - 3) + "...";
  }

  return formattedAddress;
}

export function createSearchParams(filter: Record<string, unknown>) {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value));
    }
  });

  return params;
}

export function getItemLocalStorage<T>(key: string): T | null {
  if (isSSR) {
    return null;
  }

  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : null;
}

export function secondsToMinutes(seconds: number) {
  return Math.floor(seconds / 60);
}

export function isObjectEmpty(obj: Record<string, unknown>) {
  return Object.keys(obj).length === 0;
}

export function getDecodedParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedValue = urlParams.get(param);
  return encodedValue ? decodeURIComponent(encodedValue) : null;
}

export function appendFormData(data: Record<string, unknown>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append(key, file);
        }
      });
    } else {
      formData.append(key, (value as string) || "");
    }
  });

  return formData;
}

export function isObject(value: Record<string, unknown>) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function convertMBToBytes(megabyte: number) {
  return megabyte * 1024 * 1024;
}

export function isEmptyObject(obj: Record<string, unknown>) {
  return Object.keys(obj).length === 0;
}

export function calculateDaysAgo(dateString: string) {
  const targetDate = new Date(dateString);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - targetDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  return differenceInDays;
}
