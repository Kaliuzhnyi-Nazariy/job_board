import axios from "axios";

export const errorWrapper = <Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  fallbackMessage = "An error occurred",
) => {
  return async (...args: Args): Promise<R> => {
    try {
      // Pass the arguments array back into the original function
      return await fn(...args);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = (error.response?.data as { message?: string })
          ?.message;
        throw new Error(backendMessage || fallbackMessage);
      }
      throw error;
    }
  };
};
