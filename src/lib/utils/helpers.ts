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

export function createSearchParams(filter: Object) {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value));
    }
  });

  return params;
}
