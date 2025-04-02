export interface CourseData {
  Area: string;
  Carrera: string;
  Curso: string;
  Total_Preguntas: number;
  Incorrectas: number;
  Porcentaje_Error: string;
  errorRate: number; // Numeric version of Porcentaje_Error
}

export type Career = string;
