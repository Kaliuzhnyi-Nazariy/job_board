export interface FullDataCandidate {
  id: string;
  username: string;
  full_name: string;
  email: string;
  biography: string;
  speciality?: string;
  date_of_birth?: Date;
  gender?: "Mr" | "Ms" | "Mx";
  experience?: string;
  education?: string;
  website?: string;
  location?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface IUpdForm {
  full_name: string;
  speciality: string;
  experience: string;
  education: string;
  website: string;
}

export type UpdateProfile = Pick<
  FullDataCandidate,
  "biography" | "date_of_birth" | "gender" | "experience" | "education"
>;

export interface ICandidate {
  id: string;
  role: "employer" | "candidate";
  username: string;
  full_name: string;
  email: string;
}

export interface IDefaultContactForm {
  location?: string;
  phone?: string;
  email?: string;
}
