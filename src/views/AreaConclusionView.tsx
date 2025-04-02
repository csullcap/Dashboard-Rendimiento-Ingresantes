import { useLoaderData } from "react-router-dom"
import { AreaConclusion } from "../components/AreaConclusion"
import { coursesData } from "../data/coursesData"

export function AreaConclusionView() {
  const { areas } = useLoaderData() as { areas: string[] }

  return <AreaConclusion coursesData={coursesData} />
}

