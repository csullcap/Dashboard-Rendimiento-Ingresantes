import { BookOpen, TrendingUp, AlertTriangle, Building2 } from "lucide-react";
import type { CourseData } from "../types";

interface CourseStatsCardsProps {
  totalCourses: number;
  avgErrorRate: number;
  topCourses: CourseData[];
  area: string;
}

export function CourseStatsCards({
  totalCourses,
  avgErrorRate,
  topCourses,
  area,
}: CourseStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-100 rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center mb-2">
          <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Total de Cursos
          </h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{totalCourses}</p>
        {area && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <Building2 className="h-4 w-4 mr-1" />
            <span>Área: {area}</span>
          </div>
        )}
      </div>

      <div className="bg-gray-100 rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center mb-2">
          <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Promedio de Error
          </h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {avgErrorRate.toFixed(2)}%
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Mayor Dificultad
          </h3>
        </div>
        <p className="text-xl font-bold text-gray-900 truncate">
          {topCourses[0]?.Curso || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          {topCourses[0]?.Porcentaje_Error || "0%"} de error
        </p>
      </div>
    </div>
  );
}
