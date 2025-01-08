// ** Lib
import serverFetch from "@/lib/serverFetch";

export async function getCategories(): Promise<Category[]> {
  const response = await serverFetch(`/category/public/find`);

  const categoryData = await response.json();
  return categoryData;
}
