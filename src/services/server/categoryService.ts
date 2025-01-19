// ** Next Imports
import { notFound } from "next/navigation";

// ** Config
import { API_BASE_URL } from "@/config/endpoint";

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/category/public/find`);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    } else {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
  }

  const data: Category[] = await res.json();

  return data;
}
