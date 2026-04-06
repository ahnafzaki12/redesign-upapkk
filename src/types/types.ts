export interface Job {
  id: number
  company: string
  logo: string
  logoColor: string
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