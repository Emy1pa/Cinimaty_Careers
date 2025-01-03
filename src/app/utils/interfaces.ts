export interface JobOffer {
  id: number;
  title: string;
  description?: string;
  location: string;
  jobType?: string;
  experienceLevel?: string;
  salaryRange: string;
  requiredSkills: string;
  imageUrl: string;
  jobTitle: string;
}
export interface Application {
  _id: string;
  fullName: string;
  email: string;
  message: string;
  cvUrl: string;
  status: string;
  offerId: string;
  createdAt: string;
  jobTitle: string;
}
