export const requiredField = (field: string) => {
  return `VALIDATION_ERRORS.REQUIRED {${field}}`;
};
