import { ZodError } from "zod";

export const formatZodErrorMessage = (error: ZodError) => {
  if (!(error instanceof ZodError)) return "";

  return error.issues
    .map(issue => {
      const { path, message } = issue;

      return `${path.join(".")}: ${message}`;
    })
    .join();
};
