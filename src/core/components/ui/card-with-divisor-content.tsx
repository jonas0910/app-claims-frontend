import { ReactNode } from 'react';

interface CardWithDivisorContentProps {
  title?: string;
  leftChildren: ReactNode;
  rightChildren: ReactNode;
  bottomChildren?: ReactNode; // Nueva propiedad opcional
  className?: string;
}

const CardWithDivisorContent = ({
  title,
  leftChildren,
  rightChildren,
  bottomChildren,
  className = '',
}: CardWithDivisorContentProps) => {
  return (
    <div className={`bg-white dark:bg-base-100 shadow-lg rounded-md p-5 ${className}`}>
      {title && (
        <h2 className='text-xl pl-1 pb-2 border-b-2 border-gray-200 font-semibold'>
          {title}
        </h2>
      )}
      <div className="flex pt-8 mx-2 ">
        {/* Left Side */}
        <div className="w-2/3 pr-6 border-r border-gray-200">
          {leftChildren}
        </div>

        {/* Right Side */}
        <div className="w-1/3 pl-6">
          {rightChildren}
        </div>
      </div>
       {/* Nueva fila opcional debajo de los contenidos */}
       {bottomChildren && (
        <div className="pt-6">
            {bottomChildren}
        </div>
      )}
    </div>
  );
};

export default CardWithDivisorContent;
