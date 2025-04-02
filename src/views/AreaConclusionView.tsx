import { AreaConclusion } from "../components/AreaConclusion";
import { coursesData } from "../data/coursesData";

export function AreaConclusionView() {
  // Load data
  return <AreaConclusion coursesData={coursesData} />;
}
