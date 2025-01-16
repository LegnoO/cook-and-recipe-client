// ** Next Imports
import { notFound } from "next/navigation";

// ** Config
import { API_BASE_URL } from "@/config/endpoint";

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/category/public/find`);

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `Failed to fetch categories: ${error.statusCode}. ${error.error}. ${error.message}`,
    );
  }

  const data: Category[] = await res.json();
  if (!data) notFound();

  return data;
}
