import z from "zod";

export const JobValidation = z
  .object({
    title: z.string().min(3, "The title should be longer than 3 symbols!"),
    position: z.string(),
    description: z
      .string()
      .min(20, "Description should be at least 20 charachters long!")
      .max(1028, "Description shouldn't be longer than 1028 characters!"),
    minSalary: z.number().gt(-1, "The value cannot be negative!"),
    maxSalary: z.number().gt(-1, "The value cannot be negative!"),
    salaryType: z.enum(
      ["month", "week", "hour", "year", "contract"],
      'That field can be filled only with that values: "month", "week", "year", "contract"'
    ),
    workTime: z.enum(
      ["Full-Time", "Part-Time", "Internship", "Contract"],
      "That field can be filled only with that values: 'full_time', 'part_time', 'internship', 'contract' "
    ),
    location: z.string(),
    education: z.string().optional(),
    responsobilities: z
      .string()
      .max(1028, "Responsobilities shouldn't be longer than 1028 characters!")
      .optional(),
    experience: z.string().optional(),
  })
  .refine((data) => data.maxSalary >= data.minSalary, {
    message: "Maximum salary should be higher or equal to minimal salary",
    path: ["maxSalary"],
  });
