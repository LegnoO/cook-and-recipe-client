// ** Components
import LoadingScreen from "@/components/LoadingScreen";

async function refreshUser() {
  const res = await fetch(
    "https://cook-and-recipe.vercel.app/api/auth/refresh",
    { method: "POST" },
  );
  console.log(res);
  return await res.json();
}

export default async function SessionPage() {
  console.log("=====>", await refreshUser());
  return <LoadingScreen />;
}
