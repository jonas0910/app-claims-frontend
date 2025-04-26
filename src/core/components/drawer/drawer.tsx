'use client';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import CloseIcon from '../icons/close-icon';

enum PositionTypeClass {
  'RIGHT' = 'right-0',
  'LEFT' = 'left-0'
}

enum SizeTypeClass {
  'SMALL' = 'w-[300px]',
  'NORMAL' = 'w-[700px]',
  'MEDIUM' = 'w-1/2',
  'LARGE' = 'w-full'
}
type SizeType = keyof typeof SizeTypeClass;
type PositionType = keyof typeof PositionTypeClass;

interface DrawerProps {
  position?: PositionType;
  title: string;
  onClose: () => void;
  size?: SizeType;
  footer?: React.ReactNode; // render prop
  bgColor?: string; // nuevo parámetro opcional para color de fondo
  textColor?: string; // nuevo parámetro opcional para color de texto
}

const Drawer = ({
  position = 'RIGHT',
  title,
  children,
  onClose,
  size = 'NORMAL',
  footer,
  bgColor = 'white', 
  textColor = 'black' 
}: PropsWithChildren<DrawerProps>) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div
      tabIndex={1}
      className='fixed right-0 w-full h-full bottom-0 z-50'
      style={{ color: textColor }}
    >
      {/* mask */}
      <div
        className='absolute bottom-0 right-0 left-0 top-0 opacity-100'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
        onClick={handleClose} // Se activará la animación de salida
      ></div>
      <div
        className={`absolute top-0 ${PositionTypeClass[position]} bottom-0 ${SizeTypeClass[size]} ${
          isClosing ? 'slide-in-blurred-left' : 'slide-in-blurred-right'
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <div className='flex flex-col h-full w-full pointer-events-auto'>
          {/* header */}
          <div
            className='relative top-0 p-3.5 w-full border-b-2 border-gray-200 font-medium'
            style={{ backgroundColor: bgColor }}
          >
            <div className='flex justify-between'>
              {title}
              <div className='cursor-pointer' onClick={handleClose}>
                <CloseIcon />
              </div>
            </div>
          </div>
          {/* content body */}
          <div className='p-5 flex-1 overflow-auto h-full'>{children}</div>
          {/* footer */}
          {footer && (
            <div
              className='relative bottom-0 w-full border-t-2 border-gray-200 py-3.5'
              style={{ backgroundColor: bgColor }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
