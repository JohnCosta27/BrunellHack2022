export const requiredParams = (params: string[], body: any) => {
  const errors: string[] = [];

  for (const key of params) {
    if (!body[key]) {
      errors.push(`Missing required parameter: ${key}`);
    }
  }

  return errors;
};
