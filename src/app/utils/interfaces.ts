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
}
