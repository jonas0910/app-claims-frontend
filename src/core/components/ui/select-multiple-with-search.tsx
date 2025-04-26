import Select from 'react-select'
import { FieldError, useFormContext, Controller, Merge } from 'react-hook-form'
import { useTheme } from './context/theme-context'

interface SelectMultipleWithSearchProps {
  label: string
  inputName: string
  placeholder?: string
  // el value puede ser number o string
  // options: string[] | undefined
  options: { value: number | string; label: string }[] | undefined
  inputError?: Merge<FieldError, (FieldError | undefined)[]>
  menuMaxHeight?: string

  //   inputError?: FieldError
}

const SelectMultipleWithSearch = ({
  label,
  inputName,
  options,
  inputError,
  placeholder = 'Seleccione uno o mas opciones',
  menuMaxHeight = '300px'
}: SelectMultipleWithSearchProps) => {
  const { control } = useFormContext()
  const { theme } = useTheme()
  return (
    <div className='w-full flex flex-col gap-1'>
      <label
        htmlFor={inputName}
        className='font-semibold text-gray-600 dark:text-base-content'
      >
        {label}
      </label>
      <Controller
        name={inputName}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            inputId={inputName}
            id={`${inputName}-value`}
            instanceId={`${inputName}-value`}
            name={field.name}
            placeholder={placeholder}
            isMulti
            options={options}
            // value={options?.find((x) => x.value === field.value)}
            // onChange={(val) => {
            //   field.onChange(val.map((item) => item.value))
            // }}
            value={options?.filter((option) =>
              field?.value?.includes(option.value)
            )}
            onChange={(selectedOptions) => {
              field.onChange(
                selectedOptions ? selectedOptions.map((item) => item.value) : []
              )
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                // height: '48px', // Altura del campo de entrada
                minHeight: '48px', // Altura mínima del campo de entrada
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
                fontSize: '14px', // Tamaño de fuente del valor seleccionado
                color: theme === 'dark' ? '#a6adbb' : ''
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                boxShadow:
                  theme === 'dark'
                    ? '0px 4px 8px rgba(0, 0, 0, 0.4)'
                    : '0px 4px 8px rgba(0, 0, 0, 0.1)',
                border:
                  theme === 'dark' ? '1px solid #2c313a' : '1px solid #e2e8f0',
                backgroundColor: theme === 'dark' ? '#1d232a' : '#fff',
                maxHeight: menuMaxHeight, // Altura máxima del menú desplegable
                // minHeight: '100px', // Altura mínima del menú desplegable
                overflowY: 'auto', // Habilita el desplazamiento si el contenido es mayor
                scrollbarWidth: 'thin' // Para Firefox
                // backgroundImage: `url('/frame.png')`,
                // backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
                // backgroundPosition: 'center',
                // backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }),
              multiValue: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: theme === 'dark' ? '#1c9e6c' : '#e0f7e9', // Fondo del tag
                color: theme === 'dark' ? '#ffffff' : '#006666', // Color del texto
                borderRadius: '4px' // Bordes redondeados
              }),
              multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                color: theme === 'dark' ? '#ffffff' : '#006666' // Color del texto dentro del tag
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

export default SelectMultipleWithSearch
