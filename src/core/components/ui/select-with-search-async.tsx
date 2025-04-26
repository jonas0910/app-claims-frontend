import Select from 'react-select'
import { useFormContext, Controller, FieldError } from 'react-hook-form'
import { useTheme } from './context/theme-context'
import { CircleStackIcon } from '@heroicons/react/20/solid'

interface SelectWithSearchProps {
  label: string
  infoLabel?: string
  inputName: string
  placeholder?: string
  getInfo?: ({ id }: { id: number }) => void
  options: { value: number | string; label: string }[] | undefined // El valor puede ser number o string
  inputError?: FieldError
  keyValue?: string
  onChange?: (val: string | number | undefined) => void
  menuMaxHeight?: string
  fetchNextPage: () => void
  //   isFetchingNextPage: boolean
  isFetching: boolean
  isDisabled?: boolean
  //   hasNextPage: boolean
  messageLoading?: string
  getValue: (value: string) => void
}

const SelectWithSearchAsync = ({
  label,
  infoLabel,
  inputName,
  placeholder = 'Seleccionar...',
  getInfo,
  inputError,
  options,
  keyValue,
  onChange,
  menuMaxHeight = '300px',
  fetchNextPage,
  //   isFetchingNextPage,
  isFetching,
  isDisabled = false,
  messageLoading = 'Cargando información...',
  getValue
}: SelectWithSearchProps) => {
  const { control } = useFormContext()
  const { theme } = useTheme()
  return (
    <div className='w-full flex flex-col gap-1'>
      <label
        htmlFor={inputName}
        className={`font-semibold text-gray-600 dark:text-base-content flex items-center justify-between`}
      >
        <span>{label}</span>
        {isFetching && (
          // <span className='text-green-500 text-xs'>{messageLoading}</span>
          <CircleStackIcon className='w-5 h-5 text-primary' />
        )}
      </label>
      <Controller
        name={inputName}
        control={control}
        render={({ field }) => (
          <Select
            {...field} // Propiedades del campo de formulario de React Hook Form
            key={keyValue || undefined} // comentar
            // {...(keyValue && { key: keyValue })} // comentar
            inputId={inputName}
            id={`${inputName}-value`}
            instanceId={`${inputName}-value`}
            name={field.name as string | undefined}
            placeholder={placeholder}
            isLoading={isFetching}
            isDisabled={isDisabled}
            noOptionsMessage={() => 'Sin Informacion'}
            loadingMessage={() => messageLoading}
            options={options}
            onMenuScrollToBottom={fetchNextPage}
            // onMenuScrollToBottom={(event) =>
            //   handleMenuScroll(
            //     event as unknown as React.WheelEvent<HTMLDivElement>
            //   )
            // }
            // menuPortalTarget={menuRef.current}
            // menuShouldScrollIntoView={true}
            value={
              options?.find((x) => x.value === field.value) ||
              (field.value
                ? {
                    value: field.value,
                    label: infoLabel ? infoLabel : 'Opcion seleccionada'
                  }
                : null)
            }
            // ref={}
            // value={options?.find((x) => x.value === field.value) || null} // Encuentra el valor seleccionado en las opciones
            onChange={(val) => {
              field.onChange(val?.value) // Actualiza el valor del campo

              if (onChange) {
                onChange(val?.value) // Llama a la función onChange si está definida
              }

              if (val) {
                if (getInfo) {
                  getInfo({ id: val.value as number }) // Llama a getInfo si está definida
                }
              }
              // if (val && getInfo) {
              // getInfo({ id: val.value as number })
              // }
            }}
            onInputChange={(value) => {
              getValue(value)
            }}
            styles={{
              input: (baseStyles) => ({
                ...baseStyles,
                color: theme === 'dark' ? '#a6adbb' : '#000'
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                // width: '',
                height: '48px', // Altura del campo de entrada
                outline: 'red',
                borderColor: state.isFocused
                  ? '#1c9e6c'
                  : theme === 'dark'
                    ? '#383f47'
                    : baseStyles.borderColor, // Estilo de borde en focus
                borderWidth: state.isFocused ? '2px' : baseStyles.borderWidth,
                '&:hover': {
                  borderColor: state.isFocused
                    ? '#1c9e6c'
                    : theme === 'dark'
                      ? '#3B4654'
                      : baseStyles.borderColor
                },
                '&:focus': {
                  borderColor: '#ff9a00' // Borde en focus
                },
                boxShadow: 'none', // Sin sombra de caja
                backgroundColor: 'transparent'
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                fontSize: '14px', // Tamaño de fuente del placeholder
                // color: theme === 'dark' ? '#a6adbb' : '#8d8f8d'
                color: theme === 'dark' ? '#5e6b7f' : '#8d8f8d'
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: '14px', // Tamaño de fuente de las opciones
                ...(theme === 'dark' && {
                  backgroundColor: state.isSelected
                    ? '#2684ff' // Fondo para la opción seleccionada
                    : state.isFocused
                      ? 'transparent' // Fondo para la opción enfocada
                      : 'transparent', // Fondo predeterminado
                  color: state.isSelected
                    ? '#ffffff' // Texto para la opción seleccionada
                    : '#a6adbb', // Texto predeterminado
                  '&:hover': {
                    backgroundColor: state.isSelected
                      ? '#2684ff' // Mantiene el fondo de la opción seleccionada
                      : '#374151', // Fondo al hacer hover
                    color: state.isSelected
                      ? '#ffffff' // Mantiene el color de texto de la opción seleccionada
                      : '#a6adbb' // Texto al hacer hover
                  }
                })
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: theme === 'dark' ? '#a6adbb' : ''
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: theme === 'dark' ? '#1d232a' : '#fff',
                maxHeight: menuMaxHeight, // Altura máxima del menú desplegable
                // minHeight: '100px', // Altura mínima del menú desplegable
                overflowY: 'auto', // Habilita el desplazamiento si el contenido es mayor
                scrollbarWidth: 'thin', // Para Firefox
                scrollbarColor: '#c4c4c4 transparent', // Color del scroll en Firefox
                boxShadow:
                  theme === 'dark'
                    ? '0px 4px 8px rgba(0, 0, 0, 0.4)'
                    : '0px 4px 8px rgba(0, 0, 0, 0.1)',
                border:
                  theme === 'dark' ? '1px solid #2c313a' : '1px solid #e2e8f0'
                // '&::-webkit-scrollbar': {
                //   //   display: 'none' // Para Chrome, Safari y Opera
                // },
              })
            }}
          />
        )}
      />
      {inputError && (
        <p className='mt-1 text-[14px] text-red-500 dark:text-red-400'>
          {inputError.message}
        </p>
      )}
    </div>
  )
}

export default SelectWithSearchAsync
