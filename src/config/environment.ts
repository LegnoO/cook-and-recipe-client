export const DATABASE_URL = process.env.NEXT_PUBLIC_SERVER_EXTERNAL || "";
export const LOCAL_URL = process.env.NEXT_PUBLIC_URL || "";

export const isDevEnvironment = () => process.env.NODE_ENV === "development";

export const isProdEnvironment = () => process.env.NODE_ENV === "production";
