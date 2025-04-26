// import React from 'react';

// // Definimos los valores fijos para las pruebas
// const staticSubtotal = 1000;
// const staticDiscount = 50;
// const staticIgvRate = 18; // Tasa fija de IGV
// const staticRetentionRate = 3; // Tasa fija de retención

// const SummaryInvoice = () => {
//   const subtotal = staticSubtotal;
//   const discount = staticDiscount;
//   const igvRate = staticIgvRate;
//   const retentionRate = staticRetentionRate;

//   const igv = (subtotal - discount) * (igvRate / 100);
//   const totalWithIGV = subtotal - discount + igv;
//   const retention = totalWithIGV * (retentionRate / 100);
//   const total = totalWithIGV - retention;

//   return (
//     <div className="w-full max-w-sm mx-auto p-4 border rounded-lg">
//       <h2 className="text-lg font-semibold mb-4">Resumen:</h2>
//       <div className="flex justify-between border-b py-1">
//         <span>SubTotal:</span>
//         <span>S/ {subtotal.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between border-b py-1">
//         <span>Descuento Total:</span>
//         <span>S/ {discount.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between border-b py-1">
//         <span>IGV: ({igvRate}%)</span>
//         <span>S/ {igv.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between border-b py-1">
//         <span>Importe Total:</span>
//         <span>S/ {totalWithIGV.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between border-b py-1">
//         <span>Retención del {retentionRate}%:</span>
//         <span>S/ {retention.toFixed(2)}</span>
//       </div>

//       <div className="flex justify-between text-xl font-semibold mt-4">
//         <span>Total:</span>
//         <span className="text-green-600">S/ {total.toFixed(2)}</span>
//       </div>
//     </div>
//   );
// };

// export default SummaryInvoice;

interface SummaryProps {
  subtotal: number
  discount: number
  igvRate: number // En porcentaje, por ejemplo, 18 para 18%
  retentionRate: number // En porcentaje, por ejemplo, 3 para 3%
  symbol?: string
}

const Summary = ({
  subtotal,
  discount,
  igvRate,
  retentionRate,
  symbol = 'S/'
}: SummaryProps) => {
  const igv = (subtotal - discount) * (igvRate / 100)
  const totalWithIGV = subtotal - discount + igv
  const retention = totalWithIGV * (retentionRate / 100)
  const total = totalWithIGV - retention

  return (
    <div className='w-full max-w-sm mx-auto'>
      <h2 className='text-lg font-semibold mb-0 dark:text-gray-300'>Resumen:</h2>
      <div className='flex justify-between border-b py-1 dark:border-gray-700'>
        <span className='text-sm'>SubTotal:</span>
        <span className='text-sm'>
          {symbol} {subtotal.toFixed(2)}
        </span>
      </div>
      <div className='flex justify-between border-b py-1 dark:border-gray-700'>
        <span className='text-sm'>Descuento Total:</span>
        <span className='text-sm'>
          {symbol} {discount.toFixed(2)}
        </span>
      </div>
      <div className='flex justify-between border-b py-1 dark:border-gray-700'>
        <span className='text-sm'>IGV: ({igvRate}%)</span>
        <span className='text-sm'>
          {symbol} {igv.toFixed(2)}
        </span>
      </div>
      <div className='flex justify-between border-b py-1 dark:border-gray-700'>
        <span className='text-sm'>Importe Total:</span>
        <span className='text-sm'>
          {symbol} {totalWithIGV.toFixed(2)}
        </span>
      </div>
      <div className='flex justify-between border-b py-1 dark:border-gray-700'>
        <span className='text-sm'>Retención del: {retentionRate}%</span>
        <span className='text-sm'>
          {symbol} {retention.toFixed(2)}
        </span>
      </div>

      <div className='flex justify-between text-lg font-semibold mt-4'>
        <span className="dark:text-gray-300 font-semibold">Total:</span>
        <span className='text-green-600 dark:text-green-500'>
          {symbol} {total.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default Summary
