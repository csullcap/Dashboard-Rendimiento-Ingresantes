import { BookOpen } from "lucide-react";
import ceprunsa_logo from "../assets/ceprunsa_logo.png";
import unsa_logo from "../assets/unsa_logo.png";

export function Header() {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex items-center">
            <img
              src={ceprunsa_logo}
              alt="CEPRUNSA Logo"
              className="h-16 mr-4"
            />
            <img src={unsa_logo} alt="UNSA Logo" className="h-16" />
          </div>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-gray-600 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Dashboard de Rendimiento de Ingresantes
          </h1>
        </div>
      </div>
    </header>
  );
}
