import { Card } from '@/core/components/ui'
import { Fragment, useEffect } from 'react'
import { useClaim } from '../hooks/use-claim'

interface ClaimsReportProps {
  filters: any
}

const ClaimsReport = ({ filters }: ClaimsReportProps) => {
  const { totalClaims, totalClaimsAnswered, totalClaimsPending } =
    useClaim(filters)

  return (
    <Fragment>
      <div className='grid grid-cols-3 gap-4 w-full'>
        <Card className='p-4'>
          <div>
            <p className='text-gray-500'>Total de Reclamaciones</p>
            <p className='text-bold text-3xl mt-2'>{totalClaims}</p>
          </div>
        </Card>

        <Card className='p-4'>
          <div>
            <p className='text-gray-500'>Respondidas</p>
            <p className='text-bold text-3xl mt-2'>{totalClaimsAnswered}</p>
          </div>
        </Card>
        <Card className='p-4'>
          <div>
            <p className='text-gray-500'>Pendientes</p>
            <p className='text-bold text-3xl mt-2'>{totalClaimsPending}</p>
          </div>
        </Card>
      </div>
    </Fragment>
  )
}

export default ClaimsReport
