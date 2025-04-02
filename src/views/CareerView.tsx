import { useLoaderData, useNavigate } from "react-router-dom"
import { CareerList } from "../components/CareerList"
import { AlertTriangle } from "lucide-react"
import type { Career } from "../types"

export function CareerView() {
  const { careers, area } = useLoaderData() as { careers: Career[]; area: string | null }
  const navigate = useNavigate()

  const handleSelectCareer = (career: Career) => {
    navigate(`/career/${encodeURIComponent(career)}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <CareerList careers={careers} selectedCareer={null} onSelectCareer={handleSelectCareer} />
      </div>
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[400px] text-center border border-gray-200">
          <AlertTriangle className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Seleccione una Carrera</h2>
          <p className="text-gray-600">
            Por favor, seleccione una carrera de la lista para ver sus estadísticas de cursos.
          </p>
          {area && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">
                Mostrando carreras del área: <strong>{area}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

