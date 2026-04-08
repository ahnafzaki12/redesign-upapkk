export interface Job {
  id: number
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