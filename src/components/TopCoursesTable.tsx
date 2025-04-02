import type { CourseData } from "../types";

interface TopCoursesTableProps {
  courses: CourseData[];
}

export function TopCoursesTable({ courses }: TopCoursesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Curso
            </th>

            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Total Preguntas
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Incorrectas
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              % Error
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr
              key={course.Curso}
              className={`${index < 3 ? "bg-red-50" : ""} hover:bg-gray-100`}
            >
              <td className="py-3 px-4 border-b">
                {index < 3 && (
                  <span className="inline-block w-5 h-5 bg-red-600 text-white rounded-full text-xs font-bold text-center leading-5 mr-2">
                    {index + 1}
                  </span>
                )}
                {course.Curso}
              </td>

              <td className="py-3 px-4 border-b">{course.Total_Preguntas}</td>
              <td className="py-3 px-4 border-b">{course.Incorrectas}</td>
              <td className="py-3 px-4 border-b font-semibold">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    course.errorRate > 60
                      ? "bg-red-600"
                      : course.errorRate > 40
                      ? "bg-orange-500"
                      : course.errorRate > 20
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {course.Porcentaje_Error}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
