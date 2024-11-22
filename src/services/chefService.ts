// ** Lib
import AxiosInstance from "@/lib/apiClient-old";
import { createSearchParams } from "@/lib/utils";

export async function getRecipeOwned<T>(queryOptions: QueryOptions<T>) {
  const params = createSearchParams(queryOptions);
  const response = await AxiosInstance.get<ListRecipe>(
    `/recipe/owned/find?${params}`,
  );

  return response.data;
}
