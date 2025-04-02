"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { CourseData, Career } from "../types";
import { TopCoursesTable } from "./TopCoursesTable";
import { CourseStatsCards } from "./CourseStatsCards";
import { AlertTriangle, BarChart2, List, Building2 } from "lucide-react";

interface CareerDetailProps {
  selectedCareer: Career | null;
  selectedCareerArea: string | null;
  coursesData: CourseData[];
}

export function CareerDetail({
  selectedCareer,
  selectedCareerArea,
  coursesData,
}: CareerDetailProps) {
  const [viewType, setViewType] = useState<"chart" | "table">("chart");

  if (!selectedCareer) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[400px] text-center border border-gray-200">
        <AlertTriangle className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Seleccione una Carrera
        </h2>
        <p className="text-gray-600">
          Por favor, seleccione una carrera de la lista para ver sus
          estadísticas de cursos.
        </p>
      </div>
    );
  }

  const careerCourses = coursesData.filter(
    (course) => course.Carrera === selectedCareer
  );

  // Sort courses by error rate in descending order
  const sortedCourses = [...careerCourses].sort(
    (a, b) => b.errorRate - a.errorRate
  );

  // Get top 3 courses with highest error rates
  const topCourses = sortedCourses.slice(0, 3);
  const topCourseNames = topCourses.map((course) => course.Curso);

  // Calculate average error rate for the career
  const avgErrorRate =
    careerCourses.reduce((sum, course) => sum + course.errorRate, 0) /
    careerCourses.length;

  // Prepare data for chart - sort alphabetically by course name
  const chartData = [...careerCourses]
    .sort((a, b) => a.Curso.localeCompare(b.Curso))
    .map((course) => ({
      name: course.Curso,
      errorRate: course.errorRate,
      isTop3: topCourseNames.includes(course.Curso),
    }));

  // Custom dot component to highlight top 3 courses
  const CustomDot = (props: any) => {
    const {
      cx,
      cy,
      payload,
      isTop3,
      stroke,
      fill,
      dataKey,
      r = 4,
      index,
      ...rest
    } = props;

    // Determinar si el punto está activo (cuando el usuario pasa el mouse por encima)
    const isActive = rest.active;
    const radius = isActive ? 8 : isTop3 ? 6 : 4;
    const dotFill = isTop3 ? "#c53030" : "#6b7280";

    return (
      <svg
        x={cx - radius}
        y={cy - radius}
        width={radius * 2}
        height={radius * 2}
        fill={dotFill}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        <circle cx={radius} cy={radius} r={radius} />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {selectedCareer}
          </h2>
          {selectedCareerArea && (
            <div className="flex items-center text-gray-600">
              <Building2 className="h-4 w-4 mr-1" />
              <span>Área: {selectedCareerArea}</span>
            </div>
          )}
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setViewType("chart")}
            className={`px-3 py-2 rounded-md flex items-center ${
              viewType === "chart"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <BarChart2 className="h-4 w-4 mr-1" />
            Gráfico
          </button>
          <button
            onClick={() => setViewType("table")}
            className={`px-3 py-2 rounded-md flex items-center ${
              viewType === "table"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <List className="h-4 w-4 mr-1" />
            Tabla
          </button>
        </div>
      </div>

      <CourseStatsCards
        totalCourses={careerCourses.length}
        avgErrorRate={avgErrorRate}
        topCourses={topCourses}
        area={selectedCareerArea || ""}
      />

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Porcentaje de Error por Curso
        </h3>

        {viewType === "chart" ? (
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  label={{ angle: -90, position: "insideLeft" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(value, _name, props) => {
                    const { payload } = props;
                    return [
                      `${value}%`,
                      `${payload.isTop3 ? "⚠️ " : ""}Porcentaje de Error`,
                    ];
                  }}
                  labelFormatter={(label) => {
                    const item = chartData.find((item) => item.name === label);
                    return `${label}${item?.isTop3 ? " (Top 3)" : ""}`;
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="errorRate"
                  name="Porcentaje de Error"
                  stroke="#6b7280"
                  strokeWidth={2}
                  dot={(props) => (
                    <CustomDot {...props} isTop3={props.payload.isTop3} />
                  )}
                  activeDot={{ r: 8, fill: "#6b7280" }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-end mt-2">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-full bg-red-700 mr-1"></div>
                <span className="mr-4">Top 3 cursos con mayor error</span>
                <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                <span>Otros cursos</span>
              </div>
            </div>
          </div>
        ) : (
          <TopCoursesTable courses={sortedCourses} />
        )}
      </div>
    </div>
  );
}
