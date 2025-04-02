"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { CourseData } from "../types";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

interface AreaConclusionProps {
  coursesData: CourseData[];
}

export function AreaConclusion({ coursesData }: AreaConclusionProps) {
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>(
    {}
  );

  // Get unique areas
  const areas = [...new Set(coursesData.map((item) => item.Area))].sort();

  // Toggle expanded state for an area
  const toggleArea = (area: string) => {
    setExpandedAreas((prev) => ({
      ...prev,
      [area]: !prev[area],
    }));
  };

  // Get top 3 courses with highest error rates for each area
  const getTopCoursesForArea = (area: string) => {
    const areaCourses = coursesData.filter((course) => course.Area === area);

    // Group by course name and calculate average error rate
    const courseGroups: Record<string, { totalError: number; count: number }> =
      {};

    areaCourses.forEach((course) => {
      if (!courseGroups[course.Curso]) {
        courseGroups[course.Curso] = { totalError: 0, count: 0 };
      }
      courseGroups[course.Curso].totalError += course.errorRate;
      courseGroups[course.Curso].count += 1;
    });

    // Calculate average error rate for each course
    const coursesWithAvgError = Object.entries(courseGroups).map(
      ([curso, data]) => ({
        Curso: curso,
        errorRate: data.totalError / data.count,
      })
    );

    // Sort by error rate and get top 3
    return coursesWithAvgError
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 3)
      .map((course, index) => ({
        ...course,
        position: index + 1,
      }));
  };

  // Prepare data for chart
  const prepareChartData = (area: string) => {
    const topCourses = getTopCoursesForArea(area);
    return topCourses.map((course) => ({
      name: course.Curso,
      errorRate: course.errorRate,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
        Conclusión por Área: Top 3 Cursos con Mayor % de Error
      </h2>

      <div className="space-y-4">
        {areas.map((area) => {
          const isExpanded = expandedAreas[area] || true;
          const topCourses = getTopCoursesForArea(area);
          const chartData = prepareChartData(area);

          return (
            <div
              key={area}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleArea(area)}
                className="w-full flex items-center justify-between bg-gray-100 p-4 text-left hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <span className="font-bold text-lg text-gray-800">
                    {area}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>

              {isExpanded && (
                <div className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Top 3 Cursos con Mayor % de Error
                      </h3>
                      <div className="space-y-4">
                        {topCourses.map((course) => (
                          <div key={course.Curso} className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                              {course.position}
                            </div>
                            <div className="ml-4 flex-grow">
                              <h4 className="font-semibold text-gray-800">
                                {course.Curso}
                              </h4>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div
                                  className="bg-gray-600 h-2.5 rounded-full"
                                  style={{ width: `${course.errorRate}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-4 font-bold text-red-600">
                              {course.errorRate.toFixed(2)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip
                            formatter={(value) => [
                              `${value}%`,
                              "Porcentaje de Error",
                            ]}
                          />
                          <Legend />
                          <Bar
                            dataKey="errorRate"
                            name="Porcentaje de Error"
                            fill="#c53030"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Conclusión:
                    </h4>
                    <p className="text-gray-700">
                      En el área de <strong>{area}</strong>, los cursos con
                      mayor dificultad son{" "}
                      <strong>{topCourses[0]?.Curso}</strong> (
                      {topCourses[0]?.errorRate.toFixed(2)}%),{" "}
                      <strong>{topCourses[1]?.Curso}</strong> (
                      {topCourses[1]?.errorRate.toFixed(2)}%) y{" "}
                      <strong>{topCourses[2]?.Curso}</strong> (
                      {topCourses[2]?.errorRate.toFixed(2)}%). Estos cursos
                      presentan los porcentajes de error más altos y requieren
                      mayor atención.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
