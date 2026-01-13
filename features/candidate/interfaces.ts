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
  "biogrpahy" | "date_of_birth" | "gender" | "experience" | "education"
> & {
  id: string;
};
