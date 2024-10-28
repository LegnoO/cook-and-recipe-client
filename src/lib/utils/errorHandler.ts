// ** Library Imports
import axios from "axios";

// ** Utils
import { capitalizeFirstLetter } from "./helpers";

export function handleAxiosError(error: unknown) {
  if (axios.isCancel(error)) {
    const messages = error.message;
    return capitalizeFirstLetter(messages!);
  }

  if (axios.isAxiosError(error)) {
    const messages = error.response?.data?.message as string | string[];
    if (Array.isArray(messages)) {
      return messages;
    }
    if (typeof messages === "string") {
      return messages;
    }
  }

  return "An unknown error occurred";
}
