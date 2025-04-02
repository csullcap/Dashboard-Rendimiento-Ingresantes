import type { CourseData } from "../types";
import { AlertTriangle } from "lucide-react";

interface TopThreeCoursesProps {
  career: string;
  coursesData: CourseData[];
}

export function TopThreeCourses({ career, coursesData }: TopThreeCoursesProps) {
  const careerCourses = coursesData.filter(
    (course) => course.Carrera === career
  );

  // Sort courses by error rate in descending order
  const sortedCourses = [...careerCourses].sort(
    (a, b) => b.errorRate - a.errorRate
  );

  // Get top 3 courses with highest error rates
  const topCourses = sortedCourses.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
        <h3 className="text-lg font-bold text-gray-800">
          Top 3 Cursos con Mayor % de Error
        </h3>
      </div>

      <div className="space-y-4">
        {topCourses.map((course, index) => (
          <div key={course.Curso} className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <div className="ml-4 flex-grow">
              <h4 className="font-semibold text-gray-800">{course.Curso}</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  className="bg-gray-600 h-2.5 rounded-full"
                  style={{ width: `${course.errorRate}%` }}
                ></div>
              </div>
            </div>
            <div className="flex-shrink-0 ml-4 font-bold text-red-600">
              {course.Porcentaje_Error}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
