"use client";

import { Building2 } from "lucide-react";

interface AreaFilterProps {
  areas: string[];
  selectedArea: string | null;
  onSelectArea: (area: string) => void;
}

export function AreaFilter({
  areas,
  selectedArea,
  onSelectArea,
}: AreaFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <Building2 className="mr-2 h-5 w-5 text-gray-600" />
        Filtrar por Área
      </h2>
      <div className="flex flex-wrap gap-2">
        {areas.map((area) => (
          <button
            key={area}
            onClick={() => onSelectArea(area)}
            className={`px-3 py-2 rounded-md transition-colors ${
              selectedArea === area
                ? "bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {area}
          </button>
        ))}
        {selectedArea && (
          <button
            onClick={() => onSelectArea(selectedArea)}
            className="px-3 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
          >
            Limpiar filtro
          </button>
        )}
      </div>
    </div>
  );
}
