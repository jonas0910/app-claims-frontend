'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Bienvenido a Mi Sistema de Reclamaciones
      </h1>
      
      <Link
        href="/claims-list"
        className="px-6 py-3 bg-primary text-white rounded-lg text-lg font-semibold shadow-md hover:bg-primary-hover transition"
      >
        Ir a la lista de reclamos
      </Link>
    </div>
  );
}
