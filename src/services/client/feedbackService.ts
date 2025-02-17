// ** Lib
import fetcher from "@/lib/fetcher";

export async function getFeedback(id: string): Promise<Feedback[]> {
  const res = await fetcher(`/recipe/public/find/${id}/feedback`);
  return await res.json();
}
