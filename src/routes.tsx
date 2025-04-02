import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { CareerView } from "./views/CareerView";
import { AreaConclusionView } from "./views/AreaConclusionView";
import { CareerDetailView } from "./views/CareerDetailView";
import { coursesData } from "./data/coursesData";

// Loader para obtener datos de áreas
export const areasLoader = () => {
  const areas = [...new Set(coursesData.map((item) => item.Area))].sort();
  return { areas };
};

// Loader para obtener datos de carreras
export const careersLoader = ({ params }: { params: any }) => {
  const { area } = params;
  const filteredData = area
    ? coursesData.filter((item) => item.Area === area)
    : coursesData;
  const careers = [...new Set(filteredData.map((item) => item.Carrera))].sort();
  return { careers, area };
};

// Loader para obtener datos de una carrera específica
export const careerDetailLoader = ({ params }: { params: any }) => {
  const { careerName } = params;
  const careerCourses = coursesData.filter(
    (course) => course.Carrera === careerName
  );
  const careerArea = careerCourses.length > 0 ? careerCourses[0].Area : null;

  return {
    careerName,
    careerCourses,
    careerArea,
  };
};

// Crear el router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    loader: areasLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/careers" replace />,
      },
      {
        path: "careers",
        element: <CareerView />,
        loader: careersLoader,
      },
      {
        path: "careers/:area",
        element: <CareerView />,
        loader: careersLoader,
      },
      {
        path: "career/:careerName",
        element: <CareerDetailView />,
        loader: careerDetailLoader,
      },
      {
        path: "conclusions",
        element: <AreaConclusionView />,
        loader: areasLoader,
      },
    ],
  },
]);
