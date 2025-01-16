// ** Next Imports
import { notFound } from "next/navigation";

// ** Utils
import { createSearchParams, getTruthyObject } from "@/utils";

// ** Config
import { API_BASE_URL } from "@/config/endpoint";

export async function getChefDetail(chefId: string) {
  const res = await fetch(`${API_BASE_URL}/chefs/public/find/${chefId}`);

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `Failed to fetch recipe: ${error.statusCode}. ${error.error}. ${error.message}`,
    );
  }

  const data: Chef = await res.json();
  if (!data) notFound();

  return data;
}

export async function getChefList(searchParams: SearchParams) {
  const params = createSearchParams(getTruthyObject(searchParams || {}));

  const res = await fetch(
    `${API_BASE_URL}/chefs/public/find?${params.toString()}`,
  );

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `Failed to fetch chefs: ${error.statusCode}. ${error.error}. ${error.message}`,
    );
  }

  const data: ChefListResponse = await res.json();
  if (!data) notFound();

  return data;
}

export async function getAllChef() {
  const res = await fetch(
    `${API_BASE_URL}/chefs/public/find?index=1&size=10000&sortOrder=asc`,
  );

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `Failed to fetch chefs: ${error.statusCode}. ${error.error}. ${error.message}`,
    );
  }

  const data: ChefListResponse = await res.json();
  if (!data) notFound();

  return data;
}
