

// ** Utils
import { capitalizeFirstLetter } from "./helpers";

export function handleAxiosError(error: unknown) {
  if (axios.isCancel(error)) {
    const messages = error.message;
    return capitalizeFirstLetter(messages!);
  }

  return "An unknown error occurred";
}
