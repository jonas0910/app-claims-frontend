import { Badge, CardHideDivider } from '@/core/components/ui'
import { LinkIcon } from '@heroicons/react/24/solid'
import { QRCodeCanvas } from 'qrcode.react'

interface QrGenerateProps {
  link_personalizado: string
}
const QrGenerate = ({ link_personalizado }: QrGenerateProps) => {
  return (
    <CardHideDivider title='QR del libro de reclamaciones'>
      <div className='flex flex-col items-center'>
        <QRCodeCanvas
          value={link_personalizado}
          size={256}
        />
        <p className='text-center text-sm mt-5'>
          Link del QR:{' '}
          {link_personalizado}
        </p>
        <Badge
          className='cursor-pointer w-10 h-10 bg-green-400 border-green-400 mt-5'
          handleClick={() => {
            window.open(`${link_personalizado}`, '_blank')
          }}
        >
          <LinkIcon className='w-4 h-4' />
        </Badge>
      </div>
    </CardHideDivider>
  )
}
export default QrGenerate
