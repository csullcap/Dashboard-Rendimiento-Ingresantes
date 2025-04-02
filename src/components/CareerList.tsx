"use client";

import { GraduationCap } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { Career } from "../types";
import { coursesData } from "../data/coursesData";

interface CareerListProps {
  careers: Career[];
  selectedCareer: Career | null;
  onSelectCareer: (career: Career) => void;
}

export function CareerList({
  careers,
  selectedCareer,
  onSelectCareer,
}: CareerListProps) {
  const location = useLocation();
  const currentCareer = location.pathname.includes("/career/")
    ? decodeURIComponent(location.pathname.split("/career/")[1])
    : null;

  // Función para obtener el área de una carrera
  const getCareerArea = (career: string): string => {
    const careerData = coursesData.find((item) => item.Carrera === career);
    return careerData?.Area || "";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <GraduationCap className="mr-2 h-5 w-5 text-gray-600" />
        Carreras
      </h2>
      <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
        {careers.map((career) => (
          <button
            key={career}
            onClick={() => onSelectCareer(career)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              career === currentCareer || career === selectedCareer
                ? "bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            <div className="font-medium">{career}</div>
            <div
              className={`text-xs mt-1 ${
                career === currentCareer || career === selectedCareer
                  ? "text-gray-200"
                  : "text-gray-500"
              }`}
            >
              Área: {getCareerArea(career)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
