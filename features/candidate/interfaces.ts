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
