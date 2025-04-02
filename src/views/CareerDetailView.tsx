import { useLoaderData } from "react-router-dom"
import { CareerDetail } from "../components/CareerDetail"
import type { CourseData } from "../types"

export function CareerDetailView() {
  const { careerName, careerCourses, careerArea } = useLoaderData() as {
    careerName: string
    careerCourses: CourseData[]
    careerArea: string | null
  }

  return <CareerDetail selectedCareer={careerName} selectedCareerArea={careerArea} coursesData={careerCourses} />
}

