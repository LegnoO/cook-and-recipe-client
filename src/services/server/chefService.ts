// ** Next Imports
import { notFound } from "next/navigation";

// ** Utils
import { parseSearchParams, getTruthyObject } from "@/utils";

// ** Config
import { API_BASE_URL } from "@/config/endpoint";

export async function getChefDetail(chefId: string) {
  const res = await fetch(`${API_BASE_URL}/chefs/public/find/${chefId}`);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
  }

  const data: Chef = await res.json();

  return data;
}

export async function getChefList(searchParams: SearchParams) {
  const params = parseSearchParams(getTruthyObject(searchParams || {}));

  const res = await fetch(
    `${API_BASE_URL}/chefs/public/find?${params.toString()}`,
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
  }

  const data: ChefListResponse = await res.json();

  return data;
}

export async function getAllChef() {
  const res = await fetch(
    `${API_BASE_URL}/chefs/public/find?index=1&size=10000&sortOrder=asc`,
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
  }

  const data: ChefListResponse = await res.json();

  return data;
}
