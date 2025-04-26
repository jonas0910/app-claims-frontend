import { Ubigeo } from '@/core/helpers/ubigeosData'

export const getUbigeoStructure = (data: Ubigeo[]) => {
  const resultado: Record<string, Record<string, string[]>> = {}

  data.forEach(({ label }) => {
    const partes = label.split(' - ')
    if (partes.length < 4) return // Evita errores en datos mal formateados

    const [, departamento, provincia, distrito] = partes

    if (!resultado[departamento]) {
      resultado[departamento] = {}
    }

    if (!resultado[departamento][provincia]) {
      resultado[departamento][provincia] = []
    }

    resultado[departamento][provincia].push(distrito)
  })

  return resultado
}
