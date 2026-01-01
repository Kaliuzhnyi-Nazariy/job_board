export const jobCategories = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Customer Support",
  "Human Resources",
  "Finance",
  "Operations",
  "Legal",
  "Data",
  "IT",
  "Education",
  "Healthcare",
] as const;

export type JobCategory = (typeof jobCategories)[number];
