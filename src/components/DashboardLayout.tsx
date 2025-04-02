"use client"

import { Outlet, useLoaderData, useNavigate, useLocation } from "react-router-dom"
import { Header } from "./Header"
import { AreaFilter } from "./AreaFilter"
import { BarChartIcon as ChartBar, BarChart4 } from "lucide-react"

export function DashboardLayout() {
  const { areas } = useLoaderData() as { areas: string[] }
  const navigate = useNavigate()
  const location = useLocation()

  const isConclusions = location.pathname.includes("/conclusions")

  const handleAreaSelect = (area: string | null) => {
    if (area) {
      navigate(`/careers/${area}`)
    } else {
      navigate("/careers")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <AreaFilter
            areas={areas}
            selectedArea={location.pathname.includes("/careers/") ? location.pathname.split("/careers/")[1] : null}
            onSelectArea={handleAreaSelect}
          />

          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => navigate("/careers")}
              className={`px-4 py-2 rounded-md flex items-center ${
                !isConclusions ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <ChartBar className="h-5 w-5 mr-2" />
              Vista por Carrera
            </button>
            <button
              onClick={() => navigate("/conclusions")}
              className={`px-4 py-2 rounded-md flex items-center ${
                isConclusions ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <BarChart4 className="h-5 w-5 mr-2" />
              Conclusiones por Área
            </button>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

