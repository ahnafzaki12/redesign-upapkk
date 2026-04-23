export interface Job {
  id: number
  companyId: number
  company: string
  logo: string
  logoColor: string
  logoUrl?: string
  title: string
  education: string[]
  vacancies: number
  location: string
  type: string
  category: string
  posted: string
  deadline: string
  description: string
  tag: "Pekerjaan" | "Magang"
  requirements?: string[]
  salary?: string
  duration?: string
  tags?: string[]
}

export interface SidebarProps {
  location: string
  setLocation: (v: string) => void
  category: string
  setCategory: (v: string) => void
  education: string[]
  setEducation: (v: string[]) => void
  duration: string
  setDuration: (v: string) => void
  hasActiveFilter: boolean
  resetFilters: () => void
  showDuration?: boolean
  type: string;
  setType: (val: string) => void;
}

export type CompanyPackage = "Bronze" | "Silver" | "Gold";

export interface Company {
  id: number;
  name: string;
  logo: string;
  logoUrl?: string;
  logoColor: string;
  package: CompanyPackage;
  industry: string;
  location: string;
  description: string;
  website?: string;
  employeeCount?: string;
  founded?: string;
}