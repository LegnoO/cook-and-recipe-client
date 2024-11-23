// ** Lib
import clientFetch from "@/lib/clientFetch";
import { createSearchParams } from "@/lib/utils";

export async function getRecipeOwned<T>(queryOptions: QueryOptions<T>) {
  const { total, ...rest } = queryOptions;
  const params = createSearchParams(rest);
  const response = await clientFetch(`/recipe/owned/find?${params}`);
  return await response.json();
}
